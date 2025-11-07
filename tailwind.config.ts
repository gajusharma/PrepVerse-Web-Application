import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#4c5af7",
          foreground: "#ffffff",
          dark: "#312d81"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)"]
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #4c5af7 0%, #7c3aed 50%, #f472b6 100%)"
      }
    }
  },
  plugins: [animatePlugin]
};

export default config;
