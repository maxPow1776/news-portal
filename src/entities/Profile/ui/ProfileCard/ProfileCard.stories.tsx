import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

const args = {
  data: {
    first: 'first',
    lastname: 'lastname',
    age: 22,
    country: Country.Russia,
    username: 'username',
    city: 'city',
    currency: Currency.RUB,
    avatar:
      'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png',
  },
};

export const Primary = Template.bind({});
Primary.args = args;

export const WithError = Template.bind({});
WithError.args = {
  error: 'error',
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
