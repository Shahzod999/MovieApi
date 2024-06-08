import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        header: 'url("/backMain1.jpg")',
        authBack: 'url("/poster.jpg")',
      },
      colors: {
        "neon-blue-bg": "#be123c",
        "neon-blue-light": "#9f1239",
        "neon-blue-bg-dark": "#cc0000",
        "neon-blue": "#71717a",
        "neon-blue-dark": "#870404",
      },
    },
  },
  plugins: [],
};
export default config;
