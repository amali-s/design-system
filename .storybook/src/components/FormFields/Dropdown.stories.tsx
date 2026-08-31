import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "storybook/test";
import { Dropdown } from "./Dropdown";

/**
 * Dropdown trigger and menu — Sage Component Kit form pattern.
 *
 * ## Figma
 * [Dropdown section](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=255-651)
 *
 * ## Selected state
 * The currently-selected option is highlighted and shows a trailing check
 * mark in the open menu (Figma "State=Selected").
 *
 * ## Mobile / touch
 * Pressing behaves exactly like clicking: the trigger and options respond to
 * touch and pen via pointer events, outside-tap dismisses the menu
 * (`pointerdown`), and `touch-action: manipulation` removes the tap delay.
 */
const meta: Meta<typeof Dropdown> = {
  title: "Form fields/Dropdowns",
  component: Dropdown,
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

type Story = StoryObj<typeof Dropdown>;

export const ClosedPlaceholder: Story = {
  name: "Closed — placeholder",
  render: () => <Dropdown defaultValue={null} />,
};

export const ClosedFilled: Story = {
  name: "Closed — selected",
  render: () => <Dropdown defaultValue="Studio" placeholder="Select a value" />,
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Select a value",
  },
};

export const Error: Story = {
  args: {
    error: true,
    errorMessage: "Select an option",
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

export const SelectedWithCheck: Story = {
  name: "Open — selected (check)",
  render: () => (
    <div className="pb-40">
      <Dropdown defaultValue="Studio" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Menu auto-opened to show the selected option (**Studio**) with its highlight and trailing check mark.",
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // The trigger is the only button exposing aria-expanded; open the menu.
    await userEvent.click(canvas.getByRole("button", { expanded: false }));
  },
};

export const Showcase: Story = {
  render: () => (
    <div className="flex flex-col gap-10 font-sans">
      <div>
        <p className="mb-3 text-xs uppercase tracking-wider text-muted">States</p>
        <div className="flex flex-wrap items-start gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted">Placeholder</span>
            <Dropdown defaultValue={null} />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted">Filled</span>
            <Dropdown defaultValue="Studio" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted">Disabled</span>
            <Dropdown disabled placeholder="Select a value" />
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-muted">Error</span>
            <Dropdown error errorMessage="Select an option" placeholder="Select a value" />
          </div>
        </div>
      </div>
      <p className="text-xs text-muted">Default options are space types. See Kit map for the control catalog.</p>
    </div>
  ),
};

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
  parameters: {
    docs: {
      description: {
        story: "Catalog of form controls in the kit — not product options. Default stories use space types.",
      },
    },
  },
};
