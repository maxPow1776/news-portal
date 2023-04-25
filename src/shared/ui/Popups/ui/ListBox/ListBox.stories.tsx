import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

import { ListBox } from './ListBox';

const items = [
  { content: 'first', value: '1' },
  { content: 'second', value: '2' },
  { content: 'third', value: '3' },
];

export default {
  title: 'shared/Popups/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [
    (Story) => <div style={{ padding: 200 }}><Story /></div>,
  ],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const TopRight = Template.bind({});
TopRight.args = {
  items,
  value: '1',
  direction: 'top right',
};

export const TopLeft = Template.bind({});
TopLeft.args = {
  items,
  value: '1',
  direction: 'top left',
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  items,
  value: '1',
  direction: 'bottom right',
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  items,
  value: '1',
  direction: 'bottom left',
};
