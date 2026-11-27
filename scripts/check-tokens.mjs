// The dark tokens are written twice, under the media query and under
// html.dark, for consoles that set the class themselves. They must agree.
import { readFileSync } from 'node:fs';

const css = readFileSync(new URL('../src/tokens.css', import.meta.url), 'utf8');
const block = (start) => {
  const at = css.indexOf(start);
  if (at < 0) throw new Error(`tokens.css: no ${start}`);
  let depth = 0;
  for (let i = css.indexOf('{', at); i < css.length; i++) {
    if (css[i] === '{') depth++;
    if (css[i] === '}' && --depth === 0) return css.slice(at, i);
  }
  throw new Error(`tokens.css: ${start} is not closed`);
};
const vars = (text) => Object.fromEntries([...text.matchAll(/(--[a-z0-9-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const media = vars(block('@media (prefers-color-scheme: dark)'));
const cls = vars(block('\nhtml.dark {'));
const light = vars(block('\n:root {'));
const problems = [];
for (const k of new Set([...Object.keys(media), ...Object.keys(cls)])) {
  if (media[k] !== cls[k]) problems.push(`${k}: ${media[k]} under the media query, ${cls[k]} under html.dark`);
  if (!(k in light)) problems.push(`${k} is dark only; give it a light value`);
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`tokens: ${Object.keys(light).length} light, ${Object.keys(media).length} dark, in step`);
