import type { ReactNode } from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVite,
  SiFigma,
  SiStripe,
  SiDungeonsanddragons,
} from "react-icons/si";
import {
  HiOutlineBriefcase,
  HiOutlinePencilSquare,
  HiOutlineClipboardDocumentList,
  HiOutlineUserGroup,
  HiOutlineCodeBracket,
  HiOutlineChartBar,
  HiOutlineCube,
} from "react-icons/hi2";
import { TbVinyl } from "react-icons/tb";

const iconMap: Record<string, ReactNode> = {
  // Tech
  react: <SiReact />,
  nextjs: <SiNextdotjs />,
  typescript: <SiTypescript />,
  tailwind: <SiTailwindcss />,
  vite: <SiVite />,
  figma: <SiFigma />,
  stripe: <SiStripe />,

  // Beyond code
  briefcase: <HiOutlineBriefcase />,
  pencil: <HiOutlinePencilSquare />,
  clipboard: <HiOutlineClipboardDocumentList />,
  users: <HiOutlineUserGroup />,
  dnd: <SiDungeonsanddragons />,
  vinyl: <TbVinyl />,

  // Project tags
  d3: <HiOutlineChartBar />,
  code: <HiOutlineCodeBracket />,
  cube: <HiOutlineCube />,
};

export function getIcon(key: string): ReactNode {
  return iconMap[key] ?? null;
}
