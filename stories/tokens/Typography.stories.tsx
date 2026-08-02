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
      <span className="text-sm font-medium text-brand-darkBlue min-w-[120px]">{name}</span>
      <span className="text-xs text-brand-darkGrey font-mono">
        {fontFamily} · {fontSize} · {fontWeight} · {letterSpacing}
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
      <p className="font-body text-base font-light text-brand-darkGrey mb-12">
        A complete type scale using Rethink Sans for headings and Spectral for body text.
      </p>

      {/* Font Families */}
      <section className="mb-16">
        <h2 className="text-xl font-medium text-brand-darkBlue mb-6">Font Families</h2>
        
        <div className="grid gap-6">
          <div className="p-6 bg-brand-foreground rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-1 text-xs font-medium bg-primary text-white rounded">Headings</span>
              <span className="text-sm font-mono text-brand-darkGrey">font-heading / font-brand / font-sans</span>
            </div>
            <p className="font-brand text-3xl font-medium text-brand-black mb-2">
              Rethink Sans
            </p>
            <p className="font-body text-sm font-light text-brand-darkGrey">
              <code className="font-mono text-xs">font-heading</code> for section and component
              headings, <code className="font-mono text-xs">font-brand</code> for page titles,
              <code className="font-mono text-xs"> font-sans</code> for UI chrome — buttons, chips,
              and micro-labels.
            </p>
          </div>
          
          <div className="p-6 bg-brand-foreground rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="px-2 py-1 text-xs font-medium bg-secondary text-white rounded">Body</span>
              <span className="text-sm font-mono text-brand-darkGrey">font-body</span>
            </div>
            <p className="font-body text-3xl font-light text-brand-black mb-2">
              Spectral
            </p>
            <p className="font-body text-sm font-light text-brand-darkGrey">
              Used for body copy, field labels, and helper text (Figma &ldquo;Body 1&rdquo; and
              &ldquo;Label 1&rdquo;). A serif with warmth and readability.
            </p>
          </div>
        </div>
      </section>

      {/* Page Titles */}
      <section className="mb-16">
        <h2 className="text-xl font-medium text-brand-darkBlue mb-2">Page Titles</h2>
        <p className="font-body text-sm font-light text-brand-darkGrey mb-6">Rethink Sans for branding and main page titles</p>
        
        <div className="bg-brand-foreground rounded-2xl p-6">
          <TypeStyleRow
            name="Page Title 1"
            fontFamily="Rethink Sans"
            fontSize="64px"
            fontWeight="Bold"
            letterSpacing="-1%"
            className="font-brand text-4xl font-bold tracking-tight leading-tight"
          />
          <TypeStyleRow
            name="Page Title 2"
            fontFamily="Rethink Sans"
            fontSize="64px"
            fontWeight="Medium"
            letterSpacing="-1%"
            className="font-brand text-4xl font-medium tracking-tight leading-tight"
          />
        </div>
      </section>

      {/* Headings */}
      <section className="mb-16">
        <h2 className="text-xl font-medium text-brand-darkBlue mb-2">Headings</h2>
        <p className="font-body text-sm font-light text-brand-darkGrey mb-6">Rethink Sans for section and page headers</p>
        
        <div className="bg-brand-foreground rounded-2xl p-6">
          <TypeStyleRow
            name="Heading 6"
            fontFamily="Rethink Sans"
            fontSize="36px"
            fontWeight="Regular"
            letterSpacing="0%"
            className="font-sans text-3xl font-normal tracking-normal"
          />
          <TypeStyleRow
            name="Heading 5"
            fontFamily="Rethink Sans"
            fontSize="32px"
            fontWeight="Regular"
            letterSpacing="0%"
            className="font-sans text-2xl font-normal tracking-normal"
          />
          <TypeStyleRow
            name="Heading 4"
            fontFamily="Rethink Sans"
            fontSize="24px"
            fontWeight="Medium"
            letterSpacing="0%"
            className="font-sans text-xl font-medium tracking-normal"
          />
          <TypeStyleRow
            name="Heading 3"
            fontFamily="Rethink Sans"
            fontSize="20px"
            fontWeight="Regular"
            letterSpacing="0%"
            className="font-sans text-lg font-normal tracking-normal"
          />
          <TypeStyleRow
            name="Heading 2"
            fontFamily="Rethink Sans"
            fontSize="20px"
            fontWeight="Medium"
            letterSpacing="0%"
            className="font-sans text-lg font-medium tracking-normal"
          />
          <TypeStyleRow
            name="Heading 1"
            fontFamily="Rethink Sans"
            fontSize="14px"
            fontWeight="Medium"
            letterSpacing="-1%"
            className="font-sans text-sm font-medium tracking-tight"
          />
        </div>
      </section>

      {/* Body */}
      <section className="mb-16">
        <h2 className="text-xl font-medium text-brand-darkBlue mb-2">Body Text</h2>
        <p className="font-body text-sm font-light text-brand-darkGrey mb-6">Spectral Light for readable body content</p>
        
        <div className="bg-brand-foreground rounded-2xl p-6">
          <TypeStyleRow
            name="Body 2"
            fontFamily="Spectral"
            fontSize="16px"
            fontWeight="Light"
            letterSpacing="0%"
            className="font-body text-base font-light tracking-normal leading-relaxed"
          />
          <TypeStyleRow
            name="Body 1"
            fontFamily="Spectral"
            fontSize="14px"
            fontWeight="Light"
            letterSpacing="0%"
            className="font-body text-sm font-light tracking-normal leading-relaxed"
          />
        </div>
      </section>

      {/* Labels */}
      <section className="mb-16">
        <h2 className="text-xl font-medium text-brand-darkBlue mb-2">Labels</h2>
        <p className="font-body text-sm font-light text-brand-darkGrey mb-6">Spectral Light for form labels and small UI text</p>
        
        <div className="bg-brand-foreground rounded-2xl p-6">
          <TypeStyleRow
            name="Label 2"
            fontFamily="Spectral"
            fontSize="14px"
            fontWeight="Light"
            letterSpacing="-6%"
            className="font-body text-sm font-light tracking-[-0.06em]"
          />
          <TypeStyleRow
            name="Label 1"
            fontFamily="Spectral"
            fontSize="12px"
            fontWeight="Light"
            letterSpacing="-6%"
            className="font-body text-xs font-light tracking-[-0.06em]"
          />
        </div>
      </section>

      {/* Usage Example */}
      <section>
        <h2 className="text-xl font-medium text-brand-darkBlue mb-6">Usage Example</h2>
        
        <div className="p-8 border border-brand-darkGrey/20 rounded-2xl bg-white">
          <h1 className="font-brand text-4xl font-bold tracking-tight text-brand-black mb-4">
            Welcome to the Platform
          </h1>
          <h2 className="font-sans text-xl font-medium text-brand-darkBlue mb-6">
            Build something extraordinary
          </h2>
          <p className="font-body text-base font-light text-brand-darkGrey mb-6 max-w-2xl">
            A comprehensive design system with carefully crafted components, 
            tokens, and guidelines to help you create consistent user experiences
            across all your applications.
          </p>
          <div className="flex gap-4">
            <button className="px-3 py-2 bg-primary text-[#f6f1eb] font-sans text-sm font-medium rounded-[32px]">
              Get Started
            </button>
            <button className="px-3 py-2 border border-brand-darkGrey/30 text-brand-black font-sans text-sm font-medium rounded-[32px]">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Tailwind Classes Reference */}
      <section className="mt-12">
        <h2 className="text-xl font-medium text-brand-darkBlue mb-6">Tailwind CSS Classes</h2>
        
        <div className="font-mono text-sm bg-brand-foreground p-6 rounded-2xl overflow-x-auto">
          <p className="text-brand-darkGrey mb-2">// Font families</p>
          <p><span className="text-data-darkBlue">font-brand</span> <span className="text-brand-darkGrey">// Rethink Sans</span></p>
          <p><span className="text-data-darkBlue">font-sans</span> <span className="text-brand-darkGrey">// Rethink Sans</span></p>
          <p><span className="text-data-darkBlue">font-body</span> <span className="text-brand-darkGrey">// Spectral</span></p>
          
          <p className="text-brand-darkGrey mt-4 mb-2">// Font weights</p>
          <p><span className="text-data-darkBlue">font-light</span> <span className="text-brand-darkGrey">// 300 — Spectral Light</span></p>
          <p><span className="text-data-darkBlue">font-normal</span> <span className="text-brand-darkGrey">// 400 — Rethink Regular</span></p>
          <p><span className="text-data-darkBlue">font-medium</span> <span className="text-brand-darkGrey">// 500 — Rethink Medium</span></p>
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
        component: 'Typography system using Rethink Sans for headings and Spectral for body text.',
      },
    },
  },
};

export default meta;

type Story = StoryObj;

export const Overview: Story = {};
