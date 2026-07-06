export default function CtaSection() {
  return (
    <section id="join" data-nav="blue" className="reveal-section py-24 md:py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <div className="reveal reveal-signal max-w-3xl mx-auto">
          <p className="font-heading text-blue-brand font-semibold tracking-[0.2em] uppercase text-xs mb-6">
            Únete al movimiento
          </p>
          <p className="font-display text-blue-brand text-3xl md:text-5xl lg:text-6xl leading-tight mb-4">
            Una voz puede informar.
          </p>
          <p className="font-display text-blue-brand text-3xl md:text-5xl lg:text-6xl leading-tight mb-12 italic">
            Muchas voces pueden transformar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="btn btn--cta">
              Suma tu voz ahora
            </a>
            <a href="#" className="btn btn--outline">
              Comparte en redes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
