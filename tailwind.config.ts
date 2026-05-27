import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-plus-jakarta)"],
      },
      colors: {
        surface: "rgba(255,255,255,0.03)",
        "surface-hover": "rgba(255,255,255,0.06)",
        border: "rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-violet": "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)",
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "marquee-reverse": "marquee-reverse 35s linear infinite",
        aurora: "aurora 12s ease-in-out infinite",
        "aurora-2": "aurora 18s ease-in-out infinite reverse",
        "aurora-3": "aurora 15s ease-in-out infinite 4s",
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out infinite 3s",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "draw-line": "draw-line 2s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(40px, -60px) scale(1.15)" },
          "66%": { transform: "translate(-30px, 30px) scale(0.88)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        "draw-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,58,237,0.25)",
        "glow-lg": "0 0 80px rgba(124,58,237,0.3)",
        "glow-sm": "0 0 20px rgba(124,58,237,0.2)",
        card: "0 0 0 1px rgba(255,255,255,0.08), 0 4px 40px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
