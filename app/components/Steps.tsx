import { Mic, Share2, UserPlus } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Mic,
    title: "Graba tu mensaje",
    accent: "blue-brand",
    accentBg: "bg-blue-brand",
    accentBorder: "border-blue-brand/20",
    accentLight: "bg-blue-brand/[0.04]",
    content: (
      <>
        Tu testimonio, tu canción, tus palabras.{' '}
        <span className="italic">Cualquier voz suma.</span>
      </>
    ),
  },
  {
    number: "02",
    icon: Share2,
    title: "Comparte en redes",
    accent: "text-yellow-brand",
    accentBg: "bg-yellow-brand",
    accentBorder: "border-yellow-brand/20",
    accentLight: "bg-yellow-brand/[0.06]",
    content: (
      <>
        Usa <strong>#VocesPorVenezuela</strong> y haz que el mensaje llegue lejos.
      </>
    ),
  },
  {
    number: "03",
    icon: UserPlus,
    title: "Invita a otras voces",
    accent: "text-red-brand",
    accentBg: "bg-red-brand",
    accentBorder: "border-red-brand/20",
    accentLight: "bg-red-brand/[0.04]",
    content: (
      <>
        Cada persona que sumas multiplica la esperanza.
      </>
    ),
  },
];

export default function StepsSection() {
  return (
    <section id="how" data-nav="blue" className="reveal-section py-24 md:py-32 px-6 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="reveal reveal-signal text-center mb-20">
          <p className="font-heading text-blue-brand font-semibold tracking-[0.2em] uppercase text-xs mb-4">
            Cómo participar
          </p>
          <h2 className="font-display text-blue-brand text-4xl md:text-5xl lg:text-7xl leading-tight">
            Suma tu voz
          </h2>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
          {steps.map((s, i) => (
            <StepItem key={s.number} {...s} index={i} />
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
  accent,
  accentBg,
  accentBorder,
  accentLight,
  index,
}: {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  content: React.ReactNode;
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
          {content}
        </p>
      </div>
    </div>
  );
}
