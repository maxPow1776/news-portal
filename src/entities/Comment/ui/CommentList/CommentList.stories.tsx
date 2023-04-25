import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Comment } from '../../model/types/comment';

import { CommentList } from './CommentList';

const comments: Comment[] = [
  {
    id: '1',
    text: 'comment 1',
    user: { id: '1', username: 'user 1' },
  },
  {
    id: '2',
    text: 'comment 2',
    user: { id: '2', username: 'user 2' },
  },
  {
    id: '3',
    text: 'comment 3',
    user: { id: '1', username: 'user 1' },
  },
];

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  comments,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
