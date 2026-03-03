import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

/**
 * The Button component — warm, pill-shaped buttons in the Ghibli x Brand aesthetic.
 *
 * Five variants: **Primary** (blue), **Secondary** (outline), **Sage** (green),
 * **Red** (deep red), and **Ghost** (text-only).
 *
 * ## Figma Design
 * View the button designs in Figma:
 * https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Component-kit?node-id=113-90
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "sage", "red", "ghost"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the button",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
  },
  parameters: {
    layout: "centered",
    backgrounds: { default: "cream", values: [{ name: "cream", value: "#EDE6DE" }] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

// ─── Basic Variants ──────────────────────────────────────────

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Begin Journey",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Another Time",
  },
};

export const Sage: Story = {
  args: {
    variant: "sage",
    children: "Discover",
  },
};

export const Red: Story = {
  args: {
    variant: "red",
    children: "Urgent",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Read More →",
  },
};

// ─── Sizes ───────────────────────────────────────────────────

export const Small: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Large",
  },
};

// ─── States ──────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "Disabled",
    disabled: true,
  },
};

// ─── Icons ───────────────────────────────────────────────────

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const WithIcon: Story = {
  args: {
    variant: "primary",
    children: "Continue",
    icon: <ArrowIcon />,
  },
};

export const SageWithIcon: Story = {
  args: {
    variant: "sage",
    children: "Add to Garden",
    icon: <PlusIcon />,
  },
};

// ─── Composite Stories ───────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="sage">Sage</Button>
      <Button variant="red">Red</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost →</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "All Sizes",
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const AllDisabled: Story = {
  name: "Disabled States",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="sage" disabled>Sage</Button>
      <Button variant="red" disabled>Red</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="ghost" disabled>Ghost →</Button>
    </div>
  ),
};

export const ButtonShowcase: Story = {
  name: "Full Showcase",
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-brand text-xl text-secondary mb-4">Primary Actions</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary">Blue Primary</Button>
          <Button variant="sage">Sage Primary</Button>
          <Button variant="red">Red Primary</Button>
        </div>
      </div>
      <div>
        <p className="font-brand text-xl text-secondary mb-4">Secondary & Ghost</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost Link →</Button>
        </div>
      </div>
      <div>
        <p className="font-brand text-xl text-secondary mb-4">With Icons</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" icon={<ArrowIcon />}>Continue</Button>
          <Button variant="sage" icon={<PlusIcon />}>Add Item</Button>
          <Button variant="secondary" icon={<ArrowIcon />}>Navigate</Button>
        </div>
      </div>
      <div>
        <p className="font-brand text-xl text-secondary mb-4">Sizes</p>
        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Default</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </div>
    </div>
  ),
};
