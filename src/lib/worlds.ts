export type World = {
  slug: string;
  num: string;
  title: string;
  subtitle: string;
  theme: string;
  accent: string;
};

export const worlds: World[] = [
  { slug: "app-development", num: "01", title: "APP DEVELOPMENT", subtitle: "Building Digital Products.", theme: "Mobile applications, code and digital interfaces.", accent: "from-purple-500/30 to-blue-500/10" },
  { slug: "ui-ux-design", num: "02", title: "UI / UX DESIGN", subtitle: "Designing Experiences.", theme: "Creative layouts, typography and interface design.", accent: "from-blue-500/30 to-cyan-500/10" },
  { slug: "artificial-intelligence", num: "03", title: "ARTIFICIAL INTELLIGENCE", subtitle: "Exploring Intelligence.", theme: "AI neural networks, particles and futuristic intelligence.", accent: "from-pink-500/30 to-purple-500/10" },
  { slug: "creative-technology", num: "04", title: "CREATIVE TECHNOLOGY", subtitle: "Beyond Imagination.", theme: "3D environments, interactive experiences and experimental technology.", accent: "from-indigo-500/30 to-purple-500/10" },
];
