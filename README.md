# pulzr-ui

The design language of the Pulzr consoles: the Pulzr Cloud console and the
[PulzrOS](https://github.com/Pulzr/PulzrOS) gateway console import it, so the
two read as one product and a part drawn in one is drawn the same in the
other.

- **Tokens** (`@pulzr/ui/tokens.css`): layered surfaces (canvas, panel, card,
  raised, stage, inset) in graphite, text, borders, status, one hue per
  radio, signal, chart series, labels, radii. Dark follows the browser.
- **StatusDot**: a state as a dot and its word.
- **RadioIcon**: a radio's glyph on a square of its color (LoRaWAN, Bluetooth,
  Zigbee, Z-Wave, Thread, cellular, Wi-Fi, LAN, Modbus, GNSS).
- **SignalBars**, **HourStrip**: signal in four bars; the last hours one cell
  an hour.
- **DeviceImage**: a device's photo on its stage, or a drawing of its case.
- **PortsDiagram**: a device's face, as on the case: its antennas, modem,
  slots and power, then its Ethernet jacks lit by their link.

The package names no hardware. Whoever supports a device describes it as a
`Hardware` (its form, antennas, connectors, Ethernet ports and photo with its
credit) and hands that to the components: PulzrOS for its boards, a gateway
support package for its gateways.

## Use

Shipped as TypeScript and CSS modules; the console's bundler compiles it.

```sh
npm install @pulzr/ui
```

```ts
// main.tsx, before the console's own styles
import '@pulzr/ui/tokens.css';
```

```tsx
import { DeviceImage, PortsDiagram, RadioIcon, StatusDot } from '@pulzr/ui';

<StatusDot tone="ok" live>Online</StatusDot>
<RadioIcon radio="lorawan" />
<DeviceImage hardware={hardware} size="lg" />
<PortsDiagram hardware={hardware} ports={ports} active={{ lora: true, lte: true }} />
```

With Vite, keep it out of dependency pre-bundling so its CSS modules and
images go through the normal pipeline:

```ts
// vite.config.ts
optimizeDeps: { exclude: ['@pulzr/ui'] },
```

## Develop

```sh
npm ci
npm run check
```

`check` type-checks the components and confirms the dark tokens are written
the same under the media query and under `html.dark`.

## License

MIT. Maintained by [Pulzar LLC](https://pulzr.net).
