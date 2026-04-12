"use client";

import { useState, useRef, useCallback } from "react";
import Hero from "./Hero";
import TechStack from "./TechStack";
import Projects from "./Projects";

type CardId = "hero" | "tech-stack" | "projects";

const flexTransition = "flex-grow 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)";

export default function GridLayout() {
  const [activeCard, setActiveCard] = useState<CardId | null>(null);
  const [hoveredCard, setHoveredCard] = useState<CardId | null>(null);
  const lockRef = useRef(false);

  const lockHover = useCallback(() => {
    lockRef.current = true;
    setTimeout(() => { lockRef.current = false; }, 400);
  }, []);

  const handleCardClick = (id: CardId) => {
    lockHover();
    setHoveredCard(null);
    setActiveCard(id);
  };

  const handleClose = () => {
    lockHover();
    setHoveredCard(null);
    setActiveCard(null);
  };

  const handleHoverStart = (id: CardId) => {
    if (!lockRef.current) setHoveredCard(id);
  };

  const handleHoverEnd = () => {
    if (!lockRef.current) setHoveredCard(null);
  };

  const isExpanded = (id: CardId) => activeCard === id;
  const isCollapsed = (id: CardId) =>
    activeCard !== null && activeCard !== id;
  const isHovered = (id: CardId) => hoveredCard === id;
  const isHoverSibling = (id: CardId) =>
    hoveredCard !== null && hoveredCard !== id;

  const getHeroFlex = () => {
    if (isExpanded("hero")) return 80;
    if (isCollapsed("hero")) return 20;
    if (isHovered("hero")) return 56;
    if (isHoverSibling("hero") && hoveredCard === "tech-stack") return 54;
    return 55;
  };

  const getTechFlex = () => {
    if (isExpanded("tech-stack")) return 30;
    if (isCollapsed("tech-stack")) return 20;
    if (isHovered("tech-stack")) return 46;
    if (isHoverSibling("tech-stack") && hoveredCard === "hero") return 44;
    return 45;
  };

  const getTopRowFlex = () => {
    if (isExpanded("projects")) return 2;
    if (activeCard && !isExpanded("projects")) return 4;
    if (hoveredCard === "hero" || hoveredCard === "tech-stack") return 1.015;
    if (hoveredCard === "projects") return 0.985;
    return 1;
  };

  const getBottomRowFlex = () => {
    if (isExpanded("projects")) return 6;
    if (activeCard && !isExpanded("projects")) return 2;
    if (hoveredCard === "projects") return 0.615;
    if (hoveredCard === "hero" || hoveredCard === "tech-stack") return 0.585;
    return 0.6;
  };

  return (
    <div className="w-full h-[calc(100dvh-2.5rem)] lg:h-[calc(100dvh-5rem)] flex flex-col gap-5">
      <section
        className="flex gap-5 min-h-0"
        style={{ flexGrow: getTopRowFlex(), flexShrink: 0, flexBasis: 0, transition: flexTransition }}
      >
        <Hero
          isExpanded={isExpanded("hero")}
          isCollapsed={isCollapsed("hero")}
          onClick={() => handleCardClick("hero")}
          onClose={handleClose}
          onHoverStart={() => handleHoverStart("hero")}
          onHoverEnd={handleHoverEnd}
          flex={getHeroFlex()}
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
        />
      </section>
      <Projects
        isExpanded={isExpanded("projects")}
        onClick={() => handleCardClick("projects")}
        onClose={handleClose}
        onHoverStart={() => handleHoverStart("projects")}
        onHoverEnd={handleHoverEnd}
        flex={getBottomRowFlex()}
      />
    </div>
  );
}
