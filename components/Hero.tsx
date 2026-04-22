"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { FaGithub, FaLinkedin, FaPhone } from "react-icons/fa";
import { LuMousePointer2 } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import type { SanitySiteInfo, SanityContact } from "@/lib/sanity.types";
import type { IconType } from "react-icons";

const contactIconMap: Record<string, IconType> = {
  email: MdEmail,
  github: FaGithub,
  linkedin: FaLinkedin,
  phone: FaPhone,
};

/* ── Fallback data ── */

const fallbackContacts: SanityContact[] = [
  { type: "email", label: "danielekerh@gmail.com", url: "mailto:danielekerh@gmail.com" },
  { type: "github", label: "github.com/DanielEkerhovd", url: "https://github.com/DanielEkerhovd" },
  { type: "linkedin", label: "linkedin.com/in/daniel-ekerhovd", url: "https://www.linkedin.com/in/daniel-ekerhovd/" },
  { type: "phone", label: "+47 948 65 253", url: "tel:+4794865253" },
];

const fallbackSiteInfo: SanitySiteInfo = {
  _id: "fallback",
  welcomeText: "Welcome to the portifolio of",
  name: "Daniel Ekerhovd",
  role: "Frontend Developer",
  shortDescriptions: [
    "Im a frontend developer based in Rosendal, Norway",
    "I specialize in web development B2B - Creating creative solutions for client pains",
  ],
  longDescriptions: [
    "Since i was little ive been fascinated by technology, while needing to find creative outlets for my energy. Coding turned out to be the perfect mix of creativity and technicality.",
    "I started out doing small freelance jobs, building websites for local businesses. Currently working with B2B sales, while doing webdev on the side",
  ],
  contacts: fallbackContacts,
};

interface HeroProps {
  isExpanded: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  onClose: () => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  flex: number;
  siteInfo: SanitySiteInfo | null;
}

