import React from 'react';
import * as Antd from 'antd';
import { isMobile } from 'react-device-detect';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Popover from 'components/antd/popover';
import Grid from 'components/custom/grid';
import ExternalLink from 'components/custom/externalLink';
import Identicon from 'components/custom/identicon';
import Icons from 'components/custom/icon';
import { useTheme } from 'components/providers/theme-provider';

import { useWallet } from 'wallets/wallet';
import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

import { ReactComponent as ZeroNotificationsSvg } from 'resources/svg/zero-notifications.svg';
import { ReactComponent as ZeroNotificationsDarkSvg } from 'resources/svg/zero-notifications-dark.svg';

import { Label, Paragraph } from 'components/custom/typography';

import s from './styles.module.scss';

const ConnectedWallet: React.FC = () => {
  const { isDarkTheme } = useTheme();
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
                <Icons name="node-status" />
                <Paragraph type="p1" color="secondary">Status</Paragraph>
                <Label type="lb2" semiBold color="green" className={s.statusTag}>Connecting</Label>
              </Grid>
              <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
                <Icons name="wallet-outlined" />
                <Paragraph type="p1" color="secondary">Wallet</Paragraph>
                <Paragraph type="p1" semiBold color="primary">
                  {wallet.connecting?.name}
                </Paragraph>
              </Grid>
            </Grid>
            <Card.Delimiter />
            <Grid padding={24}>
              <Button type="ghost" onClick={() => wallet.disconnect()}>
                Disconnect
              </Button>
            </Grid>
          </Card>
        }
        trigger="click">
        <Button type="primary">
          Connecting...
        </Button>
      </Popover>
    );
  }

  if (!wallet.isActive) {
    return !isMobile ? (
      <Button
        type="primary"
        onClick={() => wallet.showWalletsModal()}>
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
        <Card
          title={(
            <Paragraph type="p1" semiBold color="primary">
              Notifications
            </Paragraph>
          )}
          noPaddingBody>
          <Grid flow="row" gap={24} align="center" padding={48}>
            {isDarkTheme ? (
              <ZeroNotificationsDarkSvg width={138} height={128} />
            ) : (
              <ZeroNotificationsSvg width={138} height={128} />
            )}
            <Paragraph type="p1" color="secondary" align="center">
              There are no notifications to show
            </Paragraph>
          </Grid>
        </Card>
      }>
      <Antd.Badge
        dot
        count={0}
        showZero={false}>
        <Icons name="bell-outlined" />
      </Antd.Badge>
    </Popover>
  );

  const AccountSection = (
    <Popover
      placement="bottomRight"
      trigger="click"
      noPadding
      content={
        <Card
          title={
            <Grid flow="col" gap={16} align="center" justify="start">
              <Identicon address={wallet.account} width={40} height={40} />
              <ExternalLink href={getEtherscanAddressUrl(wallet.account!)}>
                <Paragraph type="p1" semiBold color="blue">
                  {shortenAddr(wallet.account, 8, 8)}
                </Paragraph>
              </ExternalLink>
            </Grid>
          }
          noPaddingBody>
          <Grid flow="row" gap={32} padding={[32, 24]}>
            <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
              <Icons name="node-status" />
              <Paragraph type="p1" color="secondary">Status</Paragraph>
              <Label type="lb2" semiBold color="green" className={s.statusTag}>
                Connected
              </Label>
            </Grid>
            <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
              <Icons name="wallet-outlined" />
              <Paragraph type="p1" color="secondary">Wallet</Paragraph>
              <Paragraph type="p1" semiBold color="primary">
                {wallet.connector?.name}
              </Paragraph>
            </Grid>
            <Grid flow="col" gap={16} colsTemplate="24px 1fr auto">
              <Icons name="network" />
              <Paragraph type="p1" color="secondary">Network</Paragraph>
              <Paragraph type="p1" semiBold color="primary">
                {wallet.networkName}
              </Paragraph>
            </Grid>
          </Grid>
          <Card.Delimiter />
          <Grid padding={24}>
            <Button type="ghost" onClick={() => wallet.disconnect()}>
              Disconnect
            </Button>
          </Grid>
        </Card>
      }>
      <Button type="link" className={s.accountLink}>
        <Grid flow="col" gap={8} align="center">
          <Identicon address={wallet.account} width={24} height={24} />
          <Paragraph type="p1" semiBold color="primary">
            {shortenAddr(wallet.account)}
          </Paragraph>
          <Icons name="dropdown-arrow" className={s.dropdownArrow} />
        </Grid>
      </Button>
    </Popover>
  );

  return (
    <Grid flow="col" gap={24} justify="center">
      {NotificationSection}
      <div className="bb-v-divider" />
      {AccountSection}
    </Grid>
  );
};

export default ConnectedWallet;
