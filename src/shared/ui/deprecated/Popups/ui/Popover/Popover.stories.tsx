import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { Popover } from './Popover';

export default {
  title: 'shared/deprecated/Popups/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
