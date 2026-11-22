export type Project = {
  name: string;
  description: string;
  techStack: string;
  image?: string;
  context?: string;
  github?: string;
  demo?: string;
  demoLabel?: string;
  githubLabel?: string;
};

export const projects: Project[] = [
  {
    name: "Synapse",
    description:
      "Decentralised orchestration for multi-step AI workflows. Plans tasks as a DAG, recovers crashed workers from checkpoints and settles payments on-chain.",
    techStack: "AI Agents, Task DAG, Monad Testnet",
    context: "Presented at Monad Blitz Mumbai",
    image: "/work/synapse.webp",
    demo: "https://synapse-blitz.vercel.app/replay",
    demoLabel: "Live Replay",
    github: "https://github.com/ShoaebMalik19/synapse-blitz"
  },
  {
    name: "PayShard Wallet",
    description: "A blockchain-powered wallet that simplifies decentralized payments through a modern and intuitive user experience.",
    techStack: "React, Next.js, Node.js, Web3",
    image: "/work/payshard.webp",
    demo: "https://pay-shard-wallet-tl5z.vercel.app/",
    github: "https://github.com/ShoaebMalik19/PayShard-Wallet"
  },
  {
    name: "TruthStamp",
    description: "A proof-of-existence engine that anchors content on-chain, so anyone can verify it existed first and hasn't been altered.",
    techStack: "React, Flare FDC & FTSO, Web3",
    image: "/work/truthstamp.webp",
    demo: "https://truth-stamp-6a1k.vercel.app/",
    github: "https://github.com/ShoaebMalik19/Truth_stamp"
  },
  {
    name: "Proof.Market",
    description: "A decentralized prediction market where opinions become transparent, measurable and verifiable.",
    techStack: "React, Next.js, Blockchain, Smart Contracts",
    context: "Winner · DevTrack HackSprint",
    image: "/work/proofmarket.webp",
    demo: "https://prediction-market-three-iota.vercel.app/",
    github: "https://github.com/ShoaebMalik19/Prediction-Market"
  },
  {
    name: "AI-FI Platform",
    description: "A full-stack event management platform for hackathons, workshops and technical communities.",
    techStack: "React, Node.js, Express, Excel Integration",
    image: "/work/aifi.webp",
    demo: "https://ai-fi-website-962s.vercel.app/",
    github: "https://github.com/ShoaebMalik19/ai-fi-website"
  },
  {
    name: "Trading RAG",
    description: "A RAG assistant for Smart Money Concepts trading. Answers are grounded in my own strategy notes and cite the exact notes used, over a live-simulated SMC chart.",
    techStack: "Python, LangChain, ChromaDB, Gemini, Streamlit",
    image: "/work/tradingrag.webp",
    demo: "https://trading-rag-smc.streamlit.app",
    github: "https://github.com/ShoaebMalik19/Trading_RAG"
  },
  {
    name: "LakshyaAI",
    description: "An AI-powered career counselling platform: career discovery, an AI chatbot, learning resources and career comparisons.",
    techStack: "Python, AI, LLM, RAG",
    context: "Winner · Decode SIH (OSCode)",
    github: "https://github.com/ShoaebMalik19/LakshyaAI",
    demoLabel: "Hackathon Build"
  },
  {
    name: "Feedback Analyzer",
    description: "An AI-powered sentiment analysis platform that converts user feedback into actionable insights.",
    techStack: "Python, Transformers, NLP, Django",
    github: "https://github.com/ShoaebMalik19/feedback-analyzer",
    demoLabel: "Concept Build"
  },
  {
    name: "Crime Detector",
    description: "Real-time weapon and fight detection from a webcam feed, combining object detection with pose estimation.",
    techStack: "Python, YOLOv8, MediaPipe Pose, OpenCV",
    github: "https://github.com/ShoaebMalik19/Crime_detector-",
    demoLabel: "Concept Build"
  }
];

/* Screens that orbit behind the portrait in the hero. */
export const ribbonShots = [
  { src: "/work/proofmarket.webp", label: "Proof.Market" },
  { src: "/work/fhoneify.webp", label: "Fhoneify" },
  { src: "/work/expresslink.webp", label: "ExpressLink Logistics" },
  { src: "/work/truthstamp.webp", label: "TruthStamp" },
  { src: "/work/digitalgogle.webp", label: "Digital Goggle" },
  { src: "/work/synapse.webp", label: "Synapse" },
  { src: "/work/payshard.webp", label: "PayShard Wallet" },
  { src: "/work/aifi.webp", label: "AI-FI Platform" },
  { src: "/work/tradingrag.webp", label: "Trading RAG" }
];
