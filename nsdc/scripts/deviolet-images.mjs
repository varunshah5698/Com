/* Recolors baked-red webp assets (card stills + DOM foreground foliage) so
   every red-dominant pixel lands in the violet family. Only pixels whose red
   channel dominates (r > g and r > b) with real saturation are touched, so
   grass, stone, lantern glow neutrals and the night sky survive unchanged.
   Originals are backed up once to _original-red/ next to the script's targets. */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'landing-pages', 'secret-pathways-assets');
const BACKUP = path.join(ROOT, '_original-red');

const TARGETS = [
  'generated/kage-approach.webp',
  'generated/kage-lantern-court.webp',
  'generated/kage-moonwater.webp',
  'generated/kage-sanmon-preview.webp',
  'foreground/png/maple-leaves.webp',
  'foreground/png/sakura-branch.webp',
  'foreground/png/temple-wall.webp',
  'foreground/png/shrine-ruins.webp',
  'foreground/png/stone-lantern.webp',
  'foreground/png/hill.webp',
  'foreground/png/garden-bush.webp',
  'foreground/png/pine-tree.webp',
  'foreground/png/basalt-stones.webp',
  'foreground/png/tall-grass.webp',
];

/* red dominance → purple. d = angular distance from pure red; d=0 maps to
   284° (purple), warmer hues drift down but stay inside the violet cone. */
function shiftPixel(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  if (max === 0) return null;
  const sat = (max - min) / max;
  if (!(r > g && r > b)) return null;
  /* strongly saturated warm pixels shift outright; very pale pinks (blossom
     cores) only shift when red clearly leads both other channels, so neutral
     stone and wood grays stay untouched */
  if (sat < 0.12 && !((r - g) >= 14 && (r - b) >= 10 && r > 110)) return null;
  if (sat < 0.05) return null;

  let h;
  if (max === r) h = 60 * (((g - b) / (max - min)) % 6);
  else if (max === g) h = 60 * ((b - r) / (max - min) + 2);
  else h = 60 * ((r - g) / (max - min) + 4);
  if (h < 0) h += 360;
  const d = Math.min(h, 360 - h);            // 0 at red, ~70 at orange/yellow
  if (d > 75) return null;                    // already out of the red cone
  /* everything lands in a narrow PURPLE band (271–290°): reds come up to
     purple, magenta-pinks come DOWN to purple — nothing is allowed to sit
     blue (<270°) or pink (>300°) */
  const nh = Math.max(271, 290 - d * 0.25);                  // violet, slight spread

  const v = max / 255, s = sat;
  const c = v * s;
  const hp = nh / 60;
  const xx = c * (1 - Math.abs((hp % 2) - 1));
  let nr = 0, ng = 0, nb = 0;
  if (hp < 1) [nr, ng, nb] = [c, xx, 0];
  else if (hp < 2) [nr, ng, nb] = [xx, c, 0];
  else if (hp < 3) [nr, ng, nb] = [0, c, xx];
  else if (hp < 4) [nr, ng, nb] = [0, xx, c];
  else if (hp < 5) [nr, ng, nb] = [xx, 0, c];
  else [nr, ng, nb] = [c, 0, xx];
  const m = v - c;
  return [Math.round((nr + m) * 255), Math.round((ng + m) * 255), Math.round((nb + m) * 255)];
}

let total = 0;
for (const rel of TARGETS) {
  const file = path.join(ROOT, rel);
  if (!fs.existsSync(file)) { console.log('SKIP missing', rel); continue; }

  const backup = path.join(BACKUP, rel);
  if (!fs.existsSync(backup)) {
    fs.mkdirSync(path.dirname(backup), { recursive: true });
    fs.copyFileSync(file, backup);
  }
  /* always re-tone from the untouched original so re-runs are idempotent */
  const img = sharp(fs.readFileSync(backup)).ensureAlpha();
  const { width, height } = await img.metadata();
  const raw = await img.raw().toBuffer();

  let changed = 0;
  for (let i = 0; i < raw.length; i += 4) {
    const out = shiftPixel(raw[i], raw[i + 1], raw[i + 2]);
    if (out) {
      raw[i] = out[0]; raw[i + 1] = out[1]; raw[i + 2] = out[2];
      changed++;
    }
  }

  await sharp(raw, { raw: { width, height, channels: 4 } })
    .webp({ quality: 88, alphaQuality: 90 })
    .toFile(file);

  const pct = ((changed / (width * height)) * 100).toFixed(1);
  console.log(`${rel}: ${changed} px recolored (${pct}%)`);
  total += changed;
}
console.log(total ? `done — ${total} pixels shifted to violet` : 'no red found');
