import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ProfileCardRedesigned } from './ProfileCardRedesigned';

export default {
  title: 'entities/Profile/ProfileCardRedesigned',
  component: ProfileCardRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCardRedesigned>;

const Template: ComponentStory<typeof ProfileCardRedesigned> = (args) => <ProfileCardRedesigned {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
