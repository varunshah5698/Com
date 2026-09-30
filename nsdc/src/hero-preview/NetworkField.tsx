import { useEffect, useRef } from 'react';

type Node = { x: number; y: number; z: number; size: number };
type Point = { x: number; y: number; depth: number };
type PhotoFragment = { src: string; x: number; y: number; z: number; orbit: number; scale: number };

export const PHOTO_FRAGMENTS: PhotoFragment[] = [
  { src: '/events/hackops.webp', x: -0.72, y: -0.42, z: 0.55, orbit: 0.66, scale: 1.06 },
  { src: '/events/technograd.webp', x: 0.55, y: -0.65, z: 0.52, orbit: 0.66, scale: 0.92 },
  { src: '/globe/technograd-audience.jpg', x: -0.28, y: 0.12, z: 0.95, orbit: 0.61, scale: 1.08 },
  { src: '/globe/technograd-runnerup.jpg', x: 0.55, y: 0.10, z: 0.82, orbit: 0.69, scale: 0.91 },
  { src: '/globe/technograd-winners.jpg', x: -0.55, y: 0.55, z: -0.63, orbit: 0.67, scale: 1.02 },
  { src: '/globe/seminar-audience.jpg', x: 0.15, y: 0.75, z: -0.64, orbit: 0.66, scale: 0.91 },
  { src: '/globe/seminar-session.jpg', x: 0.72, y: 0.35, z: -0.60, orbit: 0.68, scale: 0.88 },
  { src: '/globe/previous/inauguration.jpg', x: 0.20, y: -0.52, z: -0.83, orbit: 0.67, scale: 1.06 },
  { src: '/globe/previous/design-dojo.jpg', x: -0.72, y: 0.10, z: -0.67, orbit: 0.68, scale: 1.00 },
  { src: '/globe/previous/technograd.jpg', x: 0.78, y: -0.15, z: -0.60, orbit: 0.68, scale: 0.91 },
  { src: '/globe/college/college-campus.png', x: -0.12, y: -0.77, z: 0.62, orbit: 0.66, scale: 0.94 },
  { src: '/globe/college/college-conference-hall.png', x: 0.68, y: 0.68, z: 0.30, orbit: 0.67, scale: 0.91 },
  { src: '/globe/college/college-library.png', x: -0.72, y: 0.63, z: 0.30, orbit: 0.67, scale: 0.90 },
];

const COUNT = 136;
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const nodes: Node[] = Array.from({ length: COUNT }, (_, index) => {
  const y = 1 - index / (COUNT - 1) * 2;
  const radius = Math.sqrt(1 - y * y);
  const angle = GOLDEN_ANGLE * index;
  return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius, size: index % 19 === 0 ? 2.2 : 1.2 };
});

const edges: [number, number][] = [];
for (let i = 0; i < COUNT; i += 1) {
  for (let j = i + 1; j < COUNT; j += 1) {
    const a = nodes[i];
    const b = nodes[j];
    if (Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < 0.39) edges.push([i, j]);
  }
}

