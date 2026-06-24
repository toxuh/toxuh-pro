"use client";

import { type CSSProperties } from "react";

import { useInView } from "@/hooks/use-in-view";

interface Skill {
  name: string;
  note?: string;
  size: "xl" | "lg" | "md" | "sm";
  italic?: boolean;
}

const SKILLS: Skill[] = [
  { name: "React", note: "since 2018", size: "xl" },
  { name: "TypeScript", size: "xl" },
  { name: "Next.js", note: "v16", size: "xl" },
  { name: "Architecture", size: "lg", italic: true },
  { name: "Leadership", size: "lg", italic: true },
  { name: "Node.js", size: "lg" },
  { name: "AI", note: "LLM pipelines", size: "lg" },
  { name: "Python", size: "md" },
  { name: "FastAPI", size: "md" },
  { name: "Mentoring", size: "md", italic: true },
  { name: "PostgreSQL", size: "md" },
  { name: "Prisma", size: "md" },
  { name: "Agile", size: "md", italic: true },
  { name: "TanStack", size: "md" },
  { name: "Redux", size: "md" },
  { name: "Communication", size: "md", italic: true },
  { name: "Tailwind", size: "md" },
  { name: "Shadcn UI", size: "md" },
  { name: "Problem Solving", size: "md", italic: true },
  { name: "Redis", size: "md" },
  { name: "Stripe", size: "md" },
  { name: "Scrum", size: "md", italic: true },
  { name: "REST API", size: "md" },
  { name: "Testing", note: "unit / e2e / integration", size: "md" },
  { name: "Performance", size: "md" },
  { name: "Recharts", size: "sm" },
  { name: "WebSockets / SSE", size: "sm" },
  { name: "Zod", size: "sm" },
  { name: "RAG", size: "sm" },
  { name: "Qdrant", size: "sm" },
  { name: "OpenAI", size: "sm" },
  { name: "Claude", size: "sm" },
  { name: "Gemini", size: "sm" },
  { name: "ARQ / Celery", size: "sm" },
  { name: "Docker", size: "sm" },
  { name: "GitLab CI", size: "sm" },
  { name: "GitHub Actions", size: "sm" },
  { name: "DigitalOcean", size: "sm" },
  { name: "Sentry", size: "sm" },
  { name: "Git", size: "sm" },
  { name: "NestJS", note: "basic", size: "sm" },
  { name: "Bitbucket", note: "shame on me", size: "sm" },
];

const sizeClasses: Record<Skill["size"], string> = {
  xl: "text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-[-0.04em]",
  lg: "text-[clamp(1.5rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em]",
  md: "text-[clamp(1rem,3vw,2rem)] leading-[1] tracking-[-0.02em]",
  sm: "text-[clamp(0.875rem,2vw,1.25rem)] leading-[1.1] tracking-[-0.01em]",
};

const getSkillStyle = (isVisible: boolean, index: number): CSSProperties => ({
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "translateY(0)" : "translateY(20px)",
  transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 40}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 40}ms`,
});

const getSkillNameClassName = (skill: Skill) =>
  `${sizeClasses[skill.size]} ${
    skill.italic
      ? "font-[family-name:var(--font-serif)] text-[var(--text-muted)]"
      : "font-[family-name:var(--font-mono)] text-[var(--text)]"
  } transition-colors duration-300 group-hover:text-[var(--text)]`;

const SkillItem = ({
  skill,
  index,
  isVisible,
}: {
  skill: Skill;
  index: number;
  isVisible: boolean;
}) => (
  <span
    className="group relative inline-flex cursor-default items-baseline"
    style={getSkillStyle(isVisible, index)}
  >
    <span
      className={getSkillNameClassName(skill)}
      style={skill.italic ? { fontStyle: "italic" } : undefined}
    >
      {skill.name}
    </span>
    {skill.note && (
      <span
        className="ml-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--text-subtle)] transition-colors duration-300 group-hover:text-[var(--text-muted)] md:ml-2 md:text-[11px]"
        aria-label={skill.note}
      >
        {skill.note}
      </span>
    )}
  </span>
);

const SkillsSection = () => {
  const { ref: sectionRef, isInView: isVisible } = useInView<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh snap-start flex-col justify-between overflow-hidden px-8 py-12 md:px-16 md:py-16 lg:px-24"
      aria-labelledby="skills-heading"
    >
      <div className="flex items-start justify-between">
        <span
          className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--text-subtle)]"
          aria-hidden="true"
        >
          02
        </span>
        <h2
          id="skills-heading"
          className="font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,4rem)] leading-[0.9] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontStyle: "italic" }}
        >
          Skills
        </h2>
      </div>

      <ul
        className={`flex flex-1 items-center py-8 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Technical and soft skills"
      >
        <li className="flex w-full flex-wrap items-baseline gap-x-[clamp(1rem,3vw,3rem)] gap-y-8">
          {SKILLS.map((skill, index) => (
            <SkillItem
              key={skill.name}
              skill={skill}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </li>
      </ul>

      <div className="flex justify-between">
        <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--text-subtle)]">
          Fullstack capable
        </span>
      </div>
    </section>
  );
};

export default SkillsSection;
