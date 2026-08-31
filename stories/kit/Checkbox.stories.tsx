import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../../.storybook/src/components/FormFields/Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Form fields/Checkbox",
  component: Checkbox,
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

type Story = StoryObj<typeof Checkbox>;

export const Enabled: Story = {
  args: { label: "Wifi", defaultChecked: false },
};

export const Hover: Story = {
  args: { label: "Wifi", preview: "hover" },
};

export const Selected: Story = {
  args: { label: "Wifi", defaultChecked: true },
};

export const Disabled: Story = {
  args: { label: "Wifi", disabled: true, defaultChecked: true },
};

export const Error: Story = {
  args: {
    label: "Accept terms",
    error: true,
    errorMessage: "Required",
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Checkbox label="Wifi" defaultChecked />
      <Checkbox label="Bathroom" />
      <Checkbox label="Seating" disabled />
      <Checkbox label="Outlet" error errorMessage="Unavailable at this space" />
    </div>
  ),
};
