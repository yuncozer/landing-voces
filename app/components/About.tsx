"use client";

import Image from "next/image";
import { Heart, Star, Handshake, HandHelping } from "lucide-react";
import { useTranslate } from "@/app/lib/LanguageContext";

const valueKeys = [
  { icon: Heart, labelKey: "about.value1.label", descKey: "about.value1.desc", image: "/Images/solidaridad.webp" },
  { icon: Star, labelKey: "about.value2.label", descKey: "about.value2.desc", image: "/Images/esperanza.jpg" },
  { icon: Handshake, labelKey: "about.value3.label", descKey: "about.value3.desc", image: "/Images/unidad.jpeg" },
  { icon: HandHelping, labelKey: "about.value4.label", descKey: "about.value4.desc", image: "/Images/accion.jpeg" },
];

export default function AboutSection() {
  const { t } = useTranslate();
  return (
    <section id="about" data-nav="blue" className="reveal-section py-24 md:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="reveal reveal-signal max-w-2xl">
          <p className="font-heading text-blue-brand font-semibold tracking-[0.2em] uppercase text-xs mb-4">
            {t("about.eyebrow")}
          </p>
          <h2 className="font-display text-blue-brand text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
            {t("about.title")}
          </h2>
          <p className="font-body text-gray-dark/60 text-base md:text-lg leading-relaxed">
            {t("about.body")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20 reveal reveal-delay-1">
          {valueKeys.map((v) => (
            <ValueItem key={v.labelKey} icon={v.icon} label={t(v.labelKey) as string} description={t(v.descKey) as string} image={v.image} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueItem({
  icon: Icon,
  label,
  description,
  image,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  image: string;
}) {
  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-2xl shadow-sm transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-[4/5]">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1a3e]/30 via-[#0c1a3e]/50 to-[#0c1a3e]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-brand/40 via-transparent to-transparent" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-yellow-brand to-[#d4a800] flex items-center justify-center text-blue-brand shadow-lg mb-4">
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-semibold text-white text-lg mb-1.5">
            {label}
          </h3>
          <p className="font-body text-white/65 text-xs leading-relaxed max-w-[90%]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
