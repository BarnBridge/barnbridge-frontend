import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Route, Switch } from 'react-router-dom';
import cn from 'classnames';
import { shortenAddr } from 'web3/utils';

import Popover from 'components/antd/popover';
import { Button, Link } from 'components/button';
import { Badge, SquareBadge } from 'components/custom/badge';
import ExternalLink from 'components/custom/externalLink';
import IconOld from 'components/custom/icon';
import IconNotification from 'components/custom/icon-notification';
import Identicon from 'components/custom/identicon';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { useGeneral } from 'components/providers/generalProvider';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useNetwork } from 'components/providers/networkProvider';
import { useNotifications } from 'components/providers/notificationsProvider';
import { getAsset, useTokens } from 'components/providers/tokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { TokenIcon } from 'components/token-icon';
import { useFetchQueuePositions } from 'modules/smart-alpha/api';
import Notifications from 'wallets/components/notifications';
import GnosisSafeConfig from 'wallets/connectors/gnosis-safe';
import MetamaskWalletConfig, { MetamaskConnector } from 'wallets/connectors/metamask';
import { useWallet } from 'wallets/walletProvider';

import { isProductionMode } from 'utils';

import s from './s.module.scss';

const LayoutHeader: React.FC = () => {
  const { navOpen, setNavOpen } = useGeneral();
  const { activeNetwork } = useNetwork();

  return (
    <header className={s.component}>
      <button type="button" className={s.burger} onClick={() => setNavOpen(!navOpen)}>
        <IconOld name="burger" className="hidden-desktop" />
        <Icon name="arrow" rotate={navOpen ? 180 : 0} size={12} className="hidden-mobile hidden-tablet" />
      </button>
      <IconOld name="bond-square-token" className={s.logo} />
      <Text type="h3" weight="semibold" color="primary" className={s.title}>
        <Switch>
          <Route path="/yield-farming">Yield Farming</Route>
          <Route path="/governance">Governance</Route>
          <Route path="/smart-yield">SMART Yield</Route>
          <Route path="/smart-exposure">SMART Exposure</Route>
          <Route path="/smart-alpha">SMART Alpha</Route>
          <Route path="/faucets">Faucets</Route>
          <Route path="*">BarnBridge</Route>
        </Switch>
      </Text>
      {!isMobile ? (
        <div className="flex align-center col-gap-16 ml-auto">
          {!isProductionMode && (
            <Switch>
              <Route path="/smart-alpha">
                <PositionsAction />
              </Route>
            </Switch>
          )}
          {activeNetwork.config.features.addBondToken && <AddTokenAction />}
          <NetworkAction />
          <NotificationsAction />
          <WalletAction />
        </div>
      ) : null}
    </header>
  );
};

export default LayoutHeader;

