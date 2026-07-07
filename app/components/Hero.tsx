import Image from "next/image";
import SoundWaves from "@/app/components/SoundWaves";

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
      <div className="relative z-20 min-h-dvh flex flex-col items-center justify-center px-6 pt-20 md:pt-24 pb-10 md:pb-16">
        <Image
          src="/Images/Logo.png"
          alt="S.O.S Voces por Venezuela"
          width={56}
          height={53}
          className="h-10 sm:h-12 md:h-14 w-auto brightness-0 invert opacity-80 mb-5 md:mb-7"
          priority
        />
        <p className="font-heading text-yellow-brand font-semibold tracking-[0.2em] uppercase text-xs md:text-sm mb-3 md:mb-4">
          Maratón de solidaridad
        </p>
        <h1 className="font-display text-white text-[2.5rem] sm:text-5xl md:text-7xl lg:text-[120px] leading-[0.82] sm:leading-[0.8] tracking-tight text-center max-w-[90vw]">
          Cada voz puede
          <br />
          <span className="italic text-yellow-brand">convertirse en ayuda</span>
        </h1>
        <p className="font-body text-white/70 text-sm md:text-lg max-w-lg text-center leading-relaxed mt-4 md:mt-6 mb-6 md:mb-8">
          S.O.S Voces por Venezuela — una maratón que une voces en solidaridad por Venezuela.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
          <a href="#join" className="btn btn--primary">
            Suma tu voz
          </a>
          <a href="#how" className="btn btn--white-outline">
            Haz que llegue más lejos
          </a>
        </div>
      </div>
    </section>
  );
}
