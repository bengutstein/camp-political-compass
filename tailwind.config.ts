import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { display: ["Georgia", "Times New Roman", "serif"], sans: ["Arial", "sans-serif"] },
      colors: { ink: "#18211e", paper: "#f7f5ef", line: "#d8ddd5", moss: "#2f5949", clay: "#b85f48" },
    },
  },
  plugins: [],
} satisfies Config;
