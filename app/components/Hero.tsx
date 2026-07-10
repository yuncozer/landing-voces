"use client";

import Image from "next/image";
import SoundWaves from "@/app/components/SoundWaves";
import CountdownTimer from "@/app/components/CountdownTimer";
import ScrollIndicator from "@/app/components/ScrollIndicator";
import { useTranslate } from "@/app/lib/LanguageContext";

export default function HeroSection() {
  const { t } = useTranslate();

  return (
    <section
      id="hero"
      data-nav="white"
      className="relative min-h-dvh overflow-hidden"
    >
      <SoundWaves className="z-20" />
      <Image
        src="/Images/bg.avif"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a3e]/90 via-[#17408B]/40 to-[#0c1a3e]/80 z-10" />

      <div className="relative z-20 min-h-dvh flex flex-col items-center justify-center md:pb-12 gap-20 3xl:gap-28">

        <div className="flex flex-col max-w-4xl text-center items-center pt-3 md:pt-16 gap-6">
          <p className="font-heading text-yellow-brand font-semibold tracking-[0.2em] uppercase text-xs md:text-sm">
            {t("hero.eyebrow")}
          </p>
          <h1 className="font-display text-white text-[64px] sm:text-6xl md:text-8xl lg:text-[140px] leading-[0.85] sm:leading-[0.8] tracking-tight text-center max-w-[90vw]">
            {t("hero.headline1")}
            <br />
            <span className="italic text-yellow-brand">{t("hero.headline2")}</span>
          </h1>
          <p className="font-body text-white/70 font-bold text-sm md:text-lg text-center leading-relaxed max-w-[90%]">
            {t("hero.subtitle")}
          </p>
        </div>

        <div className="flex flex-col X items-center gap-10 md:gap-12">
          <Image
            src="/Images/Logo.png"
            alt="S.O.S Voces por Venezuela"
            width={56}
            height={53}
            className="h-10 sm:h-12 md:h-14 w-auto brightness-0 invert opacity-80"
            priority
          />
          <CountdownTimer targetDate="2026-07-10T10:00:00-04:00" />
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 ">
            <a href="#join" className="btn btn--primary">
              {t("hero.ctaJoin")}
            </a>
            <button
              onClick={() => {
                const text = t("hero.shareText") as string;
                if (navigator.share) {
                  navigator.share({ title: t("hero.shareTitle") as string, text, url: window.location.href }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(`${text} ${window.location.href}`).catch(() => {});
                }
              }}
              className="btn btn--white-outline"
            >
              {t("hero.ctaShare")}
            </button>
          </div>
        </div>
        <ScrollIndicator />
      </div>
    </section>
  );
}
