import type { Preview } from '@storybook/react-vite'
import './src/tailwind.css';
import { sageTheme } from './theme';

const preview: Preview = {
  parameters: {
    // Apply the Sage theme to all docs pages
    docs: {
      theme: sageTheme,
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    // Warm cream canvas background matching brand.white
    backgrounds: {
      default: 'warm white',
      values: [
        { name: 'warm white',  value: '#FFFDFA' },
        { name: 'foreground',  value: '#EDE6DE' },
        { name: 'sage tint',   value: '#EDF3ED' },
        { name: 'dark',        value: '#1B2323' },
      ],
    },
  },
};

export default preview;