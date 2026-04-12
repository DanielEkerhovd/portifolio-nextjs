"use client";

import { useState, useEffect, type ReactNode } from "react";
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
import { LuMousePointer2 } from "react-icons/lu";

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
    year: "2020",
    title: "Started Coding",
    description: "Wrote my first lines of HTML & CSS",
  },
  {
    year: "2023",
    title: "Graduated frontend dev education",
    description: "Completed my education as a frontend developer at Noroff - Grade A",
  },
  {
    year: "2023",
    title: "Started freelancing",
    description: "Created WEBvest to kickstart my career. Working B2B",
  },
  {
    year: "2024 - Now",
    title: "Enhancing skills in B2B sales",
    description: "Working fulltime in B2B sales, while continuously improving my frontend skills through personal projects and freelancing",
  },
  {
    year: "Future",
    title: "Working fulltime as a dev",
    description: "Landing a fulltime role as a frontend developer and continuing to grow my skills",
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
    <div className="w-full px-4 py-4">
      <div className="relative flex items-stretch gap-2">
        {/* Horizontal line */}
        <div className="absolute top-3.75 left-4 right-4 h-px bg-secondary/30" />

        {items.map((m, i) => (
          <motion.div
            key={`${m.year}-${m.title}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.07 }}
            transition={{
              opacity: { duration: 0.3, delay: 0.35 + i * 0.08 },
              y: { duration: 0.3, delay: 0.35 + i * 0.08 },
              scale: { type: "spring", stiffness: 300, damping: 22 },
            }}
            className="group relative flex flex-col items-center flex-1 w-0 rounded-lg px-2 py-2 hover:bg-secondary hover:border-secondary/40 hover:shadow-lg hover:z-10 border border-transparent transition-colors duration-200"
          >
            {/* Dot */}
            <div className="relative w-3.5 h-3.5 z-10 shrink-0">
              {m.year === "2024 - Now" && (
                <span className="absolute inset-0 rounded-full bg-secondary group-hover:bg-white animate-ping opacity-60 transition-colors duration-200" />
              )}
              <div className="w-full h-full rounded-full bg-secondary group-hover:bg-white border-2 border-foreground/70 group-hover:border-secondary/40 transition-colors duration-200" />
            </div>

            {/* Content */}
            <span className="text-[0.7rem] font-semibold text-secondary group-hover:text-white mt-2 transition-colors duration-200">
              {m.year}
            </span>
            <span className="text-xs font-medium text-text/80 group-hover:text-white/90 mt-0.5 text-center leading-tight transition-colors duration-200">
              {m.title}
            </span>
            <span className="text-[0.6rem] text-text/50 group-hover:text-white/70 font-light mt-0.5 max-w-25 leading-tight border-l border-l-secondary group-hover:border-l-white/40 pl-2 transition-colors duration-200">
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
  variant = "light",
  isCompact = false,
  isExpandedView = false,
  isActive = false,
  staggerIndex = 0,
  onSelect,
}: {
  label: string;
  icon: ReactNode;
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
        <motion.span
          key={String(isExpandedView)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.15,
            delay: isExpandedView ? staggerIndex * 0.025 + 0.15 : 0,
          }}
          className={`flex flex-col items-center ${isCompact ? "gap-0.5" : "gap-1"}`}
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
      </motion.span>
    </motion.div>
  );
}

/* ── Main component ── */

const flexTransition = "flex-grow 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)";

interface TechStackProps {
  isExpanded: boolean;
  isCollapsed: boolean;
  collapseAxis: "horizontal" | "vertical" | null;
  isHeroExpanded: boolean;
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
  isHeroExpanded,
  onClick,
  onClose,
  onHoverStart,
  onHoverEnd,
  flex,
}: TechStackProps) {
  const isHCollapse = isCollapsed && collapseAxis === "horizontal";
  const isVCollapse = isCollapsed && collapseAxis === "vertical";
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!isHeroExpanded) {
      setShowHint(false);
      return;
    }
    if (localStorage.getItem("tech-hint-seen")) return;
    const timer = setTimeout(() => setShowHint(true), 5000);
    return () => clearTimeout(timer);
  }, [isHeroExpanded]);

  useEffect(() => {
    if (isExpanded) {
      localStorage.setItem("tech-hint-seen", "1");
      setShowHint(false);
    }
  }, [isExpanded]);

  const hintVisible = showHint && !isExpanded;

  const toggleSkill = (label: string) => {
    setActiveSkill((prev) => (prev === label ? null : label));
  };

  const handleClose = () => {
    setActiveSkill(null);
    onClose();
  };

  const handleSkillClick = (label: string) => {
    onClick();
    setTimeout(() => setActiveSkill(label), 350);
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
      className={`h-full bg-foreground/70 backdrop-blur-xl border border-secondary/30 shadow-lg rounded-sm flex flex-col justify-center gap-10 relative cursor-pointer overflow-hidden
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
          paddingRight: isExpanded
            ? 32
            : isHCollapse
              ? 12
              : isVCollapse
                ? 8
                : 20,
          paddingBottom: isExpanded
            ? 16
            : isHCollapse
              ? 12
              : isVCollapse
                ? 8
                : 20,
          paddingLeft: isExpanded
            ? 32
            : isHCollapse
              ? 12
              : isVCollapse
                ? 8
                : 20,
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
          <motion.h3
            key={`tech-heading-${isExpanded}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: isExpanded ? 0.2 : 0 }}
            className={`font-semibold uppercase tracking-wider text-secondary ${
              isVCollapse ? "text-[0.5rem]" : "text-xs"
            }`}
          >
            Tech Stack
          </motion.h3>
          <div className={cardGridClasses}>
            {techStack.map((item, i) => (
              <SkillCard
                key={item.label}
                label={item.label}
                icon={item.icon}
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
          {(() => {
            const item = isExpanded && activeSkill ? techStack.find((i) => i.label === activeSkill) : null;
            return (
              <AnimatePresence>
                {item && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease }}
                    className="overflow-hidden w-full"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease }}
                        className="bg-secondary rounded-lg border border-secondary/40 border-l-2 border-l-white/25 px-5 py-4"
                      >
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-white/60 text-lg">{item.icon}</span>
                          <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">{item.label}</span>
                        </div>
                        <p className="text-xs leading-relaxed text-white/70 font-light">
                          {item.detail}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })()}
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
          <motion.h3
            key={`beyond-heading-${isExpanded}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: isExpanded ? 0.2 : 0 }}
            className={`font-semibold uppercase tracking-wider text-secondary ${
              isVCollapse ? "text-[0.5rem]" : "text-xs"
            }`}
          >
            Beyond Code
          </motion.h3>
          <div className={cardGridClasses}>
            {otherSkills.map((item, i) => (
              <SkillCard
                key={item.label}
                label={item.label}
                icon={item.icon}
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
          {(() => {
            const item = isExpanded && activeSkill ? otherSkills.find((i) => i.label === activeSkill) : null;
            return (
              <AnimatePresence>
                {item && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease }}
                    className="overflow-hidden w-full"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease }}
                        className="bg-background/70 rounded-lg border border-secondary/15 border-l-2 border-l-secondary px-5 py-4"
                      >
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-secondary text-lg">{item.icon}</span>
                          <span className="text-xs font-semibold text-text/80 uppercase tracking-wider">{item.label}</span>
                        </div>
                        <p className="text-xs leading-relaxed text-text/70 font-light">
                          {item.detail}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })()}
        </div>
      </div>

      {/* Tech hint — click animation, shown when Hero is focused */}
      <style>{`
        @keyframes ts-click-pointer {
          0%, 62%  { transform: scale(1); }
          68%      { transform: scale(0.72); }
          75%      { transform: scale(1); }
          100%     { transform: scale(1); }
        }
        @keyframes ts-click-circle {
          0%, 68%  { transform: scale(0); opacity: 0; }
          70%      { opacity: 1; transform: scale(0.2); }
          84%      { opacity: 0; transform: scale(2.2); }
          100%     { opacity: 0; }
        }
        @keyframes ts-click-shoot {
          0%, 76%  { opacity: 0; transform: translateX(4px) scaleX(0); }
          80%      { opacity: 1; transform: translateX(6px) scaleX(0.4); }
          97%      { opacity: 0; transform: translateX(14px) scaleX(1); }
          100%     { opacity: 0; }
        }
      `}</style>
      <div
        className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-3 pointer-events-none"
        style={{
          opacity: hintVisible ? 1 : 0,
          transform: hintVisible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <span className="text-secondary text-xs tracking-widest uppercase font-medium whitespace-nowrap">
          My journey and skills
        </span>
        <div className="relative flex items-center justify-center w-10 h-10 text-secondary">
          <span className="absolute" style={{ top: "32%", left: "32%" }}>
            <span
              className="absolute rounded-full border border-current"
              style={{
                width: 8,
                height: 8,
                marginLeft: -4,
                marginTop: -4,
                animationName: "ts-click-circle",
                animationDuration: "2.4s",
                animationTimingFunction: "ease-out",
                animationIterationCount: "infinite",
              }}
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <span
                key={angle}
                className="absolute"
                style={{ transform: `rotate(${angle}deg)`, transformOrigin: "0 0" }}
              >
                <span
                  className="absolute"
                  style={{
                    width: 6,
                    height: 1.5,
                    borderRadius: 1,
                    background: "currentColor",
                    transformOrigin: "left center",
                    animationName: "ts-click-shoot",
                    animationDuration: "2.4s",
                    animationTimingFunction: "ease-out",
                    animationIterationCount: "infinite",
                  }}
                />
              </span>
            ))}
          </span>
          <span
            className="relative z-10"
            style={{
              animationName: "ts-click-pointer",
              animationDuration: "2.4s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }}
          >
            <LuMousePointer2 size={20} />
          </span>
        </div>
      </div>

      {/* Timeline — expanded only */}
      {isExpanded && (
        <div className="w-full px-8 pb-6">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.35 }}
            className="font-semibold uppercase tracking-wider text-secondary text-xs mb-1"
          >
            Journey
          </motion.h3>
          <Timeline items={milestones} />
        </div>
      )}
    </section>
  );
}
