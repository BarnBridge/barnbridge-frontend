import React from 'react';

import Icon from 'components/custom/icon';
import IconsPair from 'components/custom/icons-pair';
import { Tabs } from 'components/custom/tabs';
import { TokenAmount, TokenAmountPreview, TokenSelect } from 'components/custom/token-amount-new';
import TransactionDetails from 'components/custom/transaction-details';
import { Text } from 'components/custom/typography';
import { KnownTokens } from 'components/providers/known-tokens-provider';

import s from './s.module.scss';

const DepositView: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('multiple');

  const tabs = [
    {
      children: 'Multiple tokens',
      id: 'multiple',
    },
    {
      children: 'Single token',
      id: 'single',
    },
  ];
  return (
    <>
      <div
        className="flexbox-list align-middle mb-40 mh-auto"
        style={{ maxWidth: 640, '--gap': '24px 64px', '--sm-gap': '24px', '--min': 'auto' } as React.CSSProperties}>
        <div className="flex">
          <IconsPair icon1="token-wbtc" icon2="token-eth" size={40} className="mr-16" />
          <div>
            <div className="text-p1 fw-semibold color-primary mr-4">75% WBTC / 25% ETH</div>
            <div className="text-sm fw-semibold color-secondary">Wrapped Bitcoin / Ethereum</div>
          </div>
        </div>
        <div>
          <div className="text-sm fw-semibold color-secondary mb-4">Wallet WBTC balance</div>
          <div>
            <span className="text-p1 fw-semibold color-primary mr-8">9.789</span>
            <span className="text-sm fw-semibold color-secondary">WBTC</span>
          </div>
        </div>
        <div>
          <div className="text-sm fw-semibold color-secondary mb-4">Wallet ETH balance</div>
          <div>
            <span className="text-p1 fw-semibold color-primary mr-8">9.789</span>
            <span className="text-sm fw-semibold color-secondary">ETH</span>
          </div>
        </div>
      </div>
      <div className="card ph-32 pv-32 mh-auto" style={{ width: '100%', maxWidth: 640 }}>
        <Text type="h3" weight="semibold" color="primary" className="mb-16">
          Deposit
        </Text>
        <Text type="p2" weight="semibold" color="secondary" className="mb-32">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse efficitur odio nunc, a sodales ligula
          varius nec
        </Text>
        <Tabs
          tabs={tabs}
          active={activeTab}
          onClick={setActiveTab}
          className="mb-32"
          variation="elastic"
          size="small"
        />
        {activeTab === 'multiple' ? <MultipleTokensForm /> : <SingleTokenForm />}
      </div>
    </>
  );
};

export default DepositView;

const MultipleTokensForm = () => {
  const [wbtcState, setWbtcState] = React.useState<string>('');
  const [ethState, setEthState] = React.useState<string>('');
  return (
    <form>
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">WBTC amount</span>
        <span className="text-sm fw-semibold color-secondary ml-auto">Current ratio: 73.87%</span>
      </div>
      <TokenAmount
        before={<Icon name="token-wbtc" width={24} height={24} />}
        value={wbtcState}
        onChange={setWbtcState}
        max={9.789}
        placeholder={`0 (Max ${9.789})`}
        className="mb-40"
      />

      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">ETH amount</span>
        <span className="text-sm fw-semibold color-secondary ml-auto">Current ratio: 26.13%</span>
      </div>
      <TokenAmount
        before={<Icon name="token-eth" width={24} height={24} />}
        value={ethState}
        onChange={setEthState}
        max={9.789}
        placeholder={`0 (Max ${9.789})`}
        className="mb-40"
      />

      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">bb_ET_WBTC75/ETH25 amount</span>
        <span className="text-sm fw-semibold color-secondary ml-auto">$ 63,132.11 per bb_ET_WBTC50/ETH50</span>
      </div>
      <TokenAmountPreview
        before={<IconsPair icon1="token-wbtc" icon2="token-eth" size={24} />}
        value="2.3116"
        className="mb-32"
      />
      <div className="flex align-center col-gap-24 mb-32">
        <button type="button" className="button-primary" style={{ flexGrow: 1 }}>
          Enable ETH
        </button>
        <span className="middle-dot color-secondary" />
        <button type="button" className="button-primary" style={{ flexGrow: 1 }}>
          Enable WBTC
        </button>
      </div>
      <div className="grid flow-col col-gap-32 align-center justify-space-between">
        <button type="button" className="button-back">
          <Icon name="arrow-back" width={16} height={16} className="mr-8" color="inherit" />
          Cancel
        </button>
        <button type="submit" className="button-primary">
          Deposit
        </button>
      </div>
    </form>
  );
};

const SingleTokenForm = () => {
  const tokens = [KnownTokens.BTC, KnownTokens.ETH, KnownTokens.BOND];

  const [selectedToken, setSelectedToken] = React.useState<KnownTokens>(tokens[0]);
  const [tokenState, setTokenState] = React.useState<string>('');

  return (
    <form>
      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">WBTC amount</span>
        <span className="text-sm fw-semibold color-secondary ml-auto">Current ratio: 73.87%</span>
      </div>
      <TokenAmount
        before={<TokenSelect value={selectedToken} onChange={setSelectedToken} tokens={tokens} />}
        value={tokenState}
        onChange={setTokenState}
        max={9.789}
        placeholder={`0 (Max ${9.789})`}
        className="mb-40"
        classNameBefore={s.amountDropdownBefore}
      />

      <div className="css-grid mb-32" style={{ '--gap': '32px' } as React.CSSProperties}>
        <div>
          <div className="flex mb-8">
            <span className="text-sm fw-semibold color-secondary">Uniswap WBTC amount</span>
            <span className="text-sm fw-semibold color-secondary ml-auto">73.87%</span>
          </div>
          <TokenAmountPreview
            before={<Icon name="token-wbtc" width={24} height={24} />}
            value="2.3116"
            secondary="$ 107,319.4467"
          />
        </div>
        <div>
          <div className="flex mb-8">
            <span className="text-sm fw-semibold color-secondary">Uniswap ETH amount</span>
            <span className="text-sm fw-semibold color-secondary ml-auto">26.13%</span>
          </div>
          <TokenAmountPreview
            before={<Icon name="token-eth" width={24} height={24} />}
            value="2.3116"
            secondary="$ 107,319.4467"
          />
        </div>
      </div>

      <div className="flex mb-8">
        <span className="text-sm fw-semibold color-secondary">bb_ET_WBTC75/ETH25 amount</span>
        <span className="text-sm fw-semibold color-secondary ml-auto">$ 63,132.11 per bb_ET_WBTC50/ETH50</span>
      </div>
      <TokenAmountPreview
        before={<IconsPair icon1="token-wbtc" icon2="token-eth" size={24} />}
        value="2.3116"
        className="mb-32"
      />

      <TransactionDetails
        className="mb-32"
        showSlippage
        slippage={0.5}
        slippageHint="Your transaction will revert if the amount of tokens you actually receive is smaller by this percentage."
        showDeadline
        deadline={20}
        onChange={fd => console.log({ fd })}>
        Uniswap transaction details
      </TransactionDetails>

      <div className="grid flow-col col-gap-32 align-center justify-space-between">
        <button type="button" className="button-back">
          <Icon name="arrow-back" width={16} height={16} className="mr-8" color="inherit" />
          Cancel
        </button>
        <button type="submit" className="button-primary">
          Deposit
        </button>
      </div>
    </form>
  );
};
