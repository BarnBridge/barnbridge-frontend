import React, { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';

import { Text } from 'components/custom/typography';
import { Form, FormItem, useForm } from 'components/custom/form';

import Alert from '../../components/antd/alert';
import Tooltip from '../../components/antd/tooltip';
import { Button } from '../../components/button';
import { Tabs as ElasticTabs } from '../../components/custom/tabs';
import { TokenAmount } from '../../components/custom/token-amount-new';
import { Icon } from '../../components/icon';
import { useWallet } from '../../wallets/walletProvider';
import s from './s.module.scss';
import { formatToken } from '../../web3/utils';
import BondIcon from '../../resources/svg/bond-eth.svg';
import BarnIcon from '../../resources/svg/barn.svg';
import TxConfirmModal from '../../web3/components/tx-confirm-modal';
import { useKnownTokens } from '../../components/providers/knownTokensProvider';
import ContractListener from '../../web3/components/contract-listener';
import { useWeb3Contract } from '../../hooks/useContract';
import Web3Contract from '../../web3/web3Contract';

type FormType = {
  from: string;
  to: string;
};

const BondTransitionView = () => {
  const [bondType, setBondType] = useState('bond');
  const [confirmModal, setConfirmModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const walletCtx = useWallet();
  const { projectToken } = useKnownTokens();
  // const bondTransitionContract = useWeb3Contract(//
  //   () => {
  //     return new Web3Contract([], 'address', 'bondTransition');
  //   },
  //   {
  //     afterInit: contract => {
  //       console.log(contract);
  //     },
  //   },
  // );
  const maxAmount = walletCtx.isActive ? walletCtx.ethBalance?.toNumber() : undefined;
  //todo: will be fetched from api
  const transactionFee = 0;
  //todo: can be changed in future
  const ratio = 1;
  const form = useForm<FormType>({
    validationScheme: {
      from: {
        rules: {
          required: walletCtx.isActive,
          min: walletCtx.isActive && 0,
          max: walletCtx.isActive && maxAmount,
        },
        messages: {
          required: 'Value is required.',
          min: 'Should be a positive value.',
          max: 'Should be less than available balance.',
        },
      },
      to: {
        rules: {
          required: walletCtx.isActive,
          min: walletCtx.isActive && 0,
          max: walletCtx.isActive && maxAmount,
        },
        messages: {
          required: 'Value is required.',
          min: 'Should be a positive value.',
          max: 'Should be less than available balance.',
        },
      },
    },
    onSubmit: () => {
      if (!walletCtx.isActive) {
        walletCtx.showWalletsModal();
      }
      setConfirmModal(true);
    },
  });
  const { formState, watch, updateValue } = form;
  const from = watch('from');
  const to = watch('to');
  const fromAmount = BigNumber.from(from);
  const canSubmit = !walletCtx.isActive || formState.isDirty && formState.isValid;
  useEffect(() => {
    const toWithRation = (BigNumber.from(from) || new BigNumber(0)).toNumber() * ratio;
    updateValue('to', `${toWithRation}`);
  }, [from]);
  useEffect(() => {
    const fromWithRation = (BigNumber.from(to) || new BigNumber(0)).toNumber() * ratio;
    updateValue('from', `${fromWithRation}`);
  }, [to]);
  const doTransfer = (gasPrice: number) => {
    setSubmitting(true);
    try {
      if (fromAmount) {
        // todo: send request to api
        // const amount = fromAmount?.scaleBy(projectToken.decimals);
        // await daoCtx.daoBarn.deposit(depositAmount, gasPrice);
        // await loadData();
      }
    } catch (e) {
      console.error(e);
    }
    setSubmitting(false);
  }
  const handleCloseConfirmModal = () => {
    setConfirmModal(false);
  };
  const handleConfirm = async (gasPrice?: number) => {
    setConfirmModal(false);
    if (gasPrice) {
      doTransfer(gasPrice);
      setStatusModal(true);
    }
  };
  const handleCloseStatusModal = () => {
    setStatusModal(false);
  };

  return (
    <>
      <div className={s.container}>
        <Form form={form}>
          <article className='card flex flow-row p-32 mb-40'>
            <header className='mb-24'>
              <Text type='p1' weight='semibold' color='primary' className='mb-4' wrap>
                Swap BOND for BARN
              </Text>
              <Text type='p2' weight='semibold' color='secondary' wrap className='block'>
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
                variation='elastic'
                className='mb-24'
                style={{
                  width: '100%',
                  height: 40,
                }}
              />
            </div>
            <div>
              <div className='flex justify-space-between mb-8'>
                <Text type='small' weight='semibold' color='secondary' wrap className='block'>
                  From
                </Text>
                {walletCtx.isActive && walletCtx.ethBalance && (
                  <Text type='small' weight='semibold' color='secondary' wrap className='block'>
                    {`Available: ${formatToken(walletCtx.ethBalance)}`}
                  </Text>
                )}
              </div>
              <div className='mb-24'>
                <FormItem name='from'>
                  {({ field }) => (
                    <TokenAmount
                      before={<img src={BondIcon} />}
                      max={maxAmount}
                      placeholder='0.0'
                      className='mb-8'
                      {...field}
                    />
                  )}
                </FormItem>
              </div>
              <div className={s.iconContainer}>
                <Icon name='arrow' color='secondary' className={s.downArrow} />
              </div>
              <div className='mb-24'>
                <FormItem name='to' label='To'>
                  {({ field }) => (
                    <TokenAmount
                      before={<img src={BarnIcon} />}
                      placeholder='0.0'
                      {...field}
                    />
                  )}
                </FormItem>
              </div>
            </div>
            <div className={s.transactionFeeContainer}>
              <div className='flex'>
                <Text type='small' weight='semibold' color='secondary' wrap className='block mr-8'>
                  Transaction fee
                </Text>
                <Tooltip title='' placement='top'>
                  <Icon name='info' size={16} color='secondary' />
                </Tooltip>
              </div>
              <Text type='small' weight='semibold' color='secondary' wrap className='block'>
                {`${transactionFee} ETH`}
              </Text>
            </div>
            <Alert
              message={
                <div className='flex flow-row row-gap-16 align-start'>
                  <Text type='p2' weight='semibold' color='blue'>
                    Please note that the BARN tokens will be distributed on Optimism, so it can take some time before
                    they
                    will be loaded to your wallet address.
                  </Text>
                </div>
              }
              className='mb-32'
            />
            <Button type='submit' variation='primary' disabled={!canSubmit}>
              {walletCtx.isActive ? 'Transfer' : 'Connect Wallet'}
            </Button>
          </article>
        </Form>
      </div>
      {confirmModal && (
        <TxConfirmModal
          title='Confirm Transfer'
          header={
            <div className='container-box flex flow-row row-gap-4'>
              <Text type='small' weight='semibold' color='secondary'>
                BOND amount
              </Text>
              <div className='flex flow-col col-gap-8 align-center'>
                <Text type='p1' weight='bold' color='primary'>
                  {from}
                </Text>
                <img src={BondIcon} />
              </div>
            </div>
          }
          submitText='Confirm your deposit'
          onCancel={handleCloseConfirmModal}
          onConfirm={({ gasPrice }) => handleConfirm(gasPrice)}
        />
      )}
      {/*<ContractListener contract={bondTransitionContract} />*/}
    </>
  );
};

export default BondTransitionView;
