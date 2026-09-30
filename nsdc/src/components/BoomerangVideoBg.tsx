import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  className?: string;
};

/** Quiet moving texture beneath the signal mesh. The gradient is the offline fallback. */
export default function BoomerangVideoBg({ src, className = '' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = true;
    const sync = () => {
      if (motion.matches || document.hidden || !inView) video.pause();
      else video.play().catch(() => undefined);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    observer.observe(video);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      video.pause();
      observer.disconnect();
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [src]);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-void-950 ${className}`} aria-hidden="true">
      <div className="hero-atmosphere absolute inset-0" />
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="hero-video absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-video-vignette absolute inset-0" />
    </div>
  );
}
