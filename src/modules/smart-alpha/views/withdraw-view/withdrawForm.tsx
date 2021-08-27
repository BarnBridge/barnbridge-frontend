import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken } from 'web3/utils';

import { Alert } from 'components/alert';
import { Button } from 'components/button';
import { Spinner } from 'components/custom/spinner';
import { TokenAmount } from 'components/custom/token-amount-new';
import { Hint, Text } from 'components/custom/typography';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { PoolApiType } from 'modules/smart-alpha/api';
import SmartAlphaContract from 'modules/smart-alpha/contracts/smartAlphaContract';
import { useWallet } from 'wallets/walletProvider';

import s from 'modules/smart-alpha/views/deposit-view/s.module.scss';

type Props = {
  pool: PoolApiType;
  tokenContract: Erc20Contract | undefined;
};

export const WithdrawForm = ({ pool, tokenContract }: Props) => {
  const params = useParams<{ tranche: 'senior' | 'junior' }>();
  const tranche = params.tranche.toLowerCase();

  const wallet = useWallet();
  const { getToken } = useTokens();
  const [reload, version] = useReload();

  const [tokenState, setTokenState] = useState('');
  const [epoch, setEpoch] = useState<number | undefined>();
  const [withdrawQueueBalance, setWithdrawQueueBalance] = useState<BigNumber | undefined>();
  const [historyTokenPrice, setHistoryTokenPrice] = useState<BigNumber | undefined>();
  const [saving, setSaving] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const isSenior = tranche === 'senior';
  const poolToken = getToken(pool.poolToken.symbol);
  const oracleToken = getAsset(pool.oracleAssetSymbol);
  const tokenMax = tokenContract?.balance?.unscaleBy(pool.poolToken.decimals) ?? 0;

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

  useEffect(() => {
    if (!wallet.account) {
      return;
    }

    (isSenior ? smartAlphaContract?.seniorExitQueue : smartAlphaContract?.juniorExitQueue)
      ?.call(smartAlphaContract, wallet.account)
      .then(([epoch, amount]) => {
        setEpoch(epoch);
        setWithdrawQueueBalance(amount);

        (isSenior ? smartAlphaContract?.historyEpochSeniorTokenPrice : smartAlphaContract?.historyEpochJuniorTokenPrice)
          ?.call(smartAlphaContract, epoch)
          .then(price => {
            setHistoryTokenPrice(price);
          });
      });
  }, [wallet.account, version]);

  async function handleWithdraw(gasPrice: number) {
    setConfirmModalVisible(false);
    setSaving(true);

    try {
      const amount = BigNumber.from(tokenState)?.scaleBy(pool.poolToken.decimals);

      if (amount) {
        await (isSenior ? smartAlphaContract?.withdrawSenior : smartAlphaContract?.withdrawJunior)?.call(
          smartAlphaContract,
          amount,
          gasPrice,
        );
        await tokenContract?.loadBalance();
        setTokenState('');
        reload();
      }
    } catch (e) {
      console.error(e);
    }

    setSaving(false);
  }

  return (
    <div className="card p-24">
      <Text type="h3" weight="bold" color="primary" tag="h3" className="mb-16">
        {isSenior ? 'Senior' : 'Junior'} withdraw
      </Text>
      <Text type="p2" weight="semibold" color="secondary" tag="p" className="mb-32">
        Choose the amount of tokens you want to withdraw from the {tranche} side. Make sure you double check the
        amounts.
      </Text>

      {withdrawQueueBalance?.gt(0) && (
        <div className={classNames(s.depositBalance, 'flex col-gap-32 mb-32')}>
          <div>
            <Hint
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat."
              className="mb-4">
              <Text type="small" weight="semibold" color="secondary">
                Balance in withdraw queue
              </Text>
            </Hint>
            <Text type="p1" weight="semibold" color="primary" className="flex align-center">
              {(epoch === smartAlphaContract?.currentEpoch &&
                formatToken(withdrawQueueBalance?.unscaleBy(pool.poolToken.decimals))) ??
                '-'}
              {epoch! < smartAlphaContract?.currentEpoch! && '0'}
              <TokenIcon
                name={poolToken?.icon ?? 'unknown'}
                outline={isSenior ? 'green' : 'purple'}
                bubble1Name="bond"
                bubble2Name={oracleToken?.icon ?? 'unknown'}
                size={16}
                className="ml-8"
              />
            </Text>
          </div>
          {epoch! < smartAlphaContract?.currentEpoch! && (
            <div>
              <Text type="small" weight="semibold" color="secondary">
                Unclaimed {tranche} tokens
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="flex align-center">
                {formatToken(withdrawQueueBalance.div(historyTokenPrice ?? 0)) ?? '-'}
                <TokenIcon name={poolToken?.icon ?? 'unknown'} size={16} className="ml-8" />
              </Text>
            </div>
          )}
        </div>
      )}

      <Text type="small" weight="semibold" color="secondary" className="mb-8">
        {tokenContract?.symbol ?? '-'} amount
      </Text>
      <TokenAmount
        before={
          <TokenIcon
            name={poolToken?.icon ?? 'unknown'}
            bubble1Name="bond"
            bubble2Name={oracleToken?.icon}
            outline={isSenior ? 'green' : 'purple'}
            size={24}
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
          {saving && <Spinner className="mr-8" />}
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
                {formatToken(BigNumber.from(tokenState), {
                  tokenName: tokenContract?.symbol,
                })}
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
