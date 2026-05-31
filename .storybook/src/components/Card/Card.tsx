import * as React from "react";
import { Button } from "../Button/Button";

/** Profile card width from Figma */
const PROFILE_WIDTH_PX = 320;

export type CardVariant = "card" | "profile";

export interface CardTag {
  label: string;
}

export interface CardProps {
  /** Card or Profile — Sage Component Kit */
  variant?: CardVariant;
  /** Small label (Card variant) */
  label?: string;
  /** Main title */
  heading?: string;
  /** Body / description copy */
  body?: string;
  /** Show ghost action (card inline link; profile ghost Button) */
  action?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  /** Custom slot content, or built-in accent “Slot” block when `showSlot` */
  slot?: React.ReactNode;
  showSlot?: boolean;
  /** Profile: space type label */
  spaceType?: string;
  /** Profile: neighborhood */
  neighborhood?: string;
  /** Profile: filled heart */
  hearted?: boolean;
  onHeartToggle?: () => void;
  /** Profile: amenity tags */
  tags?: CardTag[];
  state?: "enabled" | "hover" | "disabled";
  className?: string;
}

const DEFAULT_BODY =
  "Body Text where you can add a card description for the card if case needed. Why else have a card?";

const DEFAULT_PROFILE_BODY =
  "Description of the space. Summary of reviews";

const DEFAULT_TAGS: CardTag[] = [
  { label: "Wifi" },
  { label: "Bathroom" },
  { label: "Seating" },
];

const PROFILE_GRADIENT =
  "radial-gradient(ellipse 80% 90% at 50% 50%, rgba(255,248,240,0.16) 12%, rgba(236,228,165,0.16) 55%, rgba(217,208,89,0.16) 78%, rgba(217,208,89,0.16) 100%), linear-gradient(90deg, #FFF8F0 0%, #FFF8F0 100%)";

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg width={10} height={9} viewBox="0 0 10 9" fill="none" className={className} aria-hidden>
      <path d="M5 0.5V8.5" stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
      <path d="M1 4.5H9" stroke="currentColor" strokeWidth={1} strokeLinecap="round" />
    </svg>
  );
}

function HeartIcon({ filled, className }: { filled?: boolean; className?: string }) {
  return (
    <svg width={12} height={12} viewBox="0 0 12 12" fill="none" className={className} aria-hidden>
      <path
        d="M6 10.5C6 10.5 1.5 7.25 1.5 4.75C1.5 3.5 2.5 2.5 3.75 2.5C4.75 2.5 5.5 3 6 3.75C6.5 3 7.25 2.5 8.25 2.5C9.5 2.5 10.5 3.5 10.5 4.75C10.5 7.25 6 10.5 6 10.5Z"
        stroke={filled ? "#7D0A16" : "currentColor"}
        fill={filled ? "#7D0A16" : "none"}
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardSlotBlock({ tall }: { tall?: boolean }) {
  return (
    <div
      className={[
        "flex w-full items-center justify-center overflow-hidden bg-brand-accent font-sans text-sm font-light text-brand-black",
        tall ? "h-[118px]" : "h-10",
      ].join(" ")}
    >
      Slot
    </div>
  );
}

function CardActionLink({
  label,
  disabled,
  outlined,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  outlined?: boolean;
  onClick?: () => void;
}) {
  if (outlined) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
        className={[
          "inline-flex items-center gap-2 rounded-2xl border px-3 py-1 font-sans text-sm font-medium leading-none",
          disabled
            ? "cursor-not-allowed border-disabled text-disabled"
            : "border-primary text-primary hover:bg-primary/5",
        ].join(" ")}
      >
        {label}
        <PlusIcon />
      </button>
    );
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
      className={[
        "inline-flex items-center gap-2 rounded-2xl px-3 py-1 font-sans text-sm font-medium leading-none",
        disabled ? "cursor-not-allowed text-[#ADABA5]" : "text-primary hover:bg-[#D7DDE0]/60",
      ].join(" ")}
    >
      {label}
      <PlusIcon />
    </button>
  );
}

