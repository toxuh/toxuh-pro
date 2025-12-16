"use client";

import { useRef, useState } from "react";

import { useInView } from "@/hooks/use-in-view";

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
    role: "Lead Frontend Developer",
    location: "remote",
    period: "Jun 2021 — Oct 2025",
    startYear: 2021,
    endYear: 2025,
    highlights: [
      "Built a fullstack app from scratch with Next.js, Tailwind, and Prisma",
      "Led frontend architecture and complete redesign for two products",
      "Managed a small team and established dev processes",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "Prisma",
      "PostgreSQL",
    ],
  },
  {
    company: "Etc. Professional Translators",
    type: "B2B Platform",
    role: "Frontend Developer",
    location: "remote",
    period: "Jan 2019 — Jun 2021",
    startYear: 2019,
    endYear: 2021,
    highlights: [
      "Developed a secure B2B translation platform from ground up",
      "Worked in a lean frontend pair with close backend collaboration",
      "Introduced Scrum practices across the development team",
    ],
    stack: ["React", "Redux", "Redux-Saga", "CRA"],
  },
  {
    company: "Stafory",
    type: "HR Tech",
    role: "Frontend Developer",
    location: "remote",
    period: "Jun 2017 — Nov 2018",
    startYear: 2017,
    endYear: 2018,
    highlights: [
      "Built internal HR automation tools with React and MobX",
      "Developed a Chrome extension for workflow automation",
    ],
    stack: ["React", "MobX", "Chrome Extensions"],
  },
  {
    company: "Vsemayki.ru",
    type: "E-commerce",
    role: "Frontend Developer",
    location: "on-site",
    period: "Nov 2012 — Jun 2017",
    startYear: 2012,
    endYear: 2017,
    highlights: [
      "Built product catalog and shopping cart interfaces",
      "Developed custom print designer tool for merchandise",
      "Optimized frontend performance for high-traffic pages",
    ],
    stack: ["JavaScript", "jQuery", "React", "CSS3"],
  },
  {
    company: "Wow, Digital Agency",
    type: "Creative Agency",
    role: "Markup Developer",
    location: "on-site",
    period: "Jan 2010 — Oct 2012",
    startYear: 2010,
    endYear: 2012,
    highlights: [
      "Crafted pixel-perfect layouts for corporate websites and landing pages",
      "Built responsive email templates with cross-client compatibility",
      "Ensured cross-browser support across IE6+ and modern browsers",
    ],
    stack: ["HTML", "CSS", "JavaScript", "jQuery"],
  },
];

const ExperienceSection = () => {
  const { ref: sectionRef, isInView: isVisible } = useInView<HTMLElement>({
    threshold: 0.3,
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollHorizontally, setCanScrollHorizontally] = useState(true);

  const currentIndexRef = useRef(0);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - containerCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex === currentIndexRef.current) return;

    currentIndexRef.current = closestIndex;
    setActiveIndex(closestIndex);
    setCanScrollHorizontally(closestIndex < EXPERIENCES.length - 1);
  };

  const scrollToCard = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, EXPERIENCES.length - 1));

    const container = scrollContainerRef.current;
    const card = cardsRef.current[clampedIndex];
    if (!container || !card) return;

    const styles = getComputedStyle(container);
    const scrollPaddingLeft = parseFloat(styles.scrollPaddingLeft || "0") || 0;
    const targetLeft = card.offsetLeft - scrollPaddingLeft;

    if (
      clampedIndex === currentIndexRef.current &&
      container.scrollLeft === targetLeft
    )
      return;

    currentIndexRef.current = clampedIndex;
    setActiveIndex(clampedIndex);

    container.scrollTo({
      left: targetLeft,
      behavior: "smooth",
    });

    setCanScrollHorizontally(clampedIndex < EXPERIENCES.length - 1);
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh snap-start flex-col overflow-hidden"
    >
      <div className="flex items-start justify-between px-8 py-12 md:px-16 md:py-16 lg:px-24">
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--text-subtle)]">
          03
        </span>
        <h2
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
      >
        {EXPERIENCES.map((exp, index) => (
          <div
            key={exp.company}
            ref={(el) => {
              cardsRef.current[index] = el;
            }}
            className="flex w-[85vw] flex-shrink-0 flex-col justify-center snap-start md:w-[80vw] lg:w-[75vw]"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
            }}
          >
            <div className="flex flex-col gap-6 md:flex-row md:gap-12 lg:gap-20">
              <div className="relative flex flex-col">
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
                  <span className="h-1 w-1 rounded-full bg-[var(--text-subtle)]" />
                  <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-[var(--text-subtle)]">
                    {exp.location}
                  </span>
                </div>

                <ul className="mb-6 space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[var(--text-muted)] md:text-sm"
                    >
                      <span className="mt-2 h-px w-4 flex-shrink-0 bg-[var(--text-subtle)]" />
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--text-subtle)] transition-colors duration-300 hover:text-[var(--text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="w-[15vw] flex-shrink-0 md:w-[20vw] lg:w-[25vw]" />
      </div>

      <div className="px-8 pb-12 pt-8 md:px-16 md:pb-16 lg:px-24">
        <div className="relative">
          <div className="absolute left-0 right-0 top-1 h-px bg-[var(--text-subtle)]" />

          <div className="relative flex justify-between">
            {EXPERIENCES.map((exp, index) => (
              <button
                key={exp.company}
                onClick={() => scrollToCard(index)}
                className="group flex flex-col items-center gap-2"
              >
                <div
                  className={`h-2 w-2 rounded-full transition-all duration-500 ${
                    activeIndex === index
                      ? "scale-150 bg-[var(--text)]"
                      : "bg-[var(--text-subtle)] group-hover:bg-[var(--text-muted)]"
                  }`}
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
            10+ years in web development
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
            {canScrollHorizontally ? "← Scroll →" : ""}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
