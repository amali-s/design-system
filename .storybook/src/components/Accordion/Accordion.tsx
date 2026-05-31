import * as React from "react";

const ACCORDION_WIDTH_PX = 320;
/** Horizontal padding on accordion rows (Figma: 12px) */
const ROW_PADDING_PX = 12;
/** Gap between slot and text column on fill accordions (Figma: 8px) */
const FILL_SLOT_GAP_PX = 8;

export type AccordionType = "fill" | "inline";

export interface AccordionTag {
  label: string;
  icon?: React.ReactNode;
}

export interface AccordionItemProps {
  /** Stable id when used inside Accordion */
  value?: string;
  /** Small label above the title (e.g. address) */
  eyebrow?: string;
  /** Petrona heading */
  title?: string;
  /** Panel body — hidden when collapsed */
  children?: React.ReactNode;
  tags?: AccordionTag[];
  /** Show left accent slot block */
  showSlot?: boolean;
  slot?: React.ReactNode;
  /** Copy control beside eyebrow */
  showCopy?: boolean;
  onCopy?: () => void;
  type?: AccordionType;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
}

export interface AccordionProps {
  type?: AccordionType;
  /** Allow more than one panel open at a time */
  allowMultiple?: boolean;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  children: React.ReactNode;
  className?: string;
}

const DEFAULT_TAGS: AccordionTag[] = [
  { label: "Bathroom" },
  { label: "Outlet" },
  { label: "Seating" },
];

const DEFAULT_DESCRIPTION =
  "Description of the location and a summary of the reviews themselves so a user can see what they should expect.";

type AccordionContextValue = {
  type: AccordionType;
  allowMultiple: boolean;
  openValues: string[];
  toggle: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  return React.useContext(AccordionContext);
}

function ChevronIcon({ expanded }: { expanded: boolean }) {
  return (
    <svg
      width={12}
      height={6}
      viewBox="0 0 12 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={[
        "shrink-0 text-[#827A64] transition-transform duration-200",
        expanded ? "rotate-180" : "",
      ].join(" ")}
      aria-hidden
    >
      <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <span className="relative inline-block size-2 shrink-0" aria-hidden>
      <span className="absolute inset-[12.5%_12.5%_0_0] rounded-[1px] border-[0.4px] border-layer1 bg-[#827A64]" />
      <span className="absolute inset-[0_0_12.5%_12.5%] rounded-[1px] border border-[#827A64]" />
    </span>
  );
}

function AccordionSlot({ tall, children }: { tall?: boolean; children?: React.ReactNode }) {
  return (
    <div
      className={[
        "flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-brand-accent font-sans text-sm font-light text-brand-black",
        tall ? "h-[121px] w-[74px] rounded-bl-xl rounded-tl-xl" : "h-[86px] w-[63px]",
      ].join(" ")}
    >
      {children ?? "Slot"}
    </div>
  );
}

function AccordionTags({ tags, disabled }: { tags: AccordionTag[]; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.label}
          className={[
            "inline-flex items-center gap-1 rounded-xl bg-brand-foreground px-2 py-1 font-sans text-[8px] font-normal tracking-[-0.32px]",
            disabled ? "text-[#ADABA5]" : "text-[#827A64]",
          ].join(" ")}
        >
          {tag.icon}
          {tag.label}
        </span>
      ))}
    </div>
  );
}

/**
 * Sage Component Kit accordion item — disclosure row from Figma.
 *
 * [Figma — Accordion](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=463-186)
 */
