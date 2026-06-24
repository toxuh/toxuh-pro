"use client";

import { LongArrowLeft, LongArrowRight } from "@/components/ui/long-arrows";
import { useInView } from "@/hooks/use-in-view";
import { useSnapCarousel } from "@/hooks/use-snap-carousel";

interface Experience {
  company: string;
  type: string;
  role: string;
  location: "remote" | "on-site";
  period: string;
  startYear: number;
  endYear: number;
  highlights: string[];
  stack: string[];
}

const EXPERIENCES: Experience[] = [
  {
    company: "Xaru.io",
    type: "Fintech Startup",
    role: "Lead Frontend Engineer",
    location: "remote",
    period: "Jun 2021 — 2026",
    startYear: 2021,
    endYear: 2026,
    highlights: [
      "Led frontend architecture for 3 fintech products from scratch",
      "Scaled a B2B platform to 150–200 companies and ~10k monthly transactions",
      "Built a fullstack crypto portfolio tracker solo; cut load time ~2x",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "WebSockets",
    ],
  },
  {
    company: "Etc. Professional Translators",
    type: "Acquired by Sberbank",
    role: "Frontend Developer",
    location: "remote",
    period: "Jan 2019 — Jun 2021",
    startYear: 2019,
    endYear: 2021,
    highlights: [
      "Built a secure B2B translation platform later acquired by Sberbank",
      "Led migration of ~90% of the codebase from JavaScript to TypeScript",
      "Shipped document, secure task-assignment, and review workflows",
    ],
    stack: ["React", "TypeScript", "CRA"],
  },
  {
    company: "Stafory",
    type: "HR Tech · Vera Robot",
    role: "Frontend Developer",
    location: "remote",
    period: "Jan 2017 — Nov 2018",
    startYear: 2017,
    endYear: 2018,
    highlights: [
      "Built the client-facing CRM for calling campaigns and candidate pipelines",
      "Developed a Chrome extension for automated candidate data extraction",
      "Introduced Scrum/Agile processes across the team",
    ],
    stack: ["JavaScript", "React", "Chrome Extensions"],
  },
  {
    company: "Vsemayki.ru",
    type: "E-commerce & Agency",
    role: "Frontend Developer",
    location: "on-site",
    period: "2009 — 2017",
    startYear: 2009,
    endYear: 2017,
    highlights: [
      "Frontend across e-commerce and agency work at Vsemayki, Sky-IT, and WOW",
      "Built a custom print designer and a touchscreen kiosk product",
      "Shipped storefronts, redesigns, and reusable UI components",
    ],
    stack: ["JavaScript", "HTML", "CSS", "jQuery", "Bootstrap"],
  },
];

