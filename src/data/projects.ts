export type Project = {
  name: string;
  problem: string;
  solution: string;
  impact: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    name: "Proof.Market",
    problem:
      "Expert predictions often disappear into feeds without accountability or verifiable history.",
    solution:
      "A decentralized prediction market where experts stake reputation and predictions become on-chain records.",
    impact:
      "Turns opinion into a traceable market signal that can be audited, compared, and trusted.",
    github: "https://github.com/ShoaebMalik19/Prediction-Market"
  },
  {
    name: "AI-FI",
    problem:
      "Hackathons, workshops, and technical events need more than static registration forms.",
    solution:
      "A full-stack event management platform for organizing participants, sessions, and operations.",
    impact:
      "Makes technical event execution clearer for teams, organizers, and attendees.",
    github: "https://github.com/ShoaebMalik19/ai-fi-website"
  },
  {
    name: "LakshyaAI",
    problem:
      "Students need career guidance that is practical, contextual, and available when decisions are made.",
    solution:
      "An AI-powered career guidance platform developed during Decode SIH with OSCode 2025.",
    impact:
      "Helps users move from uncertainty to informed next steps through AI-assisted guidance."
  },
  {
    name: "TruthStamp",
    problem:
      "Digital media and claims are increasingly difficult to verify after they spread.",
    solution:
      "A digital authenticity and verification platform built to stamp and validate trust signals.",
    impact:
      "Creates a cleaner path for authenticity checks before misinformation compounds.",
    github: "https://github.com/ShoaebMalik19/Truth_stamp"
  },
  {
    name: "Rakshak",
    problem:
      "Safety tools often fail when people need fast, direct emergency response support.",
    solution:
      "A safety-focused product designed to improve protection and emergency response.",
    impact:
      "Prioritizes speed, clarity, and action in moments where every second matters.",
    github: "https://github.com/ShoaebMalik19/Rakshak"
  },
  {
    name: "PayShard",
    problem:
      "Blockchain payments need wallet experiences that feel understandable and usable.",
    solution:
      "A blockchain-powered wallet and payment infrastructure product.",
    impact:
      "Explores more accessible payment rails while preserving the power of decentralized systems.",
    github: "https://github.com/ShoaebMalik19/PayShard-Wallet"
  },
  {
    name: "Crime Detector",
    problem:
      "Crime-related information is hard to analyze quickly when patterns are spread across raw data.",
    solution:
      "An AI-assisted crime analysis and detection system.",
    impact:
      "Supports faster pattern recognition and better situational understanding."
  },
  {
    name: "Feedback Analyzer",
    problem:
      "Product feedback becomes noisy when sentiment, themes, and urgency are not separated.",
    solution:
      "An AI-driven sentiment and feedback analysis platform.",
    impact:
      "Converts unstructured feedback into sharper product and experience decisions."
  }
];
