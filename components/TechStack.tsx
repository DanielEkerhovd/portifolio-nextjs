"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

const cubic = "cubic-bezier(0.25, 0.1, 0.25, 1)";
const dur = "0.35s";
const sizeTransition = `width ${dur} ${cubic}, height ${dur} ${cubic}, gap ${dur} ${cubic}`;

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiFigma,
  SiDungeonsanddragons,
} from "react-icons/si";
import {
  HiOutlineBriefcase,
  HiOutlinePencilSquare,
  HiOutlineClipboardDocumentList,
  HiOutlineUserGroup,
} from "react-icons/hi2";

import { TbVinyl } from "react-icons/tb";

/* ── Data types ── */

interface SkillItem {
  label: string;
  icon: ReactNode;
  detail?: string;
}

interface Milestone {
  year: string;
  title: string;
  description: string;
}

/* ── Timeline data ── */

const milestones: Milestone[] = [
  {
    year: "2019",
    title: "Started Coding",
    description: "Wrote my first lines of HTML & CSS",
  },
  {
    year: "2020",
    title: "First Freelance Gig",
    description: "Built a landing page for a local business",
  },
  {
    year: "2021",
    title: "Went Full-Stack",
    description: "Picked up React & Node.js, never looked back",
  },
  {
    year: "2022",
    title: "Agency Work",
    description: "Joined a digital agency as a frontend developer",
  },
  {
    year: "2023",
    title: "Lead Developer",
    description: "Led a team shipping B2B SaaS products",
  },
  {
    year: "2024",
    title: "Going Independent",
    description: "Launched my own consultancy & product studio",
  },
];

/* ── Skill data ── */

const techStack: SkillItem[] = [
  {
    label: "React",
    icon: <SiReact />,
    detail:
      "Building component-driven interfaces with React since 2020. Experienced with hooks, context, custom abstractions, and performance optimization for complex UIs.",
  },
  {
    label: "Next.js",
    icon: <SiNextdotjs />,
    detail:
      "My go-to framework for production web apps. Comfortable with SSR, SSG, API routes, middleware, and the app router architecture.",
  },
  {
    label: "TypeScript",
    icon: <SiTypescript />,
    detail:
      "TypeScript-first in all projects. Strong with generics, discriminated unions, and building type-safe APIs that catch bugs at compile time.",
  },
  {
    label: "Tailwind CSS",
    icon: <SiTailwindcss />,
    detail:
      "Rapid UI development with utility-first CSS. Skilled at building design systems, responsive layouts, and custom theme configurations.",
  },
  {
    label: "Vite",
    icon: <SiVite />,
    detail:
      "Using Vite for fast dev environments and optimized builds. Experienced with plugin configuration, HMR tuning, and library mode.",
  },
  {
    label: "Figma",
    icon: <SiFigma />,
    detail:
      "Bridging design and development. Proficient in component libraries, auto-layout, prototyping, and translating designs into pixel-perfect code.",
  },
];

const otherSkills: SkillItem[] = [
  {
    label: "B2B Sales",
    icon: <HiOutlineBriefcase />,
    detail:
      "Years of experience in B2B sales, from lead generation to closing enterprise deals. I understand the client journey and how to communicate technical value.",
  },
  {
    label: "UX Design",
    icon: <HiOutlinePencilSquare />,
    detail:
      "User-centered design thinking applied to every project. Experienced with user research, wireframing, usability testing, and iterative design processes.",
  },
  {
    label: "Project Management",
    icon: <HiOutlineClipboardDocumentList />,
    detail:
      "Leading cross-functional teams with agile methodologies. Comfortable with sprint planning, stakeholder communication, and shipping on time.",
  },
  {
    label: "Client Relations",
    icon: <HiOutlineUserGroup />,
    detail:
      "Building lasting partnerships with clients through clear communication, expectation management, and consistently delivering value.",
  },
  {
    label: "Dungeon Master",
    icon: <SiDungeonsanddragons />,
    detail:
      "Crafting immersive tabletop RPG experiences for years. Storytelling, improvisation, and keeping a group engaged — skills that transfer surprisingly well to tech.",
  },
  {
    label: "DJ",
    icon: <TbVinyl />,
    detail:
      "Mixing and curating music for events and personal enjoyment. Reading the room and creating atmosphere is an art form I bring to everything I do.",
  },
];

