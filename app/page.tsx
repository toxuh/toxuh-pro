const Home = () => (
  <main className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 py-12 md:px-12">
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    />

    <div className="animate-fade-in animation-delay-600 pointer-events-none absolute top-8 right-8 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-white/20 opacity-0 md:top-12 md:right-12">
      2024—∞
    </div>

    <div className="relative z-10 flex flex-col items-center text-center">
      <h1 className="animate-fade-up opacity-0">
        <span
          className="block font-[family-name:var(--font-serif)] text-[clamp(3rem,15vw,13rem)] leading-[0.85] tracking-[-0.03em] text-white"
          style={{ fontStyle: "italic" }}
        >
          Anton
        </span>
        <span className="mt-1 block font-[family-name:var(--font-serif)] text-[clamp(3rem,15vw,13rem)] leading-[0.85] tracking-[-0.03em] text-white md:mt-2">
          Zakharov
        </span>
      </h1>

      <div className="animate-fade-in animation-delay-200 my-8 h-px w-16 bg-white/20 opacity-0 md:my-12 md:w-24" />

      <p className="animate-fade-up animation-delay-200 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.35em] text-white/50 opacity-0 md:text-xs md:tracking-[0.4em]">
        Frontend Developer
      </p>

      <a
        href="mailto:me@toxuh.pro"
        className="animate-fade-up animation-delay-400 group mt-6 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] text-white/30 opacity-0 transition-all duration-500 hover:text-white md:mt-8 md:text-xs"
      >
        <span className="h-px w-0 bg-white transition-all duration-500 group-hover:w-4" />
        me@toxuh.pro
        <span className="h-px w-0 bg-white transition-all duration-500 group-hover:w-4" />
      </a>
    </div>

    <div className="animate-fade-in animation-delay-600 absolute bottom-8 left-8 font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-white/20 opacity-0 md:bottom-12 md:left-12">
      Based in Spain
    </div>
  </main>
);

export default Home;
