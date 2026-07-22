import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        void: "#070906",
        trench: {
          950: "#0a0d08",
          900: "#10150d",
          800: "#1a2314",
          700: "#26331d",
          600: "#37472a",
        },
        lime: {
          DEFAULT: "#caff00",
          soft: "#e2ffa3",
          dim: "#8fb800",
          dark: "#3d4c00",
        },
        dirty: "#e8e6d9",
        rust: "#ff7a1a",
        cosmic: "#c7d0da",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        body: ["var(--font-body)", "ui-sans-serif", "sans-serif"],
      },
      letterSpacing: {
        tightest2: "-0.06em",
        wide2: "0.18em",
        wide3: "0.32em",
      },
      backdropBlur: {
        xs: "2px",
      },
      dropShadow: {
        lime: "0 0 18px rgba(202,255,0,0.55)",
        "lime-lg": "0 0 45px rgba(202,255,0,0.45)",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0,0)" },
          "10%": { transform: "translate(-2%,-4%)" },
          "20%": { transform: "translate(-6%,2%)" },
          "30%": { transform: "translate(3%,-6%)" },
          "40%": { transform: "translate(-2%,5%)" },
          "50%": { transform: "translate(-6%,3%)" },
          "60%": { transform: "translate(6%,0)" },
          "70%": { transform: "translate(0,4%)" },
          "80%": { transform: "translate(4%,-2%)" },
          "90%": { transform: "translate(-3%,3%)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.4" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.6" },
          "97%": { opacity: "1" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(-1.5deg)" },
        },
        tailwag: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        blink: {
          "0%, 96%, 100%": { opacity: "1" },
          "98%": { opacity: "0.15" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        grain: "grain 1.1s steps(8) infinite",
        scanline: "scanline 6s linear infinite",
        flicker: "flicker 6s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
        tailwag: "tailwag 3.2s ease-in-out infinite",
        blink: "blink 5s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
