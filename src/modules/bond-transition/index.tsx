import React, { useState } from 'react';

import { Text } from 'components/custom/typography';

import Alert from '../../components/antd/alert';
import Tooltip from '../../components/antd/tooltip';
import { Button } from '../../components/button';
import { Tabs as ElasticTabs } from '../../components/custom/tabs';
import { TokenAmount } from '../../components/custom/token-amount-new';
import { Icon } from '../../components/icon';
import { TokenIcon } from '../../components/token-icon';
import { useWallet } from '../../wallets/walletProvider';

import s from './s.module.scss';
import { isNumber } from 'lodash';
import { formatToken } from '../../web3/utils';

const BondTransitionView = () => {
  const [bondType, setBondType] = useState('bond');
  const [fromAmount, setFromAmount] = useState('0');
  const [toAmount, setToAmount] = useState('0');
  const walletCtx = useWallet();
  const maxAmount = walletCtx.isActive ? walletCtx.ethBalance?.toNumber() : undefined;
  //todo: will be fetched from api
  const transactionFee = 0;
  const fromAmountValid = isNumber(+fromAmount) && +fromAmount > 0 && maxAmount && +fromAmount <= maxAmount;
  const toAmountValid = isNumber(+toAmount) && +toAmount > 0 && maxAmount && +toAmount <= maxAmount;
  const isSubmitDisabled = walletCtx.isActive && !fromAmountValid && !toAmountValid;
  const handleSubmit = () => {
    if (!walletCtx.isActive) {
      walletCtx.showWalletsModal();
    }
    // todo: implement open modal
  };

  return (
    <div className={s.container}>
      <article className="card flex flow-row p-32 mb-40">
        <header className="mb-24">
          <Text type="p1" weight="semibold" color="primary" className="mb-4" wrap>
            Swap BOND for BARN
          </Text>
          <Text type="p2" weight="semibold" color="secondary" wrap className="block">
            Choose the amount of BOND tokens you want to exchange for BARN.
          </Text>
        </header>
        <div>
          <ElasticTabs
            tabs={[
              { id: 'bond', children: 'BOND' },
              { id: 'dBond', children: 'dBOND', disabled: !walletCtx.isActive },
            ]}
            activeKey={bondType}
            onClick={setBondType}
            variation="elastic"
            className="mb-24"
            style={{
              width: '100%',
              height: 40,
            }}
          />
        </div>
        <div>
          <div className="flex justify-space-between mb-8">
            <Text type="small" weight="semibold" color="secondary" wrap className="block">
              From
            </Text>
            {walletCtx.isActive && walletCtx.ethBalance && (
              <Text type='small' weight='semibold' color='secondary' wrap className='block'>
                {`Available: ${formatToken(walletCtx.ethBalance)}`}
              </Text>
            )}
          </div>
          <TokenAmount
            before={<TokenIcon name="eth" />}
            value={fromAmount}
            onChange={setFromAmount}
            max={maxAmount}
            placeholder="0.0"
            className="mb-24"
          />
          <div className={s.iconContainer}>
            <Icon name="arrow" color="secondary" className={s.downArrow} />
          </div>
          <Text type="small" weight="semibold" color="secondary" wrap className="block mb-8">
            To
          </Text>
          <TokenAmount
            before={<TokenIcon name="bond" />}
            value={toAmount}
            onChange={setToAmount}
            placeholder="0.0"
            className="mb-24"
          />
        </div>
        <div className={s.transactionFeeContainer}>
          <div className="flex">
            <Text type="small" weight="semibold" color="secondary" wrap className="block mr-8">
              Transaction fee
            </Text>
            <Tooltip title="" placement="top">
              <Icon name="info" size={16} color="secondary" />
            </Tooltip>
          </div>
          <Text type="small" weight="semibold" color="secondary" wrap className="block">
            {`${transactionFee} ETH`}
          </Text>
        </div>
        <Alert
          message={
            <div className="flex flow-row row-gap-16 align-start">
              <Text type="p2" weight="semibold" color="blue">
                Please note that the BARN tokens will be distributed on Optimism, so it can take some time before they
                will be loaded to your wallet address.
              </Text>
            </div>
          }
          className="mb-32"
        />
        <Button variation="primary" onClick={handleSubmit} disabled={isSubmitDisabled}>
          {walletCtx.isActive ? 'Transfer' : 'Connect Wallet'}
        </Button>
      </article>
    </div>
  );
};

export default BondTransitionView;