import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        header: 'url("/backMain1.jpg")',
      },
      colors: {
        "neon-blue-bg": "#00a6ff",
        "neon-blue-light": "#3369ff",
        "neon-blue-bg-dark": "#0055cc",
        "neon-blue": "#007bff",
        "neon-blue-dark": "#004ecc",
      },
      boxShadow: {
        "neon-blue-bg-glow": "0 0 4px #00a6ff, 0 0 9px #00a6ff",
        "neon-blue-glow": "0 0 4px #007bff, 0 0 9px #007bff",
      },
    },
  },
  plugins: [],
};
export default config;