export function AccordionItem({
  value: valueProp,
  eyebrow = "Address of location",
  title = "Title of row",
  children,
  tags = DEFAULT_TAGS,
  showSlot = true,
  slot,
  showCopy = true,
  onCopy,
  type: typeProp,
  disabled = false,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  className,
}: AccordionItemProps) {
  const ctx = useAccordionContext();
  const autoId = React.useId();
  const value = valueProp ?? autoId;
  const type = typeProp ?? ctx?.type ?? "fill";

  const isControlled = expandedProp !== undefined;
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded);

  const groupExpanded = ctx ? ctx.openValues.includes(value) : undefined;
  const expanded = isControlled ? expandedProp! : ctx ? groupExpanded! : internalExpanded;

  const [hovered, setHovered] = React.useState(false);
  const isHover = hovered && !disabled;

  const panelId = `${value}-panel`;
  const headerId = `${value}-header`;

  const setExpanded = (next: boolean) => {
    if (disabled) return;
    if (ctx) {
      if (next !== expanded) ctx.toggle(value);
    } else if (!isControlled) {
      setInternalExpanded(next);
    }
    onExpandedChange?.(next);
  };

  const toggle = () => setExpanded(!expanded);

  const showTags = tags.length > 0;
  const body = children ?? DEFAULT_DESCRIPTION;
  const hasSlot = showSlot && type === "fill";

  const shellClass = [
    "flex w-full flex-col overflow-hidden",
    type === "fill" ? "rounded-xl" : "border-b border-brand-black/40",
    type === "fill" && !disabled ? "bg-layer1" : "",
    type === "fill" && disabled ? "bg-layer1 opacity-60" : "",
    className || "",
  ].join(" ");

  const shellStyle: React.CSSProperties = {
    maxWidth: ACCORDION_WIDTH_PX,
    paddingLeft: ROW_PADDING_PX,
    paddingRight: ROW_PADDING_PX,
    paddingTop: type === "fill" ? 12 : 12,
    paddingBottom: type === "fill" ? 8 : 8,
    ...(type === "fill" && isHover
      ? {
          backgroundImage:
            "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), linear-gradient(90deg, #FFF8F0 0%, #FFF8F0 100%)",
        }
      : type === "fill"
        ? { backgroundColor: "#FFF8F0" }
        : {}),
  };

  const muted = disabled;
  const eyebrowClass = muted ? "text-[#ADABA5]" : "text-[#827A64]";
  const titleClass = muted ? "text-[#ADABA5]" : "text-brand-black";
  const bodyClass = muted ? "text-[#ADABA5]" : "text-[#6c7275]";

  return (
    <div
      className={shellClass}
      style={shellStyle}
      data-accordion-type={type}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex w-full min-w-0 flex-col gap-3">
        <div
          className="flex w-full min-w-0 items-start"
          style={hasSlot ? { gap: FILL_SLOT_GAP_PX } : undefined}
        >
          {hasSlot && <AccordionSlot tall={!expanded}>{slot}</AccordionSlot>}

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className={`font-sans text-xs font-light tracking-[-0.72px] ${eyebrowClass}`}>
                {eyebrow}
              </span>
              {showCopy && (
                <button
                  type="button"
                  aria-label="Copy address"
                  disabled={disabled}
                  onClick={onCopy}
                  className={[
                    "inline-flex shrink-0 items-center outline-none focus:outline-none focus-visible:outline-none",
                    disabled ? "cursor-not-allowed opacity-50" : "hover:opacity-80",
                  ].join(" ")}
                >
                  <CopyIcon />
                </button>
              )}
            </div>

            <button
              type="button"
              id={headerId}
              disabled={disabled}
              aria-expanded={expanded}
              aria-controls={panelId}
              onClick={toggle}
              className="flex w-full flex-col gap-3 text-left outline-none focus:outline-none focus-visible:outline-none"
            >
              <div className="flex w-full flex-col gap-2">
                <h3
                  className={`font-petrona text-xl font-light tracking-[-0.4px] leading-tight ${titleClass}`}
                >
                  {title}
                </h3>
                {showTags && <AccordionTags tags={tags} disabled={disabled} />}
              </div>

              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                hidden={!expanded}
                className={expanded ? "block w-full" : "hidden"}
              >
                <p className={`font-sans text-sm font-light leading-[1.5] ${bodyClass}`}>{body}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Chevron — always bottom-right, aligned to 12px row padding */}
        <div className="flex w-full justify-end">
          <button
            type="button"
            disabled={disabled}
            aria-expanded={expanded}
            aria-controls={panelId}
            aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
            onClick={toggle}
            className="inline-flex shrink-0 items-center justify-center outline-none focus:outline-none focus-visible:outline-none"
          >
            <ChevronIcon expanded={expanded} />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Vertically stacked accordion — one or more panels open depending on `allowMultiple`.
 */
export function Accordion({
  type = "fill",
  allowMultiple = false,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  children,
  className,
}: AccordionProps) {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue);
  const openValues = isControlled ? valueProp! : internalValue;

  const setOpenValues = (next: string[]) => {
    if (!isControlled) setInternalValue(next);
    onValueChange?.(next);
  };

  const toggle = (itemValue: string) => {
    const isOpen = openValues.includes(itemValue);
    if (isOpen) {
      setOpenValues(openValues.filter((v) => v !== itemValue));
    } else if (allowMultiple) {
      setOpenValues([...openValues, itemValue]);
    } else {
      setOpenValues([itemValue]);
    }
  };

  return (
    <AccordionContext.Provider value={{ type, allowMultiple, openValues, toggle }}>
      <div className={["flex w-full flex-col", className || ""].join(" ")} style={{ maxWidth: ACCORDION_WIDTH_PX }}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}
