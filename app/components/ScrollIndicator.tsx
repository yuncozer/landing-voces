export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-10 md:bottom-5 left-1/2 -translate-x-1/2 z-20">
      <div className="flex flex-col items-center gap-1.5 animate-float">
        <span className="text-white/25 text-[10px] md:text-xs font-heading tracking-widest uppercase">
          Descubre
        </span>
        <svg
          className="w-4 h-4 md:w-5 md:h-5 text-white/25"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
