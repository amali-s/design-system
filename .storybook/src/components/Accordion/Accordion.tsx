import * as React from "react";
import { motionVar } from "../../tokens/motion";

/** Figma frames every accordion variant at 536px */
const ACCORDION_WIDTH_PX = 536;
/** Horizontal padding on accordion rows (Figma: 12px) */
const ROW_PADDING_PX = 12;
/** Top padding (Figma: 12px) */
const ROW_PADDING_TOP_PX = 12;
/** Bottom padding — 12px collapsed, 8px expanded */
const ROW_PADDING_BOTTOM_COLLAPSED_PX = 12;
const ROW_PADDING_BOTTOM_EXPANDED_PX = 8;

/**
 * Shared motion lives in `tokens/motion` (`duration.disclosure` / `duration.hover`,
 * split collapse easings). Figma has no prototype data on this node, so these were
 * tuned by eye — same plain-CSS-transition approach as `Button.tsx`.
 *
 * Collapsed → Expanded uses `ease.standard` (ease-in-out).
 *
 * Expanded → Collapsed — `ease.collapseChevron` is easeInOutBack. Only the chevron
 * can actually render it: `transform` is unclamped, so the flick past 180° and back
 * reads.
 *
 * The panel can't use that curve. Interpolating `grid-template-rows` 1fr → 0fr
 * clamps below 0fr, and anything above 1fr renders identically to 1fr (the row is
 * content-bound), so the overshoot is invisible in both directions and only eats
 * duration — measured, the panel hit 0 at 150ms of 220ms and sat there. `max-height`
 * has the same content ceiling. So the panel uses `ease.collapsePanel`: same control
 * points on x (snappy in-out rhythm) with the y overshoot removed.
 *
 * Enabled → Hover / Hover → Enabled: `ease.hoverIn` / `ease.hoverOut`.
 */

export interface AccordionTag {
  label: string;
  icon?: React.ReactNode;
}

export interface AccordionItemProps {
  /** Stable id when used inside Accordion */
  value?: string;
  /** Small label above the title (e.g. address) */
  eyebrow?: string;
  /** Rethink Sans heading */
  title?: string;
  /** Panel body — collapsed to zero height when closed */
  children?: React.ReactNode;
  tags?: AccordionTag[];
  /** Copy control beside eyebrow */
  showCopy?: boolean;
  onCopy?: () => void;
  disabled?: boolean;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  className?: string;
}

export interface AccordionProps {
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
      className={["shrink-0 text-[#827A64]", expanded ? "rotate-180" : ""].join(" ")}
      style={{
        transition: `transform ${motionVar.duration.disclosure} ${
          expanded ? motionVar.ease.standard : motionVar.ease.collapseChevron
        }`,
      }}
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

/**
 * Tag checkmark — Figma "check yes" (6×5px box, stroke overflows per the inset).
 */
function CheckIcon() {
  return (
    <span className="relative block h-[5px] w-[6px] shrink-0" aria-hidden>
      <span className="absolute inset-[-10%_-8.33%_-16.48%_-8.33%]">
        <svg
          viewBox="0 0 7.00005 6.32387"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block size-full max-w-none"
        >
          <path
            d="M0.500026 2.64288L2.68184 5.50003L6.50003 0.500026"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </span>
  );
}

function AccordionTags({ tags }: { tags: AccordionTag[] }) {
  return (
    // Tag text/icon stay "Neutral text" in every row state, including disabled.
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.label}
          className="inline-flex items-center gap-1 rounded-xl bg-[#FBF8E9] px-2 py-1 font-sans text-[8px] font-normal tracking-[-0.32px] text-neutralText"
        >
          {tag.icon ?? <CheckIcon />}
          {tag.label}
        </span>
      ))}
    </div>
  );
}

/**
 * Sage Component Kit accordion item — inline disclosure row from Figma.
 *
 * [Figma — Accordion](https://www.figma.com/design/5TMUAOp35jOOKBNNqEo32Z/Sage-Component-kit?node-id=463-186)
 */
