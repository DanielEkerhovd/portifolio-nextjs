"use client";

import { useState, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";

import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";
import { getIcon } from "@/lib/iconMap";
import { urlFor } from "@/lib/sanity.image";
import type { SanityProject } from "@/lib/sanity.types";

/* ── Types ── */

interface TagItem {
  label: string;
  icon: ReactNode;
}

interface Project {
  title: string;
  description: string;
  details: string;
  tags: TagItem[];
  accent: string;
  link: string;
  thumbnailUrl?: string;
  coverUrl?: string;
}

const defaultAccent = "from-secondary/60 to-secondary/30";

function toProject(sp: SanityProject): Project {
  return {
    title: sp.title,
    description: sp.description,
    details: sp.details,
    link: sp.link || "#",
    accent: sp.accent || defaultAccent,
    thumbnailUrl: sp.thumbnail?.asset?._ref
      ? urlFor(sp.thumbnail).width(600).height(400).fit("crop").auto("format").url()
      : undefined,
    coverUrl: sp.cover?.asset?._ref
      ? urlFor(sp.cover).width(1200).height(630).fit("crop").auto("format").url()
      : undefined,
    tags: (sp.tags || []).map((t) => ({
      label: t.label,
      icon: getIcon(t.icon),
    })),
  };
}

/* ── Fallback Data ── */

const fallbackProjects: Project[] = [
  {
    title: "Fjord Booking",
    description:
      "A full-stack booking platform for tourism businesses along the Norwegian fjords.",
    details:
      "End-to-end booking platform built for fjord-side tourism operators. Features real-time seat availability, multi-step checkout powered by Stripe, and a custom headless CMS for tour operators to manage listings, pricing, and seasonal schedules. Fully server-rendered with Next.js for fast cold-load performance and great SEO.",
    tags: [
      { label: "Next.js", icon: getIcon("nextjs") },
      { label: "TypeScript", icon: getIcon("typescript") },
      { label: "Tailwind", icon: getIcon("tailwind") },
      { label: "Stripe", icon: getIcon("stripe") },
    ],
    accent: "from-secondary/60 to-secondary/30",
    link: "#",
  },
  {
    title: "Brand Studio",
    description:
      "An interactive brand-identity builder that lets clients explore logos, palettes, and typography in real time.",
    details:
      "A browser-based brand identity playground where clients can mix and match logo variants, colour palettes, and typeface pairings before committing to a direction. Pulls live assets directly from the Figma API and animates transitions with Motion so every choice feels polished. Designed to replace lengthy PDF mood-board rounds with a single interactive session.",
    tags: [
      { label: "React", icon: getIcon("react") },
      { label: "Vite", icon: getIcon("vite") },
      { label: "Figma API", icon: getIcon("figma") },
      { label: "Motion", icon: getIcon("cube") },
    ],
    accent: "from-[#8b7355]/50 to-[#8b7355]/20",
    link: "#",
  },
  {
    title: "Harvest Dashboard",
    description:
      "A data-visualization dashboard for a local agriculture co-op tracking seasonal yields and market pricing.",
    details:
      "Internal analytics tool for a western Norway agriculture cooperative. Aggregates data from a REST API covering seasonal crop yields, logistics costs, and live market pricing across five regions. Built with D3.js for custom SVG charts and Next.js for data-fetching infrastructure. Includes exportable reports and a configurable alerting system for price thresholds.",
    tags: [
      { label: "Next.js", icon: getIcon("nextjs") },
      { label: "D3.js", icon: getIcon("d3") },
      { label: "TypeScript", icon: getIcon("typescript") },
      { label: "REST API", icon: getIcon("code") },
    ],
    accent: "from-[#6b8f5e]/40 to-[#6b8f5e]/15",
    link: "#",
  },
];

/* ── Easing ── */

const ease: [number, number, number, number] = [0.4, 0, 0.2, 1];
const dur = "0.4s";
const cubic = "cubic-bezier(0.25, 0.1, 0.25, 1)";

/* ── Unified project card ── */

function ProjectCard({
  project,
  isExpanded,
  isActive,
  totalCount,
  onClick,
}: {
  project: Project;
  isExpanded: boolean;
  isActive: boolean;
  totalCount: number;
  onClick: () => void;
}) {
  // When expanded (vertical column): ≤3 cards each get exactly 1/3, >3 shrink to fit
  const gapPx = 10; // gap-2.5
  const expandedFlex =
    totalCount <= 3
      ? `0 0 calc(33.333% - ${((3 - 1) * gapPx) / 3}px)`
      : "1 1 0";

  return (
    <motion.div
      layout="position"
      transition={{
        layout: { type: "tween", duration: 0.4, ease: [0.4, 0, 0.2, 1] },
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="relative cursor-pointer"
      style={{
        flex: isExpanded ? expandedFlex : "1 1 0",
        height: isExpanded ? undefined : "clamp(140px, 26vh, 260px)",
        minWidth: 0,
        minHeight: 0,
        willChange: "transform",
      }}
    >
      {/* Active ring indicator */}
      {isExpanded && isActive && (
        <motion.div
          layoutId="active-indicator"
          className="absolute inset-0 rounded-lg ring-2 ring-inset ring-secondary/60 pointer-events-none z-10"
          transition={{ type: "tween", duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        />
      )}

      <div
        className={`group w-full h-full text-left flex flex-col rounded-lg border overflow-hidden justify-between
          ${
            isExpanded && isActive
              ? "border-secondary/40 bg-background/80 shadow-md"
              : "border-secondary/15 bg-background/50 hover:border-secondary/30"
          }`}
        style={{
          transition: `border-color 0.2s, background-color 0.2s, box-shadow 0.2s`,
        }}
      >
        {/* Thumbnail */}
        <div
          className={`w-full relative shrink-0 overflow-hidden ${
            project.thumbnailUrl ? "" : `bg-linear-to-br ${project.accent}`
          }`}
          style={{
            height: isExpanded ? 40 : 140,
            transition: `height ${dur} ${cubic}`,
          }}
        >
          {project.thumbnailUrl ? (
            <Image
              src={project.thumbnailUrl}
              alt={project.title}
              fill
              sizes="300px"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col gap-1.5 p-3 opacity-40">
              <div className="w-2/3 h-1.5 rounded-full bg-white/30" />
              <div className="w-1/2 h-1.5 rounded-full bg-white/20" />
              <div className="flex gap-1.5 mt-auto">
                <div className="w-6 h-2 rounded bg-white/25" />
                <div className="w-6 h-2 rounded bg-white/15" />
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 p-2.5 shrink-0 overflow-hidden">
          <div className="flex items-center gap-2">
            <span
              className="font-semibold text-text leading-tight shrink-0"
              style={{
                fontSize: isExpanded ? "0.7rem" : "0.75rem",
                transition: `font-size ${dur} ${cubic}`,
              }}
            >
              {project.title}
            </span>
            {!isExpanded && (
              <HiOutlineArrowTopRightOnSquare className="shrink-0 ml-auto text-secondary/50 text-xs opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </div>
          <p
            className={`leading-relaxed text-text/50 font-light ${
              isExpanded
                ? "text-[0.62rem] line-clamp-2"
                : "text-[0.65rem] line-clamp-2"
            }`}
          >
            {project.description}
          </p>

          {/* Tags — only in collapsed state */}
          <div
            className="flex flex-wrap gap-1.5 pt-1 overflow-hidden justify-self-end"
            style={{
              maxHeight: isExpanded ? 0 : 60,
              opacity: isExpanded ? 0 : 1,
              transition: `max-height 0.3s ${cubic}, opacity 0.25s ${cubic}`,
            }}
          >
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
    </motion.div>
  );
}

/* ── Detail panel (right side when expanded) ── */

function DetailPanel({ project }: { project: Project }) {
  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -6 }}
      transition={{ duration: 0.25, ease }}
      className="flex flex-col h-full gap-4"
    >
      {/* Image / hero gradient */}
      <div
        className={`w-full rounded-lg relative overflow-hidden ${
          (project.coverUrl || project.thumbnailUrl) ? "" : `bg-linear-to-br ${project.accent}`
        }`}
        style={{ minHeight: 120, flexShrink: 0, aspectRatio: "1200/630" }}
      >
        {(project.coverUrl || project.thumbnailUrl) ? (
          <Image
            src={project.coverUrl || project.thumbnailUrl!}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
        ) : (
        <div className="absolute inset-0 opacity-20 flex flex-col gap-3 p-5">
          <div className="w-1/3 h-3 rounded-full bg-white/40" />
          <div className="w-2/3 h-2 rounded-full bg-white/25" />
          <div className="w-1/2 h-2 rounded-full bg-white/20" />
          <div className="flex gap-3 mt-auto">
            <div className="w-16 h-5 rounded bg-white/30" />
            <div className="w-16 h-5 rounded bg-white/15" />
          </div>
        </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-semibold text-text leading-tight">
            {project.title}
          </h4>
          {project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="shrink-0 flex items-center gap-1 text-[0.65rem] font-medium text-secondary hover:text-text transition-colors border border-secondary/30 rounded-lg px-2.5 py-1 hover:bg-secondary/10"
            >
              View project
              <HiOutlineArrowTopRightOnSquare className="text-xs" />
            </a>
          )}
          {project.link === "#" && (
            <span className="shrink-0 text-[0.6rem] font-medium text-secondary/40 border border-secondary/15 rounded-lg px-2.5 py-1">
              Coming soon
            </span>
          )}
        </div>

        <p className="text-xs leading-relaxed text-text/60 font-light">
          {project.details}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className="flex items-center gap-1 text-[0.65rem] font-medium px-2.5 py-1 rounded-lg bg-secondary text-white/90 border border-secondary/40 shadow-sm"
            >
              <span className="text-white/70 text-xs">{tag.icon}</span>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main component ── */

interface ProjectsProps {
  isExpanded: boolean;
  onClick: () => void;
  onClose: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  flex: number;
  projects: SanityProject[];
}

export default function Projects({
  isExpanded,
  onClick,
  onClose,
  onHoverStart,
  onHoverEnd,
  flex,
  projects: sanityProjects,
}: ProjectsProps) {
  const projectList: Project[] =
    sanityProjects.length > 0
      ? sanityProjects.map(toProject)
      : fallbackProjects;

  const [focused, setFocused] = useState<string>(projectList[0].title);
  const [showDetail, setShowDetail] = useState(false);

  // Expand: delay detail panel so cards snake first
  // Collapse: everything fires at once — one unified motion
  useEffect(() => {
    if (isExpanded) {
      const timer = setTimeout(() => setShowDetail(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowDetail(false);
    }
  }, [isExpanded]);

  // Reset focused after collapse animation finishes
  useEffect(() => {
    if (!isExpanded) {
      const timer = setTimeout(() => setFocused(projectList[0].title), 450);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  const focusedProject =
    projectList.find((p) => p.title === focused) ?? projectList[0];

  const handleCardClick = (title: string) => {
    if (isExpanded) {
      setFocused(title);
    } else {
      setFocused(title);
      onClick();
    }
  };

  return (
    <section
      onClick={isExpanded ? undefined : onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        flexGrow: flex,
        flexShrink: 0,
        flexBasis: 0,
        transition: `flex-grow ${dur} ${cubic}`,
      }}
      className="w-full bg-foreground/70 backdrop-blur-sm border border-secondary/30 shadow-lg rounded-sm flex items-center justify-center relative cursor-pointer overflow-hidden"
    >
      {/* Close button */}
      {isExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-white hover:bg-secondary/80 transition-colors z-10"
        >
          ✕
        </button>
      )}

      <div
        className={`w-full h-full flex flex-col overflow-hidden ${
          isExpanded ? "p-6 pr-16" : "p-5"
        }`}
        style={{ transition: `padding ${dur} ${cubic}` }}
      >
        {/* Heading */}
        <h3
          className={`font-semibold text-secondary uppercase tracking-wider text-xs shrink-0 ${
            isExpanded ? "mb-4" : "self-start ml-5 mb-5"
          }`}
          style={{ transition: `margin ${dur} ${cubic}` }}
        >
          Projects
        </h3>

        {/* Content area */}
        <div className="flex gap-5 flex-1 min-h-0">
          {/* Cards — switches between horizontal row and vertical column */}
          <div
            className={
              isExpanded
                ? "flex flex-col gap-2.5 shrink-0"
                : "flex flex-row gap-4 w-full px-5 self-center items-center"
            }
            style={{ width: isExpanded ? 300 : undefined }}
          >
            {projectList.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                isExpanded={isExpanded}
                isActive={focused === project.title}
                totalCount={projectList.length}
                onClick={() => handleCardClick(project.title)}
              />
            ))}
          </div>

          {/* Divider + Detail panel — fade in after cards settle, vanish instantly on close */}
          {isExpanded && showDetail && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, ease }}
                className="w-px bg-secondary/15 shrink-0 self-stretch"
              />

              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease }}
                className="flex-1 min-w-0"
              >
                <AnimatePresence mode="wait">
                  <DetailPanel
                    key={focusedProject.title}
                    project={focusedProject}
                  />
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
