import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card as CardComponent } from "./Card";
import { CardPageDemo } from "./CardPageDemo";
import { ProfilePageDemo } from "./ProfilePageDemo";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 font-brand text-xl text-brand-darkGrey">{children}</p>;
}

const meta: Meta<typeof CardComponent> = {
  title: "Components/Card",
  component: CardComponent,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: { default: "layer1", values: [{ name: "layer1", value: "#FFF8F0" }] },
    controls: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof CardComponent>;

export const States: Story = {
  name: "States (Card + Profile)",
  render: () => (
    <div className="flex flex-col gap-10">
      <div>
        <SectionTitle>Card</SectionTitle>
        <div className="flex flex-wrap items-start gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#8A867E]">Default</p>
            <CardComponent variant="card" state="enabled" showSlot action />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#8A867E]">Hover</p>
            <CardComponent variant="card" state="hover" showSlot action />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#8A867E]">Disabled</p>
            <CardComponent variant="card" state="disabled" showSlot action />
          </div>
        </div>
      </div>

      <div>
        <SectionTitle>Profile</SectionTitle>
        <div className="flex flex-wrap items-start gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#8A867E]">Default</p>
            <CardComponent variant="profile" state="enabled" action={false} hearted={false} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#8A867E]">Hover</p>
            <CardComponent variant="profile" state="hover" action hearted={false} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#8A867E]">Disabled</p>
            <CardComponent variant="profile" state="disabled" action hearted />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Demo: Story = {
  name: "Interactive Demos",
  render: () => (
    <div className="flex flex-col gap-10">
      <CardPageDemo />
      <ProfilePageDemo />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "foreground", values: [{ name: "foreground", value: "#EDE6DE" }] },
  },
};

