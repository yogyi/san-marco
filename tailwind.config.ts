import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#faf7f2",
        ivory: "#ffffff",
        sand: "#f3ebe0",
        burgundy: {
          DEFAULT: "#7a2e38",
          deep: "#5c1f28",
        },
        gold: {
          DEFAULT: "#b8954f",
          soft: "#d4bc7d",
          deep: "#8f7040",
        },
        ink: "#2c2426",
        muted: "#6e6366",
        border: "hsl(var(--border) / 0.2)",
        background: "#ffffff",
        foreground: "#2c2426",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 18px 50px -28px rgba(44, 36, 38, 0.28)",
        glow: "0 0 0 1px rgba(184, 149, 79, 0.25)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
