"use client";

export default function SoundWaves({ className }: { className?: string }) {
  return (
    <div className={`sound-waves ${className || ""}`} aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <div key={i} className="sound-wave-ring" />
      ))}
    </div>
  );
}
