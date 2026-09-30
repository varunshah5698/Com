import { useEffect, useRef } from 'react';

type Props = { className?: string; density?: 'low' | 'medium' };
type Point = { x: number; y: number; vx: number; vy: number; r: number; color: string };

const COLORS = ['44,166,255', '116,67,255', '77,227,208'];

export default function SignalMeshBackground({ className = '', density = 'medium' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = motion.matches;
    let visible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let lastDraw = 0;
    let tick = 0;
    const pointer = { x: 0.62, y: 0.48 };
    let points: Point[] = [];

    const makePoints = () => {
      const count = density === 'low' || width < 640 ? 22 : 38;
      points = Array.from({ length: count }, (_, i) => ({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.00012,
        vy: (Math.random() - 0.5) * 0.00012,
        r: i % 7 === 0 ? 2 : 1.1,
        color: COLORS[i % COLORS.length],
      }));
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      makePoints();
      draw(0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const driftX = (pointer.x - 0.5) * 7;
      const driftY = (pointer.y - 0.5) * 7;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (!reduced && time > 0) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0.03 || p.x > 0.97) p.vx *= -1;
          if (p.y < 0.04 || p.y > 0.96) p.vy *= -1;
        }
        const x = p.x * width + driftX;
        const y = p.y * height + driftY;
        for (let j = i + 1; j < points.length; j++) {
          const q = points[j];
          const qx = q.x * width + driftX;
          const qy = q.y * height + driftY;
          const distance = Math.hypot(qx - x, qy - y);
          if (distance > 156) continue;
          const alpha = (1 - distance / 156) * 0.14;
          ctx.strokeStyle = `rgba(125,152,215,${alpha})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(qx, qy);
          ctx.stroke();
        }
        const pulse = i % 9 === 0 && !reduced ? Math.max(0, Math.sin(tick * 0.026 + i)) : 0;
        ctx.fillStyle = `rgba(${p.color},${0.32 + pulse * 0.32})`;
        ctx.beginPath();
        ctx.arc(x, y, p.r + pulse * 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const animate = (time: number) => {
      if (time - lastDraw >= 1000 / 24) {
        lastDraw = time;
        tick++;
        draw(time);
      }
      frame = requestAnimationFrame(animate);
    };
    const syncAnimation = () => {
      cancelAnimationFrame(frame);
      if (!reduced && visible && !document.hidden) frame = requestAnimationFrame(animate);
      else draw(0);
    };
    const onMotion = () => { reduced = motion.matches; syncAnimation(); };
    const onMove = (event: PointerEvent) => {
      if (reduced || event.pointerType === 'touch') return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; syncAnimation(); });
    const resizer = new ResizeObserver(resize);
    observer.observe(canvas);
    resizer.observe(canvas);
    motion.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', syncAnimation);
    window.addEventListener('pointermove', onMove, { passive: true });
    resize();
    syncAnimation();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizer.disconnect();
      motion.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', syncAnimation);
      window.removeEventListener('pointermove', onMove);
    };
  }, [density]);

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />;
}
