"use client";

import { useState, useEffect } from "react";
import { useTranslate } from "@/app/lib/LanguageContext";

interface CountdownTimerProps {
  targetDate: string;
}

function useNow() {
  const [now, setNow] = useState(0);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function TimeUnit({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span className={`text-5xl md:text-6xl lg:text-8xl font-heading font-bold ${color} tabular-nums leading-none text-glow-sm`}>
        {value}
      </span>
      <span className="text-[11px] md:text-sm text-white font-heading uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { t } = useTranslate();
  const target = new Date(targetDate).getTime();
  const now = useNow();
  const isBefore = now < target;
  const diff = Math.abs(now - target);
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const color = isBefore ? "text-blue-brand" : "text-red-brand";

  return (
    <div className="flex flex-col items-center text-glow-sm mt-4 md:mt-6">
      <p className="font-heading text-white text-sm md:text-base tracking-[0.15em] uppercase mb-2 md:mb-3">
        {isBefore ? t("countdown.before") : t("countdown.after")}
      </p>
      <div className="flex items-start gap-3 md:gap-4">
        <TimeUnit value={pad(days)} label={t("countdown.days") as string} color={color} />
        <span className="text-white/30 text-3xl md:text-4xl font-heading font-bold leading-none mt-1">:</span>
        <TimeUnit value={pad(hours)} label={t("countdown.hours") as string} color={color} />
        <span className="text-white/30 text-3xl md:text-4xl font-heading font-bold leading-none mt-1">:</span>
        <TimeUnit value={pad(minutes)} label={t("countdown.minutes") as string} color={color} />
        <span className="text-white/30 text-3xl md:text-4xl font-heading font-bold leading-none mt-1">:</span>
        <TimeUnit value={pad(seconds)} label={t("countdown.seconds") as string} color={color} />
      </div>
    </div>
  );
}
