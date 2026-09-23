"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";

import { LongArrowLeft, LongArrowRight } from "@/components/ui/long-arrows";
import { ProjectScreenshot } from "@/components/ui/project-screenshot";
import { useInView } from "@/hooks/use-in-view";
import { useSnapCarousel } from "@/hooks/use-snap-carousel";

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
    name: "Driler FM",
    description:
      "Music tool for live streamers — real-time on-air display, shareable playlists, and streaming/donation integrations",
    type: "Web App",
    image: "dfm.webp",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Node.js", "YouTube API"],
    actions: [{ type: "project", href: "https://driler.fm" }],
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
];

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
  <div className="flex items-center justify-between">
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
  </div>
);

const projectKeyOffsets: Record<string, number> = {
  ArrowRight: 1,
  ArrowLeft: -1,
};

const ProjectsSection = () => {
  const { ref: sectionRef, isInView: isVisible } = useInView<HTMLElement>({
    threshold: 0.2,
  });
  const {
    scrollContainerRef,
    activeIndex,
    handleScroll,
    scrollToCard,
    goPrev,
    goNext,
    setCardRef,
  } = useSnapCarousel(PROJECTS.length);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const offset = projectKeyOffsets[e.key];
      if (offset === undefined) return;

      scrollToCard(activeIndex + offset);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToCard]);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-svh snap-start flex-col overflow-hidden"
      aria-labelledby="projects-carousel-heading"
    >
      <div className="flex items-start justify-between px-8 py-12 md:px-16 md:py-16 lg:px-24">
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

      <div
        ref={scrollContainerRef}
        className="scrollbar-hide flex flex-1 gap-8 overflow-x-auto snap-x snap-mandatory px-8 scroll-pl-8 md:px-16 md:scroll-pl-16 lg:px-24 lg:scroll-pl-24"
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        role="list"
        aria-label="Projects carousel"
      >
        {PROJECTS.map((project, index) => (
          <article
            key={project.id}
            ref={setCardRef(index)}
            className="flex w-[85vw] flex-shrink-0 flex-col items-center justify-center gap-6 snap-start md:w-[80vw] lg:w-[80vw] lg:flex-row lg:gap-12"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 100}ms`,
            }}
            aria-label={`${project.name} — ${project.type}`}
          >
            <ProjectMedia project={project} />
            <ProjectDetails project={project} />
          </article>
        ))}
        <div
          className="w-[15vw] flex-shrink-0 md:w-[20vw] lg:w-[20vw]"
          aria-hidden="true"
        />
      </div>

      <nav
        className="px-8 pb-12 pt-8 md:px-16 md:pb-16 lg:px-24"
        aria-label="Projects navigation"
      >
        <div className="mb-4 flex justify-end">
          <div className="flex items-center gap-4">
            <button
              onClick={goPrev}
              className="group"
              aria-label="Previous project"
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
              aria-label="Next project"
              disabled={activeIndex === PROJECTS.length - 1}
            >
              <LongArrowRight
                className={`h-2.5 w-10 transition-all duration-300 md:h-3 md:w-12 ${
                  activeIndex === PROJECTS.length - 1
                    ? "text-[var(--text-subtle)] opacity-30"
                    : "text-[var(--text-subtle)] group-hover:translate-x-1 group-hover:text-[var(--text)]"
                }`}
              />
            </button>
          </div>
        </div>

        <ProjectPagination activeIndex={activeIndex} onSelect={scrollToCard} />
      </nav>
    </section>
  );
};

export default ProjectsSection;
