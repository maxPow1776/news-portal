import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { ViewSelectorContainer } from './ViewSelectorContainer';

export default {
  title: 'ViewSelectorContainer',
  component: ViewSelectorContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ViewSelectorContainer>;

const Template: ComponentStory<typeof ViewSelectorContainer> = (args) => <ViewSelectorContainer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
