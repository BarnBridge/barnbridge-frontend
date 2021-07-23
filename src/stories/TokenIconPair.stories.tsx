import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TokenIconPair as TokenIconPairComponent } from 'components/token-icon';
import { ReactComponent as TokenIconsStaticSprite } from 'resources/svg/token-icons-sprite-static.svg';

export default {
  title: 'Components/TokenIconPair',
  component: TokenIconPairComponent,
} as ComponentMeta<typeof TokenIconPairComponent>;

const Template: ComponentStory<typeof TokenIconPairComponent> = args => (
  <>
    <TokenIconsStaticSprite /> <TokenIconPairComponent {...args} />
  </>
);
export const TokenPair = Template.bind({});
TokenPair.args = {
  name1: 'usdc',
  name2: 'bond',
  size: 40,
};
