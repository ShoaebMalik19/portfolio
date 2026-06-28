export type Project = {
  name: string;
  description: string;
  techStack: string;
  github?: string;
  demo?: string;
  demoLabel?: string;
  githubLabel?: string;
};

export const projects: Project[] = [
  {
    name: "PayShard Wallet",
    description: "A blockchain-powered wallet that simplifies decentralized payments through a modern and intuitive user experience.",
    techStack: "React, Next.js, Node.js, Web3",
    demo: "https://pay-shard-wallet-tl5z.vercel.app/",
    github: "https://github.com/ShoaebMalik19/PayShard-Wallet"
  },
  {
    name: "TruthStamp",
    description: "A digital authenticity platform that verifies content integrity and builds trust through verifiable proof.",
    techStack: "React, Blockchain, Web3",
    demo: "https://truth-stamp-6a1k.vercel.app/",
    github: "https://github.com/ShoaebMalik19/Truth_stamp"
  },
  {
    name: "Proof.Market",
    description: "A decentralized prediction market where opinions become transparent, measurable and verifiable.",
    techStack: "React, Next.js, Blockchain, Smart Contracts",
    demo: "https://prediction-market-three-iota.vercel.app/",
    github: "https://github.com/ShoaebMalik19/Prediction-Market"
  },
  {
    name: "AI-FI Platform",
    description: "A full-stack event management platform for hackathons, workshops and technical communities.",
    techStack: "React, Node.js, Express, Excel Integration",
    demo: "https://ai-fi-website-962s.vercel.app/",
    github: "https://github.com/ShoaebMalik19/ai-fi-website"
  },
  {
    name: "LakshyaAI",
    description: "An AI-powered career guidance platform developed during Decode SIH with OSCode 2025.",
    techStack: "Python, AI, LLM, RAG",
    github: "https://github.com/ShoaebMalik19/LakshyaAI",
    demoLabel: "Concept Build"
  },
  {
    name: "Crime Detector",
    description: "An AI-assisted crime analysis system that identifies patterns from structured and unstructured crime data.",
    techStack: "Python, Machine Learning, Data Analysis",
    github: "https://github.com/ShoaebMalik19/Crime_detector-",
    demoLabel: "Concept Build"
  },
  {
    name: "Feedback Analyzer",
    description: "An AI-powered sentiment analysis platform that converts user feedback into actionable insights.",
    techStack: "Python, Transformers, NLP, Django",
    github: "https://github.com/ShoaebMalik19/feedback-analyzer",
    demoLabel: "Concept Build"
  },
  {
    name: "Trading RAG",
    description: "An AI-powered Retrieval-Augmented Generation system for trading research, market context and intelligent financial analysis.",
    techStack: "Python, RAG, LLMs, Vector Database",
    demoLabel: "Coming Soon",
    githubLabel: "Coming Soon"
  }
];
