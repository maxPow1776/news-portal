import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { ArticleViewSelector } from './ArticleViewSelector';

export default {
  title: 'entities/Article/ArticleViewSelector',
  component: ArticleViewSelector,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleViewSelector>;

const Template: ComponentStory<typeof ArticleViewSelector> = (args) => <ArticleViewSelector {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
