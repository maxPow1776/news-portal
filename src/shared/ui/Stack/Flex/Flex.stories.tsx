import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';

import { Flex } from './Flex';

const children = (
  <>
    <div>text</div>
    <div>text</div>
    <div>text</div>
    <div>text</div>
  </>
);

export default {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
  children,
};

export const RowGap4 = Template.bind({});
RowGap4.args = {
  gap: '4',
  children,
};

export const RowGap8 = Template.bind({});
RowGap8.args = {
  gap: '8',
  children,
};

export const RowGap16 = Template.bind({});
RowGap16.args = {
  gap: '16',
  children,
};

export const RowGap32 = Template.bind({});
RowGap32.args = {
  gap: '32',
  children,
};

export const RowDark = Template.bind({});
RowDark.args = {
  children,
};
RowDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Column = Template.bind({});
Column.args = {
  direction: 'column',
  children,
};

export const ColumnGap4 = Template.bind({});
ColumnGap4.args = {
  direction: 'column',
  gap: '4',
  children,
};

export const ColumnGap8 = Template.bind({});
ColumnGap8.args = {
  direction: 'column',
  gap: '8',
  children,
};

export const ColumnGap16 = Template.bind({});
ColumnGap16.args = {
  direction: 'column',
  gap: '16',
  children,
};

export const ColumnGap32 = Template.bind({});
ColumnGap32.args = {
  direction: 'column',
  gap: '32',
  children,
};

export const ColumnAlignEnd = Template.bind({});
ColumnAlignEnd.args = {
  align: 'end',
  direction: 'column',
  children,
};

export const ColumnAlignStart = Template.bind({});
ColumnAlignStart.args = {
  align: 'start',
  direction: 'column',
  children,
};
