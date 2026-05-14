import Link from "next/link";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
  label?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      target="_blank"
      className="glass-panel interactive-lift group block p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-black text-white">{project.title}</h3>
        <span className="rounded-lg border border-white/10 bg-white/[0.06] px-2 py-1 text-xs text-[var(--mist-300)]">
          {project.label ?? "GitHub"}
        </span>
      </div>

      <p className="mt-3 leading-7 text-[var(--mist-300)]">
        {project.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags[0] ? <span className="pill text-xs">{project.tags[0]}</span> : null}
        {project.tags[1] ? <span className="pill text-xs">{project.tags[1]}</span> : null}
        {project.tags[2] ? <span className="pill text-xs">{project.tags[2]}</span> : null}
        {project.tags[3] ? <span className="pill text-xs">{project.tags[3]}</span> : null}
      </div>

      <div className="mt-5 font-mono text-sm font-bold text-[var(--accent-300)] transition duration-300 group-hover:translate-x-1 group-hover:text-white">
        View project -&gt;
      </div>
    </Link>
  );
}
