import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "../../.storybook/src/components/FormFields/Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Form fields/Dropdowns",
  component: Dropdown,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Dropdown>;

export const KitMap: Story = {
  name: "Kit map",
  render: () => (
    <Dropdown
      label="Control"
      options={["Dropdown", "Checkbox", "Radio Button", "Toggle Switch"]}
      placeholder="Select a control"
      defaultValue={null}
    />
  ),
};
