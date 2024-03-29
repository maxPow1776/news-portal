import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Article } from '@/entities/Article';
import { ArticleRecommendationsList } from './ArticleRecommendationsList';

export default {
  title: 'features/ArticleRecommendationsList',
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [StoreDecorator({})],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => <ArticleRecommendationsList {...args} />;

const article: Article = {
  id: '1',
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  createdAt: '',
  views: 123,
  user: { id: '1', username: 'test' },
  blocks: [],
  type: [],
  title: 'title',
  subtitle: 'subtitle',
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=4&_expand=user`,
      method: 'GET',
      status: 200,
      response: [{ ...article }, { ...article, id: '2' }, { ...article, id: '3' }],
    },
  ],
};