function ProfileMeta({
  spaceType,
  neighborhood,
  hearted,
  disabled,
  onHeartToggle,
}: {
  spaceType: string;
  neighborhood: string;
  hearted?: boolean;
  disabled?: boolean;
  onHeartToggle?: () => void;
}) {
  const muted = disabled ? "text-[#ADABA5]" : "text-[#6c7275]";

  return (
    <div className="flex w-full items-center justify-between">
      <div className={`flex items-center gap-1.5 text-xs font-light tracking-[-0.72px] ${muted}`}>
        <span>{spaceType}</span>
        <span className="inline-block size-1 rounded-full bg-current opacity-60" aria-hidden />
        <span>{neighborhood}</span>
      </div>
      <button
        type="button"
        aria-label={hearted ? "Remove favorite" : "Add favorite"}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          onHeartToggle?.();
        }}
        className={disabled ? "cursor-not-allowed text-[#ADABA5]" : hearted ? "text-deepRed" : "text-[#6c7275]"}
      >
        <HeartIcon filled={hearted} />
      </button>
    </div>
  );
}

function ProfileTags({ tags, disabled }: { tags: CardTag[]; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.label}
          className={[
            "inline-flex items-center gap-1 rounded-xl bg-data-paleMustard px-2 py-1 font-sans text-[8px] font-normal tracking-[-0.32px]",
            disabled ? "text-[#ADABA5]" : "text-[#59554b]",
          ].join(" ")}
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
}

function StandardCard({
  label,
  heading,
  body,
  action,
  actionLabel,
  onAction,
  slot,
  showSlot,
  state,
  className,
}: CardProps) {
  const isDisabled = state === "disabled";
  const isHover = state === "hover";
  const muted = isDisabled;

  const containerStyle: React.CSSProperties | undefined = isHover
    ? {
        backgroundImage:
          "linear-gradient(90deg, rgba(232, 221, 162, 0.2) 0%, rgba(232, 221, 162, 0.2) 100%), linear-gradient(90deg, #FFF8F0 0%, #FFF8F0 100%)",
      }
    : undefined;

  return (
    <div
      className={[
        "flex w-full max-w-[248px] flex-col items-end gap-6 overflow-hidden rounded-lg border-[0.5px] border-solid px-2 py-4",
        muted ? "border-brand-foreground bg-layer1" : "border-[#ADABA5] bg-layer1",
        isHover && !muted ? "border-[#d5d8d9]" : "",
        className || "",
      ].join(" ")}
      style={containerStyle}
    >
      <div className="flex w-full flex-col gap-4 pb-2 pl-2 pr-4">
        <div
          className={[
            "flex w-full flex-col gap-2 border-b pb-4",
            muted ? "border-brand-foreground text-[#ADABA5]" : "border-[#ADABA5] border-b-[0.5px]",
            isHover && !muted ? "border-[#d5d8d9]" : "",
          ].join(" ")}
        >
          <p className={`font-sans text-xs font-light tracking-[-0.72px] ${muted ? "" : "text-[#827A64]"}`}>
            {label}
          </p>
          <h3 className={`font-petrona text-xl font-light tracking-[-0.4px] ${muted ? "" : "text-brand-black"}`}>
            {heading}
          </h3>
        </div>

        <div className="flex w-full flex-col gap-4">
          {showSlot && (slot ?? <CardSlotBlock />)}
          <p className={`font-sans text-sm font-light leading-[1.5] ${muted ? "text-[#ADABA5]" : "text-[#59554b]"}`}>
            {body}
          </p>
        </div>
      </div>

      {action && (
        <div className="shrink-0 self-end pr-2">
          <CardActionLink label={actionLabel!} disabled={isDisabled} onClick={onAction} />
        </div>
      )}
    </div>
  );
}

