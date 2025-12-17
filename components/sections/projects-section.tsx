"use client";

import { useState, useEffect, useCallback } from "react";
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
  link?: string;
  github?: string;
  color: string;
}

const PROJECTS: Project[] = [
  {
    id: "01",
    name: "Finflow",
    description:
      "Financial analytics dashboard with real-time data visualization and portfolio tracking",
    type: "Dashboard",
    stack: ["Next.js", "TypeScript", "Tailwind", "Recharts"],
    link: "https://finflow.demo",
    github: "https://github.com/example/finflow",
    color: "#3B82F6",
  },
  {
    id: "02",
    name: "Nomad",
    description:
      "Platform connecting digital nomads with co-working spaces and communities worldwide",
    type: "Platform",
    stack: ["React", "Node.js", "PostgreSQL", "MapboxGL"],
    link: "https://nomad.demo",
    github: "https://github.com/example/nomad",
    color: "#10B981",
  },
  {
    id: "03",
    name: "Artisan",
    description:
      "E-commerce marketplace for handcrafted goods with custom storefront builder",
    type: "E-commerce",
    stack: ["Next.js", "Prisma", "Stripe", "Cloudinary"],
    link: "https://artisan.demo",
    github: "https://github.com/example/artisan",
    color: "#F59E0B",
  },
  {
    id: "04",
    name: "Pulse",
    description:
      "Real-time application monitoring with customizable alerts and performance metrics",
    type: "Monitoring",
    stack: ["React", "WebSockets", "D3.js", "Redis"],
    link: "https://pulse.demo",
    github: "https://github.com/example/pulse",
    color: "#EF4444",
  },
  {
    id: "05",
    name: "Chronicle",
    description:
      "Modern blog platform with AI-powered content suggestions and MDX support",
    type: "CMS",
    stack: ["Next.js", "OpenAI", "MDX", "Vercel"],
    link: "https://chronicle.demo",
    github: "https://github.com/example/chronicle",
    color: "#8B5CF6",
  },
  {
    id: "06",
    name: "Velocity",
    description:
      "Performance testing suite for web applications with detailed metrics and reports",
    type: "DevTools",
    stack: ["TypeScript", "Playwright", "Node.js", "Charts"],
    link: "https://velocity.demo",
    github: "https://github.com/example/velocity",
    color: "#06B6D4",
  },
  {
    id: "07",
    name: "Habitat",
    description:
      "Smart home dashboard integrating IoT devices with voice control and automation",
    type: "IoT",
    stack: ["React", "MQTT", "Node.js", "WebSockets"],
    link: "https://habitat.demo",
    github: "https://github.com/example/habitat",
    color: "#84CC16",
  },
  {
    id: "08",
    name: "Meridian",
    description:
      "Travel planning app with AI-powered itinerary suggestions and booking integration",
    type: "Travel",
    stack: ["Next.js", "OpenAI", "Prisma", "Stripe"],
    link: "https://meridian.demo",
    github: "https://github.com/example/meridian",
    color: "#EC4899",
  },
];

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
      const newIndex = (index + PROJECTS.length) % PROJECTS.length;
      setActiveIndex(newIndex);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating],
  );

  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
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
          className="relative flex max-w-7xl xl:max-w-[88rem] flex-1 flex-col items-center gap-6 lg:flex-row lg:gap-12"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <div className="pointer-events-auto absolute -top-[10px] right-0 z-10 flex items-center gap-4">
            <button
              onClick={goPrev}
              className="group"
              aria-label="Previous project"
            >
              <LongArrowLeft className="h-2.5 w-10 text-[var(--text-subtle)] transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[var(--text)] md:h-3 md:w-12" />
            </button>
            <button
              onClick={goNext}
              className="group"
              aria-label="Next project"
            >
              <LongArrowRight className="h-2.5 w-10 text-[var(--text-subtle)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--text)] md:h-3 md:w-12" />
            </button>
          </div>

          <div className="w-full lg:w-[66%] xl:w-[68%]">
            <ProjectScreenshot project={activeProject} />
          </div>

          <div className="flex flex-col items-center text-center lg:w-[34%] xl:w-[32%] lg:items-start lg:text-left">
            <div className="mb-2 flex items-baseline gap-3">
              <span
                className="font-[family-name:var(--font-serif)] text-[clamp(2rem,5vw,4rem)] leading-none tracking-[-0.04em] text-[var(--text-subtle)]"
                style={{ fontStyle: "italic" }}
              >
                {activeProject.id}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.3em] text-[var(--text-subtle)]">
                {activeProject.type}
              </span>
            </div>

            <h3 className="mb-3 font-[family-name:var(--font-mono)] text-2xl tracking-[-0.02em] text-[var(--text)] md:text-3xl">
              {activeProject.name}
            </h3>

            <p className="mb-4 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[var(--text-muted)] md:text-sm">
              {activeProject.description}
            </p>

            <ul className="mb-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {activeProject.stack.map((tech) => (
                <li
                  key={tech}
                  className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.15em] text-[var(--text-subtle)] md:text-[10px]"
                >
                  {tech}
                </li>
              ))}
            </ul>

            {(activeProject.link || activeProject.github) && (
              <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 border border-[var(--grid-color)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] transition-all duration-300 hover:border-[var(--text-subtle)] hover:text-[var(--text)] md:text-xs"
                  >
                    <span>View Project</span>
                    <ExternalLink className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                )}
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 border border-[var(--grid-color)] px-4 py-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)] transition-all duration-300 hover:border-[var(--text-subtle)] hover:text-[var(--text)] md:text-xs"
                  >
                    <span>GitHub</span>
                    <Github className="h-3 w-3 transition-transform duration-300 group-hover:translate-y-[-1px]" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <nav className="flex items-center justify-between">
        <div className="md:hidden" />

        <div className="flex items-center gap-2">
          {PROJECTS.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
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
    </section>
  );
};

export default ProjectsSection;
