import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';

export default {
  title: 'widgets/ArticleAdditionalInfo',
  component: ArticleAdditionalInfo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleAdditionalInfo>;

const Template: ComponentStory<typeof ArticleAdditionalInfo> = (args) => <ArticleAdditionalInfo {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  author: {
    id: '1',
    avatar: '',
    username: 'username',
  },
  createdAt: '12.12.12',
  views: 110,
};
