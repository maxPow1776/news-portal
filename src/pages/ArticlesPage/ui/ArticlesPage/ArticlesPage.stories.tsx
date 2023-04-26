import { ComponentMeta, ComponentStory } from '@storybook/react';

import ArticlesPage from './ArticlesPage';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

export default {
  title: 'pages/ArticlesPage/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
