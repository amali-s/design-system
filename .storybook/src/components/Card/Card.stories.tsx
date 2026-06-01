import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card as CardComponent } from "./Card";
import { CardPageDemo } from "./CardPageDemo";

function StateCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#8A867E]">{label}</p>
      {children}
    </div>
  );
}

/**
 * Content card — all states on one page.
 *
 * [Figma — Card](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=129-673)
 */
const meta: Meta<typeof CardComponent> = {
  title: "Components/Card/Card",
  component: CardComponent,
  parameters: {
    layout: "padded",
    backgrounds: { default: "layer1", values: [{ name: "layer1", value: "#FFF8F0" }] },
    controls: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof CardComponent>;

/** Story id: `components-card-card--states` */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Layouts</p>
        <div className="flex flex-wrap items-start gap-8">
          <StateCell label="Default (slot + action)">
            <CardComponent variant="card" state="enabled" showSlot action />
          </StateCell>
          <StateCell label="No slot">
            <CardComponent variant="card" state="enabled" showSlot={false} action />
          </StateCell>
          <StateCell label="No action">
            <CardComponent variant="card" state="enabled" showSlot action={false} />
          </StateCell>
          <StateCell label="Minimal">
            <CardComponent variant="card" state="enabled" showSlot={false} action={false} />
          </StateCell>
        </div>
      </div>

      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Interaction states</p>
        <div className="flex flex-wrap items-start gap-8">
          <StateCell label="Hover">
            <CardComponent variant="card" state="hover" showSlot action />
          </StateCell>
          <StateCell label="Disabled">
            <CardComponent variant="card" state="disabled" showSlot action />
          </StateCell>
        </div>
      </div>
    </div>
  ),
};

/** Story id: `components-card-card--demo` */
export const Demo: Story = {
  name: "Demo",
  render: () => <CardPageDemo />,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white", values: [{ name: "white", value: "#FFFDFA" }] },
  },
};
