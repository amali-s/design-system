import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card as CardComponent } from "./Card";
import { ProfilePageDemo } from "./ProfilePageDemo";

function StateCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#8A867E]">{label}</p>
      {children}
    </div>
  );
}

/**
 * Profile card — all states on one page.
 *
 * [Figma — Profile](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=503-207)
 */
const meta: Meta<typeof CardComponent> = {
  title: "Components/Card/Profile",
  component: CardComponent,
  parameters: {
    layout: "padded",
    backgrounds: { default: "layer1", values: [{ name: "layer1", value: "#FFF8F0" }] },
    controls: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof CardComponent>;

/** Story id: `components-card-profile--states` */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Layouts</p>
        <div className="flex flex-wrap items-start gap-8">
          <StateCell label="Default">
            <CardComponent variant="profile" state="enabled" action={false} hearted={false} />
          </StateCell>
          <StateCell label="With ghost action">
            <CardComponent variant="profile" state="enabled" action hearted={false} />
          </StateCell>
          <StateCell label="Hearted">
            <CardComponent variant="profile" state="enabled" action={false} hearted />
          </StateCell>
          <StateCell label="Hearted + ghost action">
            <CardComponent variant="profile" state="enabled" action hearted />
          </StateCell>
        </div>
      </div>

      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Interaction states</p>
        <div className="flex flex-wrap items-start gap-8">
          <StateCell label="Hover (ghost action)">
            <CardComponent variant="profile" state="hover" action hearted={false} />
          </StateCell>
          <StateCell label="Disabled (ghost action)">
            <CardComponent variant="profile" state="disabled" action hearted />
          </StateCell>
        </div>
      </div>
    </div>
  ),
};

/** Story id: `components-card-profile--demo` */
export const Demo: Story = {
  name: "Demo",
  render: () => <ProfilePageDemo />,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "white", values: [{ name: "white", value: "#FFFDFA" }] },
  },
};
