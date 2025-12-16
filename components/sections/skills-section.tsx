"use client";

import { type CSSProperties, useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  note?: string;
  size: "xl" | "lg" | "md" | "sm";
  italic?: boolean;
}

const SKILLS: Skill[] = [
  { name: "React", note: "since 2018", size: "xl" },
  { name: "TypeScript", size: "xl" },
  { name: "Next.js", note: "v14+", size: "xl" },
  { name: "Architecture", size: "lg", italic: true },
  { name: "Leadership", size: "lg", italic: true },
  { name: "TanStack", size: "lg" },
  { name: "Redux", size: "lg" },
  { name: "Node.js", size: "md" },
  { name: "Performance", size: "md" },
  { name: "Tailwind", size: "md" },
  { name: "Shadcn UI", size: "md" },
  { name: "Ant Design", size: "md" },
  { name: "Testing", note: "unit / e2e / integration", size: "md" },
  { name: "Mentoring", size: "md", italic: true },
  { name: "Git", size: "md" },
  { name: "REST API", size: "md" },
  { name: "PostgreSQL", size: "md" },
  { name: "Zod", size: "md" },
  { name: "Vite", size: "md" },
  { name: "Sentry", size: "md" },
  { name: "AI", size: "md" },
  { name: "Communication", size: "md", italic: true },
  { name: "WebSockets", size: "sm" },
  { name: "Prisma", size: "sm" },
  { name: "Docker", size: "sm" },
  { name: "GitHub Actions", size: "sm" },
  { name: "GitLab CI", size: "sm" },
  { name: "Bitbucket", note: "shame on me", size: "sm" },
  { name: "MongoDB", size: "sm" },
  { name: "Webpack", note: "basic", size: "sm" },
  { name: "Kubernetes", note: "basic", size: "sm" },
  { name: "Python", note: "basic", size: "sm" },
  { name: "AWS / DO", note: "basic", size: "sm" },
  { name: "Agile", size: "sm", italic: true },
  { name: "Scrum", size: "sm", italic: true },
  { name: "Problem Solving", size: "sm", italic: true },
];

const sizeClasses: Record<Skill["size"], string> = {
  xl: "text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]",
  lg: "text-[clamp(1.5rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em]",
  md: "text-[clamp(1rem,3vw,2rem)] leading-[1] tracking-[-0.02em]",
  sm: "text-[clamp(0.875rem,2vw,1.25rem)] leading-[1.1] tracking-[-0.01em]",
};

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh snap-start flex-col justify-between overflow-hidden px-8 py-12 md:px-16 md:py-16 lg:px-24"
    >
      <div className="flex items-start justify-between">
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--text-subtle)]">
          02
        </span>
        <h2
          className="font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,4rem)] leading-[0.9] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontStyle: "italic" }}
        >
          Skills
        </h2>
      </div>

      <div
        className={`flex flex-1 items-center py-8 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex w-full flex-wrap items-baseline gap-x-[clamp(1rem,3vw,3rem)] gap-y-8">
          {SKILLS.map((skill, index) => {
            const style: CSSProperties = {
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 40}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 40}ms`,
            };

            return (
              <span
                key={skill.name}
                className="group relative inline-flex cursor-default items-baseline"
                style={style}
              >
                <span
                  className={`${sizeClasses[skill.size]} ${
                    skill.italic
                      ? "font-[family-name:var(--font-serif)] text-[var(--text-muted)]"
                      : "font-[family-name:var(--font-mono)] text-[var(--text)]"
                  } transition-colors duration-300 group-hover:text-[var(--text)]`}
                  style={skill.italic ? { fontStyle: "italic" } : undefined}
                >
                  {skill.name}
                </span>
                {skill.note && (
                  <span className="ml-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--text-muted)] md:ml-2 md:text-[11px]">
                    {skill.note}
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--text-subtle)]">
          10+ years experience
        </span>
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--text-subtle)]">
          Frontend Lead
        </span>
      </div>
    </section>
  );
};

export default SkillsSection;
