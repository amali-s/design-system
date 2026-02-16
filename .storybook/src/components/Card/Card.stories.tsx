import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

/**
 * The Card component displays content in a contained, structured layout
 * with a label, heading, optional slot, body text, and an optional ghost action button.
 *
 * ## Figma Design
 * View the card designs in Figma:
 * https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Component-kit?node-id=129-673
 *
 * ## Variants
 * The card supports three states: **Enabled**, **Hover**, and **Disabled**.
 * It also supports toggling the action button and an optional slot area.
 */
const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Small label text above the heading",
    },
    heading: {
      control: "text",
      description: "Main heading text",
    },
    body: {
      control: "text",
      description: "Body description text",
    },
    action: {
      control: "boolean",
      description: "Whether to show the action button",
    },
    actionLabel: {
      control: "text",
      description: "Text for the action button",
    },
    slot: {
      control: false,
      description: "Optional slot content rendered between header and body",
    },
    state: {
      control: "select",
      options: ["enabled", "hover", "disabled"],
      description: "Visual state of the card",
    },
  },
  parameters: {
    layout: "centered",
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

// ─── Basic Variants ───────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: "Label",
    heading: "Heading",
    body: "Body Text where you can add a card description for the card if case needed. Why else have a card?",
    action: true,
    state: "enabled",
  },
};

export const WithoutAction: Story = {
  args: {
    ...Default.args,
    action: false,
  },
};

export const WithSlot: Story = {
  args: {
    ...Default.args,
    slot: (
      <div className="bg-[#A5B1B8] h-10 flex items-center justify-center text-sm font-sans text-brand-black">
        Slot
      </div>
    ),
  },
};

export const WithSlotNoAction: Story = {
  name: "With Slot, No Action",
  args: {
    ...WithSlot.args,
    action: false,
  },
};

// ─── States ───────────────────────────────────────────────────────

export const Enabled: Story = {
  args: {
    ...Default.args,
    state: "enabled",
  },
};

export const Hover: Story = {
  args: {
    ...Default.args,
    state: "hover",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    state: "disabled",
  },
};

// ─── Composite Stories ────────────────────────────────────────────

/** Small slot placeholder for composite stories */
const SlotPlaceholder = () => (
  <div className="bg-[#A5B1B8] h-10 flex items-center justify-center text-sm font-sans text-brand-black">
    Slot
  </div>
);

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-sm text-brand-darkGrey mb-3 font-sans">
          Enabled
        </p>
        <Card state="enabled" />
      </div>
      <div>
        <p className="text-sm text-brand-darkGrey mb-3 font-sans">
          Hover
        </p>
        <Card state="hover" />
      </div>
      <div>
        <p className="text-sm text-brand-darkGrey mb-3 font-sans">
          Disabled
        </p>
        <Card state="disabled" />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-brand-darkGrey font-sans">
          With Slot + Action
        </p>
        <Card slot={<SlotPlaceholder />} action={true} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-brand-darkGrey font-sans">
          Action Only
        </p>
        <Card action={true} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-brand-darkGrey font-sans">
          Slot Only
        </p>
        <Card slot={<SlotPlaceholder />} action={false} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-brand-darkGrey font-sans">
          Content Only
        </p>
        <Card action={false} />
      </div>
    </div>
  ),
};

export const HoverStates: Story = {
  name: "Hover States Grid",
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-brand-darkGrey font-sans">
          Hover + Slot + Action
        </p>
        <Card state="hover" slot={<SlotPlaceholder />} action={true} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-brand-darkGrey font-sans">
          Hover + Action Only
        </p>
        <Card state="hover" action={true} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-brand-darkGrey font-sans">
          Hover + No Action
        </p>
        <Card state="hover" action={false} />
      </div>
    </div>
  ),
};

export const DisabledStates: Story = {
  name: "Disabled States Grid",
  render: () => (
    <div className="flex flex-wrap gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-brand-darkGrey font-sans">
          Disabled + Slot + Action
        </p>
        <Card state="disabled" slot={<SlotPlaceholder />} action={true} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-brand-darkGrey font-sans">
          Disabled + Action Only
        </p>
        <Card state="disabled" action={true} />
      </div>
    </div>
  ),
};

export const FullDesignGrid: Story = {
  name: "Full Design Grid (Figma Match)",
  render: () => (
    <div className="grid grid-cols-2 gap-6 max-w-[600px]">
      {/* Row 1: Enabled */}
      <Card state="enabled" slot={<SlotPlaceholder />} action={true} />
      <Card state="enabled" action={true} />

      {/* Row 2: Enabled continued */}
      <Card state="enabled" slot={<SlotPlaceholder />} action={false} />
      <Card state="enabled" action={false} />

      {/* Row 3: Hover */}
      <Card state="hover" slot={<SlotPlaceholder />} action={true} />
      <Card state="hover" slot={<SlotPlaceholder />} action={true} />

      {/* Row 4: Hover without slot */}
      <Card state="hover" action={true} />
      <Card state="hover" action={false} />

      {/* Row 5: Disabled + more */}
      <Card state="disabled" slot={<SlotPlaceholder />} action={true} />
      <Card state="disabled" action={true} />

      {/* Row 6: Bottom row */}
      <Card state="enabled" slot={<SlotPlaceholder />} action={true} />
      <Card state="disabled" action={true} />
    </div>
  ),
};
