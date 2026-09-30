import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'vite';

test('cluster observations stay spread around their homes instead of collapsing into centroids', async () => {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
  try {
    const { stepClusterPoint } = await vite.ssrLoadModule('/src/components/playgroundPhysics.ts');
    const point = { x: 0.13, y: 0.2, homeX: 0.13, homeY: 0.2, vx: 0, vy: 0 };
    const centroid = { x: 0.55, y: 0.62 };
    for (let frame = 0; frame < 600; frame++) stepClusterPoint(point, centroid);
    assert.ok(point.x < 0.3, `point collapsed toward centroid at x=${point.x}`);
    assert.ok(point.y < 0.35, `point collapsed toward centroid at y=${point.y}`);
  } finally {
    await vite.close();
  }
});
