import { useEffect, useRef, useState } from 'react';

interface HubNode {
  name: string;
  country: string;
  lat: number;
  lon: number;
  color: string;
  members: string;
}

const HUBS: HubNode[] = [
  { name: 'Columbia University / NEBDHub', country: 'New York', lat: 40.8, lon: -73.9, color: '#2CA6FF', members: '1,120 students' },
  { name: 'UCLA & West Coast Chapters', country: 'California', lat: 34.05, lon: -118.24, color: '#4DE3D0', members: '410 students' },
  { name: 'Indian Institutes & Chapters', country: 'India', lat: 19.07, lon: 72.87, color: '#FF7A1A', members: '540 students' },
  { name: 'London & Munich Chapters', country: 'Europe', lat: 51.5, lon: -0.12, color: '#7443FF', members: '210 students' },
  { name: 'Accra & Lagos Chapters', country: 'West Africa', lat: 6.52, lon: 3.37, color: '#FFC247', members: '185 students' },
  { name: 'Melbourne & Sydney', country: 'Australia', lat: -37.81, lon: 144.96, color: '#FF4FA3', members: '95 students' },
];

export default function InteractiveGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeHub, setActiveHub] = useState<HubNode>(HUBS[0]);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const rotY = useRef(0.6);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const dots: { lat: number; lon: number }[] = [];
    for (let lat = -80; lat <= 80; lat += 10) {
      const count = Math.max(6, Math.round(Math.cos((lat * Math.PI) / 180) * 36));
      for (let i = 0; i < count; i++) {
        dots.push({ lat, lon: (i / count) * 360 - 180 });
      }
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width * dpr;
      height = rect.height * dpr;
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const project = (lat: number, lon: number, radius: number, cx: number, cy: number, ry: number) => {
      const phi = ((90 - lat) * Math.PI) / 180;
      const theta = ((lon + ry * (180 / Math.PI)) * Math.PI) / 180;
      const x = radius * Math.sin(phi) * Math.sin(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.cos(theta);
      return { x: cx + x, y: cy - y, z, visible: z > -radius * 0.15 };
    };

    let t = 0;
    const render = () => {
      t += 0.014;
      if (!isDragging.current) {
        rotY.current += 0.0035;
      }

      ctx.clearRect(0, 0, width, height);
      const cx = width * 0.5;
      const cy = height * 0.52;
      const radius = Math.min(width, height) * 0.38;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();

      for (const d of dots) {
        const p = project(d.lat, d.lon, radius, cx, cy, rotY.current);
        if (p.z > 0) {
          const alpha = 0.1 + (p.z / radius) * 0.3;
          ctx.fillStyle = `rgba(164, 164, 184, ${alpha.toFixed(2)})`;
          ctx.fillRect(p.x, p.y, 1.4 * dpr, 1.4 * dpr);
        }
      }

      const hq = project(HUBS[0].lat, HUBS[0].lon, radius, cx, cy, rotY.current);
      for (let i = 1; i < HUBS.length; i++) {
        const target = project(HUBS[i].lat, HUBS[i].lon, radius, cx, cy, rotY.current);
        if (hq.visible || target.visible) {
          const midX = (hq.x + target.x) / 2;
          const midY = (hq.y + target.y) / 2 - radius * 0.3;

          ctx.beginPath();
          ctx.moveTo(hq.x, hq.y);
          ctx.quadraticCurveTo(midX, midY, target.x, target.y);
          ctx.strokeStyle = 'rgba(245, 245, 242, 0.18)';
          ctx.lineWidth = 1 * dpr;
          ctx.stroke();

          const pTime = (t * 0.4 + i * 0.21) % 1;
          const inv = 1 - pTime;
          const px = inv * inv * hq.x + 2 * inv * pTime * midX + pTime * pTime * target.x;
          const py = inv * inv * hq.y + 2 * inv * pTime * midY + pTime * pTime * target.y;

          ctx.beginPath();
          ctx.arc(px, py, 2 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = HUBS[i].color;
          ctx.fill();
        }
      }

      for (const hub of HUBS) {
        const p = project(hub.lat, hub.lon, radius, cx, cy, rotY.current);
        if (p.z > -radius * 0.1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = hub.color;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col justify-between h-full">
      <div
        className="relative h-72 sm:h-80 w-full bg-void-950 border-b border-white/[0.1] cursor-grab active:cursor-grabbing"
        onMouseDown={(e) => {
          isDragging.current = true;
          lastX.current = e.clientX;
        }}
        onMouseMove={(e) => {
          if (!isDragging.current) return;
          const dx = e.clientX - lastX.current;
          lastX.current = e.clientX;
          rotY.current += dx * 0.008;
        }}
        onMouseUp={() => {
          isDragging.current = false;
        }}
        onMouseLeave={() => {
          isDragging.current = false;
        }}
      >
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
          <span className="font-mono text-[11px] text-mist">
            Fig 1.2 — Chapter distribution
          </span>
          <div className="flex flex-wrap gap-1 pointer-events-auto">
            {HUBS.slice(0, 4).map((h) => (
              <button
                key={h.name}
                type="button"
                onClick={() => {
                  setActiveHub(h);
                  rotY.current = (-h.lon * Math.PI) / 180;
                }}
                className={`px-2 py-1 text-xs transition-colors ${
                  activeHub.name === h.name
                    ? 'bg-photon text-void-950 font-medium'
                    : 'text-mist hover:text-photon bg-void-900/80'
                }`}
              >
                {h.country}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-medium text-photon">{activeHub.name}</h3>
          <p className="text-sm text-mist mt-0.5">
            Drag the globe to rotate across 355+ universities and 20 countries connected to the Northeast Big Data Hub.
          </p>
        </div>
        <span className="font-mono text-xs text-ion shrink-0">
          {activeHub.members}
        </span>
      </div>
    </div>
  );
}
