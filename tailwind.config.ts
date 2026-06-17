import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#070706",
        graphite: "#161616",
        porcelain: "#f5f0e8",
        champagne: "#d7c7aa",
        smoke: "#a5a5a0",
        steel: "#8fb8c8",
        ember: "#c88861"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 80px rgba(215, 199, 170, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
