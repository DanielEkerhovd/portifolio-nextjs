import { client } from "./sanity.client";
import type {
  SanitySiteInfo,
  SanityProject,
  SanitySkill,
  SanityMilestone,
} from "./sanity.types";

export async function getSiteInfo(): Promise<SanitySiteInfo | null> {
  return client.fetch(
    `*[_type == "siteInfo"][0]{
      _id,
      welcomeText,
      name,
      role,
      shortDescriptions,
      longDescriptions,
      contacts[]{ type, label, url }
    }`
  );
}

export async function getProjects(): Promise<SanityProject[]> {
  return client.fetch(
    `*[_type == "project"] | order(order asc){
      _id,
      title,
      description,
      details,
      link,
      accent,
      thumbnail,
      cover,
      tags[]{ label, icon },
      order
    }`
  );
}

export async function getSkills(
  category: "tech" | "beyond"
): Promise<SanitySkill[]> {
  return client.fetch(
    `*[_type == "skill" && category == $category] | order(order asc){
      _id,
      label,
      icon,
      detail,
      category,
      order
    }`,
    { category }
  );
}

export async function getMilestones(): Promise<SanityMilestone[]> {
  return client.fetch(
    `*[_type == "milestone"] | order(order asc){
      _id,
      year,
      title,
      description,
      order
    }`
  );
}
