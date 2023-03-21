import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Text } from '../Text/Text';

import { Card } from './Card';

export default {
  title: 'shared/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <Text title="title" text="text" />,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: <Text title="title" text="text" />,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
