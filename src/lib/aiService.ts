export type ChatMessage = { role: "user" | "assistant"; content: string };

export interface AIProvider {
  generateResponse(messages: ChatMessage[]): Promise<string>;
}

const knowledge = [
  {
    keywords: ["who", "shivam", "about", "introduction"],
    answer:
      "Shivam Yadav is a B.Tech student and digital creator passionate about software engineering, AI, and building innovative digital products. He transforms ideas into meaningful digital experiences.",
  },
  {
    keywords: ["education", "study", "btech", "college", "student"],
    answer:
      "Shivam is currently pursuing a B.Tech degree, exploring software engineering, artificial intelligence, and real-world product development.",
  },
  {
    keywords: ["skill", "tech", "stack", "tools", "technologies"],
    answer:
      "Shivam works with Python, JavaScript, React, Next.js, Tailwind CSS, Node.js, Express.js, Supabase, MongoDB, Three.js, GSAP, Framer Motion, and AI API integration.",
  },
  {
    keywords: ["nyra", "assistant", "voice"],
    answer:
      "NYRA AI is a personal AI assistant with intelligent conversations, voice interaction, and desktop assistance.",
  },
  {
    keywords: ["villagemart", "shopping", "market", "commerce"],
    answer:
      "VillageMart is a modern quick-commerce style platform connecting customers with local markets.",
  },
  {
    keywords: ["tourism", "travel", "map", "3d"],
    answer:
      "Smart Tourism is an intelligent tourism experience with AI travel assistance, interactive maps, and 3D exploration.",
  },
  {
    keywords: ["project", "work", "portfolio"],
    answer:
      "Shivam's selected projects: NYRA AI, VillageMart, and Smart Tourism.",
  },
  {
    keywords: ["contact", "connect", "email", "hire", "github", "linkedin", "instagram"],
    answer:
      "You can connect via the Contact section or through GitHub, LinkedIn, and Instagram links on the portfolio.",
  },
];

class LocalKnowledgeProvider implements AIProvider {
  async generateResponse(messages: ChatMessage[]): Promise<string> {
    const last = messages[messages.length - 1]?.content.toLowerCase() ?? "";
    const found = knowledge.find((k) => k.keywords.some((kw) => last.includes(kw)));
    return found
      ? found.answer
      : "I'm SHIVAM AI, a local assistant. Ask about Shivam, projects, skills, education, or contact.";
  }
}

// Future: replace with Gemini/OpenAI provider. Never expose keys in frontend.
export const aiService: AIProvider = new LocalKnowledgeProvider();
