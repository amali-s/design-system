import * as React from "react";
import { Card } from "./Card";

type SpaceItem = {
  id: string;
  heading: string;
  spaceType: string;
  neighborhood: string;
  body: string;
  showAction?: boolean;
};

const SPACES: SpaceItem[] = [
  {
    id: "studio",
    heading: "Sunlit Studio",
    spaceType: "Creative space",
    neighborhood: "Riverside",
    body: "North-facing windows, shared kitchen, and room for two desks.",
    showAction: true,
  },
  {
    id: "garden-room",
    heading: "Garden Room",
    spaceType: "Meeting space",
    neighborhood: "Oak Park",
    body: "Quiet annex with seating for six and a small presentation wall.",
    showAction: true,
  },
  {
    id: "library",
    heading: "Corner Library",
    spaceType: "Focus space",
    neighborhood: "Old Town",
    body: "Book-lined nook with fast wifi and strict quiet hours after noon.",
    showAction: false,
  },
];

/**
 * Simulates a spaces listing page: hearts, ghost actions, and selection.
 */
export function ProfilePageDemo() {
  const [selectedId, setSelectedId] = React.useState<string | null>("studio");
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [hearted, setHearted] = React.useState<Record<string, boolean>>({
    studio: false,
    "garden-room": true,
    library: false,
  });
  const [activity, setActivity] = React.useState<string>(
    "Tap the heart to save a space, or use Action to reserve on this page.",
  );

  const toggleHeart = (id: string) => {
    setHearted((prev) => {
      const next = !prev[id];
      const space = SPACES.find((s) => s.id === id);
      setActivity(
        next
          ? `Saved “${space?.heading ?? id}” to favorites.`
          : `Removed “${space?.heading ?? id}” from favorites.`,
      );
      return { ...prev, [id]: next };
    });
  };

  const selected = SPACES.find((s) => s.id === selectedId);

  return (
    <div className="min-h-[640px] w-full max-w-[1100px] rounded-xl bg-brand-white p-8">
      <header className="mb-8 border-b border-[rgba(89,85,75,0.12)] pb-6">
        <p className="font-sans text-xs font-medium uppercase tracking-wider text-[#827A64]">Spaces</p>
        <h1 className="mt-1 font-brand text-3xl font-medium text-brand-darkBlue">Near you</h1>
        <p className="mt-2 max-w-xl font-sans text-sm font-light text-[#59554b]">
          Profile cards list bookable spaces. Hearts persist per card on this page; ghost
          actions simulate booking without leaving the demo.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {SPACES.map((space) => (
          <div
            key={space.id}
            role="button"
            tabIndex={0}
            onMouseEnter={() => setHoveredId(space.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => {
              setSelectedId(space.id);
              setActivity(`Viewing details for “${space.heading}”.`);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedId(space.id);
                setActivity(`Viewing details for “${space.heading}”.`);
              }
            }}
            className="cursor-pointer rounded-xl outline-none focus:outline-none focus-visible:outline-none"
          >
            <Card
              variant="profile"
              state={hoveredId === space.id ? "hover" : "enabled"}
                heading={space.heading}
                body={space.body}
                spaceType={space.spaceType}
                neighborhood={space.neighborhood}
                hearted={hearted[space.id]}
                onHeartToggle={() => toggleHeart(space.id)}
                action={space.showAction}
                actionLabel="Action"
                showSlot
                onAction={() => {
                  setSelectedId(space.id);
                  setActivity(`Reserved “${space.heading}” via ghost action.`);
                }}
            />
          </div>
        ))}
      </div>

      <footer className="mt-8 rounded-lg bg-layer1 p-5">
        <p className="font-sans text-xs font-medium uppercase tracking-wider text-[#827A64]">
          Page activity
        </p>
        <p className="mt-2 font-sans text-sm font-light leading-relaxed text-[#59554b]">{activity}</p>
        {selected ? (
          <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[rgba(89,85,75,0.08)] pt-4">
            <p className="font-petrona text-lg text-brand-black">{selected.heading}</p>
            <span className="font-sans text-xs text-[#6c7275]">
              {selected.spaceType} · {selected.neighborhood}
            </span>
            {hearted[selected.id] ? (
              <span className="rounded-xl bg-data-paleMustard px-2 py-0.5 font-sans text-[10px] text-[#59554b]">
                Saved
              </span>
            ) : null}
          </div>
        ) : null}
      </footer>
    </div>
  );
}
