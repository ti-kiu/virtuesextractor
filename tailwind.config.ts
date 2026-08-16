import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: "#0A0A0A",
          secondary: "#141414",
          card: "#1E1E1E",
        },
        neon: {
          red: "#FF6B6B",
          "red-hover": "#FF5252",
          "red-glow": "rgba(255, 107, 107, 0.3)",
          cyan: "#4ECDC4",
          "cyan-hover": "#3DBEB5",
          "cyan-glow": "rgba(78, 205, 196, 0.3)",
          yellow: "#FFE66D",
          "yellow-hover": "#FFD93D",
          "yellow-glow": "rgba(255, 230, 109, 0.3)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B0B0B0",
          muted: "#6B6B6B",
        },
        border: {
          primary: "#2A2A2A",
          accent: "rgba(78, 205, 196, 0.3)",
        },
      },
      fontFamily: {
        heading: ["Space Grotesk", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      fontSize: {
        hero: "clamp(2.5rem, 5vw, 4rem)",
        h1: "clamp(2rem, 4vw, 3rem)",
        h2: "clamp(1.75rem, 3vw, 2.25rem)",
        h3: "clamp(1.25rem, 2vw, 1.5rem)",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
        button: "24px",
        card: "12px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(0, 0, 0, 0.3)",
        md: "0 4px 6px rgba(0, 0, 0, 0.4)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.5)",
        "glow-red": "0 0 20px rgba(255, 107, 107, 0.4)",
        "glow-cyan": "0 0 20px rgba(78, 205, 196, 0.4)",
        "glow-yellow": "0 0 20px rgba(255, 230, 109, 0.4)",
        card: "0 4px 20px rgba(0, 0, 0, 0.3)",
        "card-hover": "0 8px 30px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.5s ease-out",
      },
      keyframes: {
        "neon-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 107, 107, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 107, 107, 0.6)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
