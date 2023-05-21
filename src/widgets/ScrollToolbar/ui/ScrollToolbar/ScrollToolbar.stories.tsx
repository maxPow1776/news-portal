import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { ScrollToolbar } from './ScrollToolbar';

export default {
  title: 'ScrollToolbar',
  component: ScrollToolbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ScrollToolbar>;

const Template: ComponentStory<typeof ScrollToolbar> = (args) => <ScrollToolbar {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
