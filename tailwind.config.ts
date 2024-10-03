import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const customPlugin = plugin(function ({ addUtilities }) {
  const newUtilities = {
    ".webkit-backdrop-blur": {
      "-webkit-backdrop-filter": "blur(10px)",
    },
  };
  addUtilities(newUtilities);
});

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      screens: {
        s: "580px",
      },
    },
  },
  plugins: [customPlugin],
};

export default config;