import { Story } from '@storybook/react';
// eslint-disable-next-line maxpow1776-custom/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';
import { setFeatureFlags, toggleFeatures } from '@/shared/lib/features';
import { FeatureFlags } from '@/shared/types/featureFlags';

export const ThemeDecorator = (features: FeatureFlags, theme?: Theme) => (StoryComponent: Story) => {
  setFeatureFlags(features);

  return (
    <ThemeProvider initialTheme={theme}>
      <div
        className={`${toggleFeatures({
          name: 'isAppRedesigned',
          off: () => 'app',
          on: () => 'app_redesigned',
        })} ${theme}`}>
        <StoryComponent />
      </div>
    </ThemeProvider>
  );
};
