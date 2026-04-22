export interface SanityContact {
  type: "email" | "github" | "linkedin" | "phone";
  label: string;
  url: string;
}

export interface SanitySiteInfo {
  _id: string;
  welcomeText: string;
  name: string;
  role: string;
  shortDescriptions: string[];
  longDescriptions: string[];
  contacts: SanityContact[];
}

export interface SanityTag {
  label: string;
  icon: string;
}

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface SanityProject {
  _id: string;
  title: string;
  description: string;
  details: string;
  link: string;
  accent: string;
  thumbnail?: SanityImage;
  cover?: SanityImage;
  tags: SanityTag[];
  order: number;
}

export interface SanitySkill {
  _id: string;
  label: string;
  icon: string;
  detail: string;
  category: "tech" | "beyond";
  order: number;
}

export interface SanityMilestone {
  _id: string;
  year: string;
  title: string;
  description: string;
  order: number;
}
