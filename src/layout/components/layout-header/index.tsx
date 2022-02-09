import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import classNames from 'classnames';
import { shortenAddr } from 'web3/utils';

import Popover from 'components/antd/popover';
import { Button, ExplorerAddressLink, Link } from 'components/button';
import { Badge, SquareBadge } from 'components/custom/badge';
import IconOld from 'components/custom/icon';
import { IconNotification } from 'components/custom/icon-notification';
import Identicon from 'components/custom/identicon';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { Modal } from 'components/modal';
import { useGeneral } from 'components/providers/generalProvider';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useNetwork } from 'components/providers/networkProvider';
import { useNotifications } from 'components/providers/notificationsProvider';
import { useTokens } from 'components/providers/tokensProvider';
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
    <header className={s.header}>
      <button
        type="button"
        className={classNames(s.actionButton, 'hidden-desktop', 'mr-16')}
        onClick={() => setNavOpen(!navOpen)}>
        <Icon name={navOpen ? 'close' : 'burger'} color="icon" />
      </button>
      <div className={s.title}>
        <Switch>
          <Route path="/yield-farming">
            <Icon
              name="menu-yf"
              size={40}
              style={
                {
                  '--icon-display__light': 'none',
                  '--icon-display__dark': 'none',
                  '--icon-display__hover': 'block',
                } as React.CSSProperties
              }
              className="mr-12"
            />
            <div>
              <Text type="caption" weight="bold" color="blue">
                Yield
              </Text>
              <Text type="body1" weight="medium">
                Farming
              </Text>
            </div>
          </Route>
          <Route path="/governance">
            <Icon
              name="menu-dao"
              size={40}
              style={
                {
                  '--icon-display__light': 'none',
                  '--icon-display__dark': 'none',
                  '--icon-display__hover': 'block',
                } as React.CSSProperties
              }
              className="mr-12"
            />
            <div>
              <Text type="body1" weight="medium">
                Governance
              </Text>
            </div>
          </Route>
          <Route path="/smart-yield">
            <Icon
              name="menu-sy"
              size={40}
              style={
                {
                  '--icon-display__light': 'none',
                  '--icon-display__dark': 'none',
                  '--icon-display__hover': 'block',
                } as React.CSSProperties
              }
              className="mr-12"
            />
            <div>
              <Text type="caption" weight="bold" color="red">
                SMART
              </Text>
              <Text type="body1" weight="medium">
                Yield
              </Text>
            </div>
          </Route>
          <Route path="/smart-exposure">
            <Icon
              name="menu-se"
              size={40}
              style={
                {
                  '--icon-display__light': 'none',
                  '--icon-display__dark': 'none',
                  '--icon-display__hover': 'block',
                } as React.CSSProperties
              }
              className="mr-12"
            />
            <div>
              <Text type="caption" weight="bold" color="red">
                SMART
              </Text>
              <Text type="body1" weight="medium">
                Exposure
              </Text>
            </div>
          </Route>
          <Route path="/smart-alpha">
            <Icon
              name="menu-sa"
              size={40}
              style={
                {
                  '--icon-display__light': 'none',
                  '--icon-display__dark': 'none',
                  '--icon-display__hover': 'block',
                } as React.CSSProperties
              }
              className="mr-12"
            />
            <div>
              <Text type="caption" weight="bold" color="red">
                SMART
              </Text>
              <Text type="body1" weight="medium">
                Alpha
              </Text>
            </div>
          </Route>
          <Route path="/faucets">
            <Icon
              name="menu-sa"
              size={40}
              style={
                {
                  '--icon-display__light': 'none',
                  '--icon-display__dark': 'none',
                  '--icon-display__hover': 'block',
                } as React.CSSProperties
              }
              className="mr-12"
            />
            <div>
              {/* <Text type="caption" weight="bold" color="red">
                SMART
              </Text> */}
              <Text type="body1" weight="medium">
                Faucets
              </Text>
            </div>
          </Route>
          <Route path="*">
            <IconOld name="bond-square-token" width={40} height={40} className="mr-12" />
            <div>
              {/* <Text type="caption" weight="bold" color="red">
                SMART
              </Text> */}
              <Text type="body1" weight="medium">
                BarnBridge
              </Text>
            </div>
          </Route>
        </Switch>
      </div>
      <nav className={classNames(s.nav, 'hidden-mobile', 'hidden-tablet')}>
        <Link variation="text-alt" to="/" className={s.navGroupLink}>
          Home
        </Link>
        <div className={s.navGroup}>
          <button className={s.navGroupTitle}>
            Products
            <Icon name="chevron" size={16} className="ml-4" rotate={90} />
          </button>
          <div className={s.navDropdown}>
            <Link variation="text-alt" to="/smart-yield">
              SMART Yield
            </Link>
            <Link variation="text-alt" to="/smart-alpha">
              SMART Alpha
            </Link>
            <Link variation="text-alt" to="/smart-exposure">
              SMART Exposure
            </Link>
          </div>
        </div>
        <div className={s.navGroup}>
          <button className={s.navGroupTitle}>
            Governance
            <Icon name="chevron" size={16} className="ml-4" rotate={90} />
          </button>
          <div className={s.navDropdown}>
            <Link variation="text-alt" to="/yield-farming">
              Yield Farming
            </Link>
            <Link variation="text-alt" to="/governance">
              Governance
            </Link>
          </div>
        </div>
      </nav>
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
        <WalletAction />
        <NotificationsAction />
      </div>
    </header>
  );
};

export default LayoutHeader;

