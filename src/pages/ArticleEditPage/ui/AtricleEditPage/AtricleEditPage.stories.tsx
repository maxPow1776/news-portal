import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';

import { AtricleEditPage } from './AtricleEditPage';

export default {
  title: 'AtricleEditPage',
  component: AtricleEditPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AtricleEditPage>;

const Template: ComponentStory<typeof AtricleEditPage> = (args) => <AtricleEditPage {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
Primary.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
