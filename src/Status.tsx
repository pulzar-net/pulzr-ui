import type { ReactNode } from 'react';
import { radioColor, radioGlyph, radioName, type Radio } from './glyphs';
import styles from './Status.module.css';

export type Tone = 'ok' | 'warn' | 'bad' | 'off' | 'info';

/**
 * A state as a dot and its word. Good news is in the page's own ink; only a
 * warning or an error colors its words, so a list of forty healthy devices
 * is not forty green blocks. `live` rings the dot, for something heard now.
 */
export function StatusDot({ tone = 'ok', live = false, children }: { tone?: Tone; live?: boolean; children?: ReactNode }) {
  return (
    <span className={`${styles.status} ${styles[tone]}`}>
      <span className={`${styles.dot} ${live ? styles.live : ''}`} aria-hidden="true" />
      {children}
    </span>
  );
}

/** A radio's glyph on a square of its own color, with its name after it unless `bare`. */
export function RadioIcon({ radio, size = 'sm', bare = false, label }: { radio: Radio; size?: 'sm' | 'md' | 'lg'; bare?: boolean; label?: string }) {
  const name = label ?? radioName[radio];
  return (
    <span className={`${styles.radio} ${styles[size]}`} style={{ ['--radio' as string]: radioColor[radio] }} title={bare ? name : undefined}>
      <span className={styles.chip}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d={radioGlyph[radio]} /></svg>
      </span>
      {bare ? <span className={styles.hidden}>{name}</span> : name}
    </span>
  );
}

/** Signal in four bars: 0 is none, 4 is strong. `children` reads after them (a dBm figure). */
export function SignalBars({ level, children }: { level: 0 | 1 | 2 | 3 | 4; children?: ReactNode }) {
  const tone = ['none', 'weak', 'fair', 'good', 'strong'][level];
  return (
    <span className={styles.signal} data-level={tone}>
      <svg viewBox="0 0 14 12" role="img" aria-label={`Signal ${level} of 4`}>
        {[4, 6.5, 9, 12].map((h, i) => (
          <rect key={i} x={i * 3.8} y={12 - h} width="2.4" height={h} rx=".6" className={i < level ? styles.lit : styles.unlit} />
        ))}
      </svg>
      {children}
    </span>
  );
}

/** Bars from a received signal: the same cut-offs on every page. */
export function signalLevel(rssi: number | null | undefined): 0 | 1 | 2 | 3 | 4 {
  if (rssi == null) return 0;
  if (rssi > -75) return 4;
  if (rssi > -85) return 3;
  if (rssi > -100) return 2;
  return 1;
}

export type Hour = 'up' | 'partial' | 'down' | 'none';

/**
 * The last hours of something's life, one cell an hour, oldest first: up,
 * up for part of the hour, down, or nothing known. `label` says it in words.
 */
export function HourStrip({ hours, label, fill = false }: { hours: Hour[]; label: string; fill?: boolean }) {
  return (
    <span className={`${styles.hours} ${fill ? styles.fill : ''}`} role="img" aria-label={label}>
      {hours.map((h, i) => <span key={i} className={styles[h]} />)}
    </span>
  );
}
