import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TokenIcon as TokenIconComponent, TokenIconNames } from 'components/token-icon';
import { ReactComponent as TokenIconsStaticSprite } from 'resources/svg/token-icons-sprite-static.svg';

export default {
  title: 'Components/TokenIcons',
  component: TokenIconComponent,
} as ComponentMeta<typeof TokenIconComponent>;

const TokenIconTemplate: ComponentStory<typeof TokenIconComponent> = args => (
  <>
    <TokenIconsStaticSprite /> <TokenIconComponent {...args} />
  </>
);
export const TokenIcon = TokenIconTemplate.bind({});
TokenIcon.args = {
  name: 'usdc',
  size: 40,
};

const tokenNames: TokenIconNames[] = [
  'aave',
  'stkaave',
  'compound',
  'cream',
  'yearn',
  'polygon',
  'bond',
  'usdc',
  'dai',
  'susd',
  'eth',
  'wbtc',
  'gusd',
  'usdt',
  'sy-pools',
  'unknown',
  'weth',
  'fiat',
  'usd',
];

export const TokenIcons = () => (
  <>
    <TokenIconsStaticSprite />
    <dl
      style={{
        display: 'flex',
        flexWrap: 'wrap',
      }}>
      {tokenNames.map((name, idx) => (
        <div
          key={idx}
          style={{
            padding: 8,
            margin: 4,
            background: '#ccc',
          }}>
          <dt>{name}</dt>
          <dd>
            <TokenIconComponent name={name} />
          </dd>
        </div>
      ))}
    </dl>
  </>
);