export function AccordionItem({
  value: valueProp,
  eyebrow = "Address of location",
  title = "Title of row",
  children,
  tags = DEFAULT_TAGS,
  showCopy = true,
  onCopy,
  disabled = false,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  className,
}: AccordionItemProps) {
  const ctx = useAccordionContext();
  const autoId = React.useId();
  const value = valueProp ?? autoId;

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

  const shellClass = [
    "flex w-full flex-col rounded-lg border-b",
    disabled ? "border-disabled" : "border-neutralText",
    isHover ? "bg-layer1Hover" : "bg-transparent",
    className || "",
  ].join(" ");

  const shellStyle: React.CSSProperties = {
    maxWidth: ACCORDION_WIDTH_PX,
    paddingLeft: ROW_PADDING_PX,
    paddingRight: ROW_PADDING_PX,
    paddingTop: ROW_PADDING_TOP_PX,
    paddingBottom: expanded ? ROW_PADDING_BOTTOM_EXPANDED_PX : ROW_PADDING_BOTTOM_COLLAPSED_PX,
    transition: `background-color ${motionVar.duration.hover} ${
      isHover ? motionVar.ease.hoverIn : motionVar.ease.hoverOut
    }`,
  };

  const muted = disabled;
  const eyebrowClass = muted ? "text-[#ADABA5]" : "text-[#827A64]";
  const titleClass = muted ? "text-[#ADABA5]" : "text-brand-black";
  const bodyClass = muted ? "text-[#ADABA5]" : "text-neutralText";

  return (
    <div
      className={shellClass}
      style={shellStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Header block + chevron row — 12px apart, chevron flush right */}
      <div className="flex w-full min-w-0 flex-col items-end gap-3">
        <div className="flex w-full min-w-0 flex-col">
          {/* Text block and tags row — 16px apart */}
          <div className="flex w-full min-w-0 flex-col gap-4">
            {/* Eyebrow and title — 8px apart */}
            <div className="flex w-full min-w-0 flex-col gap-2">
              <div className="flex items-center gap-2">
                {/* Figma "Label 1" — Spectral Light 12 */}
                <span className={`font-body text-xs font-light tracking-[-0.72px] ${eyebrowClass}`}>
                  {eyebrow}
                </span>
                {showCopy && (
                  <button
                    type="button"
                    aria-label="Copy address"
                    disabled={disabled}
                    onClick={onCopy}
                    className={[
                      "min-touch-target inline-flex shrink-0 items-center outline-none focus:outline-none focus-visible:outline-none",
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
                className="flex w-full text-left outline-none focus:outline-none focus-visible:outline-none"
              >
                <h3
                  className={`font-heading text-xl font-light tracking-[-0.4px] leading-tight ${titleClass}`}
                >
                  {title}
                </h3>
              </button>
            </div>

            {showTags && <AccordionTags tags={tags} />}
          </div>

          {/* Description — grid-rows 0fr → 1fr so the disclosure can transition */}
          <div
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            aria-hidden={!expanded}
            className="grid w-full"
            style={{
              gridTemplateRows: expanded ? "1fr" : "0fr",
              transition: `grid-template-rows ${motionVar.duration.disclosure} ${
                expanded ? motionVar.ease.standard : motionVar.ease.collapsePanel
              }`,
            }}
          >
            <div className="overflow-hidden">
              {/* Padding lives inside the clipped area so it collapses with the panel */}
              {/* Figma "Body 1" — Spectral Light 14 */}
              <p className={`pt-3 font-body text-sm font-light leading-[1.5] ${bodyClass}`}>{body}</p>
            </div>
          </div>
        </div>

        {/* Chevron — always bottom-right, aligned to 12px row padding */}
        <button
          type="button"
          disabled={disabled}
          aria-expanded={expanded}
          aria-controls={panelId}
          aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
          onClick={toggle}
          className="min-touch-target inline-flex shrink-0 items-center justify-center outline-none focus:outline-none focus-visible:outline-none"
        >
          <ChevronIcon expanded={expanded} />
        </button>
      </div>
    </div>
  );
}

/**
 * Vertically stacked accordion — one or more panels open depending on `allowMultiple`.
 */
export function Accordion({
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
    <AccordionContext.Provider value={{ allowMultiple, openValues, toggle }}>
      <div className={["flex w-full flex-col", className || ""].join(" ")} style={{ maxWidth: ACCORDION_WIDTH_PX }}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}
