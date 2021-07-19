import { ComponentMeta, ComponentStory } from '@storybook/react';

// import { Button } from './Button';
import { Icon as IconComponent, IconNames, TokenIcon as TokenIconComponent, TokenIconNames } from 'components/icon';

export default {
  title: 'Components/Icons',
  component: IconComponent,
} as ComponentMeta<typeof IconComponent>;

const names: IconNames[] = [
  'certificate',
  'chart-up',
  'graph-up',
  'timer',
  'judge',
  'file-add',
  'file-check',
  'file-failed',
  'file-clock',
  'wallet2',
  'tokens',
  'proposal-canceled',
  'lock',
  'queue',
  'gear',
  'hourglass2',
  'pending',
  'clock',
  'chart3',
  'stake',
  'error',
  'check-circle',
  'info',
  'danger',
  'dropdown',
  'dropdown-active',
  'minus',
  'plus',
  'check',
  'close',
  'arrow-right',
  'arrow-left',
  'chevron',
  'menu-toggle',
  'menu-hide',
  'add',
  'status',
  'network',
  'filter',
  'insured',
  'redeem',
  'yield-farming',
  'governance',
  'smart-yield',
  'smart-alpha',
  'smart-exposure',
  'docs',
  'auto',
  'light-mode',
  'dark-mode',
  'overview',
  'wallet',
  'proposals',
  'pairs',
  'signal',
  'forum',
  'treasury',
  'pools',
  'mainnet',
  'fiat',
  'mint',
  'testnet',
  'vertical-menu',
  'menu',
  'hourglass',
  'loader',
  'bell',
  'gear',
  'calendar',
  'delegated-by-me',
  'voting-power',
  'bonus',
  'delegated',
  'external',
];

export const Icon = () => (
  <dl
    style={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
    {names.map((name, idx) => (
      <div
        key={idx}
        style={{
          padding: 8,
          margin: 4,
          background: '#ccc',
        }}>
        <dt>{name}</dt>
        <dd>
          <IconComponent name={name} />
        </dd>
      </div>
    ))}
  </dl>
);

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

export const TokenIcon = () => (
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
);

// const Template: ComponentStory<typeof Button> = args => <Button {...args} />;

// export const Primary = Template.bind({});
// Primary.args = {
//   children: 'Button',
//   variation: 'primary',
// };

// export const Secondary = Template.bind({});
// Secondary.args = {
//   children: 'Button',
//   variation: 'secondary',
// };

// export const Large = Template.bind({});
// Large.args = {
//   children: 'Button',
//   variation: 'secondary',
//   size: 'big',
// };

// export const Small = Template.bind({});
// Small.args = {
//   children: 'Button',
//   variation: 'secondary',
//   size: 'small',
// };
