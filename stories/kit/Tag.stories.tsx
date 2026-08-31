import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "../../.storybook/src/components/Tag/Tag";
import { Check } from "../../.storybook/src/icons";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["default", "mustard"] },
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  parameters: {
    layout: "centered",
    backgrounds: { default: "cream", values: [{ name: "cream", value: "#EDE6DE" }] },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: "Bathroom",
    icon: <Check size={16} />,
  },
};

export const Mustard: Story = {
  args: {
    label: "Wifi",
    variant: "mustard",
  },
};

export const Disabled: Story = {
  args: {
    label: "Seating",
    variant: "mustard",
    disabled: true,
  },
};

export const Family: Story = {
  name: "Chip family",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 font-sans text-xs uppercase tracking-wider text-muted">Cream (Accordion)</p>
        <div className="flex flex-wrap gap-2">
          <Tag label="Bathroom" icon={<Check size={16} />} />
          <Tag label="Outlet" icon={<Check size={16} />} />
          <Tag label="Seating" icon={<Check size={16} />} />
        </div>
      </div>
      <div>
        <p className="mb-2 font-sans text-xs uppercase tracking-wider text-muted">Mustard (Profile)</p>
        <div className="flex flex-wrap gap-2">
          <Tag label="Wifi" variant="mustard" />
          <Tag label="Bathroom" variant="mustard" />
          <Tag label="Seating" variant="mustard" />
        </div>
      </div>
    </div>
  ),
};