const PositionsAction: React.FC = () => {
  const { data } = useFetchQueuePositions();
  const { getToken, getAsset } = useTokens();
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
        <div className={classNames('card', s.notifications)}>
          <div className="card-header flex">
            <Text type="body1" weight="semibold" color="primary">
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
                    <Text type="body1" weight="semibold" color="primary" className="mb-4">
                      {item.poolName}
                    </Text>
                    <Text type="caption" weight="semibold" color="secondary">
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
        {data.length ? <SquareBadge color="red">{data.length}</SquareBadge> : null}
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
    <button type="button" onClick={handleAddProjectToken} className={classNames(s.actionButton, 'hidden-mobile')}>
      <IconOld name="bond-add-token" />
    </button>
  ) : null;
};

const NetworkAction: React.FC = () => {
  const { activeNetwork } = useNetwork();
  const { showNetworkSelect } = useWeb3();

  return (
    <button
      type="button"
      onClick={() => showNetworkSelect()}
      className={classNames(s.actionButton, 'hidden-mobile hidden-tablet')}>
      <Icon name={activeNetwork.meta.logo} size={24} />
      {/* <Text type="body2" weight="semibold" color="secondary">
        {activeNetwork.meta.name}
      </Text> */}
    </button>
  );
};

const WalletAction: React.FC = () => {
  const { activeNetwork } = useNetwork();
  const wallet = useWallet();

  if (wallet.connecting) {
    return (
      <Popover
        placement="bottomRight"
        noPadding
        content={
          <div className="card">
            <div className="card-header flex align-center">
              {wallet.ens.avatar ? (
                <img
                  width={40}
                  height={40}
                  className="mr-16"
                  style={{ borderRadius: '3px' }}
                  src={wallet.ens.avatar}
                  alt={wallet.ens.avatar}
                />
              ) : (
                <Identicon address={wallet.account} width={40} height={40} className="mr-16" />
              )}
              <ExplorerAddressLink address={wallet.account}>
                <Text type="body1" weight="semibold" color="blue">
                  {wallet.ens.name || shortenAddr(wallet.account, 8, 8)}
                </Text>
              </ExplorerAddressLink>
            </div>
            <div className="pv-24 ph-32">
              <div className="flex align-center mb-32">
                <Icon name="status" className="mr-16" color="secondary" />
                <Text type="body1" color="secondary" className="mr-16">
                  Status
                </Text>
                <Badge color="green" className="ml-auto">
                  Connecting
                </Badge>
              </div>
              <div className="flex align-center mb-32">
                <Icon name="wallet" className="mr-16" color="secondary" />
                <Text type="body1" color="secondary" className="mr-16">
                  Wallet
                </Text>
                <Text type="body1" weight="semibold" color="primary" className="ml-auto">
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
    return (
      <Button variation="primary" onClick={() => wallet.showWalletsModal()}>
        Connect Wallet
      </Button>
    );
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
            {wallet.ens.avatar ? (
              <img
                width={40}
                height={40}
                className="mr-16"
                style={{ borderRadius: '3px' }}
                src={wallet.ens.avatar}
                alt={wallet.ens.avatar}
              />
            ) : (
              <Identicon address={wallet.account} width={40} height={40} className="mr-16" />
            )}
            <ExplorerAddressLink address={wallet.account}>
              <Text type="body1" weight="semibold" color="blue">
                {wallet.ens.name || shortenAddr(wallet.account, 8, 8)}
              </Text>
            </ExplorerAddressLink>
          </div>
          <div className="pv-24 ph-32">
            <div className="flex align-center mb-32">
              <Icon name="status" className="mr-16" color="secondary" />
              <Text type="body1" color="secondary" className="mr-16">
                Status
              </Text>
              <Badge color="green" className="ml-auto">
                Connected
              </Badge>
            </div>
            <div className="flex align-center mb-32">
              <Icon name="wallet" className="mr-16" color="secondary" />
              <Text type="body1" color="secondary" className="mr-16">
                Wallet
              </Text>
              <Text type="body1" weight="semibold" color="primary" className="ml-auto">
                {wallet.meta?.name}
              </Text>
            </div>
            <div className="flex align-center">
              <Icon name="network" className="mr-16" color="secondary" />
              <Text type="body1" color="secondary" className="mr-16">
                Network
              </Text>
              <Text type="body1" weight="semibold" color="primary" className="ml-auto">
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
        {wallet.ens.avatar ? (
          <img width={24} height={24} style={{ borderRadius: '3px' }} src={wallet.ens.avatar} alt={wallet.ens.avatar} />
        ) : (
          <Identicon address={wallet.account} width={24} height={24} />
        )}
        <div className="hidden-mobile">{wallet.ens.name || shortenAddr(wallet.account, 4, 3)}</div>
      </button>
    </Popover>
  );
};

const NotificationsAction: React.FC = () => {
  const { setNotificationsReadUntil, notifications, notificationsReadUntil } = useNotifications();
  const [open, setOpen] = useState(false);

  const markAllAsRead = () => {
    if (notifications.length) {
      setNotificationsReadUntil(Math.max(...notifications.map(n => n.startsOn)));
    }
  };
  const hasUnread = notificationsReadUntil ? notifications.some(n => n.startsOn > notificationsReadUntil) : false;

  return (
    <>
      {open && (
        <Modal heading="Notifications" closeHandler={() => setOpen(false)}>
          <div className="flex">
            {hasUnread && (
              <Button type="button" variation="link" className="ml-auto" onClick={markAllAsRead}>
                Mark all as read
              </Button>
            )}
          </div>
          <Notifications />
        </Modal>
      )}
      <button
        type="button"
        className={classNames(s.actionButton, 'hidden-mobile hidden-tablet')}
        onClick={() => setOpen(prevOpen => !prevOpen)}>
        <IconNotification width={24} height={24} notificationSize={8} bubble={hasUnread} className={s.notificationIcon}>
          <Icon name="bell" />
        </IconNotification>
      </button>
    </>
  );
};
