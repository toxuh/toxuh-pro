"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

import { LongArrowLeft, LongArrowRight } from "@/components/ui/long-arrows";
import { ProjectScreenshot } from "@/components/ui/project-screenshot";
import { useInView } from "@/hooks/use-in-view";

interface Project {
  id: string;
  name: string;
  description: string;
  type: string;
  stack: string[];
  image?: string;
  actions: ProjectAction[];
  color: string;
}

interface ProjectAction {
  type: "project" | "github";
  href: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    name: "VOZ",
    description:
      "GEO/AEO analytics SaaS that tracks brand visibility across ChatGPT, Claude, Perplexity, and Gemini — mentions, sentiment, and share of voice",
    type: "AI Analytics SaaS",
    image: "voz.webp",
    stack: ["Next.js 16", "FastAPI", "PostgreSQL", "ARQ / Redis", "Stripe", "LLMs"],
    actions: [{ type: "project", href: "https://voz.ad" }],
    color: "#3B82F6",
  },
  {
    id: "02",
    name: "DGT Practice",
    description:
      "AI-powered prep for the Spanish DGT driving theory exam — spaced repetition, adaptive practice, and readiness scoring",
    type: "Telegram Mini App",
    image: "dgt.webp",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Telegram API", "OpenAI"],
    actions: [{ type: "project", href: "https://t.me/spain_dgt_bot" }],
    color: "#3B82F6",
  },
  {
    id: "03",
    name: "WriteAs",
    description:
      "AI writing SaaS that learns your style from uploaded samples and generates on-brand content across formats",
    type: "AI Writing SaaS",
    image: "writeas.webp",
    stack: ["Next.js", "FastAPI", "Qdrant", "OpenAI", "Stripe"],
    actions: [{ type: "project", href: "https://writeas.pro" }],
    color: "#3B82F6",
  },
  {
    id: "04",
    name: "DFM",
    description:
      "Music tool for live streamers — real-time on-air display, shareable playlists, and streaming/donation integrations",
    type: "Web App",
    image: "dfm.webp",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Node.js", "YouTube API"],
    actions: [{ type: "project", href: "https://driler.fm" }],
    color: "#3B82F6",
  },
];

const normalizeProjectIndex = (index: number) =>
  (index + PROJECTS.length) % PROJECTS.length;

const ProjectControls = ({
  onPrev,
  onNext,
}: {
  onPrev: () => void;
  onNext: () => void;
}) => (
  <div className="pointer-events-auto absolute -top-[10px] right-0 z-10 flex items-center gap-4">
    <button onClick={onPrev} className="group" aria-label="Previous project">
      <LongArrowLeft className="h-2.5 w-10 text-[var(--text-subtle)] transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[var(--text)] md:h-3 md:w-12" />
    </button>
    <button onClick={onNext} className="group" aria-label="Next project">
      <LongArrowRight className="h-2.5 w-10 text-[var(--text-subtle)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--text)] md:h-3 md:w-12" />
    </button>
  </div>
);

const ProjectMedia = ({ project }: { project: Project }) => (
  <div className="w-full lg:w-[56%] xl:w-[56%]">
    {project.image ? (
      <Image
        src={`/projects/${project.image}`}
        alt={project.name}
        className="w-full rounded-2xl"
        width={1920}
        height={1080}
        sizes="(min-width: 1024px) 700px, 100vw"
      />
    ) : (
      <ProjectScreenshot project={project} />
    )}
  </div>
);

const ViewProjectLink = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-3 border border-[var(--grid-color)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] transition-all duration-300 hover:border-[var(--text-subtle)] hover:text-[var(--text)] md:text-xs"
  >
    <span>View Project</span>
    <ExternalLink className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
  </a>
);

const GithubLink = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-3 border border-[var(--grid-color)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] transition-all duration-300 hover:border-[var(--text-subtle)] hover:text-[var(--text)] md:text-xs"
  >
    <span>GitHub</span>
    <Github className="h-3 w-3 transition-transform duration-300 group-hover:translate-y-[-1px]" />
  </a>
);