const ExperienceSection = () => {
  const { ref: sectionRef, isInView: isVisible } = useInView<HTMLElement>({
    threshold: 0.3,
  });
  const {
    scrollContainerRef,
    activeIndex,
    handleScroll,
    scrollToCard,
    goPrev,
    goNext,
    setCardRef,
  } = useSnapCarousel(EXPERIENCES.length);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh snap-start flex-col overflow-hidden"
      aria-labelledby="experience-heading"
    >
      <div className="flex items-start justify-between px-8 py-12 md:px-16 md:py-16 lg:px-24">
        <span
          className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--text-subtle)]"
          aria-hidden="true"
        >
          03
        </span>
        <h2
          id="experience-heading"
          className="font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,4rem)] leading-[0.9] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontStyle: "italic" }}
        >
          Experience
        </h2>
      </div>

      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex flex-1 gap-8 overflow-x-auto snap-x snap-mandatory px-8 md:px-16 lg:px-24 scroll-pl-8 md:scroll-pl-16 lg:scroll-pl-24"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        role="list"
        aria-label="Work experience timeline"
      >
        {EXPERIENCES.map((exp, index) => (
          <article
            key={exp.company}
            ref={setCardRef(index)}
            className="flex w-[85vw] flex-shrink-0 flex-col justify-center snap-start md:w-[80vw] lg:w-[75vw]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
            }}
            aria-label={`${exp.role} at ${exp.company}, ${exp.period}`}
          >
            <div className="flex flex-col gap-6 md:flex-row md:gap-12 lg:gap-20">
              <div className="relative flex flex-col" aria-hidden="true">
                <span className="absolute -mt-8 ml-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  {exp.startYear} —
                </span>
                <span
                  className="font-[family-name:var(--font-serif)] text-[clamp(4rem,12vw,10rem)] leading-[0.85] tracking-[-0.04em] text-[var(--text-subtle)]"
                  style={{ fontStyle: "italic" }}
                >
                  {exp.endYear}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-center">
                <div className="mb-4 flex items-baseline gap-4">
                  <h3 className="font-[family-name:var(--font-mono)] text-[clamp(1.5rem,4vw,3rem)] leading-[1] tracking-[-0.02em] text-[var(--text)]">
                    {exp.company}
                  </h3>
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
                    {exp.type}
                  </span>
                </div>

                <div className="mb-6 flex items-center gap-4">
                  <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--text-muted)] md:text-base">
                    {exp.role}
                  </span>
                  <span
                    className="h-1 w-1 rounded-full bg-[var(--text-subtle)]"
                    aria-hidden="true"
                  />
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-[var(--text-subtle)]">
                    {exp.location}
                  </span>
                </div>

                <ul className="mb-6 space-y-2" aria-label="Key achievements">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[var(--text-muted)] md:text-sm"
                    >
                      <span
                        className="mt-2 h-px w-4 flex-shrink-0 bg-[var(--text-subtle)]"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <ul
                  className="flex flex-wrap gap-2"
                  aria-label="Technologies used"
                >
                  {exp.stack.map((tech) => (
                    <li
                      key={tech}
                      className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--text-subtle)] transition-colors duration-300 hover:text-[var(--text-muted)]"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
        <div
          className="w-[15vw] flex-shrink-0 md:w-[20vw] lg:w-[25vw]"
          aria-hidden="true"
        />
      </div>

      <nav
        className="px-8 pb-12 pt-8 md:px-16 md:pb-16 lg:px-24"
        aria-label="Experience timeline navigation"
      >
        <div className="mb-4 flex justify-end">
          <div className="flex items-center gap-4">
            <button
              onClick={goPrev}
              className="group"
              aria-label="Previous experience"
              disabled={activeIndex === 0}
            >
              <LongArrowLeft
                className={`h-2.5 w-10 transition-all duration-300 md:h-3 md:w-12 ${
                  activeIndex === 0
                    ? "text-[var(--text-subtle)] opacity-30"
                    : "text-[var(--text-subtle)] group-hover:-translate-x-1 group-hover:text-[var(--text)]"
                }`}
              />
            </button>
            <button
              onClick={goNext}
              className="group"
              aria-label="Next experience"
              disabled={activeIndex === EXPERIENCES.length - 1}
            >
              <LongArrowRight
                className={`h-2.5 w-10 transition-all duration-300 md:h-3 md:w-12 ${
                  activeIndex === EXPERIENCES.length - 1
                    ? "text-[var(--text-subtle)] opacity-30"
                    : "text-[var(--text-subtle)] group-hover:translate-x-1 group-hover:text-[var(--text)]"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute left-0 right-0 top-1 h-px bg-[var(--text-subtle)]"
            aria-hidden="true"
          />

          <div className="relative flex justify-between" role="tablist">
            {EXPERIENCES.map((exp, index) => (
              <button
                key={exp.company}
                onClick={() => scrollToCard(index)}
                className="group flex flex-col items-center gap-2"
                role="tab"
                aria-selected={activeIndex === index}
                aria-label={`View ${exp.company} experience (${exp.period})`}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-all duration-500 ${
                    activeIndex === index
                      ? "scale-150 bg-[var(--text)]"
                      : "bg-[var(--text-subtle)] group-hover:bg-[var(--text-muted)]"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`font-[family-name:var(--font-mono)] text-[9px] tracking-[0.1em] transition-colors duration-300 md:text-[10px] ${
                    activeIndex === index
                      ? "text-[var(--text)]"
                      : "text-[var(--text-subtle)] group-hover:text-[var(--text-muted)]"
                  }`}
                >
                  {exp.endYear}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--text-subtle)]">
            15+ years in web development
          </span>
        </div>
      </nav>
    </section>
  );
};

export default ExperienceSection;
