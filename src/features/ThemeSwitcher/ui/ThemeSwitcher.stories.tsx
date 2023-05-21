import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeSwitcher } from './ThemeSwitcher';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

export default {
  title: 'features/ThemeSwitcher',
  component: ThemeSwitcher,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = (args) => <ThemeSwitcher {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];
