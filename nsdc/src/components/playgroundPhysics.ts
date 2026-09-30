export interface ClusterPoint {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
}

export function stepClusterPoint(point: ClusterPoint, centroid: { x: number; y: number }) {
  const targetX = point.homeX * 0.8 + centroid.x * 0.2;
  const targetY = point.homeY * 0.8 + centroid.y * 0.2;
  point.vx += (targetX - point.x) * 0.003;
  point.vy += (targetY - point.y) * 0.003;
  point.vx *= 0.9;
  point.vy *= 0.9;
  point.x += point.vx;
  point.y += point.vy;
}