const ProjectActionLink = ({ action }: { action: ProjectAction }) =>
  action.type === "project" ? (
    <ViewProjectLink href={action.href} />
  ) : (
    <GithubLink href={action.href} />
  );

const ProjectActions = ({ actions }: { actions: ProjectAction[] }) => (
  <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
    {actions.map((action) => (
      <ProjectActionLink
        key={`${action.type}-${action.href}`}
        action={action}
      />
    ))}
  </div>
);

const ProjectDetails = ({ project }: { project: Project }) => (
  <div className="flex flex-col items-center text-center lg:w-[40%] lg:items-start lg:text-left xl:w-[40%]">
    <div className="mb-2 flex items-baseline gap-3">
      <span
        className="font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,4rem)] leading-none tracking-[-0.04em] text-[var(--text-subtle)]"
        style={{ fontStyle: "italic" }}
      >
        {project.id}
      </span>
      <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.3em] text-[var(--text-subtle)]">
        {project.type}
      </span>
    </div>

    <h3 className="mb-3 font-[family-name:var(--font-mono)] text-2xl tracking-[-0.02em] text-[var(--text)] md:text-3xl">
      {project.name}
    </h3>

    <p className="mb-4 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[var(--text-muted)] md:text-sm">
      {project.description}
    </p>

    <ul className="mb-4 flex flex-wrap justify-center gap-2 lg:justify-start">
      {project.stack.map((tech) => (
        <li
          key={tech}
          className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-[var(--text-subtle)] md:text-[10px]"
        >
          {tech}
        </li>
      ))}
    </ul>

    <ProjectActions actions={project.actions} />
  </div>
);

const ProjectPagination = ({
  activeIndex,
  onSelect,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
}) => (
  <nav className="flex items-center justify-between">
    <div className="md:hidden" />

    <div className="flex items-center gap-2">
      {PROJECTS.map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`h-px transition-all duration-300 ${
            activeIndex === index
              ? "w-8 bg-[var(--text)]"
              : "w-4 bg-[var(--text-subtle)] hover:bg-[var(--text-muted)]"
          }`}
          aria-label={`Go to project ${index + 1}`}
        />
      ))}
    </div>

    <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--text-subtle)]">
      {String(activeIndex + 1).padStart(2, "0")} /{" "}
      {String(PROJECTS.length).padStart(2, "0")}
    </span>
  </nav>
);

const projectKeyOffsets: Record<string, number> = {
  ArrowRight: 1,
  ArrowLeft: -1,
};

const ProjectsSection = () => {
  const { ref: sectionRef, isInView: isVisible } = useInView<HTMLElement>({
    threshold: 0.2,
  });
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex(normalizeProjectIndex(index));
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating],
  );

  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const offset = projectKeyOffsets[e.key];
      if (offset === undefined) return;

      goTo(activeIndex + offset);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, goTo]);

  const activeProject = PROJECTS[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative flex h-svh snap-start flex-col overflow-hidden px-8 py-12 md:px-16 md:py-16 lg:px-24"
      aria-labelledby="projects-carousel-heading"
    >
      <div className="flex items-start justify-between">
        <span
          className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.3em] text-[var(--text-subtle)]"
          aria-hidden="true"
        >
          04
        </span>
        <h2
          id="projects-carousel-heading"
          className="font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,4rem)] leading-[0.9] tracking-[-0.03em] text-[var(--text)]"
          style={{ fontStyle: "italic" }}
        >
          Projects
        </h2>
      </div>

      <div className="relative flex flex-1 items-center justify-center gap-8 py-6 lg:gap-16">
        <div
          className="relative flex max-w-6xl flex-1 flex-col items-center gap-6 lg:flex-row lg:gap-12 xl:max-w-[78rem]"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <ProjectControls onPrev={goPrev} onNext={goNext} />

          <ProjectMedia project={activeProject} />
          <ProjectDetails project={activeProject} />
        </div>
      </div>

      <ProjectPagination activeIndex={activeIndex} onSelect={goTo} />
    </section>
  );
};

export default ProjectsSection;
