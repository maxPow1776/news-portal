import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Comment } from '../../model/types/comment';

import { CommentCard } from './CommentCard';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

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

export const PrimaryDeprecated = Template.bind({});
PrimaryDeprecated.args = {
  comment,
};
PrimaryDeprecated.decorators = [
  ThemeDecorator({ isAppRedesigned: false }),
  FeatureFlagsDecorator({ isAppRedesigned: false }),
];

export const Primary = Template.bind({});
Primary.args = {
  comment,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
