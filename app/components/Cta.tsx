"use client";

import { useState, useEffect } from "react";
import { useTranslate } from "@/app/lib/LanguageContext";

export default function CtaSection() {
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
    <section id="join" data-nav="blue" className="reveal-section py-24 md:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <div className="reveal reveal-signal max-w-3xl mx-auto">
          <p className="font-heading text-blue-brand font-semibold tracking-[0.2em] uppercase text-xs mb-6">
            {t("cta.eyebrow")}
          </p>
          <p className="font-display text-blue-brand text-3xl md:text-5xl lg:text-6xl leading-tight mb-4">
            {t("cta.line1")}
          </p>
          <p className="font-display text-blue-brand text-3xl md:text-5xl lg:text-6xl leading-tight mb-12 italic">
            {t("cta.line2")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={ctaUrl} target="_blank" rel="noopener noreferrer" className="btn btn--cta">
              {t("cta.joinNow")}
            </a>
            <button
              onClick={() => {
                const text = t("cta.shareText") as string;
                if (navigator.share) {
                  navigator.share({ title: t("cta.shareTitle") as string, text, url: ctaUrl }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(`${text} ${ctaUrl}`).catch(() => {});
                }
              }}
              className="btn btn--outline"
            >
              {t("cta.share")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
