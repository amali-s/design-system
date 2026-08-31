import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Field } from "../../.storybook/src/components/FormFields/Field";
import { formControlType } from "../../.storybook/src/tokens/typography";

const meta: Meta<typeof Field> = {
  title: "Form fields/Field",
  component: Field,
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

type Story = StoryObj<typeof Field>;

const FakeControl = ({ disabled, error }: { disabled?: boolean; error?: boolean }) => (
  <div
    className={[
      "min-h-11 w-full rounded-lg border bg-field px-2 py-2 font-body font-light leading-[1.5]",
      formControlType,
      disabled ? "border-line-field bg-disabled text-textDisabled" : error ? "border-line-error" : "border-line-field",
    ].join(" ")}
  >
    Value
  </div>
);

export const Default: Story = {
  args: {
    label: "Label",
    helperText: "Helper text",
    htmlFor: "field-default",
    children: <FakeControl />,
  },
};

export const Error: Story = {
  args: {
    label: "Label",
    error: true,
    errorMessage: "Enter a valid value",
    htmlFor: "field-error",
    children: <FakeControl error />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    helperText: "Helper text",
    disabled: true,
    htmlFor: "field-disabled",
    children: <FakeControl disabled />,
  },
};
