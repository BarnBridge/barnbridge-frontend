import React from 'react';
import { isMobile } from 'react-device-detect';
import cn from 'classnames';
import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import Popover from 'components/antd/popover';
import ExternalLink from 'components/custom/externalLink';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import Identicon from 'components/custom/identicon';
import { Text } from 'components/custom/typography';
import Notifications from 'wallets/components/notifications';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

const ConnectedWallet: React.FC = () => {
  const wallet = useWallet();

  if (wallet.connecting) {
    return (
      <Popover
        placement="bottomRight"
        noPadding
        content={
          <Card noPaddingBody>
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
            <Divider />
            <Grid padding={24}>
              <Button type="ghost" onClick={() => wallet.disconnect()}>
                Disconnect
              </Button>
            </Grid>
          </Card>
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

  const NotificationSection = (
    <Popover
      className={s.notification}
      placement="bottomRight"
      trigger="click"
      noPadding
      content={
        <div className={cn('card', s.notifications)}>
          <div className="card-header">
            <Text type="p1" weight="semibold" color="primary">
              Notifications
            </Text>
          </div>
          <Notifications />
        </div>
      }>
      <Icon name="bell-outlined" width={26} height={26} style={{ cursor: 'pointer' }} />
    </Popover>
  );

  const AccountSection = (
    <Popover
      placement="bottomRight"
      trigger="click"
      noPadding
      className={s.popover}
      content={
        <Card
          title={
            <Grid flow="col" gap={16} align="center" justify="start">
              <Identicon address={wallet.account} width={40} height={40} />
              <ExternalLink href={getEtherscanAddressUrl(wallet.account!)}>
                <Text type="p1" weight="semibold" color="blue">
                  {shortenAddr(wallet.account, 8, 8)}
                </Text>
              </ExternalLink>
            </Grid>
          }
          noPaddingBody>
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
                {wallet.connector?.name}
              </Text>
            </Grid>
            <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
              <Icon name="network" />
              <Text type="p1" color="secondary">
                Network
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {wallet.networkName}
              </Text>
            </Grid>
          </Grid>
          <Divider />
          <Grid padding={24}>
            <Button type="ghost" onClick={() => wallet.disconnect()}>
              Disconnect
            </Button>
          </Grid>
        </Card>
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
      {NotificationSection}
      <Divider type="vertical" />
      {AccountSection}
    </Grid>
  );
};

export default ConnectedWallet;
