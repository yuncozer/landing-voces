"use client";

import { useState, useEffect } from "react";
import { useTranslate } from "@/app/lib/LanguageContext";

interface CountdownTimerProps {
  targetDate: string;
}

/**
 * Custom hook to get the current timestamp in milliseconds.
 *
 * @returns The current timestamp.
 */
function useNow(): number {
  const [now, setNow] = useState<number>(0);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/**
 * Pads a number to ensure it has at least two digits.
 *
 * @param n - The number to pad.
 * @returns The padded string representation.
 */
function pad(n: number): string {
  return String(n).padStart(2, "0");
}

interface TimeUnitProps {
  value: string;
  label: string;
  color: string;
}

/**
 * Component to render an individual time unit with a value and label.
 *
 * @param props - Component properties.
 * @returns React element.
 */
function TimeUnit({ value, label, color }: TimeUnitProps): React.JSX.Element {
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

/**
 * CountdownTimer component displaying time left before or live broadcast duration capped at 12 hours.
 *
 * @param props - Component properties containing target date.
 * @returns React element.
 */
export default function CountdownTimer({ targetDate }: CountdownTimerProps): React.JSX.Element {
  const { t } = useTranslate();
  const target = new Date(targetDate).getTime();
  const now = useNow();
  
  const isBefore = now < target;
  const elapsed = Math.abs(now - target);
  const isCompleted = !isBefore && elapsed >= 43200000;
  
  const diff = isCompleted ? 43200000 : elapsed;
  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const color = isBefore ? "text-blue-brand" : "text-red-brand";

  return (
    <div className="flex flex-col items-center text-glow-sm mt-4 md:mt-6">
      <p className="font-heading text-white text-sm md:text-base tracking-[0.15em] uppercase mb-2 md:mb-3">
        {isCompleted 
          ? t("countdown.completed") 
          : (isBefore ? t("countdown.before") : t("countdown.after"))
        }
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
      {isCompleted && (
        <div className="flex flex-col items-center gap-1 mt-4 md:mt-6">
          <p className="font-heading text-yellow-brand text-xs md:text-sm tracking-[0.1em] uppercase">
            {t("countdown.date")}
          </p>
          <p className="font-heading text-white/50 text-[10px] md:text-xs tracking-[0.08em] uppercase">
            {t("countdown.upcoming")}
          </p>
        </div>
      )}
    </div>
  );
}
