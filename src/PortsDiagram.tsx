import type { ConnectorKind, Hardware } from './hardware';
import { connectorGlyph } from './glyphs';
import styles from './PortsDiagram.module.css';

/** An Ethernet port as a gateway reports it (pulzr-ports). */
export interface DiagramPort {
  name: string;
  /** What the case says: WAN, LAN 1, Ethernet. */
  label: string;
  up: boolean;
  /** Mb/s, when the link has one. */
  speed?: number | null;
  role?: 'uplink' | 'devices' | 'none';
  poe?: boolean;
}

const ROLE: Record<NonNullable<DiagramPort['role']>, string> = { uplink: 'Uplink', devices: 'LAN', none: 'Unused' };

function speedText(mbps: number | null | undefined) {
  if (!mbps) return null;
  return mbps >= 1000 ? `${mbps / 1000} Gb/s` : `${mbps} Mb/s`;
}

/**
 * The gateway's face, as on the case: its antennas, modem, slots and power
 * on the left, then its Ethernet jacks, each lit by its link (green at a
 * gigabit and up, amber below, dark with no cable) and named as the case
 * names it. `active` lights a connector that is in use: the LTE modem on
 * cellular, the LoRa antenna with a concentrator running.
 *
 * Give `onSelect` and the jacks become buttons, for a page that edits a
 * port; `selected` and `hovered` mark one, so a table beside it can point
 * at the same port.
 */
export default function PortsDiagram({
  hardware,
  ports,
  active,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  hardware?: Hardware | null;
  /** The live ports. Without them, the hardware's own layout, unlit. */
  ports?: DiagramPort[] | null;
  active?: Partial<Record<ConnectorKind, boolean>>;
  selected?: string | null;
  hovered?: string | null;
  onSelect?: (name: string) => void;
  onHover?: (name: string | null) => void;
}) {
  // Without live ports the jacks are the case's layout: drawn unlit and with
  // no link word, since nothing has said whether a cable is in.
  const live = ports != null;
  const jacks: DiagramPort[] = ports ?? hardware?.ethernet?.map((p) => ({ name: p.name, label: p.label, up: false, poe: p.poe })) ?? [];
  const poe = new Set(hardware?.ethernet?.filter((p) => p.poe).map((p) => p.name));
  const connectors = hardware?.connectors ?? [];
  return (
    <div className={styles.face} role="list" aria-label="Ports">
      {connectors.length > 0 && (
        <div className={styles.group}>
          {connectors.map((c, i) => {
            const on = active?.[c.kind];
            return (
              <span key={`${c.kind}${i}`} role="listitem" className={`${styles.connector} ${on ? styles.on : on === false ? styles.off : ''}`} style={{ ['--c' as string]: COLOR[c.kind] }} title={c.label}>
                <span className={styles.socketBox}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={connectorGlyph[c.kind]} /></svg>
                </span>
                <span className={styles.name}>{c.label}</span>
              </span>
            );
          })}
        </div>
      )}
      {jacks.length > 0 && (
        <div className={styles.group}>
          {jacks.map((p) => {
            const tier = !p.up ? '' : (p.speed ?? 0) >= 1000 ? styles.gigabit : styles.fast;
            const cls = `${styles.jack} ${tier} ${selected === p.name ? styles.selected : ''} ${hovered === p.name ? styles.lit : ''}`;
            const body = (
              <>
                <svg viewBox="0 0 34 28" className={styles.rj45} aria-hidden="true">
                  <rect x="1" y="1" width="32" height="26" rx="3" className={styles.housing} />
                  <path d="M8 9h18v11h-4v3h-10v-3h-4z" className={styles.socket} />
                  <rect x="3.5" y="3.5" width="5" height="2.6" rx=".8" className={styles.ledLink} />
                  <rect x="25.5" y="3.5" width="5" height="2.6" rx=".8" className={styles.ledAct} />
                </svg>
                <span className={styles.name}>{p.label}</span>
                <span className={styles.meta}>
                  {!live ? null : p.up ? speedText(p.speed) ?? 'Up' : 'No cable'}
                  {(p.poe || poe.has(p.name)) && <span className={styles.poe}>PoE</span>}
                </span>
                {p.role && <span className={styles.role}>{ROLE[p.role]}</span>}
              </>
            );
            const link = !live ? null : p.up ? speedText(p.speed) ?? 'link up' : 'no cable';
            const label = [p.label, link, p.role ? ROLE[p.role] : null].filter(Boolean).join(', ');
            return onSelect ? (
              <button key={p.name} type="button" role="listitem" className={cls} aria-label={label} aria-pressed={selected === p.name}
                onClick={() => onSelect(p.name)} onMouseEnter={() => onHover?.(p.name)} onMouseLeave={() => onHover?.(null)}
                onFocus={() => onHover?.(p.name)} onBlur={() => onHover?.(null)}>
                {body}
              </button>
            ) : (
              <span key={p.name} role="listitem" className={cls} aria-label={label}>{body}</span>
            );
          })}
        </div>
      )}
    </div>
  );
}

const COLOR: Record<ConnectorKind, string> = {
  lora: 'var(--proto-lorawan)', lte: 'var(--proto-cellular)', gnss: 'var(--text-secondary)', wifi: 'var(--proto-wifi)',
  bluetooth: 'var(--proto-ble)', sim: 'var(--proto-cellular)', sd: 'var(--text-secondary)', usb: 'var(--text-secondary)', power: 'var(--status-success)',
};
