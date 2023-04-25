import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { NotificationButton } from './NotificationButton';

export default {
  title: 'features/NotificationButton',
  component: NotificationButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => <NotificationButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
