import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Text, TextSize, TextTheme } from './Text';

export default {
  title: 'shared/deprecated/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Title',
  text: 'text',
};

export const Error = Template.bind({});
Error.args = {
  title: 'Title',
  text: 'text',
  theme: TextTheme.ERROR,
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Title',
};

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'text',
};

export const SizeL = Template.bind({});
SizeL.args = {
  title: 'Title',
  text: 'text',
  size: TextSize.L,
};

export const SizeM = Template.bind({});
SizeM.args = {
  title: 'Title',
  text: 'text',
  size: TextSize.M,
};

export const SizeS = Template.bind({});
SizeS.args = {
  title: 'Title',
  text: 'text',
  size: TextSize.S,
};
