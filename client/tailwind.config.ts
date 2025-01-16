import type { Config } from "tailwindcss";

export default {
  corePlugins: {container: false},
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}",],
  theme: {
    // fontFamily: {},
    // colors: {},
    extend: {
      fontFamily: {},
      colors: {},
      maxWidth: {"FHD": "1920px"},
      minWidth: {"FHD": "1920px"},
      width: {"FHD": "1920px"},
      screens: {
        "desktop": "1280px",
        "laptop": "1024px",
        "mobile": "640px",
      },
      dropShadow: {
        glow_white: [
          "0 0px 8px rgba(255, 255, 255, .5)",
          "0 0px 8px rgba(255, 255, 255, .5)"
        ],
        glow_blue: [
          "0 0 6px rgba(124, 113, 225, .5)",
          "0 0 6px rgba(124, 113, 225, .5)"
        ],
        glow_red: [
          "0 0px 8px rgba(193, 0, 32, .5)",
          "0 0px 8px rgba(193, 0, 32, .5)"
        ],
        glow_green: [
          "0 0px 8px rgba(50, 205, 50, .5)",
          "0 0px 8px rgba(50, 205, 50, .5)"
        ],
        glow_orange: [
          "0 0px 8px rgba(255, 104, 0, .5)",
          "0 0px 8px rgba(255, 104, 0, .5)"
        ]
      },
    },
  },
  plugins: [],
} satisfies Config;
