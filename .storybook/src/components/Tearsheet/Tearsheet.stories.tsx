import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Tearsheet } from "./Tearsheet";
import { Button } from "../Button/Button";
import { TextInput } from "../FormFields/TextInput";
import { TextBox } from "../FormFields/TextBox";

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
      <div className="font-body text-sm font-w3 text-secondary space-y-4">
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

export const Open: Story = {
  name: "Open",
  render: function OpenTearsheet() {
    const [open, setOpen] = React.useState(true);
    return (
      <Tearsheet
        open={open}
        onOpenChange={setOpen}
        title="Tearsheet Title"
        description="Optional description text that provides context for the tearsheet content."
        primaryActionLabel="Confirm"
        secondaryActionLabel="Cancel"
      >
        <div className="font-body text-sm font-normal text-secondary space-y-4">
          <p>
            This is the tearsheet content area. It can contain any content you need
            — forms, lists, details, or mixed layouts.
          </p>
          <p>
            The panel slides up from the bottom with a smooth animation powered by
            Vaul. Users can drag the handle to close or tap the overlay.
          </p>
        </div>
      </Tearsheet>
    );
  },
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Controlled open so docs show the panel, not only the trigger.",
      },
      story: {
        inline: false,
        iframeHeight: 560,
      },
    },
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
        <TextInput
          className="max-w-none w-full"
          label="Name"
          placeholder="Enter name"
          helperText=""
        />
        <TextBox
          containerClassName="max-w-none w-full"
          label="Description"
          placeholder="Enter description"
          rows={3}
        />
      </div>
    ),
  },
};

export const MinimalContent: Story = {
  args: {
    title: "Quick Info",
    children: (
      <p className="font-body text-sm font-w3 text-muted">
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
      <div className="font-body text-sm font-w3 text-secondary space-y-4">
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
      <Button variant="secondary" size="md">
        Open with Secondary Button
      </Button>
    ),
    children: (
      <p className="font-body text-sm font-w3 text-secondary">
        You can pass any React node as the trigger prop to customize how the
        tearsheet is opened.
      </p>
    ),
  },
};
