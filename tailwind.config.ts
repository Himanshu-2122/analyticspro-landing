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
        "float-delay": "float 6s ease-in-out infinite 2s",
        "float-delay-2": "float 7s ease-in-out infinite 4s",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "pulse-glow-fast": "pulse-glow 1.5s ease-in-out infinite",
        "draw-line": "draw-line 2s ease-out forwards",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "spin-slower": "spin 20s linear infinite",
        "bounce-slow": "bounce 3s ease-in-out infinite",
        "gradient-x": "gradient-x 4s ease infinite",
        "border-spin": "border-spin 4s linear infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        "ping-slow": "ping 2.5s cubic-bezier(0,0,0.2,1) infinite",
        breathe: "breathe 4s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "count-line": "count-line 1.5s ease-out forwards",
        orbit: "orbit 8s linear infinite",
        "orbit-reverse": "orbit 12s linear infinite reverse",
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
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "border-spin": {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
        sparkle: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", opacity: "0.7" },
          "50%": { transform: "scale(1.3) rotate(180deg)", opacity: "1" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "count-line": {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(60px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(60px) rotate(-360deg)" },
        },
        "orbit-reverse": {
          "0%": { transform: "rotate(0deg) translateX(80px) rotate(0deg)" },
          "100%": { transform: "rotate(-360deg) translateX(80px) rotate(360deg)" },
        },
      },
      boxShadow: {
        glow: "0 0 40px rgba(124,58,237,0.25)",
        "glow-lg": "0 0 80px rgba(124,58,237,0.35)",
        "glow-xl": "0 0 120px rgba(124,58,237,0.4)",
        "glow-sm": "0 0 20px rgba(124,58,237,0.2)",
        "glow-emerald": "0 0 30px rgba(16,185,129,0.3)",
        "glow-blue": "0 0 30px rgba(59,130,246,0.3)",
        "glow-rose": "0 0 30px rgba(244,63,94,0.3)",
        card: "0 0 0 1px rgba(255,255,255,0.08), 0 4px 40px rgba(0,0,0,0.4)",
        "card-hover": "0 0 0 1px rgba(255,255,255,0.15), 0 8px 60px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
