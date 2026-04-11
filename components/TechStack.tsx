"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

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

interface SkillItem {
  label: string;
  icon: ReactNode;
}

const techStack: SkillItem[] = [
  { label: "React", icon: <SiReact /> },
  { label: "Next.js", icon: <SiNextdotjs /> },
  { label: "TypeScript", icon: <SiTypescript /> },
  { label: "Tailwind CSS", icon: <SiTailwindcss /> },
  { label: "Vite", icon: <SiVite /> },
  { label: "Figma", icon: <SiFigma /> },
];

const otherSkills: SkillItem[] = [
  { label: "B2B Sales", icon: <HiOutlineBriefcase /> },
  { label: "UX Design", icon: <HiOutlinePencilSquare /> },
  { label: "Project Management", icon: <HiOutlineClipboardDocumentList /> },
  { label: "Client Relations", icon: <HiOutlineUserGroup /> },
  { label: "Dungeon Master", icon: <SiDungeonsanddragons /> },
  { label: "DJ", icon: <TbVinyl /> },
];

function SkillCard({
  label,
  icon,
  variant = "light",
  compact = false,
  staggerIndex = 0,
}: {
  label: string;
  icon: ReactNode;
  variant?: "light" | "dark";
  compact?: boolean;
  staggerIndex?: number;
}) {
  const styles =
    variant === "dark"
      ? "bg-secondary text-white/90 border-secondary/40 hover:bg-secondary/80"
      : "bg-background/70 text-text/80 border-secondary/15 hover:bg-background hover:border-secondary/30";

  return (
    <motion.span
      layout
      transition={{
        layout: {
          type: "tween",
          ease: [0.25, 0.1, 0.25, 1],
          duration: 0.3,
          delay: staggerIndex * 0.025,
        },
      }}
      style={{ willChange: "transform" }}
      className={`flex items-center justify-center rounded-lg border shadow-sm font-medium
        ${
          compact
            ? "flex-col gap-0.5 w-16 h-16 text-[0.5rem]"
            : "flex-col gap-1 w-28 h-20 text-[0.65rem]"
        } ${styles}`}
    >
      <span
        className={`${compact ? "text-xs" : "text-lg"} ${variant === "dark" ? "text-white/70" : "text-secondary"}`}
      >
        {icon}
      </span>
      <span className="text-center leading-tight max-w-full px-1">
        {label}
      </span>
    </motion.span>
  );
}

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
      className={`h-full bg-foreground/70 backdrop-blur-xl border border-secondary/30 shadow-lg rounded-sm flex flex-col items-center justify-center relative cursor-pointer overflow-hidden
        ${isCollapsed ? "opacity-90 hover:opacity-100" : ""}
      `}
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
          <p>Tech Stack — Expanded Content</p>
        </div>
      )}

      {/* === DEFAULT & COLLAPSED STATES === */}
      {!isExpanded && (
        <div
          className={`w-full h-full flex overflow-hidden
            ${
              isHCollapse
                ? "flex-row items-center justify-center gap-2 p-3"
                : isVCollapse
                  ? "flex-row items-center justify-center gap-2 p-2"
                  : "flex-col items-center justify-center gap-5 p-5"
            }`}
        >
          {/* Tech Stack */}
          <div
            className={`flex flex-col ${
              isCollapsed ? "items-center gap-0.5" : "items-center gap-2"
            }`}
          >
            <h3
              className={`font-semibold uppercase tracking-wider text-secondary ${
                isVCollapse ? "text-[0.5rem]" : "text-xs"
              }`}
            >
              Tech Stack
            </h3>
            <div
              className={`grid ${
                isHCollapse
                  ? "grid-cols-1 gap-1"
                  : isVCollapse
                    ? "grid-cols-6 gap-1"
                    : "grid-cols-3 gap-2 justify-items-center"
              }`}
            >
              {techStack.map((item, i) => (
                <SkillCard
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  variant="dark"
                  compact={isCollapsed}
                  staggerIndex={i}
                />
              ))}
            </div>
          </div>

          {/* Beyond Code */}
          <div
            className={`flex flex-col ${
              isCollapsed ? "items-center gap-0.5" : "items-center gap-2"
            }`}
          >
            <h3
              className={`font-semibold uppercase tracking-wider text-secondary ${
                isVCollapse ? "text-[0.5rem]" : "text-xs"
              }`}
            >
              Beyond Code
            </h3>
            <div
              className={`grid ${
                isHCollapse
                  ? "grid-cols-1 gap-1"
                  : isVCollapse
                    ? "grid-cols-6 gap-1"
                    : "grid-cols-3 gap-2 justify-items-center"
              }`}
            >
              {otherSkills.map((item, i) => (
                <SkillCard
                  key={item.label}
                  label={item.label}
                  icon={item.icon}
                  compact={isCollapsed}
                  staggerIndex={i}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
