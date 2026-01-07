const HeroSection = () => (
  <header
    className="relative flex min-h-svh snap-start flex-col overflow-hidden px-8 py-12 md:px-16 md:py-16 lg:px-24"
    aria-label="Introduction"
  >
    <div
      className="animate-fade-in animation-delay-600 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--text-subtle)] opacity-0"
      aria-hidden="true"
    >
      01
    </div>

    <div className="pointer-events-none absolute inset-0" aria-hidden="true" />

    <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="animate-fade-up opacity-0">
        <span
          className="block font-[family-name:var(--font-serif)] text-[clamp(3rem,15vw,13rem)] leading-[0.85] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontStyle: "italic" }}
        >
          Anton
        </span>
        <span className="mt-1 block font-[family-name:var(--font-serif)] text-[clamp(3rem,15vw,13rem)] leading-[0.85] tracking-[-0.03em] text-[var(--text)] md:mt-2">
          Zakharov
        </span>
      </h1>

      <div
        className="animate-fade-in animation-delay-200 my-8 h-px w-16 bg-[var(--text-subtle)] opacity-0 md:my-12 md:w-24"
        aria-hidden="true"
      />

      <p className="animate-fade-up animation-delay-200 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-[var(--text-muted)] opacity-0 md:text-xs md:tracking-[0.4em]">
        Fullstack Engineer
      </p>

      <a
        href="mailto:me@toxuh.pro"
        className="animate-fade-up animation-delay-400 group mt-6 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] text-[var(--text-subtle)] opacity-0 transition-all duration-500 hover:text-[var(--text)] md:mt-8 md:text-xs"
        aria-label="Send email to me@toxuh.pro"
      >
        <span
          className="h-px w-0 bg-[var(--text)] transition-all duration-500 group-hover:w-4"
          aria-hidden="true"
        />
        me@toxuh.pro
        <span
          className="h-px w-0 bg-[var(--text)] transition-all duration-500 group-hover:w-4"
          aria-hidden="true"
        />
      </a>
    </div>

    <footer className="flex items-end justify-between">
      <address className="animate-fade-in animation-delay-600 font-[family-name:var(--font-mono)] text-[10px] not-italic tracking-[0.2em] text-[var(--text-subtle)] opacity-0">
        Based in Zaragoza, Spain
      </address>

      <div
        className="animate-fade-in animation-delay-600 flex flex-col items-center gap-2 opacity-0"
        aria-hidden="true"
      >
        <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.3em] text-[var(--text-subtle)]">
          Scroll
        </span>
        <div className="h-8 w-px animate-pulse bg-[var(--text-subtle)]" />
      </div>
    </footer>
  </header>
);

export default HeroSection;
