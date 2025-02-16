import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "sex-400": "#213555",
        "sex-300": "#3E5879",
        "sex-100": "#F5EFE7",
        "liberty-blue": "#0b081d",
        "spanish-roast": "#130f2b",
        "ceremonial-purple": "#312a5b",
        murex: "#8982b4",
        "cold-dark": "#163853",
        "astro-zinger": "#8078b4",
        "violet-mix": "#afa9cf",
        "majestic-purple": "#68628f",
        orchid: "#8766a4",
        harajuku: "#534e72",
        "chalk-violet": "#907ba4",
        "test-green": "#2bd45f",
        "perpetual-purple": "#534d76",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
