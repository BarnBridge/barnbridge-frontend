import { useState } from 'react';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import TxConfirmModal from 'web3/components/tx-confirm-modal';

import { Button } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { TokenAmount } from 'components/custom/token-amount-new';
import { Hint, Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { PoolApiType } from 'modules/smart-alpha/api';
import SmartAlphaContract from 'modules/smart-alpha/contracts/smartAlphaContract';

import s from './s.module.scss';

type Props = {
  pool: PoolApiType;
  smartAlphaContract: SmartAlphaContract | undefined;
};

export const SeniorDeposit = ({ pool, smartAlphaContract }: Props) => {
  const { getToken } = useTokens();
  const [tokenState, setTokenState] = useState('');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [saving, setSaving] = useState(false);

  const poolToken = getToken(pool.poolToken.symbol);

  const tokenMax = new BigNumber(3.21312);

  async function handleDeposit(gasPrice: number) {
    setSaving(true);

    try {
      const amount = BigNumber.from(tokenState)?.scaleBy(pool.poolToken.decimals);

      if (amount) {
        await smartAlphaContract?.depositSenior(amount, gasPrice);
      }
    } catch (e) {
      console.error(e);
    }

    setSaving(false);
  }

  return (
    <div className="card p-24">
      <Text type="h3" weight="bold" color="primary" tag="h3" className="mb-16">
        Senior deposit
      </Text>
      <Text type="p2" weight="semibold" color="secondary" tag="p" className="mb-32">
        Choose the amount of tokens you want to deposit in the senior side. Make sure you double check the amounts.
      </Text>

      <div className={classNames(s.depositBalance, 'mb-32')}>
        <Hint
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat."
          className="mb-4">
          <Text type="small" weight="semibold" color="secondary">
            Balance in deposit queue
          </Text>
        </Hint>
        <Text type="p1" weight="semibold" color="primary" className="flex align-center">
          40.0000
          <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} className="ml-8" />
        </Text>
      </div>

      <Text type="small" weight="semibold" color="secondary" className="mb-8">
        wETH amount
      </Text>
      <TokenAmount
        before={<TokenIcon name={poolToken?.icon ?? 'unknown'} size={24} />}
        value={tokenState}
        onChange={setTokenState}
        slider
        max={tokenMax}
        placeholder={`0 (Max ${tokenMax ?? 0})`}
        className="mb-32"
      />

      <div className="flex justify-end align-center">
        <Button variation="primary">Enable {pool.poolToken.symbol}</Button>
        <Icon name="chevron" size={16} color="icon" className="ml-12 mr-12" />
        <Button variation="primary" onClick={() => setConfirmModalVisible(true)}>
          {saving && <Spinner className="mr-8" />}
          Deposit
        </Button>
      </div>

      {confirmModalVisible && (
        <TxConfirmModal
          title="Confirm deposit"
          submitText="Confirm deposit"
          onCancel={() => setConfirmModalVisible(false)}
          onConfirm={({ gasPrice }) => handleDeposit(gasPrice)}
        />
      )}
    </div>
  );
};
