import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

/**
 * The Card component — warm, organic cards in the Ghibli x Brand aesthetic.
 *
 * Features a white surface (#FFFDFA), soft warm shadows, Rasa serif headings,
 * a colored accent bar, and pill-shaped action buttons.
 *
 * ## Figma Design
 * View the card designs in Figma:
 * https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Component-kit?node-id=129-673
 *
 * ## Accent Colors
 * Cards support **blue**, **sage**, **red**, **gold**, and **none** accent bars.
 */
const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Small label text above the heading" },
    heading: { control: "text", description: "Main heading text (Rasa serif)" },
    body: { control: "text", description: "Body description text" },
    action: { control: "boolean", description: "Whether to show action buttons" },
    actionLabel: { control: "text", description: "Primary action button label" },
    secondaryActionLabel: { control: "text", description: "Secondary action button label" },
    accentColor: {
      control: "select",
      options: ["blue", "sage", "red", "gold", "none"],
      description: "Accent color bar at the top",
    },
    slot: { control: false, description: "Optional slot content between header and body" },
    state: {
      control: "select",
      options: ["enabled", "hover", "disabled"],
      description: "Visual state of the card",
    },
  },
  parameters: {
    layout: "centered",
    backgrounds: { default: "cream", values: [{ name: "cream", value: "#EDE6DE" }] },
  },
};
export default meta;

type Story = StoryObj<typeof Card>;

// ─── Basic Variants (by accent color) ────────────────────────

export const Blue: Story = {
  name: "Blue Accent",
  args: {
    label: "Exploration",
    heading: "A Path Through the Trees",
    body: "The forest spirits watch over travelers who walk with a gentle heart. Every journey begins with a single step.",
    accentColor: "blue",
    actionLabel: "Begin",
    secondaryActionLabel: "Later",
  },
};

export const Sage: Story = {
  name: "Sage Accent",
  args: {
    label: "Nature",
    heading: "The Garden Awakens",
    body: "Wildflowers push through the old stone walls. Spring doesn't wait for permission.",
    accentColor: "sage",
    actionLabel: "Discover",
    secondaryActionLabel: "Read More",
  },
};

export const Gold: Story = {
  name: "Gold Accent",
  args: {
    label: "Archive",
    heading: "Letters from the Hilltop",
    body: "Handwritten notes carried by the wind, each one a memory pressed between the pages of an old book.",
    accentColor: "gold",
    actionLabel: "Open",
    secondaryActionLabel: "Bookmark",
  },
};

export const RedAccent: Story = {
  name: "Red Accent",
  args: {
    label: "Important",
    heading: "The Flame Still Burns",
    body: "Some stories refuse to end quietly. They smolder beneath the surface, waiting for the right moment to reignite.",
    accentColor: "red",
    actionLabel: "Urgent",
    secondaryActionLabel: "Dismiss",
  },
};

export const NoAccent: Story = {
  name: "No Accent",
  args: {
    label: "General",
    heading: "A Quiet Afternoon",
    body: "Sometimes the best moments are the simplest ones — a warm breeze, a cup of tea, and nowhere to be.",
    accentColor: "none",
    actionLabel: "Explore",
    secondaryActionLabel: "Skip",
  },
};

// ─── With Slot ───────────────────────────────────────────────

const SlotPlaceholder = () => (
  <div className="bg-gradient-to-r from-sage-light to-[#F9F6E8] h-24 flex items-center justify-center text-xs font-sans text-[#8A867E] uppercase tracking-wider rounded-lg">
    Image Slot
  </div>
);

export const WithSlot: Story = {
  name: "With Image Slot",
  args: {
    ...Sage.args,
    slot: <SlotPlaceholder />,
  },
};

export const WithSlotNoAction: Story = {
  name: "Slot, No Actions",
  args: {
    ...Sage.args,
    slot: <SlotPlaceholder />,
    action: false,
  },
};

// ─── Without Actions ─────────────────────────────────────────

export const NoActions: Story = {
  name: "No Actions",
  args: {
    ...Blue.args,
    action: false,
  },
};

export const PrimaryOnly: Story = {
  name: "Primary Action Only",
  args: {
    ...Blue.args,
    secondaryActionLabel: "",
  },
};

// ─── States ──────────────────────────────────────────────────

export const Enabled: Story = {
  args: { ...Blue.args, state: "enabled" },
};

export const Hover: Story = {
  args: { ...Blue.args, state: "hover" },
};

export const Disabled: Story = {
  args: { ...Blue.args, state: "disabled" },
};

// ─── Composite Stories ───────────────────────────────────────

export const AllAccentColors: Story = {
  name: "All Accent Colors",
  render: () => (
    <div className="flex flex-wrap gap-5">
      <Card accentColor="blue" label="Stream" heading="Mountain Spring" body="Cool water flows from ancient stone." actionLabel="Explore" secondaryActionLabel="Pass" />
      <Card accentColor="sage" label="Forest" heading="Canopy Walk" body="Sunlight filters through emerald leaves." actionLabel="Enter" secondaryActionLabel="Wait" />
      <Card accentColor="red" label="Alert" heading="Storm Approaching" body="Dark clouds gather beyond the ridge." actionLabel="Prepare" secondaryActionLabel="Ignore" />
      <Card accentColor="gold" label="Memory" heading="Old Photographs" body="Faded images of a summer long past." actionLabel="View" secondaryActionLabel="Close" />
    </div>
  ),
};

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-wrap gap-5">
      <div className="flex flex-col gap-2">
        <p className="text-xs text-[#8A867E] font-sans uppercase tracking-wider">Enabled</p>
        <Card state="enabled" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-[#8A867E] font-sans uppercase tracking-wider">Hover</p>
        <Card state="hover" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs text-[#8A867E] font-sans uppercase tracking-wider">Disabled</p>
        <Card state="disabled" />
      </div>
    </div>
  ),
};

export const CardShowcase: Story = {
  name: "Full Showcase",
  render: () => (
    <div className="flex flex-col gap-8 max-w-[720px]">
      <div>
        <p className="font-brand text-xl text-secondary mb-4">Accent Color Variants</p>
        <div className="grid grid-cols-2 gap-5">
          <Card accentColor="blue" label="Exploration" heading="A Path Through the Trees" body="The forest spirits watch over travelers." actionLabel="Begin" secondaryActionLabel="Later" />
          <Card accentColor="sage" slot={<SlotPlaceholder />} label="Nature" heading="The Garden Awakens" body="Wildflowers push through old stone walls." actionLabel="Discover" secondaryActionLabel="" />
          <Card accentColor="gold" label="Archive" heading="Letters from the Hilltop" body="Handwritten notes carried by the wind." action={false} />
          <Card accentColor="red" label="Important" heading="The Flame Still Burns" body="Some stories refuse to end quietly." actionLabel="Urgent" secondaryActionLabel="Dismiss" />
        </div>
      </div>
      <div>
        <p className="font-brand text-xl text-secondary mb-4">States</p>
        <div className="flex flex-wrap gap-5">
          <Card state="enabled" heading="Enabled" body="Default resting state with subtle shadow." />
          <Card state="hover" heading="Hover" body="Lifted with deeper shadow on interaction." />
          <Card state="disabled" heading="Disabled" body="Reduced opacity, non-interactive." />
        </div>
      </div>
    </div>
  ),
};
