import Image from "next/image";
import SoundWaves from "@/app/components/SoundWaves";
import CountdownTimer from "@/app/components/CountdownTimer";
import ScrollIndicator from "@/app/components/ScrollIndicator";

export default function HeroSection() {
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

      <div className="relative z-20 min-h-dvh flex flex-col items-center justify-center md:pb-24 gap-20 3xl:gap-28">

        <div className="flex flex-col max-w-4xl text-center items-center pt-3 md:pt-20 gap-6">
          <Image
            src="/Images/Logo.png"
            alt="S.O.S Voces por Venezuela"
            width={56}
            height={53}
            className="h-10 sm:h-12 md:h-14 w-auto brightness-0 invert opacity-80"
            priority
          />
          <p className="font-heading text-yellow-brand font-semibold tracking-[0.2em] uppercase text-xs md:text-sm">
            Maratón de solidaridad
          </p>
          <h1 className="font-display text-white text-[64px] sm:text-6xl md:text-8xl lg:text-[140px] leading-[0.85] sm:leading-[0.8] tracking-tight text-center max-w-[90vw]">
            Cada voz puede
            <br />
            <span className="italic text-yellow-brand">convertirse en ayuda</span>
          </h1>
          <p className="font-body text-white/70 font-bold text-sm md:text-lg max-w-lg text-center leading-relaxed">
            S.O.S Voces por Venezuela — una maratón que une voces en solidaridad por Venezuela.
          </p>
        </div>

        <div className="flex flex-col X items-center gap-10 md:gap-12">
          <CountdownTimer targetDate="2026-07-13T00:00:00-04:00" />
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 ">
            <a href="#join" className="btn btn--primary">
              Suma tu voz
            </a>
            <a href="#how" className="btn btn--white-outline">
              Haz que llegue más lejos
            </a>
          </div>
        </div>

      </div>
      <ScrollIndicator />
    </section>
  );
}
