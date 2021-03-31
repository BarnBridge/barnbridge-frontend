import React from 'react';
import { Link } from 'react-router-dom';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';
import { useWeb3Contracts } from 'web3/contracts';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { TokenMeta } from 'web3/types';
import { ZERO_BIG_NUMBER, formatBigValue, getNonHumanValue } from 'web3/utils';

import Alert from 'components/antd/alert';
import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Form from 'components/antd/form';
import GasFeeList from 'components/custom/gas-fee-list';
import Grid from 'components/custom/grid';
import Icon, { TokenIconNames } from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import { Hint, Text } from 'components/custom/typography';
import useMergeState from 'hooks/useMergeState';

export type PoolTokenWithdrawProps = {
  token: TokenMeta;
  expanded?: boolean;
};

type State = {
  enabling: boolean;
  enabled?: boolean;
  isEnded?: boolean;
  formDisabled: boolean;
  saving: boolean;
  expanded: boolean;
  walletBalance?: BigNumber;
  stakedBalance?: BigNumber;
  effectiveStakedBalance?: BigNumber;
  maxAllowance?: BigNumber;
};

const InitialState: State = {
  enabling: false,
  enabled: undefined,
  isEnded: undefined,
  formDisabled: false,
  saving: false,
  expanded: false,
  walletBalance: undefined,
  stakedBalance: undefined,
  effectiveStakedBalance: undefined,
  maxAllowance: undefined,
};

type FormData = {
  amount?: BigNumber;
  gasFee?: number;
};

const InitialFormValues: FormData = {
  amount: undefined,
  gasFee: undefined,
};

