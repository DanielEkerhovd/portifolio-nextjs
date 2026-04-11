"use client";

interface HeroProps {
  isExpanded: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  onClose: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  flex: number;
}

const cubic = "cubic-bezier(0.25, 0.1, 0.25, 1)";
const dur = "0.35s";
const cssTransition = `flex-grow ${dur} ${cubic}, font-size ${dur} ${cubic}, line-height ${dur} ${cubic}, gap ${dur} ${cubic}`;

function getSizes(isCollapsed: boolean, isExpanded: boolean) {
  if (isCollapsed) {
    return {
      welcome: { fontSize: "1.75rem", lineHeight: "2rem" },
      name: { fontSize: "2.25rem", lineHeight: "2.25rem" },
      role: { fontSize: "1.5rem", lineHeight: "1.75rem" },
      desc: { fontSize: "0.75rem", lineHeight: "1.125rem" },
      gap: 6,
      descGap: 14,
    };
  }
  if (isExpanded) {
    return {
      welcome: { fontSize: "2.5rem", lineHeight: "2.75rem" },
      name: { fontSize: "3.5rem", lineHeight: "3.5rem" },
      role: { fontSize: "2rem", lineHeight: "2.5rem" },
      desc: { fontSize: "1.063rem", lineHeight: "1.625rem" },
      gap: 10,
      descGap: 24,
    };
  }
  return {
    welcome: { fontSize: "2.25rem", lineHeight: "2.5rem" },
    name: { fontSize: "3rem", lineHeight: "3rem" },
    role: { fontSize: "1.875rem", lineHeight: "2.25rem" },
    desc: { fontSize: "1rem", lineHeight: "1.5rem" },
    gap: 8,
    descGap: 20,
  };
}

export default function Hero({
  isExpanded,
  isCollapsed,
  onClick,
  onClose,
  onHoverStart,
  onHoverEnd,
  flex,
}: HeroProps) {
  const sizes = getSizes(isCollapsed, isExpanded);

  const revealTransition = isExpanded
    ? `grid-template-rows 0.4s ${cubic} 0.2s, opacity 0.35s ${cubic} 0.3s`
    : `opacity 0.35s ${cubic}, grid-template-rows 0.4s ${cubic} 0.05s`;

  return (
    <section
      onClick={isExpanded ? undefined : onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{ flexGrow: flex, flexShrink: 0, flexBasis: 0, transition: cssTransition }}
      className={`h-full bg-foreground/70 backdrop-blur-xl border border-secondary/30 shadow-lg rounded-sm flex relative cursor-pointer overflow-hidden
        ${isCollapsed ? "opacity-90 hover:opacity-100" : ""} items-center justify-center
      `}
    >
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
        className="flex flex-col"
        style={{ gap: sizes.descGap, transition: cssTransition }}
      >
        {/* Heading block */}
        <div
          className="flex flex-col"
          style={{ gap: sizes.gap, transition: cssTransition }}
        >
          <p
            className="font-subtext font-light text-secondary"
            style={{ ...sizes.welcome, transition: cssTransition }}
          >
            Welcome to the portifolio of
          </p>
          <h1
            className="font-semibold"
            style={{ ...sizes.name, transition: cssTransition }}
          >
            Daniel Ekerhovd
          </h1>
          <p
            className="text-secondary font-subtext pb-4"
            style={{ ...sizes.role, transition: cssTransition }}
          >
            Frontend Developer
          </p>
        </div>

        {/* Description - always rendered, animates size */}
        <div className="font-light">
          <p style={{ ...sizes.desc, transition: cssTransition }}>
            Im a frontend developer based in Rosendal, Norway
          </p>
          <p style={{ ...sizes.desc, transition: cssTransition }}>
            I specialize in web development B2B - Creating creative
            solutions for client pains
          </p>
        </div>

        {/* Expanded paragraph — always in DOM, height animated via grid rows */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: isExpanded ? "1fr" : "0fr",
            opacity: isExpanded ? 1 : 0,
            transition: revealTransition,
          }}
        >
          <div className="overflow-hidden">
            <p
              className="max-w-xl font-light pt-3"
              style={{ ...sizes.desc, transition: cssTransition }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
