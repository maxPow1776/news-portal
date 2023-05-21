import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileCardDeprecated } from './ProfileCardDeprecated';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';

export default {
  title: 'entities/Profile/deprecated/ProfileCardDeprecated',
  component: ProfileCardDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCardDeprecated>;

const Template: ComponentStory<typeof ProfileCardDeprecated> = (args) => <ProfileCardDeprecated {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [ThemeDecorator({ isAppRedesigned: false }), FeatureFlagsDecorator({ isAppRedesigned: false })];