/* ── Timeline ── */

function Timeline({ items }: { items: Milestone[] }) {
  return (
    <div className="w-full overflow-hidden px-4 py-2">
      <div className="relative flex items-start gap-0">
        {/* Horizontal line */}
        <div className="absolute top-[7px] left-4 right-4 h-px bg-secondary/30" />

        {items.map((m, i) => (
          <motion.div
            key={m.year}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="relative flex flex-col items-center flex-1 min-w-[120px]"
          >
            {/* Dot */}
            <div className="w-3.5 h-3.5 rounded-full bg-secondary border-2 border-foreground/70 z-10 shrink-0" />

            {/* Content */}
            <span className="text-[0.65rem] font-semibold text-secondary mt-2">
              {m.year}
            </span>
            <span className="text-[0.6rem] font-medium text-text/80 mt-0.5">
              {m.title}
            </span>
            <span className="text-[0.5rem] text-text/50 font-light mt-0.5 max-w-[100px] text-center leading-tight">
              {m.description}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Easing ── */

const ease: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

/* ── Unified SkillCard ── */

function SkillCard({
  label,
  icon,
  detail,
  variant = "light",
  isCompact = false,
  isExpandedView = false,
  isActive = false,
  staggerIndex = 0,
  onSelect,
}: {
  label: string;
  icon: ReactNode;
  detail?: string;
  variant?: "light" | "dark";
  isCompact?: boolean;
  isExpandedView?: boolean;
  isActive?: boolean;
  staggerIndex?: number;
  onSelect?: () => void;
}) {
  const styles =
    variant === "dark"
      ? "bg-secondary text-white/90 border-secondary/40 hover:bg-secondary/80"
      : "bg-background/70 text-text/80 border-secondary/15 hover:bg-background hover:border-secondary/30";

  const activeRing =
    isExpandedView && isActive
      ? "ring-2 ring-secondary/60 ring-offset-1 ring-offset-foreground/50"
      : "";

  return (
    <motion.div
      layout
      transition={{
        layout: {
          type: "tween",
          ease,
          duration: 0.3,
          delay: staggerIndex * 0.025,
        },
      }}
      className={`flex flex-col items-center ${isExpandedView ? "w-full" : ""}`}
      style={{ willChange: "transform" }}
    >
      <motion.span
        layout
        onClick={
          onSelect
            ? (e: React.MouseEvent) => {
                e.stopPropagation();
                onSelect();
              }
            : undefined
        }
        className={`flex items-center justify-center rounded-lg border shadow-sm font-medium flex-col transition-shadow
          ${styles} ${activeRing} ${onSelect ? "cursor-pointer" : ""}`}
        style={{
          width: isCompact ? 64 : isExpandedView ? "100%" : 112,
          height: isCompact ? 64 : 80,
          fontSize: isCompact ? "0.5rem" : "0.65rem",
          gap: isCompact ? 2 : 4,
        }}
        transition={{
          layout: {
            type: "tween",
            ease,
            duration: 0.3,
          },
        }}
      >
        <span
          className={variant === "dark" ? "text-white/70" : "text-secondary"}
          style={{
            fontSize: isCompact ? "0.75rem" : "1.125rem",
            transition: `font-size ${dur} ${cubic}`,
          }}
        >
          {icon}
        </span>
        <span className="text-center leading-tight max-w-full px-1">
          {label}
        </span>
      </motion.span>

      <AnimatePresence>
        {isExpandedView && isActive && detail && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            className="overflow-hidden"
          >
            <p className="text-[0.6rem] leading-relaxed text-text/70 font-light mt-2 max-w-28 text-center">
              {detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main component ── */

const flexTransition = "flex-grow 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)";

interface TechStackProps {
  isExpanded: boolean;
  isCollapsed: boolean;
  collapseAxis: "horizontal" | "vertical" | null;
  onClick: () => void;
  onClose: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  flex: number;
}

export default function TechStack({
  isExpanded,
  isCollapsed,
  collapseAxis,
  onClick,
  onClose,
  onHoverStart,
  onHoverEnd,
  flex,
}: TechStackProps) {
  const isHCollapse = isCollapsed && collapseAxis === "horizontal";
  const isVCollapse = isCollapsed && collapseAxis === "vertical";
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const toggleSkill = (label: string) => {
    setActiveSkill((prev) => (prev === label ? null : label));
  };

  const handleClose = () => {
    setActiveSkill(null);
    onClose();
  };

  const handleSkillClick = (label: string) => {
    setActiveSkill(label);
    onClick();
  };

  const cardGridClasses = isHCollapse
    ? "flex flex-col gap-1"
    : isVCollapse
      ? "flex flex-row gap-1"
      : isExpanded
        ? "grid grid-cols-6 gap-2"
        : "grid grid-cols-6 gap-2 justify-items-center";

  return (
    <section
      onClick={isExpanded ? undefined : onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        flexGrow: flex,
        flexShrink: 0,
        flexBasis: 0,
        transition: flexTransition,
      }}
      className={`h-full bg-foreground/70 backdrop-blur-xl border border-secondary/30 shadow-lg rounded-sm flex flex-col relative cursor-pointer overflow-hidden
        ${isCollapsed ? "opacity-90 hover:opacity-100" : ""}
      `}
    >
      {isExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-white hover:bg-secondary/80 transition-colors z-10"
        >
          ✕
        </button>
      )}

      {/* Single unified content area — same cards in all states */}
      <div
        className={`flex ${isHCollapse || isVCollapse ? "flex-row" : "flex-col"} items-center justify-center`}
        style={{
          flexGrow: isExpanded ? 0 : 1,
          flexShrink: 0,
          paddingTop: isExpanded ? 32 : isHCollapse ? 12 : isVCollapse ? 8 : 20,
          paddingRight: isExpanded ? 32 : isHCollapse ? 12 : isVCollapse ? 8 : 20,
          paddingBottom: isExpanded ? 16 : isHCollapse ? 12 : isVCollapse ? 8 : 20,
          paddingLeft: isExpanded ? 32 : isHCollapse ? 12 : isVCollapse ? 8 : 20,
          gap: isExpanded ? 16 : isCollapsed ? 8 : 20,
          transition: `flex-grow ${dur} ${cubic}, padding ${dur} ${cubic}, gap ${dur} ${cubic}`,
        }}
      >
        {/* Tech Stack */}
        <div
          className={`flex flex-col ${
            isCollapsed
              ? "items-center gap-0.5"
              : isExpanded
                ? "w-full gap-2"
                : "items-center gap-2"
          }`}
        >
          <h3
            className={`font-semibold uppercase tracking-wider text-secondary ${
              isVCollapse ? "text-[0.5rem]" : "text-xs"
            }`}
          >
            Tech Stack
          </h3>
          <div className={cardGridClasses}>
            {techStack.map((item, i) => (
              <SkillCard
                key={item.label}
                label={item.label}
                icon={item.icon}
                detail={item.detail}
                variant="dark"
                isCompact={isCollapsed}
                isExpandedView={isExpanded}
                isActive={activeSkill === item.label}
                staggerIndex={i}
                onSelect={() =>
                  isExpanded
                    ? toggleSkill(item.label)
                    : handleSkillClick(item.label)
                }
              />
            ))}
          </div>
        </div>

        {/* Beyond Code */}
        <div
          className={`flex flex-col ${
            isCollapsed
              ? "items-center gap-0.5"
              : isExpanded
                ? "w-full gap-2"
                : "items-center gap-2"
          }`}
        >
          <h3
            className={`font-semibold uppercase tracking-wider text-secondary ${
              isVCollapse ? "text-[0.5rem]" : "text-xs"
            }`}
          >
            Beyond Code
          </h3>
          <div className={cardGridClasses}>
            {otherSkills.map((item, i) => (
              <SkillCard
                key={item.label}
                label={item.label}
                icon={item.icon}
                detail={item.detail}
                isCompact={isCollapsed}
                isExpandedView={isExpanded}
                isActive={activeSkill === item.label}
                staggerIndex={i}
                onSelect={() =>
                  isExpanded
                    ? toggleSkill(item.label)
                    : handleSkillClick(item.label)
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Timeline — expanded only */}
      {isExpanded && (
        <div className="w-full px-8 pb-6">
          <h3 className="font-semibold uppercase tracking-wider text-secondary text-xs mb-3">
            Journey
          </h3>
          <Timeline items={milestones} />
        </div>
      )}
    </section>
  );
}
