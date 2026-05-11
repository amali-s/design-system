import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TextBox } from "./TextBox";

/**
 * Multi-line text area with label and helper — Sage Component Kit.
 *
 * ## Figma
 * [Text box](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=255-661)
 */
const meta: Meta<typeof TextBox> = {
  title: "Form fields/Text box",
  component: TextBox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "layer1", values: [{ name: "layer1", value: "#FFF8F0" }] },
  },
};
export default meta;

type Story = StoryObj<typeof TextBox>;

const sample =
  "Text here will be the response from the user. Here you can write a long response.";

export const Empty: Story = {
  args: {
    helperText: "Helper text",
    placeholder: sample,
    defaultValue: "",
    rows: 4,
  },
};

export const Filled: Story = {
  args: {
    helperText: "Helper text",
    defaultValue: `${sample}\n`,
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    helperText: "Helper text",
    defaultValue: sample,
    disabled: true,
    rows: 4,
  },
};

export const WithoutHelper: Story = {
  name: "Without helper text",
  args: {
    helperText: undefined,
    defaultValue: sample,
    rows: 4,
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="flex max-w-[720px] flex-col gap-10">
      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Empty</p>
        <TextBox helperText="Helper text" placeholder={sample} defaultValue="" rows={4} />
      </div>
      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Filled</p>
        <TextBox helperText="Helper text" defaultValue={sample} rows={4} />
      </div>
      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Focus</p>
        <p className="mb-2 text-xs text-[#8A867E]">Tab into the field to see the primary focus ring.</p>
        <TextBox helperText="Helper text" defaultValue={sample} rows={4} />
      </div>
      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Disabled</p>
        <TextBox helperText="Helper text" defaultValue={sample} disabled rows={4} />
      </div>
    </div>
  ),
};
