import type { Config } from "tailwindcss";

import { typographyPlugin, gridPlugin } from "./src/plugins/tailwind-plugin";

import { COLOR, BG_COLOR, WIDTH, BOX_SHADOW, PADDING, SPACING, FONT }  from "./src/constants/tailwind"

const config: Config = {
  darkMode: ["class", '[data-mode="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx,json}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx,json}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,json}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
    extend: {
      width: WIDTH,
      maxWidth: WIDTH,
      colors: { ...COLOR },
      backgroundColor: BG_COLOR,
      boxShadow: BOX_SHADOW,
      padding: PADDING,
      spacing: SPACING,
      fontFamily: FONT,
      zIndex: {
        max: "1000",
      },
    },
  },
  plugins: [typographyPlugin, gridPlugin],
};
export default config;
