import React from 'react';
import { isMobile } from 'react-device-detect';
import cn from 'classnames';
import { shortenAddr } from 'web3/utils';

import Button from 'components/antd/button';
import Divider from 'components/antd/divider';
import Popover from 'components/antd/popover';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import IconNotification from 'components/custom/icon-notification';
import Identicon from 'components/custom/identicon';
import { Text } from 'components/custom/typography';
import { useNetwork } from 'components/providers/networkProvider';
import { useNotifications } from 'components/providers/notificationsProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import Notifications from 'wallets/components/notifications';
import GnosisSafeConfig from 'wallets/connectors/gnosis-safe';
import { useWallet } from 'wallets/walletProvider';

import s from './s.module.scss';

const NotificationSection: React.FC = () => {
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
              <button className="link-blue ml-auto" onClick={markAllAsRead}>
                Mark all as read
              </button>
            )}
          </div>
          <Notifications />
        </div>
      }>
      <IconNotification width={24} height={24} notificationSize={8} bubble={hasUnread} className={s.notificationIcon}>
        <Icon name="notification" width={24} height={24} color="inherit" />
      </IconNotification>
    </Popover>
  );
};

const ConnectedWallet: React.FC = () => {
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
            <Grid flow="row" gap={32} padding={[32, 24]}>
              <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
                <Icon name="node-status" />
                <Text type="p1" color="secondary">
                  Status
                </Text>
                <Text type="lb2" weight="semibold" color="green" className={s.statusTag}>
                  Connecting
                </Text>
              </Grid>
              <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
                <Icon name="wallet-outlined" />
                <Text type="p1" color="secondary">
                  Wallet
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {wallet.connecting?.name}
                </Text>
              </Grid>
            </Grid>
            {wallet.meta !== GnosisSafeConfig && (
              <>
                <Divider />
                <Grid padding={24}>
                  <Button type="ghost" onClick={() => wallet.disconnect()}>
                    Disconnect
                  </Button>
                </Grid>
              </>
            )}
          </div>
        }
        trigger="click">
        <Button type="primary">Connecting...</Button>
      </Popover>
    );
  }

  if (!wallet.isActive) {
    return !isMobile ? (
      <Button type="primary" onClick={() => wallet.showWalletsModal()}>
        Connect Wallet
      </Button>
    ) : null;
  }

  const AccountSection = (
    <Popover
      placement="bottomRight"
      trigger="click"
      noPadding
      className={s.popover}
      content={
        <div className="card">
          <Grid className="card-header" flow="col" gap={16} align="center" justify="start">
            <Identicon address={wallet.account} width={40} height={40} />
            <ExternalLink href={getEtherscanAddressUrl(wallet.account!)}>
              <Text type="p1" weight="semibold" color="blue">
                {shortenAddr(wallet.account, 8, 8)}
              </Text>
            </ExternalLink>
          </Grid>
          <Grid flow="row" gap={32} padding={[32, 24]}>
            <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
              <Icon name="node-status" />
              <Text type="p1" color="secondary">
                Status
              </Text>
              <Text type="lb2" weight="semibold" color="green" className={s.statusTag}>
                Connected
              </Text>
            </Grid>
            <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
              <Icon name="wallet-outlined" />
              <Text type="p1" color="secondary">
                Wallet
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {wallet.meta?.name}
              </Text>
            </Grid>
            <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
              <Icon name="network" />
              <Text type="p1" color="secondary">
                Network
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {activeNetwork.meta.name}
              </Text>
            </Grid>
          </Grid>
          {wallet.meta !== GnosisSafeConfig && (
            <>
              <Divider />
              <Grid padding={24}>
                <Button type="ghost" onClick={() => wallet.disconnect()}>
                  Disconnect
                </Button>
              </Grid>
            </>
          )}
        </div>
      }>
      <Button type="link" className={s.accountLink}>
        <Grid flow="col" align="center">
          <Identicon address={wallet.account} width={24} height={24} className="mr-8" />
          <Text type="p1" color="primary" className={cn(s.walletAddress, 'mr-4')}>
            {shortenAddr(wallet.account, 4, 3)}
          </Text>
          <Icon name="dropdown-arrow" className={s.dropdownArrow} />
        </Grid>
      </Button>
    </Popover>
  );

  return (
    <Grid flow="col" gap={24} justify="center">
      <NotificationSection />
      <Divider type="vertical" />
      {AccountSection}
    </Grid>
  );
};

export default ConnectedWallet;
