import { useEffect, useState } from 'react';
import type { Hardware, HardwareForm } from './hardware';
import styles from './DeviceImage.module.css';

/**
 * A device's picture on its stage: its photo when whoever supports it gave
 * one, else a drawing of the case by its form, with as many antennas as the
 * case has. The device stays white in both themes, as the hardware is.
 */
export default function DeviceImage({
  hardware,
  name,
  size = 'md',
  stage = true,
}: {
  hardware?: Hardware | null;
  /** What to call it when `hardware` does not say. */
  name?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Draw the stage behind it. Off where the caller already has one. */
  stage?: boolean;
}) {
  const label = hardware?.name ?? name ?? 'Device';
  const photo = hardware?.photo;
  // The hosted copy first, then the device's own, then the drawing: each
  // failed load steps down one.
  const sources = photo ? [photo.src, photo.fallback].filter((s): s is string => !!s) : [];
  const [tried, setTried] = useState(0);
  useEffect(() => setTried(0), [photo?.src, photo?.fallback]);
  const src = sources[tried];
  return (
    <span className={`${styles.frame} ${styles[size]} ${stage ? styles.stage : ''}`}>
      {photo && src ? (
        <img src={src} alt={label} title={`${label}. Photo: ${photo.credit}, ${photo.license}`} loading="lazy"
          onError={() => setTried((n) => n + 1)} />
      ) : (
        <Drawing form={hardware?.form ?? 'indoor'} antennas={hardware?.antennas ?? 1} label={label} />
      )}
    </span>
  );
}

function Drawing({ form, antennas, label }: { form: HardwareForm; antennas: number; label: string }) {
  return (
    <svg viewBox="0 0 120 80" role="img" aria-label={label} className={styles.drawing}>
      <ellipse cx="60" cy="72" rx={form === 'outdoor' ? 26 : 40} ry="3.5" className={styles.floor} />
      {form === 'indoor' && <Indoor antennas={antennas} />}
      {form === 'outdoor' && <Outdoor antennas={antennas} />}
      {form === 'router' && <Router />}
      {form === 'puck' && <Puck antennas={antennas} />}
      {form === 'sbc' && <Sbc />}
      {form === 'sensor' && <Sensor />}
    </svg>
  );
}

const spread = (n: number, from: number, to: number) =>
  n <= 1 ? [(from + to) / 2] : Array.from({ length: n }, (_, i) => from + ((to - from) * i) / (n - 1));

function Indoor({ antennas }: { antennas: number }) {
  return (
    <>
      {spread(antennas, 31, 87).map((x) => <rect key={x} x={x} y="4" width="3" height="26" rx="1.5" className={styles.antenna} />)}
      <rect x="22" y="28" width="76" height="34" rx="5" className={styles.body} />
      <rect x="22" y="56" width="76" height="6" rx="3" className={styles.band} />
      <circle cx="32" cy="44" r="2" className={styles.led} />
    </>
  );
}

function Outdoor({ antennas }: { antennas: number }) {
  return (
    <>
      {spread(antennas, 42, 76).map((x) => <rect key={x} x={x} y="2" width="2.6" height="20" rx="1.3" className={styles.antenna} />)}
      <rect x="36" y="16" width="48" height="50" rx="6" className={styles.body} />
      <rect x="42" y="22" width="36" height="38" rx="3" className={styles.band} />
      <circle cx="60" cy="56" r="1.8" className={styles.led} />
    </>
  );
}

function Router() {
  return (
    <>
      <rect x="22" y="12" width="3" height="34" rx="1.5" transform="rotate(-14 23.5 46)" className={styles.antenna} />
      <rect x="95" y="12" width="3" height="34" rx="1.5" transform="rotate(14 96.5 46)" className={styles.antenna} />
      <rect x="16" y="42" width="88" height="22" rx="6" className={styles.body} />
      <circle cx="28" cy="53" r="1.8" className={styles.led} />
      <circle cx="35" cy="53" r="1.8" className={styles.ledDim} />
    </>
  );
}

function Puck({ antennas }: { antennas: number }) {
  return (
    <>
      {antennas > 0 && <rect x="76" y="2" width="3" height="28" rx="1.5" className={styles.antenna} />}
      <rect x="36" y="18" width="48" height="46" rx="12" className={styles.body} />
      <circle cx="60" cy="41" r="7" className={styles.ring} />
    </>
  );
}

function Sensor() {
  return (
    <>
      <rect x="32" y="40" width="56" height="26" rx="13" className={styles.body} />
      <circle cx="60" cy="53" r="6" className={styles.ring} />
    </>
  );
}

function Sbc() {
  return (
    <>
      <rect x="14" y="22" width="92" height="44" rx="4" className={styles.pcb} />
      <rect x="44" y="34" width="20" height="20" rx="2" className={styles.chipDark} />
      <rect x="86" y="26" width="18" height="16" rx="1.5" className={styles.port} />
      <rect x="86" y="46" width="18" height="16" rx="1.5" className={styles.port} />
      <rect x="70" y="30" width="12" height="10" rx="1" className={styles.chipDark} />
      <rect x="18" y="24" width="40" height="4" rx="1" className={styles.header} />
    </>
  );
}
