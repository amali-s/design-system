import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tearsheet } from "./Tearsheet";

const meta: Meta<typeof Tearsheet> = {
  title: "Components/Tearsheet",
  component: Tearsheet,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A bottom drawer panel that slides up from the screen. Uses Vaul for smooth open/close animations. Design reference: [Paper](https://app.paper.design/file/01KKPHKBS0XMSSFCMJBHENWAPD)\n\n**Motion design:** API by [Emil Kowalski](https://github.com/emilkowalski) (Vaul)",
      },
    },
  },
  argTypes: {
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
    title: {
      control: "text",
      description: "Title in the header",
    },
    description: {
      control: "text",
      description: "Optional description below title",
    },
    primaryActionLabel: {
      control: "text",
      description: "Primary button label",
    },
    secondaryActionLabel: {
      control: "text",
      description: "Secondary button label",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tearsheet>;

export const Default: Story = {
  args: {
    title: "Tearsheet Title",
    description: "Optional description text that provides context for the tearsheet content.",
    primaryActionLabel: "Confirm",
    secondaryActionLabel: "Cancel",
    children: (
      <div className="font-sans text-sm font-w3 text-secondary space-y-4">
        <p>
          This is the tearsheet content area. It can contain any content you need
          — forms, lists, details, or mixed layouts.
        </p>
        <p>
          The panel slides up from the bottom with a smooth animation powered by
          Vaul. Users can drag the handle to close or tap the overlay.
        </p>
      </div>
    ),
  },
};

export const WithFormContent: Story = {
  args: {
    title: "Add New Item",
    description: "Fill in the details below to create a new entry.",
    primaryActionLabel: "Save",
    secondaryActionLabel: "Cancel",
    children: (
      <div className="space-y-4">
        <div>
          <label className="block font-sans text-sm font-w5 text-secondary mb-1.5">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter name"
            className="w-full px-4 py-2 rounded-lg border border-[rgba(89,85,75,0.2)] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="block font-sans text-sm font-w5 text-secondary mb-1.5">
            Description
          </label>
          <textarea
            placeholder="Enter description"
            rows={3}
            className="w-full px-4 py-2 rounded-lg border border-[rgba(89,85,75,0.2)] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>
      </div>
    ),
  },
};

export const MinimalContent: Story = {
  args: {
    title: "Quick Info",
    children: (
      <p className="font-sans text-sm font-w3 text-[#8A867E]">
        A minimal tearsheet with just a title and simple content. No footer
        actions.
      </p>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: "Terms and Conditions",
    description: "Please review the following information.",
    primaryActionLabel: "I Accept",
    secondaryActionLabel: "Decline",
    children: (
      <div className="font-sans text-sm font-w3 text-secondary space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <p key={i}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        ))}
      </div>
    ),
  },
};

export const CustomTrigger: Story = {
  args: {
    title: "Opened by Custom Trigger",
    description: "This tearsheet uses a custom trigger button.",
    primaryActionLabel: "Done",
    trigger: (
      <button
        type="button"
        className="px-4 py-2 rounded-full bg-sage text-brand-white font-sans text-sm font-medium hover:bg-sage-hover transition-colors"
      >
        Open with Sage Button
      </button>
    ),
    children: (
      <p className="font-sans text-sm font-w3 text-secondary">
        You can pass any React node as the trigger prop to customize how the
        tearsheet is opened.
      </p>
    ),
  },
};
