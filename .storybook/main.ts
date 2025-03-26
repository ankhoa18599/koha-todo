import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false,
      },
    },
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-themes",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    defaultName: "Docs",
  },
  staticDirs: ["..\\public"],
};
export default config;