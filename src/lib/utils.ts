import { TYPOGRAPHY } from "@constants/tailwind";
import { clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import defaultTheme from "tailwindcss/defaultTheme";

const defaultFontSizes = Object.keys(defaultTheme.fontSize);
const customFontSizes = Object.keys(TYPOGRAPHY);

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [...defaultFontSizes, ...customFontSizes],
        },
      ],
    },
  },
});

export function cn(...inputs: string[]) {
  return customTwMerge(clsx(inputs));
}
