import { createClient } from "next-sanity";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN!,
});

async function seed() {
  console.log("Seeding Sanity with portfolio content...\n");

  // Site Info (singleton)
  console.log("Creating site info...");
  await client.createOrReplace({
    _id: "siteInfo",
    _type: "siteInfo",
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
    contacts: [
      {
        _key: "email",
        type: "email",
        label: "danielekerh@gmail.com",
        url: "mailto:danielekerh@gmail.com",
      },
      {
        _key: "github",
        type: "github",
        label: "github.com/DanielEkerhovd",
        url: "https://github.com/DanielEkerhovd",
      },
      {
        _key: "linkedin",
        type: "linkedin",
        label: "linkedin.com/in/daniel-ekerhovd",
        url: "https://www.linkedin.com/in/daniel-ekerhovd/",
      },
      {
        _key: "phone",
        type: "phone",
        label: "+47 948 65 253",
        url: "tel:+4794865253",
      },
    ],
  });
  console.log("  ✓ Site info created");

  // Projects
  const projects = [
    {
      _id: "project-fjord-booking",
      title: "Fjord Booking",
      description:
        "A full-stack booking platform for tourism businesses along the Norwegian fjords.",
      details:
        "End-to-end booking platform built for fjord-side tourism operators. Features real-time seat availability, multi-step checkout powered by Stripe, and a custom headless CMS for tour operators to manage listings, pricing, and seasonal schedules. Fully server-rendered with Next.js for fast cold-load performance and great SEO.",
      link: "#",
      accent: "from-secondary/60 to-secondary/30",
      tags: [
        { _key: "nextjs", label: "Next.js", icon: "nextjs" },
        { _key: "typescript", label: "TypeScript", icon: "typescript" },
        { _key: "tailwind", label: "Tailwind", icon: "tailwind" },
        { _key: "stripe", label: "Stripe", icon: "stripe" },
      ],
      order: 1,
    },
    {
      _id: "project-brand-studio",
      title: "Brand Studio",
      description:
        "An interactive brand-identity builder that lets clients explore logos, palettes, and typography in real time.",
      details:
        "A browser-based brand identity playground where clients can mix and match logo variants, colour palettes, and typeface pairings before committing to a direction. Pulls live assets directly from the Figma API and animates transitions with Motion so every choice feels polished. Designed to replace lengthy PDF mood-board rounds with a single interactive session.",
      link: "#",
      accent: "from-[#8b7355]/50 to-[#8b7355]/20",
      tags: [
        { _key: "react", label: "React", icon: "react" },
        { _key: "vite", label: "Vite", icon: "vite" },
        { _key: "figma", label: "Figma API", icon: "figma" },
        { _key: "motion", label: "Motion", icon: "cube" },
      ],
      order: 2,
    },
    {
      _id: "project-harvest-dashboard",
      title: "Harvest Dashboard",
      description:
        "A data-visualization dashboard for a local agriculture co-op tracking seasonal yields and market pricing.",
      details:
        "Internal analytics tool for a western Norway agriculture cooperative. Aggregates data from a REST API covering seasonal crop yields, logistics costs, and live market pricing across five regions. Built with D3.js for custom SVG charts and Next.js for data-fetching infrastructure. Includes exportable reports and a configurable alerting system for price thresholds.",
      link: "#",
      accent: "from-[#6b8f5e]/40 to-[#6b8f5e]/15",
      tags: [
        { _key: "nextjs", label: "Next.js", icon: "nextjs" },
        { _key: "d3", label: "D3.js", icon: "d3" },
        { _key: "typescript", label: "TypeScript", icon: "typescript" },
        { _key: "restapi", label: "REST API", icon: "code" },
      ],
      order: 3,
    },
  ];

  console.log("Creating projects...");
  for (const project of projects) {
    await client.createOrReplace({ _type: "project", ...project });
    console.log(`  ✓ ${project.title}`);
  }

  // Tech Skills
  const techSkills = [
    {
      _id: "skill-react",
      label: "React",
      icon: "react",
      detail:
        "Building component-driven interfaces with React since 2020. Experienced with hooks, context, custom abstractions, and performance optimization for complex UIs.",
      category: "tech",
      order: 1,
    },
    {
      _id: "skill-nextjs",
      label: "Next.js",
      icon: "nextjs",
      detail:
        "My go-to framework for production web apps. Comfortable with SSR, SSG, API routes, middleware, and the app router architecture.",
      category: "tech",
      order: 2,
    },
    {
      _id: "skill-typescript",
      label: "TypeScript",
      icon: "typescript",
      detail:
        "TypeScript-first in all projects. Strong with generics, discriminated unions, and building type-safe APIs that catch bugs at compile time.",
      category: "tech",
      order: 3,
    },
    {
      _id: "skill-tailwind",
      label: "Tailwind CSS",
      icon: "tailwind",
      detail:
        "Rapid UI development with utility-first CSS. Skilled at building design systems, responsive layouts, and custom theme configurations.",
      category: "tech",
      order: 4,
    },
    {
      _id: "skill-vite",
      label: "Vite",
      icon: "vite",
      detail:
        "Using Vite for fast dev environments and optimized builds. Experienced with plugin configuration, HMR tuning, and library mode.",
      category: "tech",
      order: 5,
    },
    {
      _id: "skill-figma",
      label: "Figma",
      icon: "figma",
      detail:
        "Bridging design and development. Proficient in component libraries, auto-layout, prototyping, and translating designs into pixel-perfect code.",
      category: "tech",
      order: 6,
    },
  ];

  // Beyond Code Skills
  const beyondSkills = [
    {
      _id: "skill-b2b-sales",
      label: "B2B Sales",
      icon: "briefcase",
      detail:
        "Years of experience in B2B sales, from lead generation to closing enterprise deals. I understand the client journey and how to communicate technical value.",
      category: "beyond",
      order: 1,
    },
    {
      _id: "skill-ux-design",
      label: "UX Design",
      icon: "pencil",
      detail:
        "User-centered design thinking applied to every project. Experienced with user research, wireframing, usability testing, and iterative design processes.",
      category: "beyond",
      order: 2,
    },
    {
      _id: "skill-project-management",
      label: "Project Management",
      icon: "clipboard",
      detail:
        "Leading cross-functional teams with agile methodologies. Comfortable with sprint planning, stakeholder communication, and shipping on time.",
      category: "beyond",
      order: 3,
    },
    {
      _id: "skill-client-relations",
      label: "Client Relations",
      icon: "users",
      detail:
        "Building lasting partnerships with clients through clear communication, expectation management, and consistently delivering value.",
      category: "beyond",
      order: 4,
    },
    {
      _id: "skill-dungeon-master",
      label: "Dungeon Master",
      icon: "dnd",
      detail:
        "Crafting immersive tabletop RPG experiences for years. Storytelling, improvisation, and keeping a group engaged — skills that transfer surprisingly well to tech.",
      category: "beyond",
      order: 5,
    },
    {
      _id: "skill-dj",
      label: "DJ",
      icon: "vinyl",
      detail:
        "Mixing and curating music for events and personal enjoyment. Reading the room and creating atmosphere is an art form I bring to everything I do.",
      category: "beyond",
      order: 6,
    },
  ];

  console.log("Creating skills...");
  for (const skill of [...techSkills, ...beyondSkills]) {
    await client.createOrReplace({ _type: "skill", ...skill });
    console.log(`  ✓ ${skill.label}`);
  }

  // Milestones
  const milestones = [
    {
      _id: "milestone-2020",
      year: "2020",
      title: "Started Coding",
      description: "Wrote my first lines of HTML & CSS",
      order: 1,
    },
    {
      _id: "milestone-2023-grad",
      year: "2023",
      title: "Graduated frontend dev education",
      description:
        "Completed my education as a frontend developer at Noroff - Grade A",
      order: 2,
    },
    {
      _id: "milestone-2023-freelance",
      year: "2023",
      title: "Started freelancing",
      description: "Created WEBvest to kickstart my career. Working B2B",
      order: 3,
    },
    {
      _id: "milestone-2024",
      year: "2024 - Now",
      title: "Enhancing skills in B2B sales",
      description:
        "Working fulltime in B2B sales, while continuously improving my frontend skills through personal projects and freelancing",
      order: 4,
    },
    {
      _id: "milestone-future",
      year: "Future",
      title: "Working fulltime as a dev",
      description:
        "Landing a fulltime role as a frontend developer and continuing to grow my skills",
      order: 5,
    },
  ];

  console.log("Creating milestones...");
  for (const milestone of milestones) {
    await client.createOrReplace({ _type: "milestone", ...milestone });
    console.log(`  ✓ ${milestone.year} - ${milestone.title}`);
  }

  console.log("\nDone! All content seeded successfully.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
