"use client";

import { useTranslate } from "@/app/lib/LanguageContext";

export default function ScrollIndicator() {
  const { t } = useTranslate();
  return (
    <button
      onClick={() => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      }}
      className="flex flex-col items-center gap-1.5 animate-float cursor-pointer"
      aria-label={t("scroll.descubre") as string}
    >
      <span className="text-white/25 text-[10px] md:text-xs font-heading tracking-widest uppercase">
        {t("scroll.descubre")}
      </span>
      <svg
        className="w-4 h-4 md:w-5 md:h-5 text-white/25"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}
