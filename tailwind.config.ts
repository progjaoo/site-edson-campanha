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
        brand: {
          blue: "#1256CE",
          navy: "#003967",
          lime: "#93FD04",
          yellow: "#FBE502",
          dark: "#051A33",
          light: "#F4F7FC",
        },
      },
      fontFamily: {
        archivo: ["var(--font-archivo)", "sans-serif"],
        condensed: ["var(--font-archivo-condensed)", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        pendulum: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(6deg)" },
          "75%": { transform: "rotate(-6deg)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        pendulum: "pendulum 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
