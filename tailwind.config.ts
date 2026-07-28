import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#120F1D",
        paper: "#FAF9FD",
        haze: "#F1EEFB",
        violet: {
          50: "#F2EFFE",
          100: "#E4DCFD",
          300: "#B7A2F7",
          500: "#7C5CF0",
          600: "#6339E0",
          700: "#4E2AC0",
          900: "#241558",
        },
        ember: {
          400: "#FF8A4C",
          500: "#F2662B",
          600: "#D8501A",
        },
        volt: "#D6F23C",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
export default config;
