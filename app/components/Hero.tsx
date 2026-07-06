import Image from "next/image";
import SoundWaves from "@/app/components/SoundWaves";

export default function HeroSection() {
  return (
    <section
      id="hero"
      data-nav="white"
      className="relative min-h-dvh overflow-hidden"
    >
      <SoundWaves className="sound-waves--offset z-20" />
      <Image
        src="/Images/bg.avif"
        alt=""
        fill
        className="object-cover"
        priority
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a3e]/90 via-[#17408B]/40 to-[#0c1a3e]/80 z-10" />
      <div className="relative z-20 min-h-dvh flex flex-col justify-between px-6 pt-20 md:pt-24">
        <div className="flex flex-col items-center pt-4 md:pt-8">
          <p className="font-heading text-yellow-brand font-semibold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 md:mb-6">
            Maratón de solidaridad
          </p>
          <h1 className="font-display text-white text-[2.5rem] sm:text-5xl md:text-7xl lg:text-[120px] leading-[0.82] sm:leading-[0.8] tracking-tight text-center">
            Cada voz puede
            <br />
            <span className="italic text-yellow-brand">convertirse en ayuda</span>
          </h1>
        </div>

        <div className="flex flex-col items-center gap-6 md:gap-8 pb-10 md:pb-16">
          <Image
            src="/Images/Logo.png"
            alt="S.O.S Voces por Venezuela"
            width={72}
            height={68}
            className="block sm:hidden h-14 w-auto brightness-0 invert opacity-80"
            priority
          />
          <Image
            src="/Images/Logo.png"
            alt="S.O.S Voces por Venezuela"
            width={100}
            height={94}
            className="hidden sm:block h-[80px] md:h-auto w-auto brightness-0 invert opacity-90"
            priority
          />

          <p className="font-body text-white/70 text-sm md:text-lg max-w-lg text-center leading-relaxed">
            S.O.S Voces por Venezuela — una maratón que une voces en solidaridad por Venezuela.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
            <a href="#join" className="btn btn--primary w-full sm:w-auto text-center justify-center">
              Suma tu voz
            </a>
            <a href="#how" className="btn btn--white-outline w-full sm:w-auto text-center justify-center">
              Haz que llegue más lejos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
