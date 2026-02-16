import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

interface TypeStyleProps {
  name: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
  className: string;
}

const TypeStyleRow = ({ name, fontFamily, fontSize, fontWeight, letterSpacing, className }: TypeStyleProps) => (
  <div className="py-6 border-b border-brand-darkGrey/10">
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
      <span className="text-sm font-w5 text-brand-darkBlue min-w-[120px]">{name}</span>
      <span className="text-xs text-brand-darkGrey font-mono">
        {fontFamily} · {fontSize} · W{fontWeight} · {letterSpacing}
      </span>
    </div>
    <p className={`${className} text-brand-black`}>
      The quick brown fox jumps over the lazy dog
    </p>
  </div>
);

const TypographyPage = () => (
  <div className="p-8 bg-white min-h-screen">
    <div className="max-w-5xl">
      <h1 className="font-brand text-4xl font-bold tracking-tight text-brand-black mb-2">
        Typography
      </h1>
      <p className="text-base font-w3 text-brand-darkGrey mb-12">
        A complete type scale using Rasa for branding and Hiragino Sans for UI text.
      </p>

      {/* Font Families */}
      <section className="mb-16">
        <h2 className="text-xl font-w5 text-brand-darkBlue mb-6">Font Families</h2>
        
        <div className="grid gap-6">
          <div className="p-6 bg-brand-foreground rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-1 text-xs font-w5 bg-primary text-white rounded">Branding</span>
              <span className="text-sm font-mono text-brand-darkGrey">font-brand</span>
            </div>
            <p className="font-brand text-3xl font-bold text-brand-black mb-2">
              Rasa
            </p>
            <p className="text-sm text-brand-darkGrey">
              Used for branding headers and main page titles. A serif font with personality.
            </p>
          </div>
          
          <div className="p-6 bg-brand-foreground rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-1 text-xs font-w5 bg-secondary text-white rounded">UI</span>
              <span className="text-sm font-mono text-brand-darkGrey">font-sans</span>
            </div>
            <p className="font-sans text-3xl font-w5 text-brand-black mb-2">
              Hiragino Sans
            </p>
            <p className="text-sm text-brand-darkGrey">
              Used for page headers, section headers, body text, and labels. Clean and readable.
            </p>
          </div>
        </div>
      </section>

      {/* Page Titles - Rasa */}
      <section className="mb-16">
        <h2 className="text-xl font-w5 text-brand-darkBlue mb-2">Page Titles</h2>
        <p className="text-sm text-brand-darkGrey mb-6">Rasa font for branding and main page titles</p>
        
        <div className="bg-brand-foreground rounded-2xl p-6">
          <TypeStyleRow
            name="Page Title 1"
            fontFamily="Rasa"
            fontSize="64px"
            fontWeight="Bold"
            letterSpacing="-1%"
            className="font-brand text-4xl font-bold tracking-tight leading-tight"
          />
          <TypeStyleRow
            name="Page Title 2"
            fontFamily="Rasa"
            fontSize="64px"
            fontWeight="Medium"
            letterSpacing="-1%"
            className="font-brand text-4xl font-medium tracking-tight leading-tight"
          />
        </div>
      </section>

      {/* Headings - Hiragino Sans */}
      <section className="mb-16">
        <h2 className="text-xl font-w5 text-brand-darkBlue mb-2">Headings</h2>
        <p className="text-sm text-brand-darkGrey mb-6">Hiragino Sans for section and page headers</p>
        
        <div className="bg-brand-foreground rounded-2xl p-6">
          <TypeStyleRow
            name="Heading 6"
            fontFamily="Hiragino Sans"
            fontSize="36px"
            fontWeight="2"
            letterSpacing="0%"
            className="font-sans text-3xl font-w2 tracking-normal"
          />
          <TypeStyleRow
            name="Heading 5"
            fontFamily="Hiragino Sans"
            fontSize="32px"
            fontWeight="3"
            letterSpacing="0%"
            className="font-sans text-2xl font-w3 tracking-normal"
          />
          <TypeStyleRow
            name="Heading 4"
            fontFamily="Hiragino Sans"
            fontSize="24px"
            fontWeight="5"
            letterSpacing="0%"
            className="font-sans text-xl font-w5 tracking-normal"
          />
          <TypeStyleRow
            name="Heading 3"
            fontFamily="Hiragino Sans"
            fontSize="20px"
            fontWeight="1"
            letterSpacing="0%"
            className="font-sans text-lg font-w1 tracking-normal"
          />
          <TypeStyleRow
            name="Heading 2"
            fontFamily="Hiragino Sans"
            fontSize="16px"
            fontWeight="5"
            letterSpacing="0%"
            className="font-sans text-base font-w5 tracking-normal"
          />
          <TypeStyleRow
            name="Heading 1"
            fontFamily="Hiragino Sans"
            fontSize="14px"
            fontWeight="5"
            letterSpacing="0%"
            className="font-sans text-sm font-w5 tracking-normal"
          />
        </div>
      </section>

      {/* Body - Hiragino Sans */}
      <section className="mb-16">
        <h2 className="text-xl font-w5 text-brand-darkBlue mb-2">Body Text</h2>
        <p className="text-sm text-brand-darkGrey mb-6">Hiragino Sans for readable body content</p>
        
        <div className="bg-brand-foreground rounded-2xl p-6">
          <TypeStyleRow
            name="Body 2"
            fontFamily="Hiragino Sans"
            fontSize="16px"
            fontWeight="3"
            letterSpacing="0%"
            className="font-sans text-base font-w3 tracking-normal"
          />
          <TypeStyleRow
            name="Body 1"
            fontFamily="Hiragino Sans"
            fontSize="14px"
            fontWeight="3"
            letterSpacing="0%"
            className="font-sans text-sm font-w3 tracking-normal"
          />
        </div>
      </section>

      {/* Labels - Hiragino Sans */}
      <section className="mb-16">
        <h2 className="text-xl font-w5 text-brand-darkBlue mb-2">Labels</h2>
        <p className="text-sm text-brand-darkGrey mb-6">Hiragino Sans for form labels and small UI text</p>
        
        <div className="bg-brand-foreground rounded-2xl p-6">
          <TypeStyleRow
            name="Label 2"
            fontFamily="Hiragino Sans"
            fontSize="14px"
            fontWeight="2"
            letterSpacing="0%"
            className="font-sans text-sm font-w2 tracking-normal"
          />
          <TypeStyleRow
            name="Label 1"
            fontFamily="Hiragino Sans"
            fontSize="12px"
            fontWeight="2"
            letterSpacing="0%"
            className="font-sans text-xs font-w2 tracking-normal"
          />
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <h2 className="text-xl font-w5 text-brand-darkBlue mb-6">Usage Example</h2>
        
        <div className="p-8 border border-brand-darkGrey/20 rounded-2xl bg-white">
          <h1 className="font-brand text-4xl font-bold tracking-tight text-brand-black mb-4">
            Welcome to the Platform
          </h1>
          <h2 className="font-sans text-xl font-w5 text-brand-darkBlue mb-6">
            Build something extraordinary
          </h2>
          <p className="font-sans text-base font-w3 text-brand-darkGrey mb-6 max-w-2xl">
            A comprehensive design system with carefully crafted components, 
            tokens, and guidelines to help you create consistent user experiences
            across all your applications.
          </p>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-primary text-white font-sans text-sm font-w5 rounded-xl">
              Get Started
            </button>
            <button className="px-4 py-2 border border-brand-darkGrey/30 text-brand-black font-sans text-sm font-w3 rounded-xl">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Tailwind Classes Reference */}
      <section className="mt-12">
        <h2 className="text-xl font-w5 text-brand-darkBlue mb-6">Tailwind CSS Classes</h2>
        
        <div className="font-mono text-sm bg-brand-foreground p-6 rounded-2xl overflow-x-auto">
          <p className="text-brand-darkGrey mb-2">// Font families</p>
          <p><span className="text-data-darkBlue">font-brand</span> <span className="text-brand-darkGrey">// Rasa</span></p>
          <p><span className="text-data-darkBlue">font-sans</span> <span className="text-brand-darkGrey">// Hiragino Sans</span></p>
          
          <p className="text-brand-darkGrey mt-4 mb-2">// Font weights (Hiragino)</p>
          <p><span className="text-data-darkBlue">font-w1</span> <span className="text-brand-darkGrey">// 300</span></p>
          <p><span className="text-data-darkBlue">font-w2</span> <span className="text-brand-darkGrey">// 350</span></p>
          <p><span className="text-data-darkBlue">font-w3</span> <span className="text-brand-darkGrey">// 400</span></p>
          <p><span className="text-data-darkBlue">font-w5</span> <span className="text-brand-darkGrey">// 600</span></p>
          
          <p className="text-brand-darkGrey mt-4 mb-2">// Font weights (Rasa)</p>
          <p><span className="text-data-darkBlue">font-medium</span> <span className="text-brand-darkGrey">// 500</span></p>
          <p><span className="text-data-darkBlue">font-bold</span> <span className="text-brand-darkGrey">// 700</span></p>
          
          <p className="text-brand-darkGrey mt-4 mb-2">// Letter spacing</p>
          <p><span className="text-data-darkBlue">tracking-tight</span> <span className="text-brand-darkGrey">// -1%</span></p>
          <p><span className="text-data-darkBlue">tracking-normal</span> <span className="text-brand-darkGrey">// 0%</span></p>
        </div>
      </section>
    </div>
  </div>
);

const meta: Meta = {
  title: 'Tokens/Typography',
  component: TypographyPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Typography system using Rasa for branding and Hiragino Sans for UI text.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {};
