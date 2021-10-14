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
import { Icon } from 'components/icon';
import { useConfig } from 'components/providers/configProvider';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { useContractFactory } from 'hooks/useContract';
import { useReload } from 'hooks/useReload';
import { PoolApiType } from 'modules/smart-alpha/api';
import LoupeContract from 'modules/smart-alpha/contracts/loupeContract';
import SmartAlphaContract from 'modules/smart-alpha/contracts/smartAlphaContract';
import { useWallet } from 'wallets/walletProvider';

import s from './s.module.scss';

type Props = {
  pool: PoolApiType;
  smartAlphaContract: SmartAlphaContract | undefined;
  poolTokenContract: Erc20Contract | undefined;
};

export const DepositForm = ({ pool, smartAlphaContract, poolTokenContract }: Props) => {
  const params = useParams<{ tranche: 'senior' | 'junior' }>();
  const tranche = params.tranche.toLowerCase();

  const { contracts } = useConfig();
  const wallet = useWallet();
  const { getToken } = useTokens();
  const [reload, version] = useReload();

  const [tokenState, setTokenState] = useState('');
  const [depositQueueBalance, setDepositQueueBalance] = useState<BigNumber | undefined>();
  const [unclaimedTokens, setUnclaimedTokens] = useState<BigNumber | undefined>();
  const [enabling, setEnabling] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const isSenior = tranche === 'senior';
  const poolToken = getToken(pool.poolToken.symbol);
  const oracleToken = getAsset(pool.oracleAssetSymbol);
  const tokenMax = poolTokenContract?.getBalanceOf()?.unscaleBy(pool.poolToken.decimals);
  const isPoolTokenEnabled = poolTokenContract?.isAllowedOf(pool.poolAddress);

  const { getOrCreateContract } = useContractFactory();

  const loupeContract = useMemo<LoupeContract | undefined>(() => {
    const loupeAddress = contracts.sa?.loupe;

    if (!loupeAddress) {
      return undefined;
    }

    return getOrCreateContract(loupeAddress, () => {
      return new LoupeContract(loupeAddress);
    });
  }, [contracts.sa?.loupe]);

  useEffect(() => {
    if (!wallet.account) {
      return;
    }

    poolTokenContract?.loadBalance();
    poolTokenContract?.loadAllowance(pool.poolAddress);

    (isSenior ? smartAlphaContract?.seniorEntryQueue : smartAlphaContract?.juniorEntryQueue)
      ?.call(smartAlphaContract, wallet.account)
      .then(([epoch, amount]) => {
        setDepositQueueBalance(amount);
      });

    (isSenior ? loupeContract?.getUserRedeemableSeniorTokens : loupeContract?.getUserRedeemableJuniorTokens)
      ?.call(loupeContract, smartAlphaContract?.address!, wallet.account)
      .then(amount => {
        setUnclaimedTokens(amount);
      });
  }, [wallet.account, version]);

  async function handlePoolTokenEnable() {
    setEnabling(true);

    try {
      await poolTokenContract?.approve(smartAlphaContract?.address, true);
    } catch (e) {
      console.error(e);
    }

    setEnabling(false);
  }

  async function handleDeposit(gasPrice?: number) {
    setConfirmModalVisible(false);
    setSaving(true);

    try {
      const amount = BigNumber.from(tokenState)?.scaleBy(pool.poolToken.decimals);

      if (amount) {
        await (isSenior ? smartAlphaContract?.depositSenior : smartAlphaContract?.depositJunior)?.call(
          smartAlphaContract,
          amount,
          gasPrice,
        );
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
        {isSenior ? 'Senior' : 'Junior'} deposit
      </Text>
      <Text type="p2" weight="semibold" color="secondary" tag="p" className="mb-32">
        Choose the amount of tokens you want to deposit in the {tranche} side. Make sure you double check the amounts.
      </Text>

      <div className={classNames(s.depositBalance, 'flex col-gap-32 mb-32')}>
        <div>
          <Hint
            text={`This amount of ${pool.poolToken.symbol} is already in the deposit queue and will be considered towards your overall position in the next epoch.`}
            className="mb-4">
            <Text type="small" weight="semibold" color="secondary">
              Balance in deposit queue
            </Text>
          </Hint>
          <Text type="p1" weight="semibold" color="primary" className="flex align-center">
            {formatToken(depositQueueBalance?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
            <TokenIcon name={poolToken?.icon} size={16} className="ml-8" />
          </Text>
        </div>
        <div>
          <Hint
            text={`This amount of ${
              isSenior ? 'senior' : 'junior'
            } tokens is available to be redeemed from your deposits made in either the ongoing or previous epochs. It will be automatically redeemed if you add more ${
              pool.poolToken.symbol
            } to the deposit queue.`}
            className="mb-4">
            <Text type="small" weight="semibold" color="secondary">
              Unclaimed {tranche} tokens
            </Text>
          </Hint>
          <Text type="p1" weight="semibold" color="primary" className="flex align-center">
            {formatToken(unclaimedTokens?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
            <TokenIcon
              className="ml-8"
              name={poolToken?.icon}
              outline={isSenior ? 'green' : 'purple'}
              bubble1Name="bond"
              bubble2Name={oracleToken?.icon}
              size={16}
            />
          </Text>
        </div>
      </div>

      <Text type="small" weight="semibold" color="secondary" className="mb-8">
        {pool.poolToken.symbol} amount
      </Text>
      <TokenAmount
        before={<TokenIcon name={poolToken?.icon} size={24} />}
        value={tokenState}
        onChange={setTokenState}
        slider
        max={tokenMax}
        placeholder={`0 (Max ${tokenMax ?? 0})`}
        className="mb-32"
      />

      <Alert type="info" className="mb-32">
        Deposits made during an epoch will be added to the deposit queue and will count toward your position in the next
        epoch.
      </Alert>

      <div className="flex justify-end align-center">
        {isPoolTokenEnabled === false && (
          <>
            <Button variation="primary" disabled={enabling} onClick={handlePoolTokenEnable}>
              {enabling && <Spinner className="mr-8" />}
              Enable {pool.poolToken.symbol}
            </Button>
            <Icon name="chevron" size={16} color="icon" className="ml-12 mr-12" />
          </>
        )}
        <Button
          variation="primary"
          disabled={saving || !isPoolTokenEnabled || !tokenState}
          onClick={() => setConfirmModalVisible(true)}>
          {saving && <Spinner className="mr-8" />}
          Deposit
        </Button>
      </div>

      {confirmModalVisible && (
        <TxConfirmModal
          title="Initiate deposit"
          header={
            <div className="flex flow-row row-gap-16">
              <Text type="p2" weight="semibold" color="secondary">
                Your balance of{' '}
                <Text tag="span" type="p2" weight="bold" color="primary">
                  {formatToken(BigNumber.from(tokenState), { decimals: pool.poolToken.decimals })}{' '}
                  {pool.poolToken.symbol}
                </Text>{' '}
                will be added to the deposit queue for the next epoch.
              </Text>
              <div className="container-box flex flow-col col-gap-32">
                <div className="flex flow-row">
                  <Text type="small" weight="semibold" color="secondary" className="mb-4">
                    Deposited amount
                  </Text>
                  <Text type="p1" weight="semibold" color="primary" className="flex align-center">
                    {formatToken(BigNumber.from(tokenState)) ?? '-'}
                    <TokenIcon name={poolToken?.icon} size={16} className="ml-8" />
                  </Text>
                </div>
                <div className="flex flow-row">
                  <Text type="small" weight="semibold" color="secondary" className="mb-4">
                    Redeemable unclaimed tokens
                  </Text>
                  <Text type="p1" weight="semibold" color="primary" className="flex align-center">
                    {formatToken(unclaimedTokens?.unscaleBy(pool.poolToken.decimals)) ?? '-'}
                    <TokenIcon
                      name={poolToken?.icon}
                      bubble1Name="bond"
                      bubble2Name={oracleToken?.icon}
                      outline={isSenior ? 'green' : 'purple'}
                      className="ml-8"
                    />
                  </Text>
                </div>
              </div>
            </div>
          }
          submitText="Confirm your deposit"
          onCancel={() => setConfirmModalVisible(false)}
          onConfirm={({ gasPrice }) => handleDeposit(gasPrice)}
        />
      )}
    </div>
  );
};
