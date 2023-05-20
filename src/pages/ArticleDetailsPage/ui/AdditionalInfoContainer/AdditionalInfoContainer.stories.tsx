import { ComponentStory, ComponentMeta } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';

import { AdditionalInfoContainer } from './AdditionalInfoContainer';

export default {
  title: 'AdditionalInfoContainer',
  component: AdditionalInfoContainer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AdditionalInfoContainer>;

const Template: ComponentStory<typeof AdditionalInfoContainer> = () => <AdditionalInfoContainer />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [StoreDecorator({})];
