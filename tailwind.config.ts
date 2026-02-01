import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        body: "var(--color-body)",
        card: "var(--color-card)",
        textLight: "var(--color-text-light, #766C6F)",
        textDark: "var(--color-text-dark, #211E1F)",
        btnHover: "var(--color-btn-hover)",
        bgSecondary: "var(--color-bg-secondary)",
      },
    },
  },
};

export default config;
