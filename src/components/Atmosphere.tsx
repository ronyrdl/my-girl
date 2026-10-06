export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="grain pointer-events-none fixed inset-[-150%] z-50 h-[400%] w-[400%] opacity-[0.05] mix-blend-overlay grain-shift"
    />
  );
}

export function AmbientGlow({
  className = "",
  color = "rgba(201,168,124,0.16)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 top-1/2 h-[130vmax] w-[130vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[110px] ${className}`}
      style={{ background: `radial-gradient(circle, ${color} 0%, transparent 62%)` }}
    />
  );
}
