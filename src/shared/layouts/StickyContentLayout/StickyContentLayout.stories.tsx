import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { StickyContentLayout } from './StickyContentLayout';

export default {
  title: 'shared/layouts/StickyContentLayout',
  component: StickyContentLayout,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof StickyContentLayout>;

const Template: ComponentStory<typeof StickyContentLayout> = (args) => <StickyContentLayout {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