const PoolTokenWithdraw: React.FC<PoolTokenWithdrawProps> = props => {
  const web3c = useWeb3Contracts();
  const [form] = Antd.Form.useForm<FormData>();

  const { token, expanded = false } = props;

  const [state, setState] = useMergeState<State>(InitialState);

  const icon = React.useMemo<TokenIconNames | undefined>(() => {
    switch (token) {
      case USDCTokenMeta:
        return 'usdc-token';
      case DAITokenMeta:
        return 'dai-token';
      case SUSDTokenMeta:
        return 'susd-token';
      case UNISWAPTokenMeta:
        return 'uniswap-token';
      case BONDTokenMeta:
        return 'bond-token';
      default:
        return undefined;
    }
  }, [token]);

  React.useEffect(() => {
    let walletBalance: BigNumber | undefined;
    let allowance: BigNumber | undefined;
    let stakedBalance: BigNumber | undefined;
    let effectiveStakedBalance: BigNumber | undefined;
    let isEnded: boolean | undefined;

    switch (token) {
      case USDCTokenMeta:
        walletBalance = web3c.usdc.balance;
        allowance = web3c.usdc.allowance;
        stakedBalance = web3c.staking.usdc.balance;
        effectiveStakedBalance = web3c.staking.usdc.epochUserBalance;
        isEnded = web3c.yf.isEnded;
        break;
      case DAITokenMeta:
        walletBalance = web3c.dai.balance;
        allowance = web3c.dai.allowance;
        stakedBalance = web3c.staking.dai.balance;
        effectiveStakedBalance = web3c.staking.dai.epochUserBalance;
        isEnded = web3c.yf.isEnded;
        break;
      case SUSDTokenMeta:
        walletBalance = web3c.susd.balance;
        allowance = web3c.susd.allowance;
        stakedBalance = web3c.staking.susd.balance;
        effectiveStakedBalance = web3c.staking.susd.epochUserBalance;
        isEnded = web3c.yf.isEnded;
        break;
      case UNISWAPTokenMeta:
        walletBalance = web3c.uniswap.balance;
        allowance = web3c.uniswap.allowance;
        stakedBalance = web3c.staking.uniswap.balance;
        effectiveStakedBalance = web3c.staking.uniswap.epochUserBalance;
        isEnded = web3c.yfLP.isEnded;
        break;
      case BONDTokenMeta:
        walletBalance = web3c.bond.balance;
        allowance = web3c.bond.allowance;
        stakedBalance = web3c.staking.bond.balance;
        effectiveStakedBalance = web3c.staking.bond.epochUserBalance;
        isEnded = web3c.yfBOND.isEnded;
        break;
      default:
        return;
    }

    setState({
      walletBalance,
      stakedBalance,
      effectiveStakedBalance,
      maxAllowance: BigNumber.min(allowance ?? ZERO_BIG_NUMBER, walletBalance ?? ZERO_BIG_NUMBER),
      enabled: allowance?.gt(ZERO_BIG_NUMBER) ?? false,
      isEnded,
      formDisabled: false,
      expanded,
    });
  }, [web3c, token]);

  const activeBalance = state.stakedBalance;

  const maxAmount = React.useMemo<number>(() => {
    return getNonHumanValue(activeBalance ?? 0, token.decimals).toNumber();
  }, [activeBalance, token]);

  async function handleSubmit(values: any) {
    setState({ saving: true });

    try {
      const { amount, gasFee } = values;

      const amountValue = amount;
      const feeValue = gasFee.value;

      await web3c.staking.withdrawSend(token, amountValue, feeValue);

      switch (token) {
        case USDCTokenMeta:
          web3c.usdc.reload();
          web3c.yf.reload();
          break;
        case DAITokenMeta:
          web3c.dai.reload();
          web3c.yf.reload();
          break;
        case SUSDTokenMeta:
          web3c.susd.reload();
          web3c.yf.reload();
          break;
        case UNISWAPTokenMeta:
          web3c.uniswap.reload();
          web3c.yfLP.reload();
          break;
        case BONDTokenMeta:
          web3c.bond.reload();
          web3c.yfBOND.reload();
          break;
        default:
      }
    } catch (e) {}

    setState({ saving: false });
  }

  return (
    <div className="card">
      <Grid className="card-header" flow="col" gap={24} colsTemplate="1fr 1fr 1fr 42px" align="center">
        <Grid flow="col" gap={12} align="center">
          {icon && <Icon name={icon} width={40} height={40} />}
          <Text type="p1" weight="semibold" color="primary">
            {token.name}
          </Text>
        </Grid>

        <Grid flow="row" gap={4}>
          <Text type="small" weight="semibold" color="secondary">
            Staked Balance
          </Text>
          <Text type="p1" weight="semibold" color="primary">
            {formatBigValue(state.stakedBalance, token.decimals)}
          </Text>
        </Grid>

        <div />

        {state.enabled && (
          <button
            type="button"
            className="button-ghost-monochrome p-8"
            onClick={() =>
              setState(prevState => ({
                ...prevState,
                expanded: !prevState.expanded,
              }))
            }>
            <Icon name="chevron-right" rotate={state.expanded ? 270 : 0} />
          </button>
        )}
      </Grid>
      {state.expanded && (
        <Form form={form} initialValues={InitialFormValues} validateTrigger={['onSubmit']} onFinish={handleSubmit}>
          <Grid colsTemplate="1fr 1px 1fr">
            <Grid flow="row" gap={4} padding={24}>
              <Text type="lb2" weight="semibold" color="secondary">
                Wallet Balance
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {formatBigValue(state.walletBalance, token.decimals)}
              </Text>
            </Grid>
            <Divider type="vertical" />
            <Grid flow="row" gap={4} padding={24}>
              <Grid flow="col" gap={8}>
                <Hint text="This value represents your 'effective stake' in this pool - meaning the portion of your total staked balance that is earning rewards this epoch. When depositing new tokens during an epoch that is currently running, your effective deposit amount will be proportionally sized by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will become equal.">
                  <Text type="lb2" weight="semibold" color="secondary">
                    Effective Staked Balance
                  </Text>
                </Hint>
              </Grid>
              <Text type="p1" weight="semibold" color="primary">
                {formatBigValue(state.effectiveStakedBalance, token.decimals)}
              </Text>
            </Grid>
          </Grid>
          <Divider />
          <Grid flow="row" gap={32} padding={24}>
            <Grid flow="col" gap={48} colsTemplate="1fr 1fr">
              <Grid flow="row" gap={32}>
                <Form.Item
                  name="amount"
                  label="Amount"
                  rules={[
                    { required: true, message: 'Required' },
                    {
                      validator: (rule: any, value: BigNumber | undefined, cb: (err?: string) => void) => {
                        if (value?.isEqualTo(ZERO_BIG_NUMBER)) {
                          cb('Should be greater than zero');
                        } else if (value?.isGreaterThan(maxAmount)) {
                          cb(`Should be less than ${maxAmount}`);
                        } else {
                          cb();
                        }
                      },
                    },
                  ]}>
                  <TokenAmount
                    tokenIcon={icon}
                    max={activeBalance}
                    maximumFractionDigits={token.decimals}
                    displayDecimals={token === UNISWAPTokenMeta ? 8 : 4}
                    disabled={state.formDisabled || state.saving}
                    slider
                  />
                </Form.Item>
                {!state.isEnded && (
                  <Alert message="Any funds withdrawn before the end of this epoch will not accrue any rewards for this epoch." />
                )}
                {state.isEnded && token === USDCTokenMeta && (
                  <Alert
                    message={
                      <div className="flex flow-row row-gap-16 align-start">
                        <Text type="p2" weight="semibold" color="blue">
                          You can still deposit USDC in SMART Yield's Junior or Senior Tranches and earn interest for
                          your funds.
                        </Text>
                        <Link to="/smart-yield" className="link-blue">
                          <Text type="p2" weight="bold" style={{ textDecoration: 'underline' }}>
                            Go to SMART yield
                          </Text>
                        </Link>
                      </div>
                    }
                  />
                )}
              </Grid>
              <Grid flow="row">
                <Form.Item
                  name="gasFee"
                  label="Gas Fee (Gwei)"
                  hint="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined."
                  rules={[{ required: true, message: 'Required' }]}>
                  <GasFeeList disabled={state.formDisabled || state.saving} />
                </Form.Item>
              </Grid>
            </Grid>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={state.saving}
              disabled={state.formDisabled}
              style={{ width: 121 }}>
              Withdraw
            </Button>
          </Grid>
        </Form>
      )}
    </div>
  );
};

export default PoolTokenWithdraw;
