import type { Config } from "tailwindcss";

export default {
  corePlugins: {container: false},
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    extend: {
      maxWidth: {"FHD": "1920px"},
      fontFamily: {},
      colors: {},
      dropShadow: {},
    },
  },
  plugins: [],
} satisfies Config;
