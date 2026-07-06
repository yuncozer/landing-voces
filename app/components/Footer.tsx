import Image from "next/image";

export default function FooterSection() {
  return (
    <footer className="bg-gray-dark text-white/50 py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Image
          src="/Images/Logo.png"
          alt="S.O.S Voces por Venezuela"
          width={100}
          height={94}
          className="opacity-80"
        />
        <div className="flex gap-8 text-xs font-heading font-semibold tracking-wider uppercase">
          <a href="#" className="text-white/40 no-underline hover:text-white transition-colors">
            Instagram
          </a>
          <a href="#" className="text-white/40 no-underline hover:text-white transition-colors">
            Twitter
          </a>
          <a href="#" className="text-white/40 no-underline hover:text-white transition-colors">
            TikTok
          </a>
        </div>
        <div className="text-xs text-white/30">
          &copy; 2026 Voces por Venezuela
        </div>
      </div>
    </footer>
  );
}
