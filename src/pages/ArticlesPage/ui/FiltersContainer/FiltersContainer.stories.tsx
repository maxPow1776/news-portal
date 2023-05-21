import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { FiltersContainer } from './FiltersContainer';

export default {
  title: 'pages/ArticlesPage/FiltersContainer',
  component: FiltersContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FiltersContainer>;

const Template: ComponentStory<typeof FiltersContainer> = (args) => <FiltersContainer {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
