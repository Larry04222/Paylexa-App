import type { Config } from "tailwindcss";
import palette from "../shared-assets/branding/colors.json";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: palette.darkGold,
          black: palette.black,
          white: palette.white,
          emerald: palette.emerald,
          royal: palette.royalBlue,
        },
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        brand: "0 28px 60px rgba(12, 18, 36, 0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
