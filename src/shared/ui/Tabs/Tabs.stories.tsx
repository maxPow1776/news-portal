import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

import { Tabs } from './Tabs';

const tabs = [
  {
    value: 'tab 1',
    content: 'tab 1',
  },
  {
    value: 'tab 2',
    content: 'tab 2',
  },
  {
    value: 'tab 3',
    content: 'tab 3',
  },
];

export default {
  title: 'shared/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  tabs,
  value: 'tab 2',
  onTabClick: action('onTabClick'),
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  tabs,
  value: 'tab 2',
  onTabClick: action('onTabClick'),
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
