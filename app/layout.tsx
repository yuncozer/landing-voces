import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "S.O.S Voces por Venezuela | Maratón de solidaridad",
  description:
    "Cada voz puede convertirse en ayuda. Únete a la maratón que une voces en solidaridad por Venezuela.",
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
        {children}
      </body>
    </html>
  );
}
