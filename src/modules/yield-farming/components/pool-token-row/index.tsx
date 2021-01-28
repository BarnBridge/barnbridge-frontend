import React from 'react';
import * as Antd from 'antd';
import BigNumber from 'bignumber.js';

import Card from 'components/antd/card';
import Form from 'components/antd/form';
import Button from 'components/antd/button';
import Slider from 'components/antd/slider';
import Alert from 'components/antd/alert';
import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import Icons, { TokenIconNames } from 'components/custom/icon';
import TokenAmount from 'components/custom/token-amount';
import GasFeeList from 'components/custom/gas-fee-list';
import { Label, Paragraph, Small } from 'components/custom/typography';

import { TokenMeta } from 'web3/types';
import { formatBigValue, formatBONDValue, getNonHumanValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';
import useMergeState from 'hooks/useMergeState';

import s from './styles.module.scss';

export type PoolTokenRowProps = {
  token: TokenMeta;
  type: 'deposit' | 'withdraw';
  expanded?: boolean;
}

type PoolTokenRowState = {
  enabling: boolean;
  enabled?: boolean;
  saving: boolean;
  expanded: boolean;
  walletBalance?: BigNumber;
  stakedBalance?: BigNumber;
  effectiveStakedBalance?: BigNumber;
  maxAllowance?: BigNumber;
};

const InitialState: PoolTokenRowState = {
  enabling: false,
  enabled: undefined,
  saving: false,
  expanded: false,
  walletBalance: undefined,
  stakedBalance: undefined,
  effectiveStakedBalance: undefined,
  maxAllowance: undefined,
};

type PoolTokenRowFormData = {
  amount?: BigNumber;
  gasFee?: number;
}

const InitialFormValues: PoolTokenRowFormData = {
  amount: undefined,
  gasFee: undefined,
};

const PoolTokenRow: React.FunctionComponent<PoolTokenRowProps> = props => {
  const web3c = useWeb3Contracts();
  const [form] = Antd.Form.useForm<PoolTokenRowFormData>();

  const { type, token, expanded = false } = props;
  const isDeposit = type === 'deposit';
  const isWithdraw = type === 'withdraw';

  const [state, setState] = useMergeState<PoolTokenRowState>(InitialState);

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
        return;
    }
  }, [token]);

  React.useEffect(() => {
    let walletBalance: BigNumber | undefined;
    let allowance: BigNumber | undefined;
    let stakedBalance: BigNumber | undefined;
    let effectiveStakedBalance: BigNumber | undefined;

    switch (token) {
      case USDCTokenMeta:
        walletBalance = web3c.usdc.balance;
        allowance = web3c.usdc.allowance;
        stakedBalance = web3c.staking.usdc.balance;
        effectiveStakedBalance = web3c.staking.usdc.epochUserBalance;
        break;
      case DAITokenMeta:
        walletBalance = web3c.dai.balance;
        allowance = web3c.dai.allowance;
        stakedBalance = web3c.staking.dai.balance;
        effectiveStakedBalance = web3c.staking.dai.epochUserBalance;
        break;
      case SUSDTokenMeta:
        walletBalance = web3c.susd.balance;
        allowance = web3c.susd.allowance;
        stakedBalance = web3c.staking.susd.balance;
        effectiveStakedBalance = web3c.staking.susd.epochUserBalance;
        break;
      case UNISWAPTokenMeta:
        walletBalance = web3c.uniswap.balance;
        allowance = web3c.uniswap.allowance;
        stakedBalance = web3c.staking.uniswap.balance;
        effectiveStakedBalance = web3c.staking.uniswap.epochUserBalance;
        break;
      case BONDTokenMeta:
        walletBalance = web3c.bond.balance;
        allowance = web3c.bond.allowance;
        stakedBalance = web3c.staking.bond.balance;
        effectiveStakedBalance = web3c.staking.bond.epochUserBalance;
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
      expanded,
    });
  }, [web3c, token]);

  const activeBalance = React.useMemo<BigNumber | undefined>(() => {
    if (isDeposit) {
      return state.maxAllowance;
    } else if (isWithdraw) {
      return state.stakedBalance;
    }
  }, [isDeposit, isWithdraw, state]);

  const maxAmount = React.useMemo<number>(() => {
    return getNonHumanValue(activeBalance ?? 0, token.decimals).toNumber();
  }, [activeBalance, token]);

  async function handleSwitchChange(checked: boolean) {
    const value = checked ? MAX_UINT_256 : ZERO_BIG_NUMBER;

    setState({ enabling: true });

    try {
      switch (token) {
        case USDCTokenMeta:
          await web3c.usdc.approveSend(value);
          break;
        case DAITokenMeta:
          await web3c.dai.approveSend(value);
          break;
        case SUSDTokenMeta:
          await web3c.susd.approveSend(value);
          break;
        case UNISWAPTokenMeta:
          await web3c.uniswap.approveSend(value);
          break;
        case BONDTokenMeta:
          await web3c.bond.approveSend(CONTRACT_STAKING_ADDR, value);
          break;
        default:
          break;
      }
    } catch (e) {
    }

    setState({ enabling: false });
  }

  // function handleSliderChange(value: number) {
  //   setState(prevState => ({
  //     ...prevState,
  //     amount: value === maxAmount ? activeBalance : getHumanValue(new BigNumber(value), token.decimals),
  //   }));
  // }

  async function handleSubmit(values: any) {
    console.log({ values });
    return;
    setState({ saving: true });

    try {
      const { amount, gasAmount } = values;

      if (isDeposit) {
        await web3c.staking.depositSend(token, amount, gasAmount);
      } else if (isWithdraw) {
        await web3c.staking.withdrawSend(token, amount, gasAmount);
      }

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
      }
    } catch (e) {
    }

    setState({ saving: false });
  }

  const noAmount = false; // React.useMemo(() => !state.amount || state.amount?.isEqualTo(ZERO_BIG_NUMBER), [state.amount]);

  const CardTitle = (
    <Grid flow="col" gap={24} colsTemplate="1fr 1fr 1fr" align="center">
      <Grid flow="col" gap={12} align="center">
        {icon && <Icons name={icon} width={40} height={40} />}
        <Paragraph type="p1" semiBold color="grey900">
          {token.name}
        </Paragraph>
      </Grid>

      <Grid flow="row" gap={4}>
        <Small semiBold color="grey500">Wallet Balance</Small>
        <Paragraph type="p1" semiBold color="grey900">
          {formatBigValue(state.walletBalance, token.decimals)}
        </Paragraph>
      </Grid>

      {isDeposit && (
        <Grid flow="row" gap={4}>
          <Small semiBold color="grey500">Enable Token</Small>
          <Antd.Switch
            style={{ justifySelf: 'flex-start' }}
            checked={state.enabled}
            loading={state.enabled === undefined || state.enabling}
            onChange={handleSwitchChange} />
        </Grid>
      )}
    </Grid>
  );

  return (
    <Card
      title={CardTitle}
      noPaddingBody
      showExpandButton={state.enabled || isWithdraw}
      expanded={state.expanded}>
      <Form
        form={form}
        initialValues={InitialFormValues}
        validateTrigger={['onSubmit']}
        onFinish={handleSubmit}>
        <Grid colsTemplate="1fr 1fr">
          <Grid flow="row" gap={4} padding={24} className={s.balanceBlock}>
            <Label type="lb2" semiBold color="grey500">Staked Balance</Label>
            <Paragraph type="p1" semiBold color="grey900">
              {formatBigValue(state.stakedBalance, token.decimals)}
            </Paragraph>
          </Grid>
          <Grid flow="row" gap={4} padding={24} className={s.balanceBlock}>
            <Grid flow="col" gap={8}>
              <Label type="lb2" semiBold color="grey500">Effective Staked Balance</Label>
              <Tooltip
                type="info"
                title="This value represents your 'effective stake' in this pool - meaning the portion of your total staked balance that is earning rewards this epoch. When depositing new tokens during an epoch that is currently running, your effective deposit amount will be proportionally sized by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will become equal." />
            </Grid>
            <Paragraph type="p1" semiBold color="grey900">
              {formatBigValue(state.effectiveStakedBalance, token.decimals)}
            </Paragraph>
          </Grid>
        </Grid>
        <Grid flow="row" gap={32} padding={24}>
          <Grid flow="col" gap={48} colsTemplate="1fr 1fr">
            <Grid flow="row" gap={32}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: 'Required' }]}>
                <TokenAmount
                  tokenIcon="bond-token"
                  tokenLabel={token.name}
                  placeholder={activeBalance ? `0 (Max ${activeBalance.toFormat()})` : '0'}
                  disabled={state.saving}
                  maximumFractionDigits={token.decimals}
                  maxProps={{
                    disabled: state.saving,
                    onClick: () => {
                      form.setFieldsValue({
                        amount: web3c.bond.balance ?? ZERO_BIG_NUMBER,
                      });
                    },
                  }}
                />
              </Form.Item>
              <Form.Item name="amount">
                <Slider
                  min={0}
                  // max={web3c.bond.balance?.toNumber() ?? 0}
                  max={maxAmount}
                  step={1}
                  disabled={state.saving}
                  // disabled={!activeBalance}
                  tipFormatter={value =>
                    <span>{value ? formatBONDValue(new BigNumber(value)) : 0}</span>
                  }
                  tooltipPlacement="bottom"
                  // value={getNonHumanValue(state.amount ?? 0, token.decimals).toNumber() ?? 0}
                  // tipFormatter={value =>
                  //   <span>{formatBigValue(getHumanValue(new BigNumber(value!) ?? 0, token.decimals), token.decimals)}</span>}
                />
              </Form.Item>
              {isDeposit && (
                <Alert
                  message="Deposits made after an epoch started will be considered as pro-rata figures in relation to the length of the epoch." />
              )}
              {isWithdraw && (
                <Alert
                  message="Any funds withdrawn before the end of this epoch will not accrue any rewards for this epoch." />
              )}
            </Grid>
            <Grid flow="row">
              <Form.Item
                name="gasFee"
                label="Gas Fee (Gwei)"
                hint="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined."
                rules={[{ required: true, message: 'Required' }]}>
                <GasFeeList disabled={state.saving} />
              </Form.Item>
            </Grid>
          </Grid>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={state.saving}
            disabled={!state.enabled || noAmount}
            style={{ width: 121 }}>
            {isDeposit && 'Deposit'}
            {isWithdraw && 'Withdraw'}
          </Button>
        </Grid>
      </Form>
    </Card>
  );
};

export default PoolTokenRow;
