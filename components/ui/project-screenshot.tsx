type ProjectScreenshotProps = {
  project: {
    id: string;
    color: string;
  };
};

export const ProjectScreenshot = ({ project }: ProjectScreenshotProps) => (
  <div className="relative overflow-hidden border border-[var(--grid-color)] bg-[var(--bg)]">
    <div className="flex items-center gap-1.5 border-b border-[var(--grid-color)] px-3 py-2">
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--text-subtle)] opacity-40" />
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--text-subtle)] opacity-40" />
      <div className="h-1.5 w-1.5 rounded-full bg-[var(--text-subtle)] opacity-40" />
      <div className="ml-2 flex-1">
        <div className="mx-auto h-1 w-20 rounded-full bg-[var(--grid-color)]" />
      </div>
    </div>
    <div className="relative aspect-[16/9] w-full">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          background: `linear-gradient(135deg, ${project.color} 0%, transparent 70%)`,
        }}
      />
      <div className="absolute inset-0 p-6">
        <div className="mb-4 h-2 w-1/4 rounded bg-[var(--grid-color)]" />
        <div className="mb-2 h-1.5 w-1/2 rounded bg-[var(--grid-color)]" />
        <div className="mb-6 h-1.5 w-1/3 rounded bg-[var(--grid-color)]" />
        <div className="grid grid-cols-4 gap-3">
          <div className="aspect-[4/3] rounded bg-[var(--grid-color)]" />
          <div className="aspect-[4/3] rounded bg-[var(--grid-color)]" />
          <div className="aspect-[4/3] rounded bg-[var(--grid-color)]" />
          <div className="aspect-[4/3] rounded bg-[var(--grid-color)]" />
        </div>
      </div>
      <span
        className="absolute bottom-3 right-4 font-[family-name:var(--font-serif)] text-[clamp(3rem,8vw,6rem)] leading-none tracking-[-0.04em] text-[var(--text-subtle)] opacity-20"
        style={{ fontStyle: "italic" }}
      >
        {project.id}
      </span>
    </div>
  </div>
);
