import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";

/**
 * Dropdown trigger and menu — Sage Component Kit form pattern.
 *
 * ## Figma
 * [Dropdown section](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=255-651)
 */
const meta: Meta<typeof Dropdown> = {
  title: "Form fields/Dropdowns",
  component: Dropdown,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "layer1", values: [{ name: "layer1", value: "#FFF8F0" }] },
  },
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const ClosedPlaceholder: Story = {
  name: "Closed — placeholder",
  render: () => <Dropdown defaultValue={null} />,
};

export const ClosedFilled: Story = {
  name: "Closed — selected",
  render: () => <Dropdown defaultValue="Selected" placeholder="Select a value" />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Select a value",
  },
};

export const CustomOptions: Story = {
  name: "Custom options",
  render: () => (
    <Dropdown
      options={["North", "East", "South", "West"]}
      placeholder="Pick direction"
      defaultValue={null}
    />
  ),
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-10 font-sans">
      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-[#8A867E]">States</p>
        <div className="flex flex-wrap items-start gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[#6c7275]">Placeholder</span>
            <Dropdown defaultValue={null} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[#6c7275]">Filled</span>
            <Dropdown defaultValue="Selected" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-[#6c7275]">Disabled</span>
            <Dropdown disabled placeholder="Select a value" />
          </div>
        </div>
      </div>
      <p className="text-xs text-[#8A867E]">Open the menu to match the kit list (Dropdown, Checkbox, Radio Button, Toggle Switch).</p>
    </div>
  ),
};
