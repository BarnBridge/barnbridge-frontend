import React, { ChangeEvent } from 'react';
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
import { formatBigValue, MAX_UINT_256, ZERO_BIG_NUMBER } from 'web3/utils';
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
  amount: number;
  gasAmount: number;
  expanded: boolean;
};

const InitialState: StateType = {
  address: '-',
  icon: null,
  name: '-',
  decimals: 0,
  enabled: false,
  amount: 0,
  gasAmount: 0,
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
          effectiveStakedBalance: web3c.staking.usdc.epochPoolSize,
          enabled: web3c.usdc.allowance?.isEqualTo(MAX_UINT_256),
        }));
        break;
      case TOKEN_DAI_KEY:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.dai.balance,
          stakedBalance: web3c.staking.dai.balance,
          effectiveStakedBalance: web3c.staking.dai.epochPoolSize,
          enabled: web3c.dai.allowance?.isEqualTo(MAX_UINT_256),
        }));
        break;
      case TOKEN_SUSD_KEY:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.susd.balance,
          stakedBalance: web3c.staking.susd.balance,
          effectiveStakedBalance: web3c.staking.susd.epochPoolSize,
          enabled: web3c.susd.allowance?.isEqualTo(MAX_UINT_256),
        }));
        break;
      case TOKEN_UNISWAP_KEY:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.uniswapV2.balance,
          stakedBalance: web3c.staking.uniswap_v2.balance,
          effectiveStakedBalance: web3c.staking.uniswap_v2.epochPoolSize,
          enabled: web3c.uniswapV2.allowance?.isEqualTo(MAX_UINT_256),
        }));
        break;
      default:
        break;
    }
  }, [web3c, props.token]);

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

  function handleAmountChange(ev: ChangeEvent<HTMLInputElement>) {
    ev.persist();

    setState(prevState => ({
      ...prevState,
      amount: Number(ev.target.value ?? 0),
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
      amount: prevState.walletBalance?.toNumber() ?? 0,
    }));
  }

  function handleSliderChange(value: number) {
    setState(prevState => ({
      ...prevState,
      amount: value,
    }));
  }

  async function handleDeposit() {
    const tokenInfo = TOKENS_MAP.get(props.token);

    if (!tokenInfo || !web3.account) {
      return;
    }

    setDepositing(true);

    try {
      await web3c.staking.depositSend(tokenInfo, web3.account, state.amount, state.gasAmount);
      setState(prevState => ({
        ...prevState,
        amount: 0,
        gasAmount: gasOptions[2]?.value ?? 0,
      }));
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
      await web3c.staking.withdrawSend(tokenInfo, web3.account, state.amount, state.gasAmount);
      setState(prevState => ({
        ...prevState,
        amount: 0,
        gasAmount: gasOptions[2]?.value ?? 0,
      }));
    } catch (e) {
    }

    setWithdrawing(false);
  }

  const gasOptions = React.useMemo(() => [
    { label: 'Very fast', value: ethGasPrice.price.fastest },
    { label: 'Fast', value: ethGasPrice.price.fast },
    { label: 'Standard', value: ethGasPrice.price.average },
    { label: 'Slow', value: ethGasPrice.price.safeLow },
  ], [ethGasPrice]);

  React.useEffect(() => {
    setState(prevState => ({
      ...prevState,
      gasAmount: gasOptions[2].value,
    }));
  }, [gasOptions]);

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
            <div className={s.value}>{formatBigValue(state.walletBalance)}</div>
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
        {props.stableToken && (
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
          <Antd.Col flex="auto">
            <div className={s.balanceLabel}>STAKED BALANCE</div>
            <div className={s.balanceValue}>{formatBigValue(state.stakedBalance)}</div>
          </Antd.Col>
          <Antd.Col flex="auto">
            <div className={s.balanceLabel}>EFFECTIVE STACKED BALANCE <InfoTooltip /></div>
            <div className={s.balanceValue}>{formatBigValue(state.effectiveStakedBalance)}</div>
          </Antd.Col>
          {props.lpToken && (
            <Antd.Col flex="auto">
              <div className={s.balanceLabel}>WALLET BALANCE</div>
              <div className={s.balanceValue}>{formatBigValue(state.walletBalance)}</div>
            </Antd.Col>
          )}
        </Antd.Row>
        <Antd.Row className={s.inputRow}>
          <Antd.Col flex="50%">
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
                    disabled={!state.walletBalance}
                    onClick={handleInputMaxClick}>MAX</Antd.Button>
                }
                placeholder={state.walletBalance ? `0 (Max ${state.walletBalance.toNumber()})` : '0'}
                value={state.amount}
                onChange={handleAmountChange}
              />
              <Antd.Slider
                className={s.amountSlider}
                disabled={!state.walletBalance}
                min={0}
                max={state.walletBalance?.toNumber() ?? 0}
                value={state.amount}
                onChange={handleSliderChange}
              />
              {props.type === 'deposit' && (
                <InfoBox text="Deposits made after previous epoch starts will be considered in the next epoch" />
              )}
              {props.type === 'withdraw' && (
                <InfoBox text="Withdrawal before the end of the epoch means you can't harvest the rewards" />
              )}
            </div>
          </Antd.Col>
          <Antd.Col flex="50%">
            <div className={s.inputLabel}>Gas Fee<InfoTooltip /></div>
            <Antd.Radio.Group
              className={s.gasGroup}
              value={state.gasAmount}
              onChange={handleGasAmountChange}>
              {gasOptions.map(option => (
                <Antd.Radio.Button key={option.label} className={s.gasOption} value={option.value}>
                  <div>
                    <div className={s.gasOptionName}>{option.label}</div>
                    <div className={s.gasOptionValue}>{option.value} Gwei</div>
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
              disabled={!state.enabled || state.amount === 0}
              onClick={handleDeposit}>Deposit
            </Antd.Button>
          )}
          {props.type === 'withdraw' && (
            <Antd.Button
              type="primary"
              className={s.actionBtn}
              loading={withdrawing}
              disabled={state.amount === 0}
              onClick={handleWithdraw}>Withdraw
            </Antd.Button>
          )}
        </Antd.Row>
      </div>
    </div>
  );
};

export default PoolTokenRow;
