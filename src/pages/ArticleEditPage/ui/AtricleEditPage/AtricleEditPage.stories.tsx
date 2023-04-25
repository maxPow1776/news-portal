import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import AtricleEditPage from './AtricleEditPage';

export default {
  title: 'pages/ArticleEditPage/AtricleEditPage',
  component: AtricleEditPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AtricleEditPage>;

const Template: ComponentStory<typeof AtricleEditPage> = (args) => <AtricleEditPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
