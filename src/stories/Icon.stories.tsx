import { ComponentMeta, ComponentStory } from '@storybook/react';

// import { Button } from './Button';
import { Icon as IconComponent, IconNames } from 'components/icon';

export default {
  title: 'Components/Icons',
  component: IconComponent,
} as ComponentMeta<typeof IconComponent>;

const IconTemplate: ComponentStory<typeof IconComponent> = args => (
  <div style={{ color: '#ffa500' }}>
    parent text color is orange
    <IconComponent {...args} />
  </div>
);
export const Icon = IconTemplate.bind({});
Icon.args = {
  name: 'add',
  size: 24,
};

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

export const Icons = () => (
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
