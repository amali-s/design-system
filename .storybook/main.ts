import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../stories/Brand/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../stories/tokens/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    // Canonical component stories live here. stories/kit/* duplicates these IDs and
    // makes index.json 500, so the manager never loads.
    "./src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  "addons": [
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  }
};
export default config;