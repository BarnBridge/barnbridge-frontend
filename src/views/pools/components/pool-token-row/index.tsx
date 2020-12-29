import React from 'react';
import * as Antd from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import cx from 'classnames';
import BigNumber from 'bignumber.js';

import { TokenMeta } from 'web3/types';
import { formatBigValue, getHumanValue, getNonHumanValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';
import { useWeb3Contracts } from 'web3/contracts';
import { USDCTokenMeta } from 'web3/contracts/usdc';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { CONTRACT_STAKING_ADDR } from 'web3/contracts/staking';
import { useEthGasPrice } from 'context/useEthGas';

import InfoBox from 'components/custom/info-box';
import InfoTooltip from 'components/antd/info-tooltip';
import NumericInput from 'components/custom/numeric-input';

import { ReactComponent as ChevronTopSvg } from 'resources/svg/icons/chevron-top.svg';
import { ReactComponent as ChevronRightSvg } from 'resources/svg/icons/chevron-right.svg';

import s from './styles.module.css';

export type PoolTokenRowProps = {
  token: TokenMeta;
  stableToken?: boolean;
  unilpToken?: boolean;
  bondToken?: boolean;
  type: 'deposit' | 'withdraw';
}

type StateType = {
  walletBalance?: BigNumber;
  stakedBalance?: BigNumber;
  effectiveStakedBalance?: BigNumber;
  enabled?: boolean;
  maxAllowance?: BigNumber;
  amount?: BigNumber;
  gasAmount: string;
  expanded: boolean;
};

const InitialState: StateType = {
  walletBalance: undefined,
  stakedBalance: undefined,
  effectiveStakedBalance: undefined,
  enabled: false,
  maxAllowance: undefined,
  amount: undefined,
  gasAmount: 'Standard',
  expanded: false,
};

const PoolTokenRow: React.FunctionComponent<PoolTokenRowProps> = props => {
  const web3c = useWeb3Contracts();
  const ethGasPrice = useEthGasPrice();

  const [state, setState] = React.useState<StateType>(InitialState);
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [enabling, setEnabling] = React.useState<boolean>(false);
  const [depositing, setDepositing] = React.useState<boolean>(false);
  const [withdrawing, setWithdrawing] = React.useState<boolean>(false);

  React.useEffect(() => {
    switch (props.token) {
      case USDCTokenMeta:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.usdc.balance,
          stakedBalance: web3c.staking.usdc.balance,
          effectiveStakedBalance: web3c.staking.usdc.epochUserBalance,
          enabled: web3c.usdc.allowance?.gt(ZERO_BIG_NUMBER) ?? false,
          maxAllowance: BigNumber.min(web3c.usdc.allowance ?? ZERO_BIG_NUMBER, web3c.usdc.balance ?? ZERO_BIG_NUMBER),
        }));
        break;
      case DAITokenMeta:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.dai.balance,
          stakedBalance: web3c.staking.dai.balance,
          effectiveStakedBalance: web3c.staking.dai.epochUserBalance,
          enabled: web3c.dai.allowance?.gt(ZERO_BIG_NUMBER) ?? false,
          maxAllowance: BigNumber.min(web3c.dai.allowance ?? ZERO_BIG_NUMBER, web3c.dai.balance ?? ZERO_BIG_NUMBER),
        }));
        break;
      case SUSDTokenMeta:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.susd.balance,
          stakedBalance: web3c.staking.susd.balance,
          effectiveStakedBalance: web3c.staking.susd.epochUserBalance,
          enabled: web3c.susd.allowance?.gt(ZERO_BIG_NUMBER) ?? false,
          maxAllowance: BigNumber.min(web3c.susd.allowance ?? ZERO_BIG_NUMBER, web3c.susd.balance ?? ZERO_BIG_NUMBER),
        }));
        break;
      case UNISWAPTokenMeta:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.uniswap.balance,
          stakedBalance: web3c.staking.uniswap.balance,
          effectiveStakedBalance: web3c.staking.uniswap.epochUserBalance,
          enabled: web3c.uniswap.allowance?.gt(ZERO_BIG_NUMBER) ?? false,
          maxAllowance: BigNumber.min(web3c.uniswap.allowance ?? ZERO_BIG_NUMBER, web3c.uniswap.balance ?? ZERO_BIG_NUMBER),
        }));
        break;
      case BONDTokenMeta:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.bond.balance,
          stakedBalance: web3c.staking.bond.balance,
          effectiveStakedBalance: web3c.staking.bond.epochUserBalance,
          enabled: web3c.bond.allowance?.gt(ZERO_BIG_NUMBER) ?? false,
          maxAllowance: BigNumber.min(web3c.bond.allowance ?? ZERO_BIG_NUMBER, web3c.bond.balance ?? ZERO_BIG_NUMBER),
        }));
        break;
      default:
        break;
    }
  }, [web3c, props.token]);

  React.useEffect(() => {
    if (props.unilpToken || props.bondToken) {
      setExpanded(true);
    }
  }, [props.unilpToken, props.bondToken]);

  const activeBalance = React.useMemo<BigNumber | undefined>(() => {
    if (props.type === 'deposit') {
      return state.maxAllowance;
    } else if (props.type === 'withdraw') {
      return state.stakedBalance;
    }

    return undefined;
  }, [props.type, state]);

  const maxAmount = React.useMemo<number>(() => {
    return getNonHumanValue(activeBalance ?? 0, props.token.decimals).toNumber();
  }, [activeBalance, props.token]);

  function toggleExpanded() {
    setExpanded(prevState => !prevState);
  }

  async function handleSwitchChange(checked: boolean) {
    const value = checked ? MAX_UINT_256 : ZERO_BIG_NUMBER;

    setEnabling(true);

    try {
      switch (props.token) {
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

    setEnabling(false);
  }

  function handleAmountChange(value: BigNumber | undefined) {
    setState(prevState => ({
      ...prevState,
      amount: value,
    }));
  }

  function handleGasAmountChange(ev: RadioChangeEvent) {
    setState(prevState => ({
      ...prevState,
      gasAmount: ev.target.value,
    }));
  }

  function handleInputMaxClick() {
    setState(prevState => ({
      ...prevState,
      amount: activeBalance,
    }));
  }

  function handleSliderChange(value: number) {
    setState(prevState => ({
      ...prevState,
      amount: value === maxAmount ? activeBalance : getHumanValue(new BigNumber(value), props.token.decimals),
    }));
  }

  async function handleDeposit() {
    setDepositing(true);

    try {
      await web3c.staking.depositSend(props.token, state.amount!, gasOptions.get(state.gasAmount)!);

      setState(prevState => ({
        ...prevState,
        amount: undefined,
        gasAmount: 'Standard',
      }));

      switch (props.token) {
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

    setDepositing(false);
  }

  async function handleWithdraw() {
    setWithdrawing(true);

    try {
      await web3c.staking.withdrawSend(props.token, state.amount!, gasOptions.get(state.gasAmount)!);

      setState(prevState => ({
        ...prevState,
        amount: undefined,
        gasAmount: 'Standard',
      }));

      switch (props.token) {
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

    setWithdrawing(false);
  }

  const gasOptions = React.useMemo<Map<string, number>>(() => new Map<string, number>([
    ['Very fast', ethGasPrice.price.fastest],
    ['Fast', ethGasPrice.price.fast],
    ['Standard', ethGasPrice.price.average],
    ['Slow', ethGasPrice.price.safeLow],
  ]), [ethGasPrice]);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      gasAmount: 'Standard',
    }));
  }, [gasOptions]);

  const noAmount = React.useMemo(() => !state.amount || state.amount?.isEqualTo(ZERO_BIG_NUMBER), [state.amount]);

  return (
    <div className={s.component}>
      <div className={s.header}>
        <div className={s.col}>
          <div className={s.logo}>{props.token.icon}</div>
          <div className={s.name}>{props.token.name}</div>
        </div>
        <div className={s.col}>
          <div className={s.label}>WALLET BALANCE</div>
          <div className={s.value}>{formatBigValue(state.walletBalance, props.token.decimals)}</div>
        </div>
        <div className={s.col}>
          {props.type === 'deposit' && (
            <>
              <div className={s.label}>ENABLE TOKEN</div>
              <div className={s.value}>
                <Antd.Switch
                  checked={state.enabled}
                  loading={state.enabled === undefined || enabling}
                  onChange={handleSwitchChange} />
              </div>
            </>
          )}
        </div>
        {(state.enabled || props.type === 'withdraw') && (
          <div className={s.col}>
            <Antd.Button
              className={s.arrow}
              icon={expanded ? <ChevronTopSvg /> : <ChevronRightSvg />}
              onClick={toggleExpanded}
            />
          </div>
        )}
      </div>
      <div className={cx(s.body, !expanded && s.collapsed)}>
        <Antd.Row className={s.balanceRow}>
          <Antd.Col flex="auto" className={s.walletBlnc}>
            <div className={s.balanceLabel}>WALLET BALANCE</div>
            <div className={s.balanceValue}>{formatBigValue(state.walletBalance, props.token.decimals)}</div>
          </Antd.Col>
          <Antd.Col flex="auto">
            <div className={s.balanceLabel}>STAKED BALANCE</div>
            <div className={s.balanceValue}>{formatBigValue(state.stakedBalance, props.token.decimals)}</div>
          </Antd.Col>
          <Antd.Col flex="auto">
            <div className={s.balanceLabel}>EFFECTIVE STAKED BALANCE
              <InfoTooltip
                title="This value represents your 'effective stake' in this pool - meaning the portion of your total staked balance that is earning rewards this epoch. When depositing new tokens during an epoch that is currently running, your effective deposit amount will be proportionally sized by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will become equal." />
            </div>
            <div className={s.balanceValue}>{formatBigValue(state.effectiveStakedBalance, props.token.decimals)}</div>
          </Antd.Col>
        </Antd.Row>
        <Antd.Row className={s.inputRow}>
          <Antd.Col className={s.innerCol1}>
            <div className={s.inputLabel}>Amount</div>
            <div className={s.inputValue}>
              <NumericInput
                addonBefore={
                  <span className={s.addonWrap}>
                    <span className={s.addonIcon}>{props.token.icon}</span>
                    <span className={s.addonLabel}>{props.token.name}</span>
                  </span>
                }
                addonAfter={
                  <Antd.Button
                    className={s.inputMaxBtn}
                    disabled={!activeBalance}
                    onClick={handleInputMaxClick}>MAX</Antd.Button>
                }
                placeholder={activeBalance ? `0 (Max ${activeBalance.toFormat()})` : '0'}
                maximumFractionDigits={props.token.decimals}
                value={state.amount}
                onChange={handleAmountChange}
              />
              <Antd.Slider
                className={s.amountSlider}
                disabled={!activeBalance}
                min={0}
                max={maxAmount}
                value={getNonHumanValue(state.amount ?? 0, props.token.decimals).toNumber() ?? 0}
                tipFormatter={value =>
                  <span>{formatBigValue(getHumanValue(new BigNumber(value!) ?? 0, props.token.decimals), props.token.decimals)}</span>}
                tooltipPlacement="bottom"
                step={1}
                onChange={handleSliderChange}
              />
              {props.type === 'deposit' && (
                <InfoBox
                  text="Deposits made after an epoch started will be considered as pro-rata figures in relation to the length of the epoch." />
              )}
              {props.type === 'withdraw' && (
                <InfoBox
                  text="Any funds withdrawn before the end of this epoch will not accrue any rewards for this epoch." />
              )}
            </div>
          </Antd.Col>
          <Antd.Col className={s.innerCol2}>
            <div className={s.inputLabel}>Gas Fee
              <InfoTooltip
                title="This value represents the gas price you're willing to pay for each unit of gas. Gwei is the unit of ETH typically used to denominate gas prices and generally, the more gas fees you pay, the faster the transaction will be mined." />
            </div>
            <Antd.Radio.Group
              className={s.gasGroup}
              value={state.gasAmount}
              onChange={handleGasAmountChange}>
              {Array.from(gasOptions.entries()).map(([label, value]) => (
                <Antd.Radio.Button key={label} className={s.gasOption} value={label}>
                  <div>
                    <div className={s.gasOptionName}>{label}</div>
                    <div className={s.gasOptionValue}>{value} Gwei</div>
                  </div>
                  <div className={s.gasOptionRadio} />
                </Antd.Radio.Button>
              ))}
            </Antd.Radio.Group>
          </Antd.Col>
        </Antd.Row>
        <Antd.Row className={s.actionRow}>
          {props.type === 'deposit' && (
            <Antd.Button
              type="primary"
              className={s.actionBtn}
              loading={depositing}
              disabled={!state.enabled || noAmount}
              onClick={handleDeposit}>Deposit
            </Antd.Button>
          )}
          {props.type === 'withdraw' && (
            <Antd.Button
              type="primary"
              className={s.actionBtn}
              loading={withdrawing}
              disabled={noAmount}
              onClick={handleWithdraw}>Withdraw
            </Antd.Button>
          )}
        </Antd.Row>
      </div>
    </div>
  );
};

export default PoolTokenRow;
