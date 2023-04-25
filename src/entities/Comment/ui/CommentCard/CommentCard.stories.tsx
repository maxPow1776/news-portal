import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Comment } from '../../model/types/comment';

import { CommentCard } from './CommentCard';

const comment: Comment = {
  id: '1',
  text: 'comment 1',
  user: { id: '1', username: 'user 1' },
};

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  comment,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
