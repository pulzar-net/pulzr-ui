/**
 * Stroke paths on a 24-unit grid, drawn at 1.8 to 2.4 wide with round caps
 * and joins: one glyph per radio and per connector, so the same thing is
 * the same picture in both consoles.
 */

export type Radio = 'lorawan' | 'ble' | 'zigbee' | 'zwave' | 'thread' | 'cellular' | 'wifi' | 'lan' | 'modbus' | 'gnss';

export const radioGlyph: Record<Radio, string> = {
  lorawan: 'M12 13v7M8.5 9.5a5 5 0 0 1 7 0M5.5 6.5a9 9 0 0 1 13 0',
  ble: 'M7 7l10 10-5 4V3l5 4L7 17',
  zigbee: 'M5 5h14L5 19h14',
  zwave: 'M3 8l4 8 4-8 4 8 4-8',
  thread: 'M12 3a9 9 0 1 0 0 18M12 7v14M8 7h6a3 3 0 0 1 0 6h-2',
  cellular: 'M5 18v-3M10 18v-6M15 18v-9M20 18V5',
  wifi: 'M12 19h.01M8.5 15.5a5 5 0 0 1 7 0M5.5 12.5a9 9 0 0 1 13 0M2.5 9.5a13 13 0 0 1 19 0',
  lan: 'M4 8h16v9H4zM8 17v-3M12 17v-3M16 17v-3',
  modbus: 'M4 12h4l2-5 4 10 2-5h4',
  gnss: 'M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
};

export const radioName: Record<Radio, string> = {
  lorawan: 'LoRaWAN', ble: 'Bluetooth', zigbee: 'Zigbee', zwave: 'Z-Wave', thread: 'Thread',
  cellular: 'Cellular', wifi: 'Wi-Fi', lan: 'LAN', modbus: 'Modbus', gnss: 'GNSS',
};

/** The token each radio is drawn in. */
export const radioColor: Record<Radio, string> = {
  lorawan: 'var(--proto-lorawan)', ble: 'var(--proto-ble)', zigbee: 'var(--proto-zigbee)', zwave: 'var(--proto-zwave)',
  thread: 'var(--proto-thread)', cellular: 'var(--proto-cellular)', wifi: 'var(--proto-wifi)', lan: 'var(--proto-lan)',
  modbus: 'var(--proto-wire)', gnss: 'var(--text-secondary)',
};

/** A radio from however an API names it: "LoRaWAN", "bluetooth", "BLE", "zwave". */
export function radioFrom(name: string | null | undefined): Radio | null {
  const k = (name ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
  if (k.startsWith('lora')) return 'lorawan';
  if (k === 'ble' || k.startsWith('bluetooth')) return 'ble';
  if (k.startsWith('zigbee')) return 'zigbee';
  if (k === 'zwave') return 'zwave';
  if (k.startsWith('thread') || k === 'matter') return 'thread';
  if (k === 'cellular' || k === 'lte' || k === 'wwan' || k === '4g' || k === '5g') return 'cellular';
  if (k === 'wifi' || k === 'wlan') return 'wifi';
  if (k === 'lan' || k === 'ethernet' || k === 'ip') return 'lan';
  if (k.startsWith('modbus') || k === 'rs485') return 'modbus';
  if (k === 'gnss' || k === 'gps') return 'gnss';
  return null;
}

export const connectorGlyph = {
  lora: radioGlyph.lorawan,
  lte: radioGlyph.cellular,
  gnss: radioGlyph.gnss,
  wifi: radioGlyph.wifi,
  bluetooth: radioGlyph.ble,
  sim: 'M7 3h7l4 4v14H7zM10 12h5v5h-5z',
  sd: 'M7 3h8l3 3v15H7zM10 3v4M13 3v4',
  usb: 'M12 3v14M8 7l4-4 4 4M9 21h6M12 17v4',
  power: 'M12 3v8M6.3 7.3a8 8 0 1 0 11.4 0',
} as const;
