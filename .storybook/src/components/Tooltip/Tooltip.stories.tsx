import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { IconButton } from "../IconButton/IconButton";
import { Copy } from "../../icons";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "cream", values: [{ name: "cream", value: "#EDE6DE" }] },
  },
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const OnIconButton: Story = {
  name: "On IconButton",
  render: () => (
    <div className="pt-12">
      <Tooltip content="Copy address">
        <IconButton aria-label="Copy address" icon={<Copy size={20} />} />
      </Tooltip>
    </div>
  ),
};