export default function NetworkField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let burstFrame = -1000;
    let raf = 0;
    let visible = true;
    let photos: HTMLImageElement[] = [];

    const roundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
      const safeRadius = Math.min(radius, width / 2, height / 2);
      context.beginPath();
      context.moveTo(x + safeRadius, y);
      context.arcTo(x + width, y, x + width, y + height, safeRadius);
      context.arcTo(x + width, y + height, x, y + height, safeRadius);
      context.arcTo(x, y + height, x, y, safeRadius);
      context.arcTo(x, y, x + width, y, safeRadius);
      context.closePath();
    };

    const draw = () => {
      if (!width || !height) return;
      context.clearRect(0, 0, width, height);
      const compact = width < 760;
      const centerX = width * 0.5;
      const centerY = height * (compact ? 0.47 : 0.48);
      const baseRadius = Math.min(width * (compact ? 0.43 : 0.32), height * (compact ? 0.31 : 0.34), compact ? 260 : 370);
      const radius = baseRadius * (1 + (motion.matches ? 0 : Math.sin(frame * 0.018) * 0.012));
      const rotation = 0.52 + (motion.matches ? 0 : frame * 0.0031) + pointer.x * 0.36;
      const tilt = -0.22 + pointer.y * 0.18;
      const cos = Math.cos(rotation);
      const sin = Math.sin(rotation);
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      const projected: Point[] = nodes.map(node => {
        const x = node.x * cos - node.z * sin;
        const z = node.x * sin + node.z * cos;
        const y = node.y * cosTilt - z * sinTilt;
        const depth = node.y * sinTilt + z * cosTilt;
        const perspective = 2.8 / (2.8 - depth * 0.35);
        return { x: centerX + x * radius * perspective, y: centerY + y * radius * perspective, depth };
      });

      const halo = context.createRadialGradient(centerX, centerY, radius * 0.04, centerX, centerY, radius * 1.32);
      halo.addColorStop(0, 'rgba(76, 62, 200, 0.2)');
      halo.addColorStop(0.56, 'rgba(63, 61, 163, 0.11)');
      halo.addColorStop(1, 'rgba(4, 5, 13, 0)');
      context.fillStyle = halo;
      context.beginPath();
      context.arc(centerX, centerY, radius * 1.32, 0, Math.PI * 2);
      context.fill();

      context.save();
      context.beginPath();
      context.arc(centerX, centerY, radius * 0.965, 0, Math.PI * 2);
      context.clip();

      PHOTO_FRAGMENTS.forEach((fragment, index) => {
        const image = photos[index];
        if (!image.complete || !image.naturalWidth) return;
        const xRotated = fragment.x * cos - fragment.z * sin;
        const zRotated = fragment.x * sin + fragment.z * cos;
        const yRotated = fragment.y * cosTilt - zRotated * sinTilt;
        const depth = fragment.y * sinTilt + zRotated * cosTilt;
        if (depth < -0.24) return;

        const perspective = 2.8 / (2.8 - depth * 0.35);
        const x = centerX + xRotated * radius * perspective * fragment.orbit;
        const y = centerY + yRotated * radius * perspective * fragment.orbit;
        const front = Math.max(0, Math.min(1, (depth + 0.24) / 1.24));
        const width = radius * 0.43 * fragment.scale * (0.74 + front * 0.30);
        const height = width * 0.67;
        const corner = width * 0.12;

        context.save();
        context.globalAlpha = 0.24 + front * 0.68;
        roundedRect(x - width / 2, y - height / 2, width, height, corner);
        context.clip();
        const sourceRatio = image.naturalWidth / image.naturalHeight;
        const targetRatio = width / height;
        let sourceWidth = image.naturalWidth;
        let sourceHeight = image.naturalHeight;
        let sourceX = 0;
        let sourceY = 0;
        if (sourceRatio > targetRatio) {
          sourceWidth = image.naturalHeight * targetRatio;
          sourceX = (image.naturalWidth - sourceWidth) / 2;
        } else {
          sourceHeight = image.naturalWidth / targetRatio;
          sourceY = (image.naturalHeight - sourceHeight) / 2;
        }
        context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x - width / 2, y - height / 2, width, height);
        const curvature = context.createRadialGradient(x - width * 0.18, y - height * 0.18, width * 0.04, x, y, width * 0.68);
        curvature.addColorStop(0, `rgba(38, 46, 126, ${0.05 + (1 - front) * 0.08})`);
        curvature.addColorStop(0.72, `rgba(25, 27, 84, ${0.10 + (1 - front) * 0.10})`);
        curvature.addColorStop(1, `rgba(5, 7, 24, ${0.34 - front * 0.12})`);
        context.fillStyle = curvature;
        context.fillRect(x - width / 2, y - height / 2, width, height);
        context.restore();

        context.save();
        context.globalAlpha = 0.12 + front * 0.34;
        context.strokeStyle = 'rgba(190, 205, 255, 0.58)';
        context.lineWidth = 0.8;
        roundedRect(x - width / 2, y - height / 2, width, height, corner);
        context.stroke();
        context.restore();
      });
      context.restore();

      const burstAge = frame - burstFrame;
      for (let index = 0; index < edges.length; index += 1) {
        const [a, b] = edges[index];
        const first = projected[a];
        const second = projected[b];
        const front = (first.depth + second.depth + 2) / 4;
        const signal = motion.matches ? 0 : Math.max(0, Math.sin(frame * 0.033 - index * 0.41)) ** 12;
        context.strokeStyle = `rgba(150, 160, 255, ${0.09 + front * 0.34 + signal * front * 0.27})`;
        context.lineWidth = signal > 0.6 ? 1.4 : front > 0.5 ? 0.95 : 0.7;
        context.beginPath();
        context.moveTo(first.x, first.y);
        context.lineTo(second.x, second.y);
        context.stroke();

        if (!motion.matches && index % 11 === 0 && front > 0.38) {
          const progress = (frame * 0.009 + index * 0.137) % 1;
          const x = first.x + (second.x - first.x) * progress;
          const y = first.y + (second.y - first.y) * progress;
          context.fillStyle = `rgba(160, 226, 255, ${front * 0.62})`;
          context.beginPath();
          context.arc(x, y, 1.6, 0, Math.PI * 2);
          context.fill();
        }
      }

      projected.forEach((point, index) => {
        const front = (point.depth + 1) / 2;
        const wave = motion.matches ? 0 : (Math.sin(frame * 0.035 + nodes[index].y * 6 + nodes[index].x * 4) + 1) / 2;
        const distanceFromCenter = Math.hypot(point.x - centerX, point.y - centerY) / radius;
        const burst = burstAge < 50 && Math.abs(distanceFromCenter - burstAge / 45) < 0.14 ? 0.8 : 0;
        const light = Math.min(1, 0.26 + front * 0.52 + wave * 0.21 + burst);
        const size = nodes[index].size * (0.8 + front * 0.9 + burst * 0.55);
        if ((index % 19 === 0 || burst > 0) && front > 0.38) {
          context.fillStyle = `rgba(117, 162, 255, ${0.07 + burst * 0.15})`;
          context.beginPath();
          context.arc(point.x, point.y, size * 6, 0, Math.PI * 2);
          context.fill();
        }
        context.fillStyle = `rgba(209, 229, 255, ${light})`;
        context.beginPath();
        context.arc(point.x, point.y, size, 0, Math.PI * 2);
        context.fill();
      });

      if (burstAge >= 0 && burstAge < 50 && !motion.matches) {
        context.strokeStyle = `rgba(151, 191, 255, ${(1 - burstAge / 50) * 0.24})`;
        context.lineWidth = 1;
        context.beginPath();
        context.arc(centerX, centerY, radius * burstAge / 45, 0, Math.PI * 2);
        context.stroke();
      }
    };

    photos = PHOTO_FRAGMENTS.map(fragment => {
      const image = new Image();
      image.decoding = 'async';
      image.src = fragment.src;
      image.addEventListener('load', draw, { once: true });
      return image;
    });

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const tick = () => {
      if (visible && !motion.matches) {
        pointer.x += (pointer.targetX - pointer.x) * 0.045;
        pointer.y += (pointer.targetY - pointer.y) * 0.045;
        frame += 1;
        draw();
      }
      raf = window.requestAnimationFrame(tick);
    };
    const onPointer = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    const onPointerDown = (event: PointerEvent) => {
      const compact = width < 760;
      const centerY = height * (compact ? 0.47 : 0.48);
      const radius = Math.min(width * (compact ? 0.43 : 0.32), height * (compact ? 0.31 : 0.34), compact ? 260 : 370);
      if (Math.hypot(event.clientX - width * 0.5, event.clientY - centerY) < radius) burstFrame = frame;
    };
    const onVisibility = () => { visible = !document.hidden; };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    window.addEventListener('pointermove', onPointer, { passive: true });
    window.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('visibilitychange', onVisibility);
    motion.addEventListener('change', draw);
    resize();
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('visibilitychange', onVisibility);
      motion.removeEventListener('change', draw);
    };
  }, []);

  return <canvas ref={canvasRef} className="hp-network" aria-label="Animated network of connected points" role="img" />;
}
