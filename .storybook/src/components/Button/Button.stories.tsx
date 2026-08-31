import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Plus } from "../../icons";

/**
 * The Button component — warm, pill-shaped buttons in the Sage design system.
 *
 * Five variants matching the Sage kit, recast for contrast-safe UI:
 * **Primary** (navy fill `#1E526F`), **Secondary** (`#575040`), **Tertiary** (navy outline),
 * **Ghost** (navy label), and **Danger** / error filled (`#CC3926`).
 * Cyan is decorative only — not used for 14px button labels.
 *
 * ## Figma Design
 * - [Primary](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=113-90)
 * - [Secondary](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=116-66)
 * - [Tertiary](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=116-83)
 * - [Ghost](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=118-100)
 * - [Error / Danger](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=329-197)
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "ghost", "danger"],
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
    docs: {
      story: {
        inline: true,
        iframeHeight: 120,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const skipScale = context.name === "Sizes" || context.name === "Full Showcase";
      if (skipScale) return <Story />;
      return (
        <div style={{ transform: "scale(1.5)", transformOrigin: "center center" }}>
          <Story />
        </div>
      );
    },
  ],
};
export default meta;

type Story = StoryObj<typeof Button>;

// ─── Basic Variants ──────────────────────────────────────────

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Action",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Action",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Action",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Action",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Action",
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

const PlusIcon = () => <Plus size={16} />;

export const WithIcon: Story = {
  args: {
    variant: "primary",
    children: "Action",
    icon: <PlusIcon />,
  },
};

export const SecondaryWithIcon: Story = {
  args: {
    variant: "secondary",
    children: "Action",
    icon: <PlusIcon />,
  },
};

// ─── Composite Stories ───────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" icon={<PlusIcon />}>Action</Button>
      <Button variant="secondary" icon={<PlusIcon />}>Action</Button>
      <Button variant="tertiary" icon={<PlusIcon />}>Action</Button>
      <Button variant="ghost" icon={<PlusIcon />}>Action</Button>
      <Button variant="danger" icon={<PlusIcon />}>Action</Button>
    </div>
  ),
};

export const AllDisabled: Story = {
  name: "Disabled States",
  render: () => (
    <div className="flex flex-wrap gap-3 items-center">
      <Button variant="primary" disabled icon={<PlusIcon />}>Action</Button>
      <Button variant="secondary" disabled icon={<PlusIcon />}>Action</Button>
      <Button variant="tertiary" disabled icon={<PlusIcon />}>Action</Button>
      <Button variant="ghost" disabled icon={<PlusIcon />}>Action</Button>
      <Button variant="danger" disabled icon={<PlusIcon />}>Action</Button>
    </div>
  ),
};

export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex items-end gap-3">
      <Button variant="primary" size="sm">Small</Button>
      <Button variant="primary" size="md">Default</Button>
      <Button variant="primary" size="lg">Large</Button>
    </div>
  ),
};

export const ButtonShowcase: Story = {
  name: "Full Showcase",
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="font-brand text-xl text-secondary mb-4">Filled</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" icon={<PlusIcon />}>Action</Button>
          <Button variant="secondary" icon={<PlusIcon />}>Action</Button>
          <Button variant="danger" icon={<PlusIcon />}>Action</Button>
        </div>
      </div>
      <div>
        <p className="font-brand text-xl text-secondary mb-4">Outline & Ghost</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="tertiary" icon={<PlusIcon />}>Action</Button>
          <Button variant="ghost" icon={<PlusIcon />}>Action</Button>
        </div>
      </div>
      <div>
        <p className="font-brand text-xl text-secondary mb-4">Sizes</p>
        <div className="flex items-end gap-3">
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="md">Default</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </div>
      <div>
        <p className="font-brand text-xl text-secondary mb-4">Disabled States</p>
        <div className="flex flex-wrap gap-3 items-center">
          <Button variant="primary" disabled>Action</Button>
          <Button variant="secondary" disabled>Action</Button>
          <Button variant="tertiary" disabled>Action</Button>
          <Button variant="ghost" disabled>Action</Button>
          <Button variant="danger" disabled>Action</Button>
        </div>
      </div>
    </div>
  ),
};
