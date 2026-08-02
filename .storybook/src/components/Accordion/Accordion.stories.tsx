import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Accordion, AccordionItem } from "./Accordion";

function StateCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex w-[536px] max-w-full flex-col gap-2">
      <p className="font-sans text-[11px] font-medium uppercase tracking-wider text-[#8A867E]">{label}</p>
      {children}
    </div>
  );
}

/**
 * Accordion — vertically stacked disclosure panels from the Sage Component Kit.
 *
 * [Figma — Accordion](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=463-186)
 */
const meta: Meta<typeof AccordionItem> = {
  title: "Components/Accordion",
  component: AccordionItem,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    backgrounds: { default: "layer1", values: [{ name: "layer1", value: "#FFF8F0" }] },
    controls: { disable: true },
  },
};
export default meta;

type Story = StoryObj<typeof AccordionItem>;

/** Story id: `components-accordion--states` */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-12">
      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Inline — with tags</p>
        <div className="flex flex-wrap items-start gap-8">
          <StateCell label="Collapsed">
            <AccordionItem />
          </StateCell>
          <StateCell label="Expanded">
            <AccordionItem defaultExpanded />
          </StateCell>
          <StateCell label="Disabled (collapsed)">
            <AccordionItem disabled />
          </StateCell>
          <StateCell label="Disabled (expanded)">
            <AccordionItem disabled defaultExpanded />
          </StateCell>
        </div>
      </div>

      <div>
        <p className="mb-4 font-brand text-xl text-brand-darkGrey">Inline — no tags</p>
        <div className="flex flex-wrap items-start gap-8">
          <StateCell label="Collapsed">
            <AccordionItem tags={[]} showCopy={false} />
          </StateCell>
          <StateCell label="Expanded">
            <AccordionItem tags={[]} showCopy={false} defaultExpanded />
          </StateCell>
        </div>
      </div>
    </div>
  ),
};

/** Story id: `components-accordion--demo` */
export const Demo: Story = {
  name: "Demo",
  render: () => (
    <div className="w-[536px] max-w-full rounded-xl bg-brand-white p-6">
      <header className="mb-6">
        <p className="font-sans text-xs font-medium uppercase tracking-wider text-[#827A64]">Spaces</p>
        <h1 className="mt-1 font-brand text-2xl font-medium text-brand-darkBlue">Details</h1>
        <p className="mt-2 font-body text-sm font-light text-[#59554b]">
          Expand each row to read more. Only one section stays open at a time.
        </p>
      </header>

      <Accordion defaultValue={["studio"]}>
        <AccordionItem value="studio" title="Sunlit Studio" eyebrow="42 Riverside Lane" />
        <AccordionItem value="garden" title="Garden Room" eyebrow="18 Oak Park Way" />
        <AccordionItem
          value="library"
          title="Corner Library"
          eyebrow="7 Old Town Square"
          tags={[{ label: "Wifi" }, { label: "Quiet" }]}
        />
      </Accordion>
    </div>
  ),
  parameters: {
    backgrounds: { default: "white", values: [{ name: "white", value: "#FFFDFA" }] },
  },
};
