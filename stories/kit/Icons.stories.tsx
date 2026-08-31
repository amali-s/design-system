import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Check,
  Chevron,
  Close,
  Copy,
  Heart,
  Plus,
  StatusError,
  StatusInfo,
  StatusSuccess,
} from "../../.storybook/src/icons";
import type { IconSize } from "../../.storybook/src/icons";

const SIZES: IconSize[] = [16, 20, 24];

const meta: Meta = {
  title: "Components/Icons",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "cream", values: [{ name: "cream", value: "#EDE6DE" }] },
    docs: {
      description: {
        component:
          "Shared 16 / 20 / 24 icon set. Stroke ~1.5 at 16. Use `currentColor`. Status icons take token fills from the consumer.",
      },
    },
  },
};
export default meta;

type Story = StoryObj;

export const Set: Story = {
  render: () => (
    <div className="flex flex-col gap-8 text-brand-black">
      {SIZES.map((size) => (
        <div key={size}>
          <p className="mb-3 font-sans text-xs uppercase tracking-wider text-muted">{size}px</p>
          <div className="flex flex-wrap items-center gap-6">
            <Copy size={size} />
            <Chevron size={size} />
            <Plus size={size} />
            <Heart size={size} />
            <Heart size={size} filled className="text-deepRed" />
            <Close size={size} />
            <Check size={size} />
            <StatusInfo size={size} className="text-primary" />
            <StatusSuccess size={size} className="text-success" />
            <StatusError size={size} className="text-error" />
          </div>
        </div>
      ))}
    </div>
  ),
};
