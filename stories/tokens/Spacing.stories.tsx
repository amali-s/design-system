import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

const SpacingSample = ({ name, value, pixels }: { name: string; value: string; pixels: string }) => (
  <div className="flex items-center gap-4 py-2">
    <span className="text-sm font-mono text-brand-darkGrey w-12">{name}</span>
    <div 
      className="h-6 bg-primary rounded"
      style={{ width: value }}
    />
    <span className="text-xs text-brand-darkGrey/60 ml-2">{value} ({pixels})</span>
  </div>
);

const RadiusSample = ({ name, value }: { name: string; value: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div 
      className="w-20 h-20 bg-primary"
      style={{ borderRadius: value }}
    />
    <span className="text-sm font-mono text-brand-darkGrey">{name}</span>
    <span className="text-xs text-brand-darkGrey/60">{value}</span>
  </div>
);

const ShadowSample = ({ name, value }: { name: string; value: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div 
      className="w-24 h-24 bg-white rounded-xl"
      style={{ boxShadow: value }}
    />
    <span className="text-sm font-mono text-brand-darkGrey">{name}</span>
  </div>
);

const SpacingPage = () => (
  <div className="p-8 bg-white min-h-screen">
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold text-brand-black mb-2">Spacing & Layout</h1>
      <p className="text-lg text-brand-darkGrey mb-12">
        Spacing tokens for consistent margins, padding, and layout throughout your application.
      </p>

      {/* Spacing Scale */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brand-darkBlue mb-6">Spacing Scale</h2>
        <p className="text-brand-darkGrey mb-6">
          Based on a 4px base unit for consistent rhythm and alignment.
        </p>
        
        <div className="bg-brand-foreground rounded-2xl p-6">
          <SpacingSample name="0" value="0" pixels="0px" />
          <SpacingSample name="0.5" value="0.125rem" pixels="2px" />
          <SpacingSample name="1" value="0.25rem" pixels="4px" />
          <SpacingSample name="2" value="0.5rem" pixels="8px" />
          <SpacingSample name="3" value="0.75rem" pixels="12px" />
          <SpacingSample name="4" value="1rem" pixels="16px" />
          <SpacingSample name="5" value="1.25rem" pixels="20px" />
          <SpacingSample name="6" value="1.5rem" pixels="24px" />
          <SpacingSample name="8" value="2rem" pixels="32px" />
          <SpacingSample name="10" value="2.5rem" pixels="40px" />
          <SpacingSample name="12" value="3rem" pixels="48px" />
          <SpacingSample name="16" value="4rem" pixels="64px" />
          <SpacingSample name="20" value="5rem" pixels="80px" />
          <SpacingSample name="24" value="6rem" pixels="96px" />
        </div>
      </section>

      {/* Border Radius */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brand-darkBlue mb-6">Border Radius</h2>
        
        <div className="flex flex-wrap gap-8 bg-brand-foreground rounded-2xl p-8">
          <RadiusSample name="none" value="0" />
          <RadiusSample name="sm" value="0.125rem" />
          <RadiusSample name="default" value="0.25rem" />
          <RadiusSample name="md" value="0.375rem" />
          <RadiusSample name="lg" value="0.5rem" />
          <RadiusSample name="xl" value="0.75rem" />
          <RadiusSample name="2xl" value="1rem" />
          <RadiusSample name="3xl" value="1.5rem" />
          <RadiusSample name="full" value="9999px" />
        </div>
      </section>

      {/* Box Shadows */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-brand-darkBlue mb-6">Box Shadows</h2>
        
        <div className="flex flex-wrap gap-8 bg-brand-foreground rounded-2xl p-8">
          <ShadowSample name="sm" value="0 1px 2px 0 rgb(0 0 0 / 0.05)" />
          <ShadowSample name="default" value="0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" />
          <ShadowSample name="md" value="0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" />
          <ShadowSample name="lg" value="0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" />
          <ShadowSample name="xl" value="0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" />
          <ShadowSample name="2xl" value="0 25px 50px -12px rgb(0 0 0 / 0.25)" />
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <h2 className="text-2xl font-bold text-brand-darkBlue mb-6">Usage in Tailwind CSS</h2>
        
        <div className="font-mono text-sm bg-brand-foreground p-6 rounded-2xl">
          <p className="text-brand-darkGrey mb-2">// Spacing</p>
          <p><span className="text-data-darkBlue">p-4</span> <span className="text-brand-darkGrey">// padding: 1rem (16px)</span></p>
          <p><span className="text-data-darkBlue">mt-6</span> <span className="text-brand-darkGrey">// margin-top: 1.5rem (24px)</span></p>
          <p><span className="text-data-darkBlue">gap-2</span> <span className="text-brand-darkGrey">// gap: 0.5rem (8px)</span></p>
          
          <p className="text-brand-darkGrey mt-4 mb-2">// Border Radius</p>
          <p><span className="text-data-darkBlue">rounded-lg</span> <span className="text-brand-darkGrey">// border-radius: 0.5rem</span></p>
          <p><span className="text-data-darkBlue">rounded-2xl</span> <span className="text-brand-darkGrey">// border-radius: 1rem</span></p>
          
          <p className="text-brand-darkGrey mt-4 mb-2">// Shadows</p>
          <p><span className="text-data-darkBlue">shadow-md</span> <span className="text-brand-darkGrey">// Medium shadow</span></p>
          <p><span className="text-data-darkBlue">shadow-xl</span> <span className="text-brand-darkGrey">// Extra large shadow</span></p>
        </div>
      </section>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Spacing',
  component: SpacingPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Spacing tokens including margins, padding, border radius, and box shadows.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {};
