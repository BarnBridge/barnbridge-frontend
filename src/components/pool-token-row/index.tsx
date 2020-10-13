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
  amount?: number;
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
          enabled: web3c.usdc.allowance?.isEqualTo(ZERO_BIG_NUMBER) !== true,
        }));
        break;
      case TOKEN_DAI_KEY:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.dai.balance,
          stakedBalance: web3c.staking.dai.balance,
          effectiveStakedBalance: web3c.staking.dai.epochUserBalance,
          enabled: web3c.dai.allowance?.isEqualTo(ZERO_BIG_NUMBER) !== true,
        }));
        break;
      case TOKEN_SUSD_KEY:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.susd.balance,
          stakedBalance: web3c.staking.susd.balance,
          effectiveStakedBalance: web3c.staking.susd.epochUserBalance,
          enabled: web3c.susd.allowance?.isEqualTo(ZERO_BIG_NUMBER) !== true,
        }));
        break;
      case TOKEN_UNISWAP_KEY:
        setState(prevState => ({
          ...prevState,
          walletBalance: web3c.uniswapV2.balance,
          stakedBalance: web3c.staking.uniswap_v2.balance,
          effectiveStakedBalance: web3c.staking.uniswap_v2.epochUserBalance,
          enabled: web3c.uniswapV2.allowance?.isEqualTo(ZERO_BIG_NUMBER) !== true,
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
      amount: activeBalance?.toNumber() ?? 0,
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
            <div className={s.balanceLabel}>EFFECTIVE STAKED BALANCE <InfoTooltip /></div>
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
                    disabled={!activeBalance}
                    onClick={handleInputMaxClick}>MAX</Antd.Button>
                }
                placeholder={activeBalance ? `0 (Max ${activeBalance.toNumber()})` : '0'}
                value={state.amount ? new Intl.NumberFormat(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 18,
                }).format(state.amount) : undefined}
                onChange={handleAmountChange}
              />
              <Antd.Slider
                className={s.amountSlider}
                disabled={!activeBalance}
                min={0}
                max={activeBalance?.toNumber() ?? 0}
                value={state.amount}
                tipFormatter={value => <span>{new Intl.NumberFormat().format(value!)}</span>}
                tooltipPlacement="bottom"
                step={0.01}
                onChange={handleSliderChange}
              />
              {props.type === 'deposit' && (
                <InfoBox
                  text="Deposits made after an epoch started will be considered as pro-rata figures in relation to the length of the epoch." />
              )}
              {props.type === 'withdraw' && (
                <InfoBox text="Withdrawals before the end of the epoch will decrease your rewards." />
              )}
            </div>
          </Antd.Col>
          <Antd.Col flex="50%">
            <div className={s.inputLabel}>Gas Fee<InfoTooltip /></div>
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
