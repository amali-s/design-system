import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { IconButton, ICON_BUTTON_ICON_SIZE } from "./IconButton";
import { Close, Copy, Heart } from "../../icons";

const meta: Meta<typeof IconButton> = {
  title: "Components/Icon button",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["ghost", "tertiary"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    shape: { control: "select", options: ["square", "round"] },
  },
  parameters: {
    layout: "centered",
    backgrounds: { default: "cream", values: [{ name: "cream", value: "#EDE6DE" }] },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const CopyAction: Story = {
  name: "Copy",
  args: {
    "aria-label": "Copy",
    size: "md",
    icon: <Copy size={ICON_BUTTON_ICON_SIZE.md} />,
  },
};

export const HeartAction: Story = {
  name: "Heart",
  args: {
    "aria-label": "Add favorite",
    icon: <Heart size={20} />,
  },
};

export const CloseAction: Story = {
  name: "Close",
  args: {
    "aria-label": "Close",
    shape: "round",
    icon: <Close size={20} />,
  },
};

export const Hover: Story = {
  args: {
    "aria-label": "Copy",
    preview: "hover",
    icon: <Copy size={20} />,
  },
};

export const Disabled: Story = {
  args: {
    "aria-label": "Copy",
    disabled: true,
    icon: <Copy size={20} />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton aria-label="Copy small" size="sm" icon={<Copy size={16} />} />
      <IconButton aria-label="Copy medium" size="md" icon={<Copy size={20} />} />
      <IconButton aria-label="Copy large" size="lg" icon={<Copy size={24} />} />
    </div>
  ),
};
