import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';

import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  children: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut eligendi dolor explicabo labore possimus culpa velit molestias totam, deserunt, mollitia beatae neque doloremque dolore, minima vel dicta inventore commodi sint.',
};

export const Dark = Template.bind({});
Dark.args = {
  isOpen: true,
  children: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut eligendi dolor explicabo labore possimus culpa velit molestias totam, deserunt, mollitia beatae neque doloremque dolore, minima vel dicta inventore commodi sint.',
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
