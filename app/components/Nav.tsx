"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "#about", label: "Sobre" },
  { href: "#how", label: "Suma tu voz" },
  { href: "#voices", label: "Voces" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [isWhite, setIsWhite] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = document.querySelectorAll<HTMLElement>("[data-nav]");
      let current = "white";
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 80 && rect.bottom > 80) {
          current = section.dataset.nav || "white";
          break;
        }
      }
      setIsWhite(current === "white");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isWhite ? "bg-white" : "bg-blue-brand"
      } ${scrolled ? "shadow-lg" : ""}`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#hero" className="no-underline flex items-center">
          <Image
            src="/Images/Logo.png"
            alt="S.O.S Voces por Venezuela"
            width={160}
            height={150}
            className="h-16 w-auto transition-all duration-500"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`font-heading text-sm font-semibold no-underline transition-colors duration-300 ${
                isWhite
                  ? "text-blue-brand/70 hover:text-blue-brand"
                  : "text-white/80 hover:text-yellow-brand"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#join"
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm leading-none transition-all duration-300 no-underline ${
              isWhite
                ? "bg-blue-brand text-white hover:bg-blue-brand/90"
                : "bg-yellow-brand text-blue-brand hover:bg-yellow-brand/90"
            }`}
          >
            Únete
          </a>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            } ${isWhite ? "bg-blue-brand" : "bg-white"}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            } ${isWhite ? "bg-blue-brand" : "bg-white"}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            } ${isWhite ? "bg-blue-brand" : "bg-white"}`}
          />
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80" : "max-h-0"
        } ${isWhite ? "bg-white" : "bg-blue-brand"}`}
      >
        <nav className="flex flex-col px-6 pb-6 pt-2 gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className={`font-heading text-base font-semibold no-underline transition-colors duration-300 ${
                isWhite
                  ? "text-blue-brand/70 hover:text-blue-brand"
                  : "text-white/80 hover:text-yellow-brand"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#join"
            onClick={handleNavClick}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading font-semibold text-sm leading-none transition-all duration-300 no-underline self-start ${
              isWhite
                ? "bg-blue-brand text-white hover:bg-blue-brand/90"
                : "bg-yellow-brand text-blue-brand hover:bg-yellow-brand/90"
            }`}
          >
            Únete
          </a>
        </nav>
      </div>
    </header>
  );
}
