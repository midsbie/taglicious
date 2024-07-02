/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["./stories/**/*.mdx", "./stories/**/*.stories.@(js|jsx|ts|tsx)"],
  staticDirs: [],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