const PositionsAction: React.FC = () => {
  const { data } = useFetchQueuePositions();
  const { getToken } = useTokens();
  const [visible, setVisible] = useState(false);

  if (!Array.isArray(data) || !data.length) {
    return null;
  }

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      noPadding
      visible={visible}
      onVisibleChange={setVisible}
      content={
        <div className={cn('card', s.notifications)}>
          <div className="card-header flex">
            <Text type="p1" weight="semibold" color="primary">
              Queued positions
            </Text>
          </div>
          <ul className={s.queuedPositions}>
            {data.map((item, idx) => {
              const poolToken = getToken(item.poolToken.symbol);
              const oracleToken = getAsset(item.oracleAssetSymbol);

              return (
                <li key={idx} className={s.queuedPosition}>
                  <TokenIcon name={poolToken?.icon} bubble2Name={oracleToken?.icon} size={40} className="mr-16" />
                  <div className="mr-16">
                    <Text type="p1" weight="semibold" color="primary" className="mb-4">
                      {item.poolName}
                    </Text>
                    <Text type="small" weight="semibold" color="secondary">
                      {`${item.tranche === 'SENIOR' ? 'Senior' : 'Junior'} ${item.queueType} queue`}
                    </Text>
                  </div>
                  <Link
                    variation="text"
                    to={`/smart-alpha/portfolio/${item.tranche === 'SENIOR' ? 'senior' : 'junior'}?poolAddress=${
                      item.poolAddress
                    }`}
                    onClick={() => setVisible(false)}>
                    View position
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      }>
      <button type="button" className={s.actionButton}>
        {data.length ? (
          <SquareBadge color="red" className="mr-8">
            {data.length}
          </SquareBadge>
        ) : null}
        Queued positions
      </button>
    </Popover>
  );
};

const AddTokenAction: React.FC = () => {
  const wallet = useWallet();
  const { projectToken } = useKnownTokens();

  async function handleAddProjectToken() {
    if (wallet.connector instanceof MetamaskConnector) {
      try {
        await wallet.connector.addToken({
          type: 'ERC20',
          options: {
            address: projectToken.address,
            symbol: projectToken.symbol,
            decimals: projectToken.decimals,
            image: `${window.location.origin}/android-chrome-192x192.png`,
          },
        });
      } catch (e) {
        console.error(e);
      }
    }
  }

  return wallet.meta === MetamaskWalletConfig ? (
    <button type="button" onClick={handleAddProjectToken} className={s.actionButton}>
      <IconOld name="bond-add-token" />
    </button>
  ) : null;
};

const NetworkAction: React.FC = () => {
  const { activeNetwork } = useNetwork();
  const { showNetworkSelect } = useWeb3();

  return (
    <button type="button" onClick={() => showNetworkSelect()} className={s.actionButton}>
      <IconOld name={activeNetwork.meta.logo} width={24} height={24} className="mr-8" />
      <Text type="p2" weight="semibold" color="secondary">
        {activeNetwork.meta.name}
      </Text>
    </button>
  );
};

const NotificationsAction: React.FC = () => {
  const { setNotificationsReadUntil, notifications, notificationsReadUntil } = useNotifications();

  const markAllAsRead = () => {
    if (notifications.length) {
      setNotificationsReadUntil(Math.max(...notifications.map(n => n.startsOn)));
    }
  };
  const hasUnread = notificationsReadUntil ? notifications.some(n => n.startsOn > notificationsReadUntil) : false;

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      noPadding
      content={
        <div className={cn('card', s.notifications)}>
          <div className="card-header flex">
            <Text type="p1" weight="semibold" color="primary">
              Notifications
            </Text>
            {hasUnread && (
              <Button type="button" variation="link" className="ml-auto" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
          <Notifications />
        </div>
      }>
      <button type="button" className={s.actionButton}>
        <IconNotification width={24} height={24} notificationSize={8} bubble={hasUnread} className={s.notificationIcon}>
          <Icon name="bell" />
        </IconNotification>
      </button>
    </Popover>
  );
};

const WalletAction: React.FC = () => {
  const { activeNetwork } = useNetwork();
  const wallet = useWallet();
  const { getEtherscanAddressUrl } = useWeb3();

  if (wallet.connecting) {
    return (
      <Popover
        placement="bottomRight"
        noPadding
        content={
          <div className="card">
            <div className="card-header flex align-center">
              <Identicon address={wallet.account} width={40} height={40} className="mr-16" />
              <ExternalLink href={getEtherscanAddressUrl(wallet.account!)}>
                <Text type="p1" weight="semibold" color="blue">
                  {shortenAddr(wallet.account, 8, 8)}
                </Text>
              </ExternalLink>
            </div>
            <div className="pv-24 ph-32">
              <div className="flex align-center mb-32">
                <Icon name="status" className="mr-16" color="secondary" />
                <Text type="p1" color="secondary" className="mr-16">
                  Status
                </Text>
                <Badge color="green" className="ml-auto">
                  Connecting
                </Badge>
              </div>
              <div className="flex align-center mb-32">
                <Icon name="wallet" className="mr-16" color="secondary" />
                <Text type="p1" color="secondary" className="mr-16">
                  Wallet
                </Text>
                <Text type="p1" weight="semibold" color="primary" className="ml-auto">
                  {wallet.connecting?.name}
                </Text>
              </div>
            </div>
            {wallet.meta !== GnosisSafeConfig && (
              <div className="card-footer grid">
                <Button type="button" variation="ghost" onClick={() => wallet.disconnect()}>
                  Disconnect
                </Button>
              </div>
            )}
          </div>
        }
        trigger="click">
        <Button variation="primary">Connecting...</Button>
      </Popover>
    );
  }

  if (!wallet.isActive) {
    return !isMobile ? (
      <Button variation="primary" onClick={() => wallet.showWalletsModal()}>
        Connect Wallet
      </Button>
    ) : null;
  }

  return (
    <Popover
      placement="bottomRight"
      trigger="click"
      noPadding
      className={s.popover}
      content={
        <div className="card">
          <div className="card-header flex align-center">
            <Identicon address={wallet.account} width={40} height={40} className="mr-16" />
            <ExternalLink href={getEtherscanAddressUrl(wallet.account!)}>
              <Text type="p1" weight="semibold" color="blue">
                {shortenAddr(wallet.account, 8, 8)}
              </Text>
            </ExternalLink>
          </div>
          <div className="pv-24 ph-32">
            <div className="flex align-center mb-32">
              <Icon name="status" className="mr-16" color="secondary" />
              <Text type="p1" color="secondary" className="mr-16">
                Status
              </Text>
              <Badge color="green" className="ml-auto">
                Connected
              </Badge>
            </div>
            <div className="flex align-center mb-32">
              <Icon name="wallet" className="mr-16" color="secondary" />
              <Text type="p1" color="secondary" className="mr-16">
                Wallet
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="ml-auto">
                {wallet.meta?.name}
              </Text>
            </div>
            <div className="flex align-center">
              <Icon name="network" className="mr-16" color="secondary" />
              <Text type="p1" color="secondary" className="mr-16">
                Network
              </Text>
              <Text type="p1" weight="semibold" color="primary" className="ml-auto">
                {activeNetwork.meta.name}
              </Text>
            </div>
          </div>
          {wallet.meta !== GnosisSafeConfig && (
            <div className="card-footer grid">
              <Button type="button" variation="ghost" onClick={() => wallet.disconnect()}>
                Disconnect
              </Button>
            </div>
          )}
        </div>
      }>
      <button type="button" className={s.actionButton}>
        <Identicon address={wallet.account} width={24} height={24} className="mr-8" />
        {shortenAddr(wallet.account, 4, 3)}
      </button>
    </Popover>
  );
};
