import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { colors, semantic } from '../../.storybook/src/tokens/colors';

const ColorSwatch = ({
  name,
  hex,
  note,
}: {
  name: string;
  hex: string;
  note?: string;
}) => (
  <div className="flex flex-col gap-2">
    <div
      className="w-24 h-24 rounded-xl shadow-md border border-line-medium"
      style={{ backgroundColor: hex }}
    />
    <div className="text-sm">
      <p className="font-medium text-brand-black">{name}</p>
      <p className="text-brand-darkGrey font-mono text-xs">{hex}</p>
      {note ? <p className="text-muted text-xs mt-1 max-w-[10rem]">{note}</p> : null}
    </div>
  </div>
);

const ColorGroup = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <div className="mb-12">
    <h2 className="text-2xl font-bold text-brand-darkBlue mb-2">{title}</h2>
    <p className="text-brand-darkGrey mb-6">{description}</p>
    <div className="flex flex-wrap gap-6">
      {children}
    </div>
  </div>
);

const ColorsPage = () => (
  <div className="p-8 bg-brand-white min-h-screen">
    <div className="max-w-5xl">
      <h1 className="text-4xl font-bold text-brand-black mb-2">Sage color tokens</h1>
      <p className="text-lg text-brand-darkGrey mb-12">
        One palette for Sage. UI actions use navy; cyan and chart brights stay decorative.
      </p>

      <ColorGroup
        title="UI interactive"
        description="Filled Primary, Tertiary outline, Ghost labels, and focus rings. Navy on cream/white is 6.8:1."
      >
        <ColorSwatch name="Interactive" hex={semantic.interactive.default} note="brand.darkBlue — 14px labels" />
        <ColorSwatch name="Hover" hex={semantic.interactive.hover} note="Derived from navy" />
        <ColorSwatch name="Active" hex={semantic.interactive.active} note="Derived from navy" />
        <ColorSwatch name="Disabled fill" hex={semantic.interactive.disabled} note="Warm gray; pair with darkGrey text" />
      </ColorGroup>

      <ColorGroup
        title="Decorative accent"
        description="Cyan is status.primary — cover swatches, data viz, and large non-text color. Do not use for 14px button labels, ghost text, tertiary borders, or focus rings."
      >
        <ColorSwatch name="Cyan" hex={semantic.status.primary} note="Decorative / data only" />
      </ColorGroup>

      <ColorGroup
        title="Status — UI vs chart"
        description="Toast icons and status text use the UI column. Brights are labeled for charts and data only."
      >
        <ColorSwatch name="Success UI" hex={semantic.status.success} note="brand.darkGreen — icons" />
        <ColorSwatch name="Success on surface" hex={semantic.status.successOnSurface} note="Text/icons on cream" />
        <ColorSwatch name="Success bright" hex={semantic.status.successBright} note="Chart / data only" />
        <ColorSwatch name="Warning UI" hex={semantic.status.warning} note="Large color / fills" />
        <ColorSwatch name="Warning on surface" hex={semantic.status.warningOnSurface} note="Text/icons on cream" />
        <ColorSwatch name="Warning bright" hex={semantic.status.warningBright} note="Chart / data only" />
        <ColorSwatch name="Error" hex={semantic.status.error} note="UI error" />
      </ColorGroup>

      <ColorGroup
        title="Sage surfaces"
        description="Field fill is layer1 so inputs read on both white and cream."
      >
        <ColorSwatch name="White" hex={colors.brand.white} note="Canvas / cards" />
        <ColorSwatch name="Cream" hex={colors.brand.foreground} note="Page background" />
        <ColorSwatch name="Layer 1 / field" hex={semantic.background.layer1} note="Input fill" />
        <ColorSwatch name="Sage tint" hex={semantic.background.sage} />
        <ColorSwatch name="Blue tint" hex={semantic.background.blue} note="Info toast" />
        <ColorSwatch name="Success tint" hex={semantic.background.success} note="Success toast" />
        <ColorSwatch name="Red tint" hex={semantic.background.red} note="Error toast" />
      </ColorGroup>

      <ColorGroup
        title="Tag & data visualization"
        description="Charts, graphs, tags, and data categories — not 14px UI text."
      >
        <ColorSwatch name="Light Blue" hex={colors.data.lightBlue} />
        <ColorSwatch name="Dark Orange" hex={colors.data.darkOrange} />
        <ColorSwatch name="Bright Magenta" hex={colors.data.brightMagenta} />
        <ColorSwatch name="Pale Mustard" hex={colors.data.paleMustard} />
        <ColorSwatch name="Dark Blue" hex={colors.data.darkBlue} />
        <ColorSwatch name="Lime Green" hex={colors.data.limeGreen} />
        <ColorSwatch name="Dark Magenta" hex={colors.data.darkMagenta} />
      </ColorGroup>

      <ColorGroup
        title="Branding & layout"
        description="Core Sage colors for branding, backgrounds, and typography."
      >
        <ColorSwatch name="Dark Blue (Brand)" hex={colors.brand.darkBlue} />
        <ColorSwatch name="Accent" hex={colors.brand.accent} />
        <ColorSwatch name="Black" hex={colors.brand.black} />
        <ColorSwatch name="Dark Grey" hex={colors.brand.darkGrey} />
        <ColorSwatch name="Foreground" hex={colors.brand.foreground} />
        <ColorSwatch name="Highlight Yellow" hex={colors.brand.highlightYellow} />
        <ColorSwatch name="Dark Red" hex={colors.brand.darkRed} />
        <ColorSwatch name="Dark Green" hex={colors.brand.darkGreen} />
      </ColorGroup>

      <div className="mt-12 p-6 bg-brand-foreground rounded-2xl">
        <h3 className="text-xl font-semibold text-brand-darkBlue mb-4">Usage in Tailwind CSS</h3>
        <div className="font-mono text-sm bg-brand-white p-4 rounded-lg border border-line-medium">
          <p className="text-brand-darkGrey">// UI actions (navy)</p>
          <p><span className="text-data-darkBlue">bg-primary</span> <span className="text-brand-darkGrey">// {semantic.interactive.default}</span></p>
          <p><span className="text-data-darkBlue">text-primary</span> <span className="text-brand-darkGrey">// Ghost / Tertiary labels</span></p>
          <p><span className="text-data-darkBlue">bg-field border-line-field</span> <span className="text-brand-darkGrey">// Inputs</span></p>
          <p className="mt-2 text-brand-darkGrey">// Decorative cyan — not small text</p>
          <p><span className="text-data-darkBlue">bg-status-primary</span> <span className="text-brand-darkGrey">// {semantic.status.primary}</span></p>
          <p className="mt-2 text-brand-darkGrey">// Status UI vs chart brights</p>
          <p><span className="text-data-darkBlue">text-success-onSurface</span> <span className="text-brand-darkGrey">// {semantic.status.successOnSurface}</span></p>
          <p><span className="text-data-darkBlue">bg-success-bright</span> <span className="text-brand-darkGrey">// {semantic.status.successBright} chart only</span></p>
          <p><span className="text-data-darkBlue">text-error</span> <span className="text-brand-darkGrey">// {semantic.status.error}</span></p>
        </div>
      </div>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Colors',
  component: ColorsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Sage color tokens: navy for UI actions, cyan as a decorative accent, and separate UI vs chart roles for success and warning.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {};
