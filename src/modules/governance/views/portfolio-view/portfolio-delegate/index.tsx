import { FC, useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import TxConfirmModal from 'web3/components/tx-confirm-modal';
import Erc20Contract from 'web3/erc20Contract';
import { formatToken, shortenAddr } from 'web3/utils';

import Alert from 'components/antd/alert';
import ExternalLink from 'components/custom/externalLink';
import { Form, FormItem, useForm } from 'components/custom/form';
import Icon, { TokenIconNames } from 'components/custom/icon';
import Identicon from 'components/custom/identicon';
import { Spinner } from 'components/custom/spinner';
import StatusTag from 'components/custom/status-tag';
import TokenInput from 'components/custom/token-input';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { useDAO } from 'modules/governance/components/dao-provider';
import RadioCard from 'modules/smart-yield/components/radio-card';
import { useWallet } from 'wallets/walletProvider';

import { isValidAddress } from 'utils';

const MANUAL_KEY = 'manual';
const DELEGATED_KEY = 'delegated';

type FormType = {
  votingType: string;
  delegateAddress: string;
};

const PortfolioDelegate: FC = () => {
  const { projectToken } = useKnownTokens();
  const { getEtherscanAddressUrl } = useWeb3();
  const wallet = useWallet();
  const daoCtx = useDAO();

  const [isLoading, setLoading] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const { balance: stakedBalance = BigNumber.ZERO, userLockedUntil = 0, userDelegatedTo } = daoCtx.daoBarn;
  const projectTokenContract = projectToken.contract as Erc20Contract;
  const bondBalance = projectTokenContract.balance?.unscaleBy(projectToken.decimals);

  const isLocked = userLockedUntil > Date.now();
  const isDelegated = isValidAddress(userDelegatedTo);

  const form = useForm<FormType>({
    validationScheme: {
      delegateAddress: {
        rules: {
          required: (value: string | undefined, _, obj: FormType) => {
            if (obj.votingType === DELEGATED_KEY) {
              return Boolean(value);
            }
            return true;
          },
          isAddress: (value: string | undefined, _, obj: FormType) => {
            if (obj.votingType === DELEGATED_KEY) {
              return isValidAddress(value);
            }
            return true;
          },
          isSelf: (value: string | undefined, _, obj: FormType) => {
            if (obj.votingType === DELEGATED_KEY) {
              return wallet.account?.toLowerCase() !== value?.toLowerCase();
            }
            return true;
          },
          isSame: (value: string | undefined, _, obj: FormType) => {
            if (obj.votingType === DELEGATED_KEY) {
              return userDelegatedTo?.toLowerCase() !== value?.toLowerCase();
            }
            return true;
          },
        },
        messages: {
          required: 'Required',
          isAddress: 'Invalid address',
          isSelf: `Can't delegate to self`,
          isSame: `Your voting power is already delegated to this address`,
        },
      },
    },
    onSubmit: () => {
      setConfirmModalVisible(true);
    },
  });

  async function loadData() {
    setLoading(true);

    try {
      await daoCtx.daoBarn.loadUserData();
      const { userDelegatedTo = '' } = daoCtx.daoBarn;
      const isDelegated = isValidAddress(userDelegatedTo);
      form.reset({
        votingType: isDelegated ? DELEGATED_KEY : MANUAL_KEY,
        delegateAddress: isDelegated ? userDelegatedTo : '',
      });
    } catch {}

    setLoading(false);
  }

  useEffect(() => {
    loadData().catch(Error);
  }, []);

  const { formState, watch } = form;
  const [votingType, delegateAddress] = watch(['votingType', 'delegateAddress']);

  const canSubmit = formState.isDirty && !isSubmitting && stakedBalance.gt(BigNumber.ZERO);

  async function doDelegate(type: string, address: string, gasPrice: number) {
    setSubmitting(true);

    try {
      if (type === MANUAL_KEY) {
        await daoCtx.daoBarn.stopDelegate(gasPrice);
      } else if (type === DELEGATED_KEY) {
        await daoCtx.daoBarn.delegate(address, gasPrice);
      }

      await loadData();
    } catch (e) {
      console.error(e);
    }

    setSubmitting(false);
  }

  function handleCancel() {
    setConfirmModalVisible(false);
  }

  async function handleConfirm(gasPrice: number) {
    setConfirmModalVisible(false);
    await doDelegate(votingType, delegateAddress, gasPrice);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center p-24" style={{ minHeight: '732px' }}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Form form={form} className="flex flow-row row-gap-32 p-24" disabled={isSubmitting}>
        <div className="container-box flex flow-col col-gap-44">
          <div className="flex flow-row row-gap-4">
            <Text type="small" weight="semibold" color="secondary">
              Current voting type
            </Text>
            <div className="flex flow-col col-gap-8 align-center">
              <Text type="p1" weight="bold" color="primary">
                {isDelegated ? 'Delegate voting' : 'Manual voting'}
              </Text>
            </div>
          </div>
          {isDelegated && (
            <div className="flex flow-row row-gap-4">
              <Text type="small" weight="semibold" color="secondary">
                Delegated address
              </Text>
              <div className="flex flow-col col-gap-8 align-center">
                <ExternalLink href={getEtherscanAddressUrl(userDelegatedTo)}>
                  <Text type="p1" weight="bold" color="primary">
                    {shortenAddr(userDelegatedTo)}
                  </Text>
                </ExternalLink>
              </div>
            </div>
          )}
        </div>
        <FormItem name="votingType" label="Voting type">
          {({ field }) => (
            <>
              <RadioCard
                selected={field.value === MANUAL_KEY}
                onClick={() => form.updateValue('votingType', MANUAL_KEY)}>
                <div className="flex flow-col col-gap-40 align-center">
                  <Text type="p1" weight="semibold" color="primary">
                    Manual voting
                  </Text>
                  {field.value === MANUAL_KEY && <StatusTag text="ACTIVE" color="green" />}
                </div>
              </RadioCard>
              <RadioCard
                selected={field.value === DELEGATED_KEY}
                onClick={() => form.updateValue('votingType', DELEGATED_KEY)}>
                <div className="flex flow-col col-gap-40 align-center">
                  <Text type="p1" weight="semibold" color="primary">
                    Delegate voting
                  </Text>
                  {field.value === DELEGATED_KEY && <StatusTag text="ACTIVE" color="green" />}
                </div>
              </RadioCard>
            </>
          )}
        </FormItem>
        {votingType === DELEGATED_KEY && (
          <FormItem name="delegateAddress" label="Address">
            {({ field }) => <TokenInput {...field} />}
          </FormItem>
        )}
        <Alert message="Delegating your voting power to this address means that they will be able to vote in your place. You can’t delegate the voting bonus, only the staked balance." />
        {isLocked && (
          <Alert message="Switching back to manual voting while a lock is active will put the amount back under lock. Delegation does not stop the lock timer." />
        )}
        <div className="flex flow-col col-gap-12 align-center justify-end">
          <button type="submit" className="button-primary" disabled={!canSubmit}>
            {isSubmitting && <Spinner className="mr-4" />}
            {votingType === DELEGATED_KEY ? 'Delegate' : 'Stop Delegate'}
          </button>
        </div>
      </Form>

      {confirmModalVisible && (
        <TxConfirmModal
          title={votingType === DELEGATED_KEY ? 'Delegate your voting power' : 'Stop delegating voting power'}
          header={
            votingType === DELEGATED_KEY ? (
              <div className="container-box flex flow-col col-gap-40">
                <div className="flow flow-row row-gap-4">
                  <Text type="small" weight="semibold" color="secondary">
                    Delegate {projectToken.symbol} amount
                  </Text>
                  <div className="flex flow-col col-gap-8 align-center">
                    <Text type="p1" weight="bold" color="primary">
                      {formatToken(bondBalance) ?? '-'}
                    </Text>
                    <Icon name={projectToken.icon as TokenIconNames} />
                  </div>
                </div>
                <div className="flow flow-row row-gap-4">
                  <Text type="small" weight="semibold" color="secondary">
                    Delegate address
                  </Text>
                  <div className="flex flow-col col-gap-8 align-center">
                    <Identicon address={delegateAddress} />
                    <Text type="p1" weight="bold" color="primary">
                      {shortenAddr(delegateAddress)}
                    </Text>
                  </div>
                </div>
              </div>
            ) : null
          }
          submitText={votingType === DELEGATED_KEY ? 'Delegate voting power' : 'Stop delegate'}
          onCancel={handleCancel}
          onConfirm={({ gasPrice }) => handleConfirm(gasPrice)}
        />
      )}
    </>
  );
};

export default PortfolioDelegate;
