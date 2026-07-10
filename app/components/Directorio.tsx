"use client";

import Image from "next/image";
import { Pizza, Bitcoin, GraduationCap, Wallet, HeartHandshake, Heart, BookOpen, Compass, Check, ArrowUpRight } from "lucide-react";

interface DonationSite {
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  methods: string[];
  accent: string;
  url: string;
}

const donationSites: DonationSite[] = [
  {
    image: "/Images/directorio/yummy.jpg",
    icon: Pizza,
    title: "Yummy",
    description: "Campaña de Yummy (Vicente Zavarce). Iguala el 25% de tu aporte.",
    methods: ["Tarjeta", "App Yummy"],
    accent: "from-red-500 to-red-brand",
    url: "https://dona.yummyrides.com/",
  },
  {
    image: "/Images/directorio/bitso.png",
    icon: Bitcoin,
    title: "Bitso",
    description: "Wallet pública con la Cruz Roja como destino. Las direcciones viven en su comunicado.",
    methods: ["BTC", "USDC", "USDT", "SOL", "SPEI"],
    accent: "from-blue-brand to-blue-brand/70",
    url: "https://x.com/bitso/status/2071041908156125219",
  },
  {
    image: "/Images/directorio/academiabtcucab.jpg",
    icon: GraduationCap,
    title: "Academia BTC UCAB",
    description: "Fondo de la Universidad Católica (UCAB). Verificable en blockchain.",
    methods: ["BTC", "USDT", "Binance Pay"],
    accent: "from-amber-500 to-yellow-brand",
    url: "https://btc.academiasucab.com/fondo-emergencia-sismo-vzla-2026/",
  },
  {
    image: "/Images/directorio/decaf.jpeg",
    icon: Wallet,
    title: "Decaf",
    description: "Ya entrega fondos a United Way Venezuela.",
    methods: ["USDC", "Tarjeta", "Banco"],
    accent: "from-teal-500 to-emerald-600",
    url: "https://www.decaf.so/venezuela-earthquake-relief",
  },
  {
    image: "/Images/directorio/gofundme.webp",
    icon: HeartHandshake,
    title: "GoFundMe",
    description: "Emergency Relief for Venezuela Earthquake Victims.",
    methods: ["Tarjeta", "PayPal"],
    accent: "from-rose-600 to-pink-500",
    url: "https://www.gofundme.com/f/emergency-relief-for-venezuela-earthquake-victims",
  },
  {
    image: "/Images/directorio/caritasvzla.jpeg",
    icon: Heart,
    title: "Cáritas Venezuela",
    description:
      "Más de 30 mil voluntarios sostienen a la población más vulnerable en todo el país. Donaciones desde Venezuela y el exterior.",
    methods: ["Venezuela", "Exterior"],
    accent: "from-rose-400 to-red-brand",
    url: "https://caritasvenezuela.org/donaciones/",
  },
  {
    image: "/Images/directorio/feyalegria.jpeg",
    icon: BookOpen,
    title: "Fe y Alegría Venezuela",
    description:
      "25 escuelas afectadas por los terremotos. Cada aporte ayuda a reconstruir infraestructura, apoyar al personal y restablecer las condiciones operativas.",
    methods: ["Zelle"],
    accent: "from-sky-500 to-blue-brand",
    url: "https://home.donarfeyalegriavzla.org/educacion",
  },
  {
    image: "/Images/directorio/trazandofuturos.jpeg",
    icon: Compass,
    title: "Tranzando Futuros",
    description:
      "Por los próximos días pausamos nuestras donaciones para fondos educativos. Buscamos apoyar a la causa de Venezuela por el terremoto del 24 de Junio de 2026.",
    methods: ["Donación única"],
    accent: "from-violet-600 to-purple-700",
    url: "https://trazandofuturos.org/donar",
  },
];

function DonationCard({ image, icon: Icon, title, description, methods, accent, url }: DonationSite) {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 border border-gray-200/50 hover:border-transparent flex flex-row sm:flex-col">
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(23,64,139,0.08), rgba(247,196,0,0.06))",
          margin: "-1px",
        }}
      />
      <div className="relative z-10 w-28 sm:w-full shrink-0 sm:aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent sm:bg-gradient-to-t sm:from-black/50 sm:via-black/5 sm:to-transparent" />
        <div
          className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent} opacity-60`}
        />
        <div className="absolute top-2 left-2 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center shadow-sm ring-1 ring-white/20">
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
        </div>
        <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-brand flex items-center justify-center shadow-sm">
            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-brand" />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-3 sm:p-4 md:p-5 min-w-0">
        <h3 className="font-heading font-semibold text-blue-brand text-xs sm:text-sm md:text-base mb-1 leading-snug">
          {title}
        </h3>
        <p className="font-body text-gray-dark text-[10px] sm:text-xs leading-relaxed mb-2 flex-1 line-clamp-2 sm:line-clamp-none">
          {description}
        </p>
        {methods.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {methods.map((m) => (
              <span
                key={m}
                className="inline-block px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-500 font-body text-[9px] sm:text-[10px] font-medium tracking-tight"
              >
                {m}
              </span>
            ))}
          </div>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1 w-full py-1.5 sm:py-2 rounded-lg font-heading font-semibold text-[11px] sm:text-xs leading-none transition-all duration-300 no-underline bg-blue-brand text-white hover:bg-blue-brand/90 active:scale-[0.97]"
        >
          Donar
          <ArrowUpRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
        </a>
      </div>
    </div>
  );
}

export default function DirectorioSection() {
  return (
    <section id="directorio" data-nav="blue" className="reveal-section py-16 md:py-20 px-6 bg-gray-light">
      <div className="max-w-6xl mx-auto">
        <div className="reveal reveal-signal max-w-2xl mb-10 md:mb-12">
          <p className="font-heading text-blue-brand font-semibold tracking-[0.2em] uppercase text-xs mb-3">
            Canales verificados
          </p>
          <h2 className="font-display text-blue-brand text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight">
            Donde donar con confianza
          </h2>
          <p className="font-body text-gray-dark text-sm md:text-base leading-relaxed">
            Cada organización ha sido verificada. Tu aporte llega directo a
            quienes más lo necesitan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 reveal reveal-delay-1">
          {donationSites.map((site) => (
            <DonationCard key={site.title} {...site} />
          ))}
        </div>
      </div>
    </section>
  );
}
