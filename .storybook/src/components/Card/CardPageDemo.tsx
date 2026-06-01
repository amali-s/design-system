import * as React from "react";
import { Card as CardComponent } from "./Card";

type ContentItem = {
  id: string;
  label: string;
  heading: string;
  body: string;
  actionLabel: string;
  showSlot: boolean;
};

const ITEMS: ContentItem[] = [
  {
    id: "trees",
    label: "Exploration",
    heading: "A Path Through the Trees",
    body: "The forest spirits watch over travelers who walk with a gentle heart.",
    actionLabel: "Begin",
    showSlot: true,
  },
  {
    id: "garden",
    label: "Nature",
    heading: "The Garden Awakens",
    body: "Wildflowers push through the old stone walls. Spring doesn't wait for permission.",
    actionLabel: "Discover",
    showSlot: true,
  },
  {
    id: "letters",
    label: "Archive",
    heading: "Letters from the Hilltop",
    body: "Handwritten notes carried by the wind, each one a memory pressed between pages.",
    actionLabel: "Open",
    showSlot: false,
  },
  {
    id: "afternoon",
    label: "General",
    heading: "A Quiet Afternoon",
    body: "Sometimes the best moments are the simplest ones — a warm breeze and nowhere to be.",
    actionLabel: "Explore",
    showSlot: false,
  },
];

export function CardPageDemo() {
  const [selectedId, setSelectedId] = React.useState<string | null>("trees");
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [activity, setActivity] = React.useState<string>(
    "Select a card or tap Action to see feedback here.",
  );

  const selected = ITEMS.find((item) => item.id === selectedId);

  return (
    <div className="min-h-[560px] w-full max-w-[900px] rounded-xl bg-brand-white p-8">
      <header className="mb-8 border-b border-[rgba(89,85,75,0.12)] pb-6">
        <p className="font-sans text-xs font-medium uppercase tracking-wider text-[#827A64]">Content</p>
        <h1 className="mt-1 font-brand text-3xl font-medium text-brand-darkBlue">Discover</h1>
        <p className="mt-2 max-w-lg font-sans text-sm font-light text-[#59554b]">
          Cards surface editorial moments. Click a card to focus it, then use the ghost action to
          simulate navigation on this page.
        </p>
      </header>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
          {ITEMS.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                setSelectedId(item.id);
                setActivity(`Focused "${item.heading}".`);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedId(item.id);
                  setActivity(`Focused "${item.heading}".`);
                }
              }}
              className="cursor-pointer rounded-lg outline-none focus:outline-none focus-visible:outline-none"
            >
              <CardComponent
                variant="card"
                state={hoveredId === item.id ? "hover" : "enabled"}
                  label={item.label}
                  heading={item.heading}
                  body={item.body}
                  actionLabel={item.actionLabel}
                  showSlot={item.showSlot}
                  action
                  onAction={() => {
                    setSelectedId(item.id);
                    setActivity(`Action "${item.actionLabel}" on "${item.heading}".`);
                  }}
              />
            </div>
          ))}
        </div>

        <aside className="w-full shrink-0 rounded-lg bg-layer1 p-5 lg:max-w-[240px]">
          <p className="font-sans text-xs font-medium uppercase tracking-wider text-[#827A64]">
            Page activity
          </p>
          <p className="mt-3 font-sans text-sm font-light leading-relaxed text-[#59554b]">{activity}</p>
          {selected ? (
            <div className="mt-4 border-t border-[rgba(89,85,75,0.08)] pt-4">
              <p className="font-sans text-[11px] uppercase tracking-wider text-[#8A867E]">Selected</p>
              <p className="mt-1 font-petrona text-lg text-brand-black">{selected.heading}</p>
              <p className="mt-1 font-sans text-xs text-[#6c7275]">{selected.label}</p>
            </div>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
