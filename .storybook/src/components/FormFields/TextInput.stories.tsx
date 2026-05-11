import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextInput } from "./TextInput";

/**
 * Single-line text field with label and helper — Sage Component Kit.
 *
 * ## Figma
 * [Text input](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=264-736)
 */
const meta: Meta<typeof TextInput> = {
  title: "Form fields/Text input",
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "layer1", values: [{ name: "layer1", value: "#FFF8F0" }] },
  },
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const Empty: Story = {
  args: {
    placeholder: "Text input ",
    defaultValue: "",
  },
};

export const Filled: Story = {
  args: {
    defaultValue: "Text input ",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "Text input ",
    disabled: true,
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Default</p>
        <TextInput placeholder="Text input " defaultValue="" />
      </div>
      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Filled</p>
        <TextInput defaultValue="Text input " />
      </div>
      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Disabled</p>
        <TextInput defaultValue="Text input " disabled />
      </div>
    </div>
  ),
};
