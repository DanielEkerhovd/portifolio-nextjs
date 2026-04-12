"use client";

import { type ReactNode } from "react";

import {
  HiOutlineArrowTopRightOnSquare,
  HiOutlineCodeBracket,
  HiOutlineCube,
  HiOutlineChartBar,
} from "react-icons/hi2";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiFigma,
  SiStripe,
} from "react-icons/si";

interface TagItem {
  label: string;
  icon: ReactNode;
}

interface Project {
  title: string;
  description: string;
  tags: TagItem[];
  accent: string;
}

const projects: Project[] = [
  {
    title: "Fjord Booking",
    description:
      "A full-stack booking platform for tourism businesses along the Norwegian fjords. Features real-time availability, payments, and a custom CMS.",
    tags: [
      { label: "Next.js", icon: <SiNextdotjs /> },
      { label: "TypeScript", icon: <SiTypescript /> },
      { label: "Tailwind", icon: <SiTailwindcss /> },
      { label: "Stripe", icon: <SiStripe /> },
    ],
    accent: "from-secondary/60 to-secondary/30",
  },
  {
    title: "Brand Studio",
    description:
      "An interactive brand-identity builder that lets clients explore logos, palettes, and typography in real time before committing to a design direction.",
    tags: [
      { label: "React", icon: <SiReact /> },
      { label: "Vite", icon: <SiVite /> },
      { label: "Figma API", icon: <SiFigma /> },
      { label: "Motion", icon: <HiOutlineCube /> },
    ],
    accent: "from-[#8b7355]/50 to-[#8b7355]/20",
  },
  {
    title: "Harvest Dashboard",
    description:
      "A data-visualization dashboard for a local agriculture co-op, tracking seasonal yields, logistics, and market pricing across western Norway.",
    tags: [
      { label: "Next.js", icon: <SiNextdotjs /> },
      { label: "D3.js", icon: <HiOutlineChartBar /> },
      { label: "TypeScript", icon: <SiTypescript /> },
      { label: "REST API", icon: <HiOutlineCodeBracket /> },
    ],
    accent: "from-[#6b8f5e]/40 to-[#6b8f5e]/15",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group flex flex-col flex-1 min-w-0 bg-background/50 rounded-lg border border-secondary/15 overflow-hidden hover:border-secondary/30 transition-colors">
      {/* Placeholder image */}
      <div
        className={`w-full flex-1 min-h-0 bg-linear-to-br ${project.accent} relative`}
      >
        {/* Fake UI wireframe elements */}
        <div className="absolute inset-0 flex flex-col gap-2 p-4 opacity-40">
          <div className="w-2/3 h-2 rounded-full bg-white/30" />
          <div className="w-1/2 h-2 rounded-full bg-white/20" />
          <div className="flex gap-2 mt-auto">
            <div className="w-8 h-3 rounded bg-white/25" />
            <div className="w-8 h-3 rounded bg-white/15" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 p-3">
        <div className="flex items-center gap-2">
          <h4 className="text-xs font-semibold text-text truncate">{project.title}</h4>
          <HiOutlineArrowTopRightOnSquare className="shrink-0 ml-auto text-secondary/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <p className="text-[0.65rem] leading-relaxed text-text/50 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className="flex items-center gap-1 text-[0.6rem] font-medium px-2 py-1 rounded-lg bg-secondary text-white/90 border border-secondary/40 shadow-sm"
            >
              <span className="text-white/70 text-xs">{tag.icon}</span>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const flexTransition = "flex-grow 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)";

interface ProjectsProps {
  isExpanded: boolean;
  onClick: () => void;
  onClose: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  flex: number;
}

export default function Projects({
  isExpanded,
  onClick,
  onClose,
  onHoverStart,
  onHoverEnd,
  flex,
}: ProjectsProps) {
  return (
    <section
      onClick={isExpanded ? undefined : onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{ flexGrow: flex, flexShrink: 0, flexBasis: 0, transition: flexTransition }}
      className="w-full bg-foreground/70 backdrop-blur-xl border border-secondary/30 shadow-lg rounded-sm flex items-center justify-center relative cursor-pointer overflow-hidden"
    >
      {isExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-white hover:bg-secondary/80 transition-colors"
        >
          ✕
        </button>
      )}

      {/* === EXPANDED STATE === */}
      {isExpanded && (
        <div className="w-full h-full p-8">
          <p>Projects — Expanded Content</p>
        </div>
      )}

      {/* === DEFAULT / COLLAPSED STATE === */}
      {!isExpanded && (
        <div className="w-full h-full p-5 flex flex-col items-center overflow-hidden">
          <h3 className="font-semibold text-secondary uppercase tracking-wider self-start ml-5 mb-5">
            Projects
          </h3>
          <div className="flex gap-4 w-full px-5 flex-1 min-h-0">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
