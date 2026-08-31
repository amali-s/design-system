import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "../../.storybook/src/components/FormFields/Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Form fields/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#EDE6DE" },
        { name: "white", value: "#FFFDFA" },
      ],
    },
  },
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Off: Story = {
  args: { label: "Show map", defaultChecked: false },
};

export const On: Story = {
  args: { label: "Show map", defaultChecked: true },
};

export const Hover: Story = {
  args: { label: "Show map", preview: "hover" },
};

export const Disabled: Story = {
  args: { label: "Show map", defaultChecked: true, disabled: true },
};

export const Error: Story = {
  args: {
    label: "Notifications",
    error: true,
    errorMessage: "Could not save preference",
  },
};
