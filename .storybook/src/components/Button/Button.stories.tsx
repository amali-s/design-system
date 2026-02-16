import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

/**
 * The Button component supports multiple variants and sizes.
 * 
 * ## Figma Design
 * View the button designs in Figma:
 * https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Component-kit?node-id=113-90
 * 
 * See **Docs → Figma Integration** for embedding Figma in documentation.
 */
const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "error"],
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
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Success Button",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Warning Button",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    children: "Error Button",
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "sm",
    children: "Small Button",
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "lg",
    children: "Large Button",
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "Disabled Button",
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// Simple arrow icon component
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Plus icon component
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

export const PrimaryWithIcon: Story = {
  name: "Primary Button (Figma Design)",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-sm text-brand-darkGrey mb-3">Default state</p>
        <Button variant="primary" icon={<ArrowIcon />}>
          Get Started
        </Button>
      </div>
      <div>
        <p className="text-sm text-brand-darkGrey mb-3">Hover state (hover over button)</p>
        <Button variant="primary" icon={<PlusIcon />}>
          Add Item
        </Button>
      </div>
      <div>
        <p className="text-sm text-brand-darkGrey mb-3">Disabled state</p>
        <Button variant="primary" icon={<ArrowIcon />} disabled>
          Disabled
        </Button>
      </div>
    </div>
  ),
};

export const ButtonStates: Story = {
  name: "All States Comparison",
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-lg font-w5 text-brand-darkBlue mb-4">Primary Button</h3>
        <div className="flex gap-4 items-center">
          <Button variant="primary" icon={<ArrowIcon />}>Default</Button>
          <Button variant="primary" icon={<ArrowIcon />} disabled>Disabled</Button>
        </div>
        <p className="text-xs text-brand-darkGrey mt-2">
          Asymmetric corners • Left-aligned • Body 1 text • Hover: #0E7BB8
        </p>
      </div>
      <div>
        <h3 className="text-lg font-w5 text-brand-darkBlue mb-4">Other Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="error">Error</Button>
        </div>
      </div>
    </div>
  ),
};
