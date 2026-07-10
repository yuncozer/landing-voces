import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/app/lib/LanguageContext";

const marykate = localFont({
  src: "../public/fonts/MaryKate.ttf",
  variable: "--font-marykate",
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://landing-voces.vercel.app"),
  title: "S.O.S Voces por Venezuela | Maratón de solidaridad",
  description:
    "Cada voz puede convertirse en ayuda. Únete a la maratón que une voces en solidaridad por Venezuela.",
  openGraph: {
    title: "S.O.S Voces por Venezuela",
    description:
      "Cada voz puede convertirse en ayuda. Únete a la maratón que une voces en solidaridad por Venezuela.",
    url: "/",
    siteName: "S.O.S Voces por Venezuela",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "S.O.S Voces por Venezuela",
    description:
      "Cada voz puede convertirse en ayuda. Únete a la maratón que une voces en solidaridad por Venezuela.",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${marykate.variable} ${poppins.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-gray-dark font-body">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
