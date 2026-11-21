/*
  Wins and experience. Only claims that can be backed up:
  no invented dates, titles, placements or team names.
*/

export type ExtLink = { label: string; href: string };

export type Win = {
  event: string;
  organiser?: string;
  project: string;
  summary: string;
  facts: { k: string; v: string }[];
  image?: string;
  links: ExtLink[];
};

export const wins: Win[] = [
  {
    event: "Decode SIH",
    organiser: "Organised by OSCode",
    project: "LakshyaAI",
    summary:
      "An AI-powered career counselling platform with career discovery, an AI counselling chatbot, learning resources and career comparisons.",
    facts: [
      { k: "My role", v: "AI integration" },
      { k: "Team", v: "Mohammad Tahir, Naveed Ahmed, Fawad Pasha" },
      { k: "Proof", v: "Winner certificate" }
    ],
    links: [{ label: "Repository", href: "https://github.com/ShoaebMalik19/LakshyaAI" }]
  },
  {
    event: "DevTrack HackSprint",
    project: "Proof.Market",
    summary: "A blockchain-based prediction market, built during the sprint and deployed live.",
    facts: [
      { k: "Prize", v: "USD 150 team prize" },
      { k: "Proof", v: "Live deployment" }
    ],
    image: "/work/proofmarket.webp",
    links: [
      { label: "Live App", href: "https://prediction-market-three-iota.vercel.app/" },
      { label: "Repository", href: "https://github.com/ShoaebMalik19/Prediction-Market" }
    ]
  },
  {
    event: "Katha Hackathon",
    project: "Rakshak",
    summary: "A women's safety app with hold-to-SOS, a safety map, journey watch and fake call, built by a team of three.",
    facts: [
      { k: "Team", v: "Naveed Ahmed, Fawad Pasha" },
      { k: "Proof", v: "Team photo at the win" }
    ],
    links: [{ label: "Repository", href: "https://github.com/ShoaebMalik19/Rakshak" }]
  }
];

export type Role = {
  org: string;
  kind: string;
  summary: string;
  detail?: string;
  stack?: string[];
  image?: string;
  links: ExtLink[];
};

export const internships: Role[] = [
  {
    org: "SportFo",
    kind: "Intern · Sports-tech startup",
    summary: "Product development on SportFo's professional network for Indian athletes and coaches.",
    detail: "The roadmap includes an AI coaching assistant with voice interaction and Indian-language support.",
    stack: ["Next.js", "React", "Tailwind CSS", "Supabase"],
    links: []
  },
  {
    org: "REVA Labs × AICTE Idea Lab",
    kind: "Intern · University innovation lab",
    summary: "Internship and project work through REVA Labs under the AICTE Idea Lab initiative.",
    links: []
  }
];

export const clientWork: Role[] = [
  {
    org: "ExpressLink Logistics",
    kind: "Client project · Live",
    summary: "Designed and built the company's logistics website, now live.",
    image: "/work/expresslink.webp",
    links: [{ label: "Visit Site", href: "https://expresslink.vercel.app" }]
  },
  {
    org: "Fhoneify",
    kind: "Paid engagement · ~3 months · Live",
    summary:
      "Took over a smartphone resale and trade-in app that wasn't working and made the product functional end to end.",
    image: "/work/fhoneify.webp",
    links: [
      { label: "Visit Site", href: "https://www.fhoneify.in/" },
      { label: "Repository", href: "https://github.com/ShoaebMalik19/fhoneify" }
    ]
  },
  {
    org: "Digital Goggle",
    kind: "Client project · Live",
    summary: "Development work on the studio's website, including its AI integration.",
    image: "/work/digitalgogle.webp",
    links: [{ label: "Visit Site", href: "https://digitalgogle.com/" }]
  }
];
