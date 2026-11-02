export type Project = {
  slug: string;
  num: string;
  title: string;
  desc: string;
  stack: string[];
  details: string;
};

export const projects: Project[] = [
  {
    slug: "nyra-ai",
    num: "01",
    title: "NYRA AI",
    desc: "A personal AI assistant designed to provide intelligent conversations, voice interaction and desktop assistance.",
    stack: ["Python", "AI APIs", "Voice", "Desktop"],
    details:
      "NYRA AI focuses on natural conversation, voice control and desktop assistance to streamline daily workflows.",
  },
  {
    slug: "villagemart",
    num: "02",
    title: "VILLAGEMART",
    desc: "A modern online shopping platform inspired by quick-commerce applications, designed to connect customers with local markets.",
    stack: ["React", "Node.js", "MongoDB", "Express"],
    details:
      "VillageMart connects customers with local markets through a fast, modern shopping experience.",
  },
  {
    slug: "smart-tourism",
    num: "03",
    title: "SMART TOURISM",
    desc: "An intelligent tourism experience featuring AI travel assistance, interactive maps, 3D experiences and smart exploration.",
    stack: ["Next.js", "Three.js", "AI", "Maps"],
    details:
      "Smart Tourism blends AI travel guidance with immersive 3D and interactive maps.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
