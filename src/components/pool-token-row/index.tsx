import React from 'react';
import * as Antd from 'antd';
import cx from 'classnames';

import { ReactComponent as ChevronTopSvg } from 'resources/svg/icons/chevron-top.svg';
import { ReactComponent as ChevronRightSvg } from 'resources/svg/icons/chevron-right.svg';

import s from './styles.module.css';

export type PoolTokenRowProps = {
  logo: React.ReactNode;
  name: string;
  walletBalance: string;
  stakedBalance: string;
  enabled: boolean;
}

const PoolTokenRow: React.FunctionComponent<PoolTokenRowProps> = props => {
  const [expanded, setExpanded] = React.useState<boolean>(false);

  function toggleExpanded() {
    setExpanded(prevState => !prevState);
  }

  return (
    <div className={s.component}>
      <div className={s.header}>
        <div className={s.col}>
          <div className={s.logo}>{props.logo}</div>
          <div className={s.name}>{props.name}</div>
        </div>
        <div className={s.col}>
          <div className={s.label}>Wallet Balance</div>
          <div className={s.value}>
            {props.walletBalance} <span>BOND</span>
          </div>
        </div>
        <div className={s.col}>
          <div className={s.label}>Staked Balance</div>
          <div className={s.value}>
            {props.stakedBalance} <span>{props.name}</span></div>
        </div>
        <div className={s.col}>
          <div className={s.label}>ENABLE TOKEN</div>
          <div className={s.value}><Antd.Switch checked={props.enabled} /></div>
        </div>
        <div className={s.col}>
          <Antd.Button
            className={s.arrow}
            icon={expanded ? <ChevronTopSvg /> : <ChevronRightSvg />}
            onClick={toggleExpanded}
          />
        </div>
      </div>
      <div className={cx(s.body, !expanded && s.collapsed)}>
        <div className={s.row1}>
          <div className={s.col1}>
            <div className={s.amountLabel}>Amount</div>
            <Antd.Input addonBefore={<span>{props.logo} {props.name}</span>} placeholder="0 (Max 800)" />
            <Antd.Slider />
            <Antd.Alert type="info" showIcon
                        message="Deposits made after previous epoch starts will be considered in the next epoch" />
          </div>

          <div className={s.col2}>
            <div className={s.gweiLabel}>Gas Fee (Gwei)</div>
            <Antd.Radio.Group value={920} onChange={() => null}>
              <div className={s.gweiItem}>
                <div className={s.gweiOption}>Very Fast</div>
                <div className={s.gweiPrice}><strong>920</strong> ~0.2 ETH</div>
                <Antd.Radio value={920} />
              </div>
              <div className={s.gweiItem}>
                <div className={s.gweiOption}>Fast</div>
                <div className={s.gweiPrice}><strong>500</strong> ~0.14 ETH</div>
                <Antd.Radio value={500} />
              </div>
              <div className={s.gweiItem}>
                <div className={s.gweiOption}>Standard</div>
                <div className={s.gweiPrice}><strong>400</strong> ~0.12 ETH</div>
                <Antd.Radio value={400} />
              </div>
              <div className={s.gweiItem}>
                <div className={s.gweiOption}>Slow</div>
                <div className={s.gweiPrice}><strong>300</strong> ~0.097 ETH</div>
                <Antd.Radio value={300} />
              </div>
            </Antd.Radio.Group>
          </div>
        </div>

        <Antd.Button className={s.row2}>Deposit 0 {props.name}</Antd.Button>
      </div>
    </div>
  );
};

export default PoolTokenRow;
