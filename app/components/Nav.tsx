"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslate } from "@/app/lib/LanguageContext";

export default function Nav() {
  const { t, locale, setLocale } = useTranslate();
  const [scrolled, setScrolled] = useState(false);
  const [isWhite, setIsWhite] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#about", label: t("nav.about") as string },
    { href: "#how", label: t("nav.how") as string },
    { href: "#voices", label: t("nav.voices") as string },
    { href: "#directorio", label: t("nav.donate") as string },
  ];

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
        <a href="#hero" className="no-underline flex items-center gap-3">
          <Image
            src="/Images/Logo.png"
            alt="S.O.S Voces por Venezuela"
            width={160}
            height={150}
            className="h-16 w-auto transition-all duration-500"
          />
          <span
            className={`font-display text-xl md:text-3xl font-semibold leading-none transition-colors duration-500 ${
              isWhite ? "text-red-brand" : "text-white"
            }`}
          >
            S.O.S Voces por Venezuela
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6">
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
            {t("nav.join")}
          </a>
          <div className="flex items-center gap-1 font-heading text-xs font-semibold">
            <button
              onClick={() => setLocale("es")}
              className={`cursor-pointer px-1.5 py-1 rounded transition-colors ${
                locale === "es"
                  ? isWhite
                    ? "text-yellow-brand"
                    : "text-yellow-brand"
                  : isWhite
                    ? "text-blue-brand/40 hover:text-blue-brand/70"
                    : "text-white/40 hover:text-white/70"
              }`}
            >
              ES
            </button>
            <span className={isWhite ? "text-blue-brand/20" : "text-white/20"}>/</span>
            <button
              onClick={() => setLocale("en")}
              className={`cursor-pointer px-1.5 py-1 rounded transition-colors ${
                locale === "en"
                  ? isWhite
                    ? "text-yellow-brand"
                    : "text-yellow-brand"
                  : isWhite
                    ? "text-blue-brand/40 hover:text-blue-brand/70"
                    : "text-white/40 hover:text-white/70"
              }`}
            >
              EN
            </button>
          </div>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? (t("nav.menuOpen") as string) : (t("nav.menuClose") as string)}
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
            {t("nav.join")}
          </a>
          <div className="flex items-center gap-1 font-heading text-sm font-semibold">
            <button
              onClick={() => setLocale("es")}
              className={`cursor-pointer px-2 py-1 rounded transition-colors ${
                locale === "es"
                  ? isWhite ? "text-yellow-brand" : "text-yellow-brand"
                  : isWhite ? "text-blue-brand/40 hover:text-blue-brand/70" : "text-white/40 hover:text-white/70"
              }`}
            >
              ES
            </button>
            <span className={isWhite ? "text-blue-brand/20" : "text-white/20"}>/</span>
            <button
              onClick={() => setLocale("en")}
              className={`cursor-pointer px-2 py-1 rounded transition-colors ${
                locale === "en"
                  ? isWhite ? "text-yellow-brand" : "text-yellow-brand"
                  : isWhite ? "text-blue-brand/40 hover:text-blue-brand/70" : "text-white/40 hover:text-white/70"
              }`}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
