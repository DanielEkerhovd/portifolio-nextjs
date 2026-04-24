"use client";

import { useState } from "react";

import Hero from "./Hero";
import TechStack from "./TechStack";
import Projects from "./Projects";
import type {
  SanitySiteInfo,
  SanityProject,
  SanitySkill,
  SanityMilestone,
} from "@/lib/sanity.types";

type CardId = "hero" | "tech-stack" | "projects";

interface GridLayoutProps {
  siteInfo: SanitySiteInfo | null;
  projects: SanityProject[];
  techSkills: SanitySkill[];
  beyondSkills: SanitySkill[];
  milestones: SanityMilestone[];
}

export default function GridLayout({
  siteInfo,
  projects,
  techSkills,
  beyondSkills,
  milestones,
}: GridLayoutProps) {
  const [activeCard, setActiveCard] = useState<CardId | null>(null);
  const [hoveredCard, setHoveredCard] = useState<CardId | null>(null);

  const handleCardClick = (id: CardId) => {
    setHoveredCard(null);
    setActiveCard(id);
  };
  const handleClose = () => {
    setHoveredCard(null);
    setActiveCard(null);
  };
  const handleHoverStart = (id: CardId) => {
    if (activeCard === null) setHoveredCard(id);
  };
  const handleHoverEnd = () => setHoveredCard(null);

  const isExpanded = (id: CardId) => activeCard === id;
  const isCollapsed = (id: CardId) =>
    activeCard !== null && activeCard !== id;

  const getHeroFlex = () => {
    if (isExpanded("hero")) return 80;
    if (isCollapsed("hero")) return 20;
    if (hoveredCard === "hero") return 58;
    if (hoveredCard === "tech-stack") return 52;
    return 55;
  };

  const getTechFlex = () => {
    if (isExpanded("tech-stack")) return 30;
    if (isCollapsed("tech-stack")) return 20;
    if (hoveredCard === "tech-stack") return 48;
    if (hoveredCard === "hero") return 42;
    return 45;
  };

  const getTopRowFlex = () => {
    if (isExpanded("projects")) return 2;
    if (activeCard && !isExpanded("projects")) return 4;
    if (hoveredCard === "projects") return 0.95;
    if (hoveredCard === "hero" || hoveredCard === "tech-stack") return 1.03;
    return 1;
  };

  const getBottomRowFlex = () => {
    if (isExpanded("projects")) return 6;
    if (activeCard && !isExpanded("projects")) return 2;
    if (hoveredCard === "projects") return 0.65;
    if (hoveredCard === "hero" || hoveredCard === "tech-stack") return 0.55;
    return 0.6;
  };

  return (
    <div
      className="w-full h-[calc(100dvh-2.5rem)] lg:h-[calc(100dvh-5rem)] flex flex-col gap-5"
    >
      <section
        className="flex gap-5 min-h-0"
        style={{ flexGrow: getTopRowFlex(), flexShrink: 0, flexBasis: 0, transition: "flex-grow 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)" }}
      >
        <Hero
          isExpanded={isExpanded("hero")}
          isCollapsed={isCollapsed("hero")}
          onClick={() => handleCardClick("hero")}
          onClose={handleClose}
          onHoverStart={() => handleHoverStart("hero")}
          onHoverEnd={handleHoverEnd}
          flex={getHeroFlex()}
          siteInfo={siteInfo}
        />
        <TechStack
          isExpanded={isExpanded("tech-stack")}
          isCollapsed={isCollapsed("tech-stack")}
          collapseAxis={activeCard === "hero" ? "horizontal" : activeCard === "projects" ? "vertical" : null}
          isHeroExpanded={isExpanded("hero")}
          onClick={() => handleCardClick("tech-stack")}
          onClose={handleClose}
          onHoverStart={() => handleHoverStart("tech-stack")}
          onHoverEnd={handleHoverEnd}
          flex={getTechFlex()}
          techSkills={techSkills}
          beyondSkills={beyondSkills}
          milestones={milestones}
        />
      </section>
      <Projects
        isExpanded={isExpanded("projects")}
        onClick={() => handleCardClick("projects")}
        onClose={handleClose}
        onHoverStart={() => handleHoverStart("projects")}
        onHoverEnd={handleHoverEnd}
        flex={getBottomRowFlex()}
        projects={projects}
      />
    </div>
  );
}
