import * as React from "react";
import { motionVar } from "../../tokens/motion";
import { usePressInteraction } from "../usePressInteraction";
import { Tag } from "../Tag/Tag";
import { IconButton } from "../IconButton/IconButton";
import { Check, Chevron, Copy } from "../../icons";

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
    <Chevron
      size={16}
      className={["shrink-0 text-secondary", expanded ? "rotate-180" : ""].join(" ")}
      style={{
        transition: `transform ${motionVar.duration.disclosure} ${
          expanded ? motionVar.ease.standard : motionVar.ease.collapseChevron
        }`,
      }}
    />
  );
}

/**
 * Sage Component Kit accordion item — inline disclosure row from Figma.
 *
 * Tags stay visible when collapsed. One header control (title + chevron)
 * toggles the panel. This is not a FAQ accordion.
 *
 * Width is `w-full` (no layout cap). Storybook stories may wrap with
 * `max-w-readable` so large canvases match the Figma frame.
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

  const { interaction, pointerHandlers } = usePressInteraction<HTMLDivElement>({
    disabled,
    capture: false,
  });
  const isHover = !disabled && (interaction === "hover" || interaction === "pressed");

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
    paddingLeft: ROW_PADDING_PX,
    paddingRight: ROW_PADDING_PX,
    paddingTop: ROW_PADDING_TOP_PX,
    paddingBottom: expanded ? ROW_PADDING_BOTTOM_EXPANDED_PX : ROW_PADDING_BOTTOM_COLLAPSED_PX,
    transition: `background-color ${motionVar.duration.hover} ${
      isHover ? motionVar.ease.hoverIn : motionVar.ease.hoverOut
    }`,
  };

  const muted = disabled;
  const eyebrowClass = muted ? "text-textDisabled" : "text-secondary";
  const titleClass = muted ? "text-textDisabled" : "text-brand-black";
  const bodyClass = muted ? "text-textDisabled" : "text-neutralText";

  return (
    <div className={shellClass} style={shellStyle} {...pointerHandlers}>
      <div className="flex w-full min-w-0 flex-col">
        <div className="flex w-full min-w-0 flex-col gap-2">
          <div className="flex items-center gap-2">
            {/* Figma "Label 1" — Spectral Light 12. text-secondary ≥4.5:1 on cream. */}
            <span className={`font-body text-xs font-light tracking-[-0.72px] ${eyebrowClass}`}>
              {eyebrow}
            </span>
            {showCopy && (
              // 16px icon + 8px hover padding (32px). 44px hit via min-touch-target.
              <IconButton
                aria-label="Copy address"
                size="sm"
                disabled={disabled}
                icon={<Copy size={16} className={eyebrowClass} />}
                onClick={(e) => {
                  e.stopPropagation();
                  onCopy?.();
                }}
                onPointerDown={(e) => e.stopPropagation()}
                className="!size-8 text-secondary"
              />
            )}
          </div>

          {/* One hit target: title + tags; chevron bottom-aligned to the row (with tags). */}
          <button
            type="button"
            id={headerId}
            disabled={disabled}
            aria-expanded={expanded}
            aria-controls={panelId}
            aria-label={expanded ? `Collapse ${title}` : `Expand ${title}`}
            onClick={toggle}
            className="flex w-full min-w-0 items-end justify-between gap-3 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <h3
                className={`font-heading text-xl font-light tracking-[-0.4px] leading-tight ${titleClass}`}
              >
                {title}
              </h3>
              {showTags && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Tag key={tag.label} label={tag.label} icon={tag.icon ?? <Check size={16} />} />
                  ))}
                </div>
              )}
            </div>
            <span className="min-touch-target inline-flex shrink-0 items-center justify-center">
              <ChevronIcon expanded={expanded} />
            </span>
          </button>
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
      <div className={["flex w-full flex-col", className || ""].join(" ")}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}
