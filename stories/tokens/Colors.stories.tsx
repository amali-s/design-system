import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

const ColorSwatch = ({ 
  name, 
  hex, 
  className 
}: { 
  name: string; 
  hex: string; 
  className?: string;
}) => (
  <div className="flex flex-col gap-2">
    <div 
      className={`w-24 h-24 rounded-xl shadow-md border border-gray-200 ${className || ''}`}
      style={{ backgroundColor: hex }}
    />
    <div className="text-sm">
      <p className="font-medium text-brand-black">{name}</p>
      <p className="text-brand-darkGrey font-mono text-xs">{hex}</p>
    </div>
  </div>
);

const ColorGroup = ({ 
  title, 
  description,
  children 
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
  <div className="p-8 bg-white min-h-screen">
    <div className="max-w-5xl">
      <h1 className="text-4xl font-bold text-brand-black mb-2">Color Tokens</h1>
      <p className="text-lg text-brand-darkGrey mb-12">
        A comprehensive color palette designed for consistency across your applications.
      </p>

      <ColorGroup 
        title="Status & Action Colors" 
        description="Used for interactive elements, buttons, and status indicators."
      >
        <ColorSwatch name="Primary" hex="#0F88CB" />
        <ColorSwatch name="Secondary" hex="#575040" />
        <ColorSwatch name="Warning" hex="#D98900" />
        <ColorSwatch name="Error" hex="#ED112E" />
        <ColorSwatch name="Success" hex="#14C714" />
      </ColorGroup>

      <ColorGroup 
        title="Tag & Data Visualization" 
        description="Used for charts, graphs, tags, and differentiating data categories."
      >
        <ColorSwatch name="Light Blue" hex="#60E1F0" />
        <ColorSwatch name="Dark Orange" hex="#875C00" />
        <ColorSwatch name="Bright Magenta" hex="#FF4978" />
        <ColorSwatch name="Pale Mustard" hex="#D9D059" />
        <ColorSwatch name="Dark Blue" hex="#096694" />
        <ColorSwatch name="Lime Green" hex="#16D113" />
        <ColorSwatch name="Dark Magenta" hex="#902944" />
      </ColorGroup>

      <ColorGroup 
        title="Branding & Layout" 
        description="Core colors for branding, backgrounds, and typography."
      >
        <ColorSwatch name="Dark Blue (Brand)" hex="#1E526F" />
        <ColorSwatch name="Accent" hex="#E8DDA2" />
        <ColorSwatch name="Black" hex="#1B2323" />
        <ColorSwatch name="Dark Grey" hex="#413E36" />
        <ColorSwatch name="Foreground" hex="#EDE6DE" />
        <ColorSwatch name="Highlight Yellow" hex="#FFD60C" />
        <ColorSwatch name="Dark Red" hex="#902944" />
        <ColorSwatch name="Dark Green" hex="#198D54" />
      </ColorGroup>

      <div className="mt-12 p-6 bg-brand-foreground rounded-2xl">
        <h3 className="text-xl font-semibold text-brand-darkBlue mb-4">Usage in Tailwind CSS</h3>
        <div className="font-mono text-sm bg-white p-4 rounded-lg border border-brand-darkGrey/20">
          <p className="text-brand-darkGrey">// Status colors</p>
          <p><span className="text-data-darkBlue">bg-primary</span> <span className="text-brand-darkGrey">// #0F88CB</span></p>
          <p><span className="text-data-darkBlue">text-error</span> <span className="text-brand-darkGrey">// #ED112E</span></p>
          <p className="mt-2 text-brand-darkGrey">// Data visualization</p>
          <p><span className="text-data-darkBlue">bg-data-lightBlue</span> <span className="text-brand-darkGrey">// #60E1F0</span></p>
          <p><span className="text-data-darkBlue">bg-data-brightMagenta</span> <span className="text-brand-darkGrey">// #FF4978</span></p>
          <p className="mt-2 text-brand-darkGrey">// Branding</p>
          <p><span className="text-data-darkBlue">bg-brand-foreground</span> <span className="text-brand-darkGrey">// #EDE6DE</span></p>
          <p><span className="text-data-darkBlue">text-brand-darkBlue</span> <span className="text-brand-darkGrey">// #1E526F</span></p>
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
        component: 'The design system color palette organized by purpose: Status & Action, Data Visualization, and Branding.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {};