function ProfileCard({
  heading,
  body,
  action,
  actionLabel,
  onAction,
  slot,
  showSlot,
  spaceType,
  neighborhood,
  hearted,
  onHeartToggle,
  tags,
  state,
  className,
}: CardProps) {
  const isDisabled = state === "disabled";
  const isHover = state === "hover";

  const shellStyle: React.CSSProperties = isHover
    ? {
        backgroundImage:
          "linear-gradient(90deg, rgba(148, 148, 148, 0.2) 0%, rgba(148, 148, 148, 0.2) 100%), " + PROFILE_GRADIENT,
      }
    : { backgroundImage: PROFILE_GRADIENT };

  const shellClass = [
    "flex w-full flex-col overflow-hidden rounded-xl pb-4",
    isDisabled ? "opacity-60" : "",
    className || "",
  ].join(" ");

  const shellStyleMerged: React.CSSProperties = {
    ...shellStyle,
    maxWidth: PROFILE_WIDTH_PX,
  };

  const textMuted = isDisabled;
  const titleClass = textMuted ? "text-[#ADABA5]" : "text-brand-black";
  const bodyClass = textMuted ? "text-[#ADABA5]" : "text-[#59554b]";

  return (
    <div className={shellClass} style={shellStyleMerged}>
      <div className="flex w-full flex-col items-center gap-4">
        {showSlot && (
          <div className="w-full px-0">{slot ?? <CardSlotBlock tall={hearted || action} />}</div>
        )}

        <div className="flex w-full flex-col gap-4 px-3.5">
          <div className="flex flex-col gap-2">
            <ProfileMeta
              spaceType={spaceType!}
              neighborhood={neighborhood!}
              hearted={hearted}
              disabled={isDisabled}
              onHeartToggle={onHeartToggle}
            />
            <h3 className={`font-petrona text-xl font-normal leading-tight ${titleClass}`}>{heading}</h3>
          </div>

          <ProfileTags tags={tags!} disabled={isDisabled} />

          <p className={`font-sans text-sm font-light leading-[1.5] ${bodyClass}`}>{body}</p>

          {action && (
            <div className="shrink-0 self-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isDisabled}
                onClick={(e) => {
                  e.stopPropagation();
                  onAction?.();
                }}
                icon={<PlusIcon />}
                className="rounded-2xl px-3 py-1"
              >
                {actionLabel}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Sage Component Kit cards — two variants from Figma.
 *
 * - **card**: Label, Petrona heading, optional slot, body, ghost action
 * - **profile**: Image slot, space meta, heart, tags, description, optional ghost action
 */
export const Card = ({
  variant = "card",
  label = "Label",
  heading = "Heading",
  body,
  action = true,
  actionLabel = "Action",
  onAction,
  slot,
  showSlot = true,
  spaceType = "Type of space",
  neighborhood = "123 neighborhoodcx",
  hearted = false,
  onHeartToggle,
  tags = DEFAULT_TAGS,
  state = "enabled",
  className,
}: CardProps) => {
  const resolvedBody =
    body ?? (variant === "card" ? DEFAULT_BODY : DEFAULT_PROFILE_BODY);

  if (variant === "profile") {
    return (
      <ProfileCard
        heading={heading === "Heading" ? "Name of space" : heading}
        body={resolvedBody}
        action={action}
        actionLabel={actionLabel}
        onAction={onAction}
        slot={slot}
        showSlot={showSlot}
        spaceType={spaceType}
        neighborhood={neighborhood}
        hearted={hearted}
        onHeartToggle={onHeartToggle}
        tags={tags}
        state={state}
        className={className}
      />
    );
  }

  return (
    <StandardCard
      label={label}
      heading={heading}
      body={resolvedBody}
      action={action}
      actionLabel={actionLabel}
      onAction={onAction}
      slot={slot}
      showSlot={showSlot}
      state={state}
      className={className}
    />
  );
};