const cubic = "cubic-bezier(0.25, 0.1, 0.25, 1)";
const dur = "0.4s";
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
      desc: { fontSize: "1rem", lineHeight: "1.625rem" },
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
  siteInfo: siteInfoProp,
}: HeroProps) {
  const info = siteInfoProp ?? fallbackSiteInfo;
  const contacts = info.contacts?.length ? info.contacts : fallbackContacts;
  const sizes = getSizes(isCollapsed, isExpanded);

  const [showHint, setShowHint] = useState(false);
  const hintTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (localStorage.getItem("hero-hint-seen")) return;
    hintTimerRef.current = setTimeout(() => setShowHint(true), 2000);
    return () => {
      if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isExpanded) {
      localStorage.setItem("hero-hint-seen", "1");
      setShowHint(false);
      if (hintTimerRef.current) {
        clearTimeout(hintTimerRef.current);
        hintTimerRef.current = null;
      }
    }
  }, [isExpanded]);

  const hintVisible = showHint && !isExpanded;

  const revealTransition = isExpanded
    ? `grid-template-rows 0.4s ${cubic} 0.2s, opacity 0.35s ${cubic} 0.3s`
    : `opacity 0.35s ${cubic}, grid-template-rows 0.4s ${cubic} 0.05s`;

  const contactTransition = isExpanded
    ? `grid-template-columns 0.45s ${cubic} 0.65s, opacity 0.35s ${cubic} 0.65s`
    : `opacity 0.1s ${cubic}, grid-template-columns 0.15s ${cubic}`;

  return (
    <motion.section
      onClick={isExpanded ? undefined : onClick}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      style={{
        flexGrow: flex,
        flexShrink: 0,
        flexBasis: 0,
        transition: `flex-grow 0.4s ${cubic}`,
      }}
      className={`h-full bg-foreground/70 backdrop-blur-sm border border-secondary/30 shadow-lg rounded-sm flex relative cursor-pointer overflow-hidden
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

      <div className="flex flex-row items-center">
        {/* Contact sidebar — slides in from left when expanded */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isExpanded ? "1fr" : "0fr",
            opacity: isExpanded ? 1 : 0,
            transition: contactTransition,
          }}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-5 pr-6 border-r border-secondary/30 mr-6">
              {contacts.map((contact, i) => {
                const Icon = contactIconMap[contact.type];
                return (
                  <a
                    key={contact.label}
                    href={contact.url}
                    target={contact.url.startsWith("http") ? "_blank" : undefined}
                    rel={
                      contact.url.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center justify-end gap-3 text-secondary hover:text-white transition-colors group"
                    style={{
                      fontSize: "0.875rem",
                      opacity: isExpanded ? 1 : 0,
                      transform: isExpanded
                        ? "translateX(0)"
                        : "translateX(-10px)",
                      transition: isExpanded
                        ? `opacity 0.3s ${cubic} ${0.72 + i * 0.07}s, transform 0.3s ${cubic} ${0.72 + i * 0.07}s, color 0.2s`
                        : `opacity 0.05s ${cubic}, transform 0.05s ${cubic}, color 0.2s`,
                    }}
                  >
                    <span className="whitespace-nowrap">{contact.label}</span>
                    {Icon && (
                      <Icon
                        size={16}
                        className="shrink-0 group-hover:scale-110 transition-transform"
                      />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main content */}
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
              {info.welcomeText}
            </p>
            <h1
              className="font-semibold"
              style={{ ...sizes.name, transition: cssTransition }}
            >
              {info.name}
            </h1>
            <p
              className="text-secondary font-subtext pb-4"
              style={{ ...sizes.role, transition: cssTransition }}
            >
              {info.role}
            </p>
          </div>

          {/* Description - always rendered, animates size */}
          <div className="font-light">
            {info.shortDescriptions.map((line, i) => (
              <p key={i} style={{ ...sizes.desc, transition: cssTransition }}>
                {line}
              </p>
            ))}
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
              {info.longDescriptions.map((paragraph, i) => (
                <p
                  key={i}
                  className={`max-w-xl font-light ${i > 0 ? "pt-3" : ""}`}
                  style={{ ...sizes.desc, transition: cssTransition }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Click-to-expand hint — appears after 3s, hides when expanded */}
      <style>{`
        @keyframes click-pointer {
          0%, 62%  { transform: scale(1); }
          68%      { transform: scale(0.72); }
          75%      { transform: scale(1); }
          100%     { transform: scale(1); }
        }
        @keyframes click-circle {
          0%, 68%  { transform: scale(0); opacity: 0; }
          70%      { opacity: 1; transform: scale(0.2); }
          84%      { opacity: 0; transform: scale(2.2); }
          100%     { opacity: 0; }
        }
        @keyframes click-shoot {
          0%, 76%  { opacity: 0; transform: translateX(4px) scaleX(0); }
          80%      { opacity: 1; transform: translateX(6px) scaleX(0.4); }
          97%      { opacity: 0; transform: translateX(14px) scaleX(1); }
          100%     { opacity: 0; }
        }
      `}</style>
      <div
        className="absolute bottom-5 right-5 flex items-center gap-3 pointer-events-none"
        style={{
          opacity: hintVisible ? 1 : 0,
          transform: hintVisible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <span className="text-secondary text-xs tracking-widest uppercase font-medium">
          Click card to expand
        </span>
        <div className="relative flex items-center justify-center w-10 h-10 text-secondary">
          {/* Burst origin anchored to cursor tip (top-left of icon) */}
          <span className="absolute" style={{ top: "32%", left: "32%" }}>
            {/* Expanding ring */}
            <span
              className="absolute rounded-full border border-current"
              style={{
                width: 8,
                height: 8,
                marginLeft: -4,
                marginTop: -4,
                animationName: "click-circle",
                animationDuration: "2.4s",
                animationTimingFunction: "ease-out",
                animationIterationCount: "infinite",
                animationPlayState: hintVisible ? "running" : "paused",
              }}
            />
            {/* Burst lines */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
              <span
                key={angle}
                className="absolute"
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: "0 0",
                }}
              >
                <span
                  className="absolute"
                  style={{
                    width: 6,
                    height: 1.5,
                    borderRadius: 1,
                    background: "currentColor",
                    transformOrigin: "left center",
                    animationName: "click-shoot",
                    animationDuration: "2.4s",
                    animationTimingFunction: "ease-out",
                    animationIterationCount: "infinite",
                    animationPlayState: hintVisible ? "running" : "paused",
                  }}
                />
              </span>
            ))}
          </span>
          {/* Pointer with click press */}
          <span
            className="relative z-10"
            style={{
              animationName: "click-pointer",
              animationDuration: "2.4s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationPlayState: hintVisible ? "running" : "paused",
            }}
          >
            <LuMousePointer2 size={20} />
          </span>
        </div>
      </div>
    </motion.section>
  );
}
