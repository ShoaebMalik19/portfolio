import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        "bg-card": "var(--bg-card)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        border: "var(--border)",
        
        "bg-hero": "var(--bg-hero)",
        "bg-about": "var(--bg-about)",
        "bg-projects": "var(--bg-projects)",
        "bg-progress": "var(--bg-progress)",
        "bg-expertise": "var(--bg-expertise)",
        "bg-contact": "var(--bg-contact)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-grotesk)", "var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        script: ["var(--font-script)", "cursive"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(215, 199, 170, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
