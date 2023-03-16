import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';

import { Code } from './Code';

export default {
  title: 'shared/Code',
  component: Code,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: `import { ComponentStory, ComponentMeta } from '@storybook/react';
  import { Theme } from 'app/providers/ThemeProvider';
  import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
  import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
  
  import { Code } from './Code';
  
  export default {
    title: 'Code',
    component: Code,
    argTypes: {
      backgroundColor: { control: 'color' },
    },
  } as ComponentMeta<typeof Code>;
  
  const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;`,
};
// Primary.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
