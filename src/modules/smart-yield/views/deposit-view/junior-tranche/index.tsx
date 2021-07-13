import React from 'react';
import { useHistory } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { useContractManager } from 'web3/components/contractManagerProvider';
import { formatBigValue, formatPercent, formatToken } from 'web3/utils';

import Divider from 'components/antd/divider';
import Form from 'components/antd/form';
import Input from 'components/antd/input';
import Spin from 'components/antd/spin';
import Icon, { TokenIconNames } from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { TokenAmount, TokenAmountPreview } from 'components/custom/token-amount-new';
import TransactionDetails from 'components/custom/transaction-details';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { mergeState } from 'hooks/useMergeState';
import TxConfirmModal from 'modules/smart-yield/components/tx-confirm-modal';
import SYControllerContract from 'modules/smart-yield/contracts/syControllerContract';
import SYSmartYieldContract from 'modules/smart-yield/contracts/sySmartYieldContract';
import { useSYPool } from 'modules/smart-yield/providers/pool-provider';
import { useWallet } from 'wallets/walletProvider';

type FormData = {
  to?: BigNumber;
  slippage?: number;
  deadline?: number;
};

type State = {
  formValues: FormData;
  isSaving: boolean;
  depositModalVisible: boolean;
};

const InitialState: State = {
  formValues: {
    to: undefined,
    slippage: 0.5,
    deadline: 20,
  },
  isSaving: false,
  depositModalVisible: false,
};

