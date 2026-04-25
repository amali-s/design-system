import { addons } from 'storybook/manager-api';
import { sageTheme } from './theme';

/**
 * Applies the Sage Design System theme to the Storybook manager UI:
 * sidebar, toolbar, search, addons panel, and all chrome.
 */
addons.setConfig({
  theme: sageTheme,
});
