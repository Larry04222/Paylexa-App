import type { Config } from "tailwindcss";
import palette from "../shared-assets/branding/colors.json";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          gold: palette.darkGold,
          emerald: palette.emerald,
          black: palette.black,
          royal: palette.royalBlue,
          white: palette.white,
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        brand: "0 24px 60px rgba(15, 167, 122, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
