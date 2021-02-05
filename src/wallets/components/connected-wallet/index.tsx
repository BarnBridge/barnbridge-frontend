import React from 'react';
import * as Antd from 'antd';
import { isMobile } from 'react-device-detect';

import { useTheme } from 'components/providers/theme-provider';
import Identicon from 'components/custom/identicon';
import ExternalLink from 'components/custom/externalLink';
import Icons from 'components/custom/icon';

import { useWallet } from 'wallets/wallet';
import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

import { ReactComponent as ZeroNotificationsSvg } from 'resources/svg/zero-notifications.svg';
import { ReactComponent as ZeroNotificationsDarkSvg } from 'resources/svg/zero-notifications-dark.svg';

import s from './styles.module.css';

const ConnectedWallet: React.FunctionComponent = props => {
  const { isDarkTheme } = useTheme();
  const wallet = useWallet();

  function handleWalletConnect() {
    wallet.showWalletsModal();
  }

  function handleWalletDisconnect() {
    wallet.disconnect();
  }

  if (wallet.connecting) {
    return (
      <div className={s.component}>
        <Antd.Popover
          overlayClassName={s.overlay}
          placement="bottomRight"
          content={
            <div>
              <div className={s.stats}>
                <Antd.Row className={s.statRow}>
                  <Antd.Col>
                    <Icons name="earth" className={s.statIcon} />
                  </Antd.Col>
                  <Antd.Col>
                    <span className={s.statName}>Status</span>
                  </Antd.Col>
                  <Antd.Col>
                    <Antd.Tag className={s.statTag}>Connecting...</Antd.Tag>
                  </Antd.Col>
                </Antd.Row>
                <Antd.Row className={s.statRow}>
                  <Antd.Col>
                    <Icons name="wallet-outlined" className={s.statIcon} />
                  </Antd.Col>
                  <Antd.Col>
                    <span className={s.statName}>Wallet</span>
                  </Antd.Col>
                  <Antd.Col>
                    <span className={s.statValue}>
                      {wallet.connecting?.name}
                    </span>
                  </Antd.Col>
                </Antd.Row>
              </div>
              <Antd.Row className={s.disconnectBtnRow}>
                <Antd.Button
                  type="ghost"
                  className={s.disconnectBtn}
                  onClick={handleWalletDisconnect}>
                  Disconnect
                </Antd.Button>
              </Antd.Row>
            </div>
          }
          trigger="click">
          <Antd.Button type="primary" size="large" className={s.connectBtn}>
            Connecting...
          </Antd.Button>
        </Antd.Popover>
      </div>
    );
  }

  if (!wallet.isActive) {
    return !isMobile ? (
      <div className={s.component}>
        <Antd.Button
          type="primary"
          size="large"
          className={s.connectBtn}
          onClick={handleWalletConnect}>
          Connect Wallet
        </Antd.Button>
      </div>
    ) : null;
  }

  return (
    <div className={s.component}>
      <div className={s.walletBox}>
        <Antd.Popover
          overlayClassName={s.overlay}
          placement="bottomRight"
          content={
            <div>
              <Antd.Row className={s.notificationHeader}>
                Notifications
              </Antd.Row>
              <Antd.Row className={s.notificationBody}>
                <div className={s.notificationZero}>
                  {isDarkTheme ? (
                    <ZeroNotificationsDarkSvg />
                  ) : (
                    <ZeroNotificationsSvg />
                  )}
                  <span>There are no notifications to show</span>
                </div>
              </Antd.Row>
            </div>
          }
          trigger="click">
          <Antd.Badge
            className={s.notificationBtn}
            dot
            count={0}
            showZero={false}>
            <Icons name="bell" />
          </Antd.Badge>
        </Antd.Popover>
        <div className={s.divider} />
        <Antd.Popover
          overlayClassName={s.overlay}
          placement="bottomRight"
          content={
            <div>
              <Antd.Row className={s.walletHeader}>
                <Antd.Col>
                  <Identicon
                    address={wallet.account}
                    className={s.walletAvatar}
                  />
                </Antd.Col>
                <Antd.Col>
                  <ExternalLink
                    href={getEtherscanAddressUrl(wallet.account!)}
                    className={s.walletPreviewHash}>
                    {shortenAddr(wallet.account!, 8, 8)}
                  </ExternalLink>
                </Antd.Col>
              </Antd.Row>
              <div className={s.stats}>
                <Antd.Row className={s.statRow}>
                  <Antd.Col>
                    <Icons name="earth" className={s.statIcon} />
                  </Antd.Col>
                  <Antd.Col>
                    <span className={s.statName}>Status</span>
                  </Antd.Col>
                  <Antd.Col>
                    <Antd.Tag className={s.statTag}>Connected</Antd.Tag>
                  </Antd.Col>
                </Antd.Row>
                <Antd.Row className={s.statRow}>
                  <Antd.Col>
                    <Icons name="wallet-outlined" className={s.statIcon} />
                  </Antd.Col>
                  <Antd.Col>
                    <span className={s.statName}>Wallet</span>
                  </Antd.Col>
                  <Antd.Col>
                    <span className={s.statValue}>
                      {wallet.connector?.name}
                    </span>
                  </Antd.Col>
                </Antd.Row>
                <Antd.Row className={s.statRow}>
                  <Antd.Col>
                    <Icons name="network" className={s.statIcon} />
                  </Antd.Col>
                  <Antd.Col>
                    <span className={s.statName}>Network</span>
                  </Antd.Col>
                  <Antd.Col>
                    <span className={s.statValue}>{wallet.networkName}</span>
                  </Antd.Col>
                </Antd.Row>
              </div>
              <Antd.Row className={s.disconnectBtnRow}>
                <Antd.Button
                  type="ghost"
                  className={s.disconnectBtn}
                  onClick={handleWalletDisconnect}>
                  Disconnect
                </Antd.Button>
              </Antd.Row>
            </div>
          }
          trigger="click">
          <Antd.Row className={s.walletPreview}>
            <Antd.Col>
              <Identicon
                address={wallet.account}
                className={s.walletPreviewAvatar}
              />
            </Antd.Col>
            <Antd.Col>
              <span className={s.walletPreviewHash}>
                {shortenAddr(wallet.account!, 4, 4)}
              </span>
            </Antd.Col>
            <Antd.Col>
              <Icons
                name="chevron-right"
                rotate={270}
                className={s.walletPreviewArrow}
              />
            </Antd.Col>
          </Antd.Row>
        </Antd.Popover>
      </div>
    </div>
  );
};

export default ConnectedWallet;
