import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "../../.storybook/src/components/Link/Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "cream", values: [{ name: "cream", value: "#EDE6DE" }] },
  },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {
  args: {
    href: "#",
    children: "Open docs",
  },
};

export const DisabledLook: Story = {
  name: "With aria-disabled",
  args: {
    href: "#",
    children: "Unavailable",
    "aria-disabled": true,
    className: "pointer-events-none text-textDisabled",
  },
};
