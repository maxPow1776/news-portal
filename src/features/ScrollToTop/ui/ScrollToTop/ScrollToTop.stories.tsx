import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { ScrollToTop } from './ScrollToTop';

export default {
  title: 'ScrollToTop',
  component: ScrollToTop,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ScrollToTop>;

const Template: ComponentStory<typeof ScrollToTop> = (args) => <ScrollToTop {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
