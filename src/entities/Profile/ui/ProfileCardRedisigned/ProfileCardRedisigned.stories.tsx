import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { ProfileCardRedisigned } from './ProfileCardRedisigned';

export default {
  title: 'ProfileCardRedisigned',
  component: ProfileCardRedisigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCardRedisigned>;

const Template: ComponentStory<typeof ProfileCardRedisigned> = (args) => <ProfileCardRedisigned {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
