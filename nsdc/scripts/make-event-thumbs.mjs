/* Generates the small thumbnails used by the Gatherings plates in the scene
   document from the committee's real event photography. Run once (or whenever
   a source photo changes): node scripts/make-event-thumbs.mjs */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'public', 'landing-pages', 'secret-pathways-assets', 'events');

const SOURCES = [
  ['hackops',       'public/events/hackops.webp'],
  ['technograd',    'public/events/technograd.webp'],
  ['synergy',       'public/globe/previous/synergy.jpg'],
  ['design-dojo',   'public/globe/previous/design-dojo.jpg'],
  ['inauguration',  'public/globe/previous/inauguration.jpg'],
];

fs.mkdirSync(OUT, { recursive: true });
for (const [name, rel] of SOURCES) {
  const src = path.join(ROOT, rel);
  const dst = path.join(OUT, `event-${name}.webp`);
  await sharp(src)
    .resize(320, 240, { fit: 'cover', position: 'attention' })
    .webp({ quality: 78 })
    .toFile(dst);
  const kb = (fs.statSync(dst).size / 1024).toFixed(0);
  console.log(`${path.basename(dst)}  ${kb} KB`);
}
console.log('thumbs ->', path.relative(ROOT, OUT));
