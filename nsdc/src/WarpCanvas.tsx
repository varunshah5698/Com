import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

/* ── Spectrum color mix from design system ── */
const SPECTRUM = [
  { c: [44, 166, 255], w: 26 },   // Ion
  { c: [255, 122, 26], w: 22 },   // Ember
  { c: [245, 245, 242], w: 20 },  // White core
  { c: [116, 67, 255], w: 12 },   // Ultraviolet
  { c: [77, 227, 208], w: 10 },   // Plasma
  { c: [255, 79, 163], w: 6 },    // Rose
  { c: [255, 194, 71], w: 4 },    // Amber
];

function pickColor(): number[] {
  let r = Math.random() * 100;
  let acc = 0;
  for (const s of SPECTRUM) {
    acc += s.w;
    if (r < acc) return s.c;
  }
  return SPECTRUM[0].c;
}

/* ── Speed states ── */
const SPEEDS = { idle: 0.12, cruise: 0.45, warp: 2 } as const;
export type SpeedState = keyof typeof SPEEDS;

interface Streak {
  ex: number;
  ey: number;
  z: number;
  v: number;
  c: number[];
  w: number;
}

export interface WarpCanvasHandle {
  setSpeed: (state: SpeedState) => void;
}

interface Props {
  count?: number;
  vx?: number;
  vy?: number;
  className?: string;
  initialSpeed?: SpeedState;
}

const WarpCanvas = forwardRef<WarpCanvasHandle, Props>(
  ({ count = 240, vx = 0.7, vy = 0.42, className = '', initialSpeed = 'idle' }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const stateRef = useRef({
      speed: SPEEDS[initialSpeed],
      target: SPEEDS[initialSpeed],
      streaks: [] as Streak[],
      w: 0,
      h: 0,
      cx: 0,
      cy: 0,
      k: 0,
      dpr: 1,
      raf: 0,
      last: 0,
      vis: true,
      paused: false,
    });

    useImperativeHandle(ref, () => ({
      setSpeed(state: SpeedState) {
        stateRef.current.target = SPEEDS[state];
      },
    }));

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const st = stateRef.current;

      /* ── Reduced motion ── */
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
      st.paused = mql.matches;

      function spawn(s: Streak, initial: boolean): Streak {
        const a = Math.random() * Math.PI * 2;
        const d = 0.04 + Math.pow(Math.random(), 0.7) * 1.6;
        s.ex = Math.cos(a) * d;
        s.ey = Math.sin(a) * d;
        s.z = initial ? 0.03 + Math.random() * 0.97 : 1;
        s.v = 0.6 + Math.random() * 0.9;
        s.c = pickColor();
        s.w = 0.6 + Math.random() * 1.4;
        return s;
      }

      function resize() {
        const rect = canvas!.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        st.dpr = dpr;
        st.w = Math.round(rect.width * dpr);
        st.h = Math.round(rect.height * dpr);
        canvas!.width = st.w;
        canvas!.height = st.h;
        const narrow = rect.width < 700;
        st.cx = st.w * (narrow ? 0.5 : vx);
        st.cy = st.h * (narrow ? Math.min(vy, 0.36) : vy);
        st.k = Math.min(st.w, st.h) * 0.1;
        const n = Math.round(count * (narrow ? 0.46 : 1));
        st.streaks = [];
        for (let i = 0; i < n; i++) {
          st.streaks.push(spawn({} as Streak, true));
        }
        draw(0);
      }

      function draw(dt: number) {
        st.speed += (st.target - st.speed) * Math.min(1, dt * 3);
        ctx!.globalCompositeOperation = 'source-over';
        ctx!.fillStyle = '#05050A';
        ctx!.fillRect(0, 0, st.w, st.h);

        const g = ctx!.createRadialGradient(st.cx, st.cy, 0, st.cx, st.cy, Math.min(st.w, st.h) * 0.5);
        g.addColorStop(0, 'rgba(90,110,255,.16)');
        g.addColorStop(1, 'rgba(5,5,10,0)');
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, st.w, st.h);

        ctx!.globalCompositeOperation = 'lighter';
        ctx!.lineCap = 'round';
        const tau = 0.12 + st.speed * 0.25;

        for (let i = 0; i < st.streaks.length; i++) {
          const s = st.streaks[i];
          if (dt > 0) s.z -= st.speed * s.v * dt;
          const x1 = st.cx + (s.ex / s.z) * st.k;
          const y1 = st.cy + (s.ey / s.z) * st.k;
          if (s.z <= 0.02 || x1 < -80 || x1 > st.w + 80 || y1 < -80 || y1 > st.h + 80) {
            spawn(s, false);
            continue;
          }
          const z2 = s.z * (1 + tau * s.v);
          const x0 = st.cx + (s.ex / z2) * st.k;
          const y0 = st.cy + (s.ey / z2) * st.k;
          const near = 1 - s.z;
          const a = Math.min(1, near * 1.7);
          if (a <= 0.02) continue;
          const lw = (0.6 + near * 2.6) * s.w * st.dpr;
          const c = s.c;

          ctx!.beginPath();
          ctx!.moveTo(x0, y0);
          ctx!.lineTo(x1, y1);
          ctx!.strokeStyle = `rgba(${c[0]},${c[1]},${c[2]},${(a * 0.13).toFixed(3)})`;
          ctx!.lineWidth = lw * 6;
          ctx!.stroke();

          const m = [
            Math.round(c[0] + (255 - c[0]) * 0.35),
            Math.round(c[1] + (255 - c[1]) * 0.35),
            Math.round(c[2] + (255 - c[2]) * 0.35),
          ];
          ctx!.strokeStyle = `rgba(${m[0]},${m[1]},${m[2]},${a.toFixed(3)})`;
          ctx!.lineWidth = lw;
          ctx!.stroke();
        }
      }

      function tick(t: number) {
        const dt = st.last ? Math.min(0.05, (t - st.last) / 1000) : 0.016;
        st.last = t;
        draw(dt);
        st.raf = requestAnimationFrame(tick);
      }

      function sync() {
        const should = !st.paused && st.vis && !document.hidden;
        if (should && !st.raf) {
          st.last = 0;
          st.raf = requestAnimationFrame(tick);
        } else if (!should && st.raf) {
          cancelAnimationFrame(st.raf);
          st.raf = 0;
        }
      }

      resize();
      sync();

      const ro = new ResizeObserver(() => resize());
      ro.observe(canvas);

      const io = new IntersectionObserver(
        (entries) => {
          st.vis = entries[0].isIntersecting;
          sync();
        },
        { threshold: 0 },
      );
      io.observe(canvas);

      const onVisChange = () => sync();
      document.addEventListener('visibilitychange', onVisChange);

      const onMotionChange = (e: MediaQueryListEvent) => {
        st.paused = e.matches;
        sync();
      };
      mql.addEventListener('change', onMotionChange);

      return () => {
        if (st.raf) cancelAnimationFrame(st.raf);
        ro.disconnect();
        io.disconnect();
        document.removeEventListener('visibilitychange', onVisChange);
        mql.removeEventListener('change', onMotionChange);
      };
    }, [count, vx, vy]);

    return (
      <canvas
        ref={canvasRef}
        className={className}
        aria-hidden="true"
      />
    );
  },
);

WarpCanvas.displayName = 'WarpCanvas';
export default WarpCanvas;
