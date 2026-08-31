import * as React from "react";
import type { Decorator, Preview } from "@storybook/react-vite";
import "./src/tailwind.css";
import { sageTheme } from "./theme";
import { colors, semantic } from "./src/tokens/colors";

function ThemeSync({ theme, children }: { theme: string; children: React.ReactNode }) {
  const isDark = theme === "dark";
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isDark, theme]);

  return (
    <div
      className={isDark ? "dark min-h-full bg-brand-white text-brand-black" : "min-h-full"}
      data-theme={theme}
    >
      {children}
    </div>
  );
}

const withTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme as string) ?? "light";
  return (
    <ThemeSync theme={theme}>
      <Story />
    </ThemeSync>
  );
};

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Sage color theme",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [withTheme],
  parameters: {
    docs: {
      theme: sageTheme,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "warm white",
      values: [
        { name: "warm white", value: colors.brand.white },
        { name: "foreground", value: colors.brand.foreground },
        { name: "sage tint", value: semantic.background.sage },
        { name: "dark", value: colors.brand.black },
      ],
    },
  },
};

export default preview;
