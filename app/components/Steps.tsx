"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Headphones, Mic } from "lucide-react";
import { useTranslate } from "@/app/lib/LanguageContext";

const stepKeys = [
  {
    number: "01",
    icon: ExternalLink,
    titleKey: "steps.step1.title",
    descKey: "steps.step1.desc",
    hasLink: true,
    accent: "text-blue-brand",
    accentBg: "bg-blue-brand",
    accentBorder: "border-blue-brand/20",
    accentLight: "bg-blue-brand/[0.04]",
  },
  {
    number: "02",
    icon: Headphones,
    titleKey: "steps.step2.title",
    descKey: "steps.step2.desc",
    hasLink: false,
    accent: "text-yellow-brand",
    accentBg: "bg-yellow-brand",
    accentBorder: "border-yellow-brand/20",
    accentLight: "bg-yellow-brand/[0.06]",
  },
  {
    number: "03",
    icon: Mic,
    titleKey: "steps.step3.title",
    descKey: "steps.step3.desc",
    hasLink: false,
    accent: "text-red-brand",
    accentBg: "bg-red-brand",
    accentBorder: "border-red-brand/20",
    accentLight: "bg-red-brand/[0.04]",
  },
];

export default function StepsSection() {
  const { t } = useTranslate();
  const [ctaUrl, setCtaUrl] = useState("#");

  useEffect(() => {
    fetch("/api/cta-link")
      .then((res) => res.json())
      .then((data) => {
        if (data.url && data.url !== "#") {
          setCtaUrl(data.url);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="how" data-nav="blue" className="reveal-section py-24 md:py-32 px-6 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="reveal reveal-signal text-center mb-20">
          <p className="font-heading text-blue-brand font-semibold tracking-[0.2em] uppercase text-xs mb-4">
            {t("steps.eyebrow")}
          </p>
          <h2 className="font-display text-blue-brand text-4xl md:text-5xl lg:text-7xl leading-tight">
            {t("steps.title")}
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
          {stepKeys.map((s, i) => (
            <StepItem key={s.number} number={s.number} icon={s.icon} title={t(s.titleKey) as string} content={t(s.descKey) as string} hasLink={s.hasLink} ctaUrl={ctaUrl} descBefore={s.hasLink ? (t("steps.step1.descBefore") as string) : ""} linkText={s.hasLink ? (t("steps.step1.linkText") as string) : ""} descAfter={s.hasLink ? (t("steps.step1.descAfter") as string) : ""} accent={s.accent} accentBg={s.accentBg} accentBorder={s.accentBorder} accentLight={s.accentLight} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepItem({
  number,
  icon: Icon,
  title,
  content,
  hasLink,
  ctaUrl,
  descBefore,
  linkText,
  descAfter,
  accent,
  accentBg,
  accentBorder,
  accentLight,
  index,
}: {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: string;
  hasLink: boolean;
  ctaUrl: string;
  descBefore: string;
  linkText: string;
  descAfter: string;
  accent: string;
  accentBg: string;
  accentBorder: string;
  accentLight: string;
  index: number;
}) {
  const delay = `delay-${index + 2}` as const;

  return (
    <div className={`reveal reveal-${delay} relative flex flex-col items-center text-center`}>
      <div className="relative flex items-center justify-center w-full mb-8">
        <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl shadow-md border ${accentBorder} ${accentLight}`}>
          <Icon className={`w-6 h-6 ${accent}`} />
        </div>
        <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full ${accentBg} flex items-center justify-center`}>
          <span className="font-heading font-semibold text-white text-[11px]">
            {number}
          </span>
        </span>
        {index < 2 && (
          <div className="hidden md:block absolute top-8 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-gray-400" />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-heading font-semibold text-blue-brand text-lg">
          {title}
        </h3>
        <p className="font-body text-gray-dark text-sm leading-relaxed max-w-xs">
          {hasLink ? (
            <>
              {descBefore}
              <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="text-blue-brand underline font-semibold hover:text-yellow-brand transition-colors">
                {linkText}
              </a>
              {descAfter}
            </>
          ) : (
            content
          )}
        </p>
      </div>
    </div>
  );
}
