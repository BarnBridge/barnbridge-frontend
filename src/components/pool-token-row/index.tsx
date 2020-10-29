import React from 'react';
import * as Antd from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio/interface';
import cx from 'classnames';
import BigNumber from 'bignumber.js';

import {
  TOKEN_DAI_KEY,
  TOKEN_SUSD_KEY,
  TOKEN_UNISWAP_KEY,
  TOKEN_USDC_KEY,
  TokenInfo,
  TokenKeys,
  TOKENS_MAP,
  useWeb3Contracts,
} from 'web3/contracts';
import { useWeb3 } from 'web3/provider';
import { formatBigValue, getHumanValue, getNonHumanValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';
import { useEthGasPrice } from 'context/useEthGas';

import InfoBox from 'components/info-box';
import InfoTooltip from 'components/info-tooltip';
import NumericInput from 'components/numeric-input';

import { ReactComponent as ChevronTopSvg } from 'resources/svg/icons/chevron-top.svg';
import { ReactComponent as ChevronRightSvg } from 'resources/svg/icons/chevron-right.svg';

import s from './styles.module.css';

export type PoolTokenRowProps = {
  token: TokenKeys;
  stableToken?: boolean;
  lpToken?: boolean;
  type: 'deposit' | 'withdraw';
}

type StateType = TokenInfo & {
  walletBalance?: BigNumber;
  stakedBalance?: BigNumber;
  effectiveStakedBalance?: BigNumber;
  enabled?: boolean;
  amount?: BigNumber;
  gasAmount: string;
  expanded: boolean;
};

const InitialState: StateType = {
  address: '-',
  icon: null,
  name: '-',
  decimals: 0,
  enabled: false,
  amount: undefined,
  gasAmount: 'Standard',
  expanded: false,
};

const PoolTokenRow: React.FunctionComponent<PoolTokenRowProps> = props => {
  const web3 = useWeb3();
  const web3c = useWeb3Contracts();
  const ethGasPrice = useEthGasPrice();

  const [expanded, setExpanded] = React.useState<boolean>(props.lpToken ?? false);
  const [enabling, setEnabling] = React.useState<boolean>(false);
  const [depositing, setDepositing] = React.useState<boolean>(false);
  const [withdrawing, setWithdrawing] = React.useState<boolean>(false);
  const [state, setState] = React.useState<StateType>(InitialState);

  React.useEffect(() => {
    const tokenInfo = TOKENS_MAP.get(props.token);

    if (tokenInfo) {
      setState(prevState => ({
        ...prevState,
        ...tokenInfo,
      }));
    }
  }, [props.token]);

  React.useEffect(() => {
    switch (props.token) {
      case TOKEN_USDC_KEY:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.usdc.balance,
          stakedBalance: web3c.staking.usdc.balance,
          effectiveStakedBalance: web3c.staking.usdc.epochUserBalance,
          enabled: web3c.usdc.allowance?.gt(ZERO_BIG_NUMBER) ?? false,
        }));
        break;
      case TOKEN_DAI_KEY:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.dai.balance,
          stakedBalance: web3c.staking.dai.balance,
          effectiveStakedBalance: web3c.staking.dai.epochUserBalance,
          enabled: web3c.dai.allowance?.gt(ZERO_BIG_NUMBER) ?? false,
        }));
        break;
      case TOKEN_SUSD_KEY:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.susd.balance,
          stakedBalance: web3c.staking.susd.balance,
          effectiveStakedBalance: web3c.staking.susd.epochUserBalance,
          enabled: web3c.susd.allowance?.gt(ZERO_BIG_NUMBER) ?? false,
        }));
        break;
      case TOKEN_UNISWAP_KEY:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.uniswapV2.balance,
          stakedBalance: web3c.staking.uniswap_v2.balance,
          effectiveStakedBalance: web3c.staking.uniswap_v2.epochUserBalance,
          enabled: web3c.uniswapV2.allowance?.gt(ZERO_BIG_NUMBER) ?? false,
        }));
        break;
      default:
        break;
    }
  }, [web3c, props.token]);

  const activeBalance = React.useMemo<BigNumber | undefined>(() => {
    if (props.type === 'deposit') {
      return state.walletBalance;
    } else if (props.type === 'withdraw') {
      return state.stakedBalance;
    }

    return undefined;
  }, [props.type, state]);

  const maxAmount = React.useMemo<number>(() => {
    return getNonHumanValue(activeBalance ?? 0, state.decimals).toNumber();
  }, [activeBalance, state.decimals]);

  const sliderStep = React.useMemo<number>(() => {
    switch (props.token) {
      case TOKEN_USDC_KEY:
      case TOKEN_DAI_KEY:
      case TOKEN_SUSD_KEY:
        return 10 ** state.decimals;
      case TOKEN_UNISWAP_KEY:
        return 1;
    }
  }, [props.token, state.decimals]);

  function toggleExpanded() {
    setExpanded(prevState => !prevState);
  }

  async function handleSwitchChange(checked: boolean) {
    const value = checked ? MAX_UINT_256 : ZERO_BIG_NUMBER;

    setEnabling(true);

    try {
      switch (props.token) {
        case TOKEN_USDC_KEY:
          await web3c.usdc.approveSend(value);
          break;
        case TOKEN_DAI_KEY:
          await web3c.dai.approveSend(value);
          break;
        case TOKEN_SUSD_KEY:
          await web3c.susd.approveSend(value);
          break;
        case TOKEN_UNISWAP_KEY:
          await web3c.uniswapV2.approveSend(value);
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
      amount: value === maxAmount ? activeBalance : getHumanValue(new BigNumber(value), state.decimals),
    }));
  }

  async function handleDeposit() {
    const tokenInfo = TOKENS_MAP.get(props.token);

    if (!tokenInfo || !web3.account) {
      return;
    }

    setDepositing(true);

    try {
      await web3c.staking.depositSend(tokenInfo, web3.account, state.amount!, gasOptions.get(state.gasAmount)!);
      setState(prevState => ({
        ...prevState,
        amount: undefined,
        gasAmount: 'Standard',
      }));

      switch (tokenInfo.name) {
        case TOKEN_USDC_KEY:
          web3c.usdc.reload();
          web3c.yf.reload();
          break;
        case TOKEN_DAI_KEY:
          web3c.dai.reload();
          web3c.yf.reload();
          break;
        case TOKEN_SUSD_KEY:
          web3c.susd.reload();
          web3c.yf.reload();
          break;
        case TOKEN_UNISWAP_KEY:
          web3c.uniswapV2.reload();
          web3c.yflp.reload();
          break;
      }
    } catch (e) {
    }

    setDepositing(false);
  }

  async function handleWithdraw() {
    const tokenInfo = TOKENS_MAP.get(props.token);

    if (!tokenInfo || !web3.account) {
      return;
    }

    setWithdrawing(true);

    try {
      await web3c.staking.withdrawSend(tokenInfo, web3.account, state.amount!, gasOptions.get(state.gasAmount)!);
      setState(prevState => ({
        ...prevState,
        amount: undefined,
        gasAmount: 'Standard',
      }));

      switch (tokenInfo.name) {
        case TOKEN_USDC_KEY:
          web3c.usdc.reload();
          web3c.yf.reload();
          break;
        case TOKEN_DAI_KEY:
          web3c.dai.reload();
          web3c.yf.reload();
          break;
        case TOKEN_SUSD_KEY:
          web3c.susd.reload();
          web3c.yf.reload();
          break;
        case TOKEN_UNISWAP_KEY:
          web3c.uniswapV2.reload();
          web3c.yflp.reload();
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
          <div className={s.logo}>{state.icon}</div>
          <div className={s.name}>{state.name}</div>
        </div>
        {props.stableToken ? (
          <div className={s.col}>
            <div className={s.label}>WALLET BALANCE</div>
            <div className={s.value}>{formatBigValue(state.walletBalance, state.decimals)}</div>
          </div>
        ) : <div />}
        <div className={s.col}>
          <div className={s.label}>ENABLE TOKEN</div>
          <div className={s.value}>
            <Antd.Switch
              checked={state.enabled}
              loading={state.enabled === undefined || enabling}
              onChange={handleSwitchChange} />
          </div>
        </div>
        {props.stableToken && state.enabled && (
          <div className={s.col}>
            <Antd.Button
              className={s.arrow}
              icon={expanded ? <ChevronTopSvg /> : <ChevronRightSvg />}
              onClick={toggleExpanded}
            />
          </div>
        )}
      </div>
      {state.enabled && (
        <div className={cx(s.body, !expanded && s.collapsed)}>
          <Antd.Row className={s.balanceRow}>
            <Antd.Col flex="auto" className={s.walletBlnc}>
              <div className={s.balanceLabel}>WALLET BALANCE</div>
              <div className={s.balanceValue}>{formatBigValue(state.walletBalance, state.decimals)}</div>
            </Antd.Col>
            <Antd.Col flex="auto">
              <div className={s.balanceLabel}>STAKED BALANCE</div>
              <div className={s.balanceValue}>{formatBigValue(state.stakedBalance, state.decimals)}</div>
            </Antd.Col>
            <Antd.Col flex="auto">
              <div className={s.balanceLabel}>EFFECTIVE STAKED BALANCE
                <InfoTooltip
                  title="This value represents your 'effective stake' in this pool - meaning the portion of your total staked balance that is earning rewards this epoch. When depositing new tokens during an epoch that is currently running, your effective deposit amount will be proportionally sized by the time that has passed from that epoch. Once an epoch ends, your staked balance and effective staked balance will become equal." />
              </div>
              <div className={s.balanceValue}>{formatBigValue(state.effectiveStakedBalance, state.decimals)}</div>
            </Antd.Col>
            {props.lpToken && (
              <Antd.Col flex="auto">
                <div className={s.balanceLabel}>WALLET BALANCE</div>
                <div className={s.balanceValue}>{formatBigValue(state.walletBalance, state.decimals)}</div>
              </Antd.Col>
            )}
          </Antd.Row>
          <Antd.Row className={s.inputRow}>
            <Antd.Col className={s.innerCol1}>
              <div className={s.inputLabel}>Amount</div>
              <div className={s.inputValue}>
                <NumericInput
                  addonBefore={
                    <span className={s.addonWrap}>
                    <span className={s.addonIcon}>{state.icon}</span>
                    <span className={s.addonLabel}>{state.name}</span>
                  </span>
                  }
                  addonAfter={
                    <Antd.Button
                      className={s.inputMaxBtn}
                      disabled={!activeBalance}
                      onClick={handleInputMaxClick}>MAX</Antd.Button>
                  }
                  placeholder={activeBalance ? `0 (Max ${activeBalance.toFormat()})` : '0'}
                  maximumFractionDigits={state.decimals}
                  value={state.amount}
                  onChange={handleAmountChange}
                />
                <Antd.Slider
                  className={s.amountSlider}
                  disabled={!activeBalance}
                  min={0}
                  max={maxAmount}
                  value={getNonHumanValue(state.amount ?? 0, state.decimals).toNumber() ?? 0}
                  tipFormatter={value =>
                    <span>{formatBigValue(getHumanValue(new BigNumber(value!) ?? 0, state.decimals), state.decimals)}</span>}
                  tooltipPlacement="bottom"
                  step={sliderStep}
                  onChange={handleSliderChange}
                />
                {props.type === 'deposit' && (
                  <InfoBox
                    text="Deposits made after an epoch started will be considered as pro-rata figures in relation to the length of the epoch." />
                )}
                {props.type === 'withdraw' && (
                  <InfoBox text="Any funds withdrawn before the end of this epoch will not accrue any rewards for this epoch." />
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
      )}
    </div>
  );
};

export default PoolTokenRow;
