import Image from "next/image";
import { Heart, Star, Handshake, HandHelping } from "lucide-react";

const values = [
  {
    icon: Heart,
    label: "Solidaridad",
    description: "Apoyo mutuo que cruza fronteras",
    image: "/Images/solidaridad.webp",
  },
  {
    icon: Star,
    label: "Esperanza",
    description: "Creer en un futuro mejor",
    image: "/Images/esperanza.jpg",
  },
  {
    icon: Handshake,
    label: "Unidad",
    description: "Voces que se encuentran",
    image: "/Images/unidad.jpeg",
  },
  {
    icon: HandHelping,
    label: "Acción",
    description: "Solidaridad que se mueve",
    image: "/Images/accion.jpeg",
  },
];

export default function AboutSection() {
  return (
    <section id="about" data-nav="blue" className="reveal-section py-24 md:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="reveal reveal-signal max-w-2xl">
          <p className="font-heading text-blue-brand font-semibold tracking-[0.2em] uppercase text-xs mb-4">
            Quiénes Somos
          </p>
          <h2 className="font-display text-blue-brand text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
            ¿Que es S.O.S Voces por Venezuela?
          </h2>
          <p className="font-body text-gray-dark/60 text-base md:text-lg leading-relaxed">
            Un movimiento que transforma la solidaridad en acción. Cada persona que alza su voz
            se convierte en parte de una red de esperanza que cruza fronteras. No se trata solo
            de compartir información — se trata de construir un futuro donde todas las voces
            sean escuchadas.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-16 md:mt-20 reveal reveal-delay-1">
          {values.map((v) => (
            <ValueItem key={v.label} {...v} />
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
