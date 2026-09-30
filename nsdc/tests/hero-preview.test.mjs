import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { createServer } from 'vite';

test('the standalone hero keeps committee navigation and a minimal explore cue', async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const { default: HeroPreview } = await vite.ssrLoadModule('/src/hero-preview/HeroPreview.tsx');
    const markup = renderToStaticMarkup(createElement(HeroPreview));

    assert.match(markup, /<nav\b/);
    assert.match(markup, /djs-nsdc-logo\.png/);
    assert.match(markup, /DJS NSDC\/InfoMatrix/);
    assert.doesNotMatch(markup, /<h1\b|infomatrix-alt\.png/);
    assert.match(markup, /aria-label="Animated network of connected points"/);
    assert.match(markup, /<button[^>]*class="hp-explore"[^>]*>Explore us/);
  } finally {
    await vite.close();
  }
});

test('the globe carries a full local gallery of NSDC events and DJ Sanghvi life', async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const { PHOTO_FRAGMENTS } = await vite.ssrLoadModule('/src/hero-preview/NetworkField.tsx');
    assert.ok(PHOTO_FRAGMENTS.length >= 12, 'the globe should contain a rich rotating photo gallery');
    assert.ok(PHOTO_FRAGMENTS.every(({ src }) => /^\/(events|globe)\//.test(src)), 'every photo must be a local approved asset');
    assert.ok(PHOTO_FRAGMENTS.some(({ src }) => src.includes('/events/')), 'previous-site NSDC event photos are included');
    assert.ok(PHOTO_FRAGMENTS.some(({ src }) => src.includes('technograd')), 'official NSDC event-report photography is included');
    assert.ok(PHOTO_FRAGMENTS.some(({ src }) => src.includes('/globe/college/')), 'official DJ Sanghvi photos are included');
    assert.ok(PHOTO_FRAGMENTS.every(({ src }) => !/report|pdf|document/i.test(src)), 'document imagery is excluded');
    assert.ok(PHOTO_FRAGMENTS.every(({ orbit = 1 }) => orbit <= 0.78), 'photos stay embedded inside the globe');
  } finally {
    await vite.close();
  }
});
