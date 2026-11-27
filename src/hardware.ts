/**
 * How a console draws a piece of hardware: its case, what is on it besides
 * its Ethernet ports, and its photo. This package names no hardware; whoever
 * supports a device describes it (PulzrOS for its boards, a gateway support
 * package for its gateways) and hands the description to the components.
 *
 * The Ethernet ports themselves come live from the device where it reports
 * them; `ethernet` is the layout to draw before it has.
 */

export type ConnectorKind = 'lora' | 'lte' | 'gnss' | 'wifi' | 'bluetooth' | 'sim' | 'sd' | 'usb' | 'power';

export interface Connector {
  kind: ConnectorKind;
  /** What the case says, or what it is for: "LoRa 1", "USB-C power". */
  label: string;
}

export interface HardwarePort {
  name: string;
  /** What the case says: WAN, LAN 1, Ethernet. */
  label: string;
  poe?: boolean;
}

/** How the case is drawn when there is no photo. */
export type HardwareForm = 'indoor' | 'outdoor' | 'router' | 'puck' | 'sbc' | 'sensor';

export interface Photo {
  /** A URL the console can load. */
  src: string;
  /** Who made it, and under what terms: shown on hover and on the attributions list. */
  credit: string;
  license: string;
  /** Where it was taken from. */
  source?: string;
}

export interface Hardware {
  /** "RAKwireless RAK7268CV2": what a picture of it is called. */
  name: string;
  form: HardwareForm;
  /** Antennas on the case, for the drawing. */
  antennas?: number;
  ethernet?: HardwarePort[];
  connectors?: Connector[];
  photo?: Photo | null;
}
