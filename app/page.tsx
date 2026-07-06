import dynamic from "next/dynamic";
import ScrollReveal from "@/app/components/ScrollReveal";
import Nav from "@/app/components/Nav";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";

const Steps = dynamic(() => import("@/app/components/Steps"), { ssr: true });
const Voices = dynamic(() => import("@/app/components/Voices"), { ssr: true });
const Cta = dynamic(() => import("@/app/components/Cta"), { ssr: true });
const Footer = dynamic(() => import("@/app/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollReveal />
      <main>
        <Hero />
        <About />
        <Steps />
        <Voices />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
