import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioGroup } from "./Radio";

const meta: Meta<typeof RadioGroup> = {
  title: "Form fields/Radio",
  component: RadioGroup,
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

type Story = StoryObj<typeof RadioGroup>;

export const Group: Story = {
  name: "Group",
  render: () => (
    <RadioGroup label="Space type" defaultValue="studio" helperText="Pick one">
      <Radio value="studio" label="Studio" />
      <Radio value="garden" label="Garden room" />
      <Radio value="library" label="Library" />
    </RadioGroup>
  ),
};

export const Hover: Story = {
  render: () => (
    <RadioGroup label="Space type">
      <Radio value="studio" label="Studio" preview="hover" />
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup label="Space type" defaultValue="studio" disabled>
      <Radio value="studio" label="Studio" />
      <Radio value="garden" label="Garden room" />
    </RadioGroup>
  ),
};

export const Error: Story = {
  render: () => (
    <RadioGroup label="Space type" error errorMessage="Select a space type">
      <Radio value="studio" label="Studio" />
      <Radio value="garden" label="Garden room" />
    </RadioGroup>
  ),
};
