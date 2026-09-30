import React, { useRef, useState, type CSSProperties } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  tilt?: boolean;
}

export default function SpotlightCard({
  children,
  className = '',
  glowColor = 'rgba(245, 245, 242, 0.06)',
  tilt = false,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [angle, setAngle] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (tilt) setAngle({ x: (0.5 - (e.clientY - rect.top) / rect.height) * 3, y: ((e.clientX - rect.left) / rect.width - 0.5) * 3 });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => { setOpacity(0); setAngle({ x: 0, y: 0 }); }}
      style={{ '--tilt-x': `${angle.x}deg`, '--tilt-y': `${angle.y}deg` } as CSSProperties}
      className={`relative overflow-hidden bg-void-900/70 border border-white/[0.1] transition-colors duration-300 hover:border-white/[0.22] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(480px circle at ${pos.x}px ${pos.y}px, ${glowColor}, transparent 50%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
