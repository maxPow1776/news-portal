import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { RatingCard } from './RatingCard';

export default {
  title: 'entities/Rating/RatingCard',
  component: RatingCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RatingCard>;

const Template: ComponentStory<typeof RatingCard> = (args) => <RatingCard {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
