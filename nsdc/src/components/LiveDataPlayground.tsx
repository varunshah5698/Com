import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { stepClusterPoint, type ClusterPoint } from './playgroundPhysics';

type Mode = 'clusters' | 'regression' | 'network';

interface Point extends ClusterPoint {
  cluster: number;
}

const COLORS = ['#2CA6FF', '#7443FF', '#4DE3D0', '#FF7A1A'];

export default function LiveDataPlayground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<Mode>('clusters');
  const [nodeCount, setNodeCount] = useState(64);
  const [resetTick, setResetTick] = useState(0);
  const pointsRef = useRef<Point[]>([]);
  const regressionRef = useRef<{ x: number; y: number }[]>([]);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const centroidsRef = useRef<{ x: number; y: number; color: string }[]>([
    { x: 0.26, y: 0.36, color: COLORS[0] },
    { x: 0.72, y: 0.32, color: COLORS[1] },
    { x: 0.34, y: 0.72, color: COLORS[2] },
    { x: 0.74, y: 0.68, color: COLORS[3] },
  ]);

  const seedPoints = () => {
    const pts: Point[] = [];
    for (let i = 0; i < 64; i++) {
      const cIdx = i % 4;
      const c = centroidsRef.current[cIdx];
      const x = c.x + (Math.random() - 0.5) * 0.26;
      const y = c.y + (Math.random() - 0.5) * 0.26;
      pts.push({
        x,
        y,
        homeX: x,
        homeY: y,
        vx: (Math.random() - 0.5) * 0.0012,
        vy: (Math.random() - 0.5) * 0.0012,
        cluster: cIdx,
      });
    }
    pointsRef.current = pts;
    regressionRef.current = Array.from({ length: 32 }, (_, i) => {
      const x = 0.08 + (i / 31) * 0.84;
      return { x, y: Math.min(0.9, Math.max(0.1, 0.79 - x * 0.58 + (Math.random() - 0.5) * 0.26)) };
    });
    setNodeCount(pts.length);
    setResetTick(tick => tick + 1);
  };

  useEffect(() => {
    seedPoints();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let t = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width * dpr;
      h = rect.height * dpr;
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduceMotion) draw(); });
    ro.observe(canvas);

    const draw = () => {
      if (!reduceMotion) t += 0.016;
      ctx.clearRect(0, 0, w, h);

      // Subtle archival grid
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth = 1;
      const step = 44 * dpr;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (mode === 'clusters') {
        const centroids = centroidsRef.current;
        if (!reduceMotion) centroids.forEach((c, idx) => {
          c.x += Math.cos(t * 0.5 + idx * 1.7) * 0.0004;
          c.y += Math.sin(t * 0.5 + idx * 1.7) * 0.0004;
        });

        for (const p of pointsRef.current) {
          let bestDist = Infinity;
          let bestIdx = 0;
          centroids.forEach((c, idx) => {
            const dx = c.x - p.x;
            const dy = c.y - p.y;
            const d = dx * dx + dy * dy;
            if (d < bestDist) {
              bestDist = d;
              bestIdx = idx;
            }
          });
          p.cluster = bestIdx;
          const target = centroids[bestIdx];
          if (!reduceMotion) stepClusterPoint(p, target);

          const px = p.x * w;
          const py = p.y * h;
          const cx = target.x * w;
          const cy = target.y * h;

          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(cx, cy);
          ctx.strokeStyle = target.color + '24';
          ctx.lineWidth = 1 * dpr;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(px, py, 2.8 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = target.color;
          ctx.fill();
        }

        centroids.forEach((c) => {
          const cx = c.x * w;
          const cy = c.y * h;
          ctx.beginPath();
          ctx.arc(cx, cy, 8 * dpr, 0, Math.PI * 2);
          ctx.strokeStyle = c.color;
          ctx.lineWidth = 1.2 * dpr;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(cx, cy, 3 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = '#F5F5F2';
          ctx.fill();
        });
      } else if (mode === 'regression') {
        const pts = regressionRef.current;
        const count = pts.length || 1;
        const meanX = pts.reduce((sum, p) => sum + p.x, 0) / count;
        const meanY = pts.reduce((sum, p) => sum + p.y, 0) / count;
        const variance = pts.reduce((sum, p) => sum + (p.x - meanX) ** 2, 0);
        const slope = variance ? pts.reduce((sum, p) => sum + (p.x - meanX) * (p.y - meanY), 0) / variance : 0;
        const intercept = meanY - slope * meanX;
        ctx.beginPath();
        ctx.moveTo(0, intercept * h);
        ctx.lineTo(w, (intercept + slope) * h);
        ctx.strokeStyle = 'rgba(77,227,208,.13)';
        ctx.lineWidth = 22 * dpr;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, intercept * h);
        ctx.lineTo(w, (intercept + slope) * h);
        ctx.strokeStyle = '#4DE3D0';
        ctx.lineWidth = 2 * dpr;
        ctx.stroke();
        pts.forEach((p, i) => {
          const px = p.x * w;
          const py = p.y * h;
          const targetY = (intercept + slope * p.x) * h;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, targetY);
          ctx.strokeStyle = 'rgba(77,227,208,.22)'; ctx.lineWidth = dpr; ctx.stroke();
          ctx.beginPath(); ctx.arc(px, py, 3.4 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = i >= 32 ? '#FF7A1A' : '#2CA6FF'; ctx.fill();
        });
      } else {
        const pts = pointsRef.current;
        const cursor = pointerRef.current;
        const positions = pts.map((p, i) => {
          const drift = reduceMotion ? 0 : 0.012;
          let x = p.homeX + Math.sin(t * 0.75 + i * 2.4) * drift;
          let y = p.homeY + Math.cos(t * 0.62 + i * 1.7) * drift;
          if (cursor) {
            const dx = x - cursor.x; const dy = y - cursor.y;
            const distance = Math.hypot(dx, dy);
            if (distance > 0.001 && distance < 0.2) {
              const push = (0.2 - distance) * 0.27 / distance;
              x += dx * push; y += dy * push;
            }
          }
          return { x, y, cluster: p.cluster };
        });
        positions.forEach((a, i) => positions.slice(i + 1).forEach(b => {
          const distance = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
          const reach = 112 * dpr;
          if (distance > reach) return;
          ctx.beginPath(); ctx.moveTo(a.x * w, a.y * h); ctx.lineTo(b.x * w, b.y * h);
          ctx.strokeStyle = `rgba(133,112,255,${(1 - distance / reach) * 0.32})`;
          ctx.lineWidth = dpr; ctx.stroke();
        }));
        positions.forEach(p => {
          ctx.beginPath(); ctx.arc(p.x * w, p.y * h, 2.8 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = COLORS[p.cluster]; ctx.fill();
        });
        if (cursor) {
          ctx.beginPath(); ctx.arc(cursor.x * w, cursor.y * h, 24 * dpr, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(77,227,208,.45)'; ctx.lineWidth = dpr; ctx.stroke();
        }
      }

      if (!reduceMotion) raf = requestAnimationFrame(draw);
    };

    if (reduceMotion) draw();
    else raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [mode, nodeCount, resetTick]);

  const addPoints = (nx: number, ny: number) => {
    if (mode === 'regression') {
      for (let i = 0; i < 5; i++) regressionRef.current.push({ x: Math.min(0.96, Math.max(0.04, nx + (Math.random() - 0.5) * 0.04)), y: Math.min(0.96, Math.max(0.04, ny + (Math.random() - 0.5) * 0.04)) });
      setNodeCount(regressionRef.current.length);
      return;
    }
    for (let i = 0; i < 5; i++) {
      pointsRef.current.push({
        x: nx + (Math.random() - 0.5) * 0.04,
        y: ny + (Math.random() - 0.5) * 0.04,
        homeX: nx,
        homeY: ny,
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        cluster: i % 4,
      });
    }
    setNodeCount(pointsRef.current.length);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    addPoints((e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height);
  };

  const selectMode = (nextMode: Mode) => {
    setMode(nextMode);
    setNodeCount(nextMode === 'regression' ? regressionRef.current.length : pointsRef.current.length);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="playground-canvas relative h-72 sm:h-80 w-full bg-void-950 border-b border-white/[0.1] overflow-hidden cursor-crosshair">
        <canvas ref={canvasRef} onClick={handleCanvasClick} onPointerMove={e => { const rect = e.currentTarget.getBoundingClientRect(); pointerRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height }; }} onPointerLeave={() => { pointerRef.current = null; }} className="w-full h-full" role="img" aria-label="Interactive data visualization; click to add observations" />

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="playground-figure font-mono text-[11px] text-mist">
            Fig 1.1 — {nodeCount} observations
          </span>
          <div className="playground-toolbar flex items-center gap-1 pointer-events-auto">
            {(
              [
                ['clusters', 'Clustering'],
                ['regression', 'Trend line'],
                ['network', 'Network'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => selectMode(id)}
                aria-pressed={mode === id}
                className={`px-2.5 py-1 text-xs transition-colors ${
                  mode === id
                    ? 'bg-photon text-void-950 font-medium'
                    : 'text-mist hover:text-photon bg-void-900/80'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => addPoints(0.5, 0.5)}
              aria-label="Add observations"
              className="lab-add-button px-2.5 py-1 text-xs text-ion bg-void-900/80 disabled:opacity-40"
            >+5</button>
            <button
              type="button"
              onClick={() => { setMode('clusters'); seedPoints(); }}
              aria-label="Reset simulation"
              title="Reset simulation"
              className="p-1.5 text-mist hover:text-photon bg-void-900/80 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="playground-caption p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium text-photon">{mode === 'clusters' ? 'Find the clusters' : mode === 'regression' ? 'Move the trend' : 'Connect the dots'}</h3>
          <p className="text-sm text-mist mt-0.5">
            {mode === 'clusters' ? 'Add observations and watch them find their nearest group.' : mode === 'regression' ? 'Add an outlier to see how new evidence changes the best-fit line.' : 'Move your pointer to disturb the network. Add points to make new connections.'}
          </p>
        </div>
        <span className="font-mono text-xs text-dim shrink-0">LIVE DEMO / 001</span>
      </div>
    </div>
  );
}
