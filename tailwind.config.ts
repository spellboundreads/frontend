import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        "hero-background": "var(--color-hero-background)",
      },
    },
    fontFamily: {
      sans: ["var(--font-geist-sans)", "sans-serif"],
      mono: ["var(--font-geist-mono)", "monospace"],
      serif: ["var(--font-source-serif-4)", "serif"],
      mont: ["var(--font-montserrat)"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};

export default config;
