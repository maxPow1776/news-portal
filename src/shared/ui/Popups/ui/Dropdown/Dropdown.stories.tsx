import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

import { Dropdown } from './Dropdown';
import { Button } from '../../../Button/Button';

const items = [
  { content: 'first' },
  { content: 'second' },
  { content: 'third' },
];

export default {
  title: 'shared/Popups/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  trigger: <Button>Open</Button>,
  items,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  trigger: <Button>Open</Button>,
  items,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