const JuniorTranche: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const poolCtx = useSYPool();
  const { getContract } = useContractManager();
  const { projectToken } = useKnownTokens();
  const [form] = Antd.Form.useForm<FormData>();

  const { pool, marketId, tokenId } = poolCtx;

  const [state, setState] = React.useState<State>(InitialState);
  const [priceReversible, setPriceReversible] = React.useState(false);
  const uToken = pool?.contracts.underlying;
  const uBalance = uToken?.balance;
  const uAllowed = uToken?.isAllowedOf(pool?.providerAddress!);
  const uAllowance = uToken?.getAllowanceOf(pool?.providerAddress!);
  const maxAmount = BigNumber.min(uAllowance ?? 0, uBalance ?? 0).unscaleBy(pool?.underlyingDecimals);
  const formDisabled = !uAllowed;
  const [isApproving, setApproving] = React.useState<boolean>(false);
  const [amount, setAmount] = React.useState('');
  const bnAmount = amount ? BigNumber.from(amount) : undefined;

  function handlePriceReverse() {
    setPriceReversible(prevState => !prevState);
  }

  const handleTxDetailsChange = React.useCallback(values => {
    form.setFieldsValue(values);
    setState(prevState => ({
      ...prevState,
    }));
  }, []);

  const [juniorFee, setJuniorFee] = React.useState<BigNumber | undefined>();
  const [price, setPrice] = React.useState<BigNumber | undefined>();

  React.useEffect(() => {
    if (!pool) {
      return;
    }

    const controllerContract = getContract<SYControllerContract>(pool.controllerAddress, () => {
      return new SYControllerContract(pool.controllerAddress);
    });
    controllerContract.setProvider(wallet.provider);
    controllerContract.getJuniorBuyFee().then(setJuniorFee);
  }, [pool?.controllerAddress]);

  React.useEffect(() => {
    if (!pool) {
      return;
    }

    const smartYieldContract = getContract<SYSmartYieldContract>(pool.smartYieldAddress, () => {
      return new SYSmartYieldContract(pool.smartYieldAddress);
    });

    smartYieldContract.getPrice().then(setPrice);
  }, [pool?.smartYieldAddress]);

  function getAmount() {
    if (!pool || !price) {
      return undefined;
    }

    const from = bnAmount;

    if (!from) {
      return undefined;
    }

    /// to = (from - fee) * price
    return from.dividedBy(price.dividedBy(1e18));
  }

  function getMinAmount() {
    if (!pool || !juniorFee || !price) {
      return undefined;
    }

    const from = bnAmount;

    const { slippage } = form.getFieldsValue();

    if (!from) {
      return undefined;
    }

    /// minTo = (from - fee) * price - slippage
    const minAmount = from.multipliedBy(new BigNumber(1).minus(juniorFee.dividedBy(1e18)));

    return minAmount.dividedBy(price.dividedBy(1e18)).multipliedBy(1 - (slippage ?? 0) / 100);
  }

  function handleFormValuesChange(_: any, values: FormData) {
    setState(
      mergeState<State>({
        formValues: values,
      }),
    );
  }

  function handleCancel() {
    history.push({
      pathname: `/smart-yield/deposit`,
      search: `?m=${marketId}&t=${tokenId}`,
    });
  }

  async function handleTokenEnable() {
    setApproving(true);

    try {
      await poolCtx.actions.approveUnderlying(true);
    } catch {}

    setApproving(false);
  }

  function handleSubmit() {
    setState(
      mergeState<State>({
        depositModalVisible: true,
      }),
    );
  }

  function handleDepositCancel() {
    setState(
      mergeState<State>({
        depositModalVisible: false,
      }),
    );
  }

  async function handleDepositConfirm({ gasPrice }: any) {
    if (!pool || !juniorFee) {
      return;
    }

    const from = bnAmount;

    const { deadline } = form.getFieldsValue();

    if (!from) {
      return;
    }

    setState(
      mergeState<State>({
        depositModalVisible: false,
        isSaving: true,
      }),
    );

    const decimals = pool.underlyingDecimals;
    const amount = from.multipliedBy(10 ** decimals);
    const minTokens = new BigNumber((getMinAmount() ?? BigNumber.ZERO).multipliedBy(10 ** decimals).toFixed(0));
    const deadlineTs = Math.floor(Date.now() / 1_000 + Number(deadline ?? 0) * 60);

    try {
      await poolCtx.actions.juniorDeposit(amount, minTokens, deadlineTs, gasPrice);
      form.resetFields();
    } catch {}

    setState(
      mergeState<State>({
        isSaving: false,
      }),
    );
  }

  return (
    <>
      <Text type="h3" weight="semibold" color="primary" className="mb-16">
        Junior deposit
      </Text>
      <Text type="p2" weight="semibold" className="mb-32">
        Choose the amount of junior tokens you want to purchase.
      </Text>
      <Form
        className="grid flow-row"
        form={form}
        initialValues={state.formValues}
        onValuesChange={handleFormValuesChange}
        validateTrigger={['onSubmit']}
        onFinish={handleSubmit}>
        <Form.Item label="From" rules={[{ required: true, message: 'Required' }]}>
          <TokenAmount
            className="mb-24"
            before={<Icon name={pool?.meta?.icon as TokenIconNames} />}
            placeholder={`0 (Max ${maxAmount?.toNumber() ?? 0})`}
            max={maxAmount}
            disabled={state.isSaving}
            decimals={pool?.underlyingDecimals}
            value={amount}
            onChange={(value: string) => {
              setAmount(value);
            }}
            slider
          />
        </Form.Item>
        <Icon name="down-arrow-circle" width={32} height={32} className="mh-auto" />
        <Form.Item
          className="mb-32"
          label="To"
          extra={
            <div className="grid flow-col col-gap-8 justify-center">
              {priceReversible ? (
                <Text type="small" weight="semibold" color="secondary">
                  {formatBigValue(1 / (pool?.state.jTokenPrice ?? 1))} {pool?.contracts.smartYield.symbol} per{' '}
                  {pool?.underlyingSymbol}
                </Text>
              ) : (
                <Text type="small" weight="semibold" color="secondary">
                  {formatBigValue(pool?.state.jTokenPrice)} {pool?.underlyingSymbol} per{' '}
                  {pool?.contracts.smartYield.symbol}
                </Text>
              )}
              <button type="button" className="button-text" onClick={handlePriceReverse}>
                <Icon name="refresh" width={16} height={16} />
              </button>
            </div>
          }
          dependencies={['from', 'slippage']}>
          {() => (
            <>
              <TokenAmountPreview
                className="mb-24"
                before={
                  <IconBubble
                    name={pool?.meta?.icon}
                    bubbleName={projectToken.icon!}
                    secondBubbleName={pool?.market?.icon}
                    width={24}
                    height={24}
                  />
                }
                value={formatToken(getAmount(), {
                  decimals: pool?.underlyingDecimals,
                })}
              />
            </>
          )}
        </Form.Item>
        <Form.Item name="slippage" noStyle hidden>
          <Input />
        </Form.Item>
        <Form.Item name="deadline" noStyle hidden>
          <Input />
        </Form.Item>
        <Form.Item shouldUpdate noStyle>
          {() => {
            const { slippage, deadline } = form.getFieldsValue();

            return (
              <TransactionDetails
                className="mb-32"
                showSlippage
                slippage={slippage}
                slippageHint="Your transaction will revert if the amount of tokens you actually receive is smaller by this percentage."
                showDeadline
                deadline={deadline}
                onChange={handleTxDetailsChange}>
                Transaction details
              </TransactionDetails>
            );
          }}
        </Form.Item>
        <div className="card mb-32">
          <div className="pv-24 ph-24">
            <Text type="p2" weight="semibold" color="secondary">
              Transaction summary
            </Text>
          </div>
          <Divider />
          <div className="pv-24 ph-24">
            <div className="grid flow-col justify-space-between mb-16">
              <Text type="small" weight="semibold" color="secondary">
                Protocol fees
              </Text>
              <Text type="p2" weight="semibold" color="primary" style={{ wordBreak: 'break-word' }}>
                {formatBigValue(bnAmount?.multipliedBy(juniorFee ?? 0).dividedBy(1e18))} {pool?.underlyingSymbol} (
                {formatPercent(juniorFee?.dividedBy(1e18))})
              </Text>
            </div>
            <div className="grid flow-col justify-space-between">
              <Text type="small" weight="semibold" color="secondary">
                Minimum received
              </Text>
              <Form.Item dependencies={['from', 'slippage']} noStyle>
                {() => (
                  <Text type="p2" weight="semibold" color="primary" style={{ wordBreak: 'break-word' }}>
                    {formatBigValue(getMinAmount() ?? BigNumber.ZERO)} {pool?.contracts.smartYield.symbol}
                  </Text>
                )}
              </Form.Item>
            </div>
          </div>
        </div>
        <div className="grid flow-col col-gap-32 align-center justify-space-between">
          <button type="button" className="button-back" disabled={state.isSaving} onClick={handleCancel}>
            <Icon name="arrow-back" width={16} height={16} className="mr-8" color="inherit" />
            Cancel
          </button>
          <div className="flex">
            {uAllowed === false && (
              <button type="button" className="button-ghost mr-24" disabled={isApproving} onClick={handleTokenEnable}>
                <Spin spinning={isApproving} />
                Enable {pool?.underlyingSymbol}
              </button>
            )}
            <button type="submit" className="button-primary" disabled={formDisabled}>
              <Spin spinning={state.isSaving} />
              Deposit
            </button>
          </div>
        </div>
      </Form>

      {state.depositModalVisible && (
        <TxConfirmModal
          title="Confirm your deposit"
          header={
            <div className="grid flow-col col-gap-32">
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Minimum received
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(getMinAmount())} {pool?.contracts.smartYield.symbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Deposited
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(bnAmount)} {pool?.underlyingSymbol}
                </Text>
              </div>
              <div className="grid flow-row row-gap-4">
                <Text type="small" weight="semibold" color="secondary">
                  Transaction fees
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {formatBigValue(bnAmount?.multipliedBy(juniorFee ?? 0).dividedBy(1e18))} {pool?.underlyingSymbol} (
                  {formatPercent(juniorFee?.dividedBy(1e18))})
                </Text>
              </div>
            </div>
          }
          submitText="Confirm your deposit"
          onCancel={handleDepositCancel}
          onConfirm={handleDepositConfirm}
        />
      )}
    </>
  );
};

export default JuniorTranche;
