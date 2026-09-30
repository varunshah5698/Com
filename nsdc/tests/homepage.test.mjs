import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';

let vite;
let homeMarkup;
let shellMarkup;

test.before(async () => {
  vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  const { default: HomePage } = await vite.ssrLoadModule('/src/HomePage.tsx');
  const { default: SiteNav } = await vite.ssrLoadModule('/src/components/SiteNav.tsx');
  const { SiteFooter } = await vite.ssrLoadModule('/src/JointHomepage.tsx');
  homeMarkup = renderToStaticMarkup(createElement(HomePage));
  shellMarkup = renderToStaticMarkup(createElement(MemoryRouter, null,
    createElement(SiteNav), createElement(SiteFooter)));
});

test.after(async () => {
  await vite?.close();
});

test('the shell visibly represents the unified committee with the genuine logos', () => {
  assert.match(shellMarkup, /NSDC × Informatrix/i);
  assert.match(shellMarkup, /djs-nsdc-logo\.png/);
  assert.match(shellMarkup, /infomatrix-alt\.png/);
});

test('the home route opens with the immersive scene and no authored hero', () => {
  // The Three.js scene section is the first content on the page.
  assert.match(homeMarkup, /aria-label="NSDC × INFORMATRIX immersive introduction"/);
  // The retired authored hero stays retired.
  assert.doesNotMatch(homeMarkup, /Explore data/i);
  assert.doesNotMatch(homeMarkup, /hero-kicker|hero-description/);
});

test('the retired domain explorer stays off the homepage', () => {
  assert.doesNotMatch(homeMarkup, /id="domains"|role="tablist"|domain-tab|Follow what/i);
});

test('the immersive NSDC x INFORMATRIX experience is mounted with a meaningful accessible name', () => {
  assert.match(homeMarkup, /aria-label="NSDC × INFORMATRIX immersive introduction"/);
  assert.match(homeMarkup, /title="NSDC × INFORMATRIX — Where curiosity reveals the unseen"/);
  assert.match(homeMarkup, /src="\/landing-pages\/kage\.html(\?v=\d+)?"/);
});

test('the scene offers a keyboard skip link to the site content', () => {
  assert.match(homeMarkup, /experience-skip/);
  assert.match(homeMarkup, /Skip the immersive scene/);
  assert.doesNotMatch(homeMarkup, /committee-cta|Walk the scene/);
});

test('the scene wrapper passes the NSDC ultraviolet accent through the documented primaryColor prop', () => {
  const source = readFileSync('src/components/HomeExperience.tsx', 'utf8');
  assert.match(source, /primaryColor="#7443FF"/);
});

test('the deployed scene document carries NSDC branding and no template branding in its visible markup', () => {
  const scene = readFileSync('public/landing-pages/kage.html', 'utf8');
  assert.match(scene, /NSDC × INFORMATRIX/);
  assert.doesNotMatch(scene, /<title>Kage/i);
  assert.doesNotMatch(scene, /Kyoto/);
});

test('the router covers all six routes plus a 404', () => {
  const app = readFileSync('src/App.tsx', 'utf8');
  for (const route of ['"/"', '"/about"', '"/events"', '"/projects"', '"/team"', '"/contact"', '"*"']) {
    assert.match(app, new RegExp(`path=\\{?"?${route.replace(/"/g, '"')}"?`));
  }
});
