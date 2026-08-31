import * as React from "react";
import { Button } from "../Button/Button";
import { Tag } from "../Tag/Tag";
import { IconButton } from "../IconButton/IconButton";
import { Heart, Plus } from "../../icons";
import { motionVar } from "../../tokens/motion";
import { usePressInteraction } from "../usePressInteraction";

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
  /** Show ghost action (`Button variant="ghost"`) */
  action?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  /** Custom slot content (image or node). Wins over the empty placeholder. */
  slot?: React.ReactNode;
  showSlot?: boolean;
  /** Profile: space type label */
  spaceType?: string;
  /** Profile: neighborhood */
  neighborhood?: string;
  /** Profile: filled heart */
  hearted?: boolean;
  onHeartToggle?: () => void;
  /** Amenity tags */
  tags?: CardTag[];
  /**
   * Storybook snapshot pin. Omit or `"enabled"` for live hover/press via
   * `usePressInteraction`. `"hover"` freezes the hover treatment; `"disabled"`
   * is non-interactive.
   */
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
  `radial-gradient(ellipse 80% 90% at 50% 50%, rgba(255,248,240,0.16) 12%, rgba(236,228,165,0.16) 55%, rgba(217,208,89,0.16) 78%, rgba(217,208,89,0.16) 100%), linear-gradient(90deg, var(--sage-surface-layer1) 0%, var(--sage-surface-layer1) 100%)`;

function CardSlotBlock({
  tall,
  children,
}: {
  tall?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={[
        "relative w-full overflow-hidden bg-surfaceAccent",
        tall ? "aspect-[4/3]" : "aspect-video",
        "[&_img]:h-full [&_img]:w-full [&_img]:object-cover",
      ].join(" ")}
    >
      {children ?? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted">
          <Plus size={24} />
          <span className="font-body text-xs font-light tracking-[-0.72px]">Media</span>
        </div>
      )}
    </div>
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
  const muted = disabled ? "text-textDisabled" : "text-muted";

  return (
    <div className="flex w-full items-center justify-between">
      <div className={`flex items-center gap-1.5 text-xs font-light tracking-[-0.72px] ${muted}`}>
        <span>{spaceType}</span>
        <span className="inline-block size-1 rounded-full bg-current opacity-60" aria-hidden />
        <span>{neighborhood}</span>
      </div>
      <IconButton
        aria-label={hearted ? "Remove favorite" : "Add favorite"}
        size="sm"
        disabled={disabled}
        icon={
          <Heart
            size={16}
            filled={hearted}
            className={disabled ? "text-textDisabled" : hearted ? "text-deepRed" : "text-muted"}
          />
        }
        onClick={(e) => {
          e.stopPropagation();
          onHeartToggle?.();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className="-m-2"
      />
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
  const isSnapshotHover = state === "hover";
  const { interaction, pointerHandlers } = usePressInteraction<HTMLDivElement>({
    disabled: isDisabled || isSnapshotHover,
    capture: false,
  });
  const isHover =
    isSnapshotHover || interaction === "hover" || interaction === "pressed";
  const muted = isDisabled;

  return (
    <div
      {...pointerHandlers}
      className={[
        "flex w-full max-w-card flex-col items-end gap-6 overflow-hidden rounded-lg border-[0.5px] border-solid px-2 py-4",
        muted ? "border-background" : isHover ? "border-line-medium bg-layer1" : "border-line-medium",
        className || "",
      ].join(" ")}
      style={{
        transition: `background-color ${motionVar.duration.hover} ${
          isHover ? motionVar.ease.hoverIn : motionVar.ease.hoverOut
        }`,
      }}
    >
      <div className="flex w-full flex-col gap-4 pb-2 pl-2 pr-4">
        <div
          className={[
            "flex w-full flex-col gap-2 border-b pb-4",
            muted ? "border-background text-textDisabled" : "border-line-medium border-b-[0.5px]",
          ].join(" ")}
        >
          <p className={`font-body text-xs font-light tracking-[-0.72px] ${muted ? "" : "text-textTertiary"}`}>
            {label}
          </p>
          <h3 className={`font-heading text-xl font-normal tracking-[-0.4px] ${muted ? "" : "text-brand-black"}`}>
            {heading}
          </h3>
        </div>

        <div className="flex w-full flex-col gap-4">
          {showSlot && <CardSlotBlock>{slot}</CardSlotBlock>}
          <p className={`font-body text-sm font-light leading-[1.5] ${muted ? "text-textDisabled" : "text-textSecondary"}`}>
            {body}
          </p>
        </div>
      </div>

      {action && (
        <div className="shrink-0 self-end pr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isDisabled}
            onClick={(e) => {
              e.stopPropagation();
              onAction?.();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            icon={<Plus size={16} />}
          >
            {actionLabel}
          </Button>
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
  const isSnapshotHover = state === "hover";
  const { interaction, pointerHandlers } = usePressInteraction<HTMLDivElement>({
    disabled: isDisabled || isSnapshotHover,
    capture: false,
  });
  const isHover =
    isSnapshotHover || interaction === "hover" || interaction === "pressed";

  const shellStyle: React.CSSProperties = isHover
    ? {
        backgroundImage:
          "linear-gradient(90deg, var(--sage-ghost-hover) 0%, var(--sage-ghost-hover) 100%), " + PROFILE_GRADIENT,
      }
    : { backgroundImage: PROFILE_GRADIENT };

  const shellClass = [
    "flex w-full max-w-card flex-col overflow-hidden rounded-xl pb-4",
    isDisabled ? "opacity-60" : "",
    className || "",
  ].join(" ");

  const textMuted = isDisabled;
  const titleClass = textMuted ? "text-textDisabled" : "text-brand-black";
  const bodyClass = textMuted ? "text-textDisabled" : "text-textSecondary";

  return (
    <div className={shellClass} style={shellStyle} {...pointerHandlers}>
      <div className="flex w-full flex-col items-center gap-4">
        {showSlot && (
          <div className="w-full px-0">
            <CardSlotBlock tall>{slot}</CardSlotBlock>
          </div>
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
            <h3 className={`font-heading text-xl font-normal leading-tight ${titleClass}`}>{heading}</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags!.map((tag) => (
              <Tag key={tag.label} label={tag.label} variant="mustard" disabled={isDisabled} />
            ))}
          </div>

          <p className={`font-body text-sm font-light leading-[1.5] ${bodyClass}`}>{body}</p>

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
                onPointerDown={(e) => e.stopPropagation()}
                icon={<Plus size={16} />}
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
 * - **card**: Label, Rethink Sans heading, optional slot, body, ghost action
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
