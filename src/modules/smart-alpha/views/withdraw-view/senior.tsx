import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import TxConfirmModal from 'web3/components/tx-confirm-modal';

import { Alert } from 'components/alert';
import { Button } from 'components/button';
import { TokenAmount } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { PoolApiType } from 'modules/smart-alpha/api';
import SmartAlphaContract from 'modules/smart-alpha/contracts/smartAlphaContract';

export const SeniorWithdraw = ({ pool }: { pool: PoolApiType }) => {
  const params = useParams<{ tranche: 'senior' | 'junior' }>();
  const tranche = (params.tranche || 'senior').toLowerCase();

  const [tokenState, setTokenState] = useState<string>('');
  const { getToken } = useTokens();

  const poolToken = getToken(pool.poolToken.symbol);
  const oracleToken = getAsset(pool.oracleAssetSymbol);
  const isSenior = tranche === 'senior';

  const [saving, setSaving] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const tokenMax = new BigNumber(3.21312);

  const { getOrCreateContract, Listeners } = useContractFactory();

  const smartAlphaContract = useMemo(() => {
    if (!pool) {
      return undefined;
    }

    return getOrCreateContract(
      pool.poolAddress,
      () => {
        return new SmartAlphaContract(pool.poolAddress);
      },
      {
        afterInit: async contract => {
          await contract.loadCommon();
        },
      },
    );
  }, [pool]);

  async function handleWithdraw(gasPrice: number) {
    setConfirmModalVisible(false);
    setSaving(true);

    try {
      await (isSenior ? smartAlphaContract?.withdrawSenior : smartAlphaContract?.withdrawJunior)?.call(
        smartAlphaContract,
        BigNumber.ZERO,
        gasPrice,
      );
    } catch (e) {
      console.error(e);
    }

    setSaving(false);
  }

  return (
    <div className="card p-24">
      <Text type="h3" weight="bold" color="primary" tag="h3" className="mb-16">
        Senior withdraw
      </Text>
      <Text type="p2" weight="semibold" color="secondary" tag="p" className="mb-32">
        Choose the amount of tokens you want to withdraw from the senior side. Make sure you double check the amounts.
      </Text>
      <Text type="small" weight="semibold" color="secondary" className="mb-8">
        bb_swETH-USD amount
      </Text>
      <TokenAmount
        before={
          <TokenIcon
            name={poolToken?.icon ?? 'unknown'}
            bubble1Name="bond"
            bubble2Name={oracleToken?.icon ?? 'unknown'}
            size={24}
            outline="green"
          />
        }
        value={tokenState}
        onChange={setTokenState}
        slider
        max={tokenMax}
        placeholder={`0 (Max ${tokenMax ?? 0})`}
        className="mb-32"
      />

      <Alert type="info" className="mb-32">
        Sed elementum nulla sit amet accumsan dapibus. Integer auctor et elit in lobortis. Fusce ex nulla
      </Alert>

      <div className="flex justify-end align-center">
        <Button
          variation="primary"
          disabled={saving}
          onClick={() => {
            setConfirmModalVisible(true);
          }}>
          Signal withdraw
        </Button>
      </div>

      {confirmModalVisible && (
        <TxConfirmModal
          title="Initiate withdrawal"
          header={
            <Text type="p2" weight="semibold" color="secondary">
              Your balance of{' '}
              <Text tag="span" type="p2" weight="bold" color="primary">
                xx bb_jwETH_USD
              </Text>{' '}
              will be added to the exit queue. You can come back at the end of the epoch to redeem your underlying token
            </Text>
          }
          submitText="Initiate withdraw"
          onCancel={() => setConfirmModalVisible(false)}
          onConfirm={({ gasPrice }) => handleWithdraw(gasPrice)}
        />
      )}
      {Listeners}
    </div>
  );
};
