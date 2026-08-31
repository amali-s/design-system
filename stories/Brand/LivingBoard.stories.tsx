import type { Meta, StoryObj } from "@storybook/react";
import { LivingBoard } from "./LivingBoard";

/**
 * Living brand board — 5s / 30s / 5min reads of Sage.
 *
 * Wordmark and UI: **Rethink Sans**. Body: **Spectral**.
 * Colours and type ramp are imported from `.storybook/src/tokens`.
 * Use the Theme toolbar for dark (cream filled Primary on brand.black).
 */
const meta: Meta<typeof LivingBoard> = {
  title: "Brand/Living board",
  component: LivingBoard,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Interactive cover of live Sage tokens. Rethink Sans + Spectral — not Petrona or Inter. Dark theme ships from brand.black.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof LivingBoard>;

export const Board: Story = {};
