import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import cn from 'classnames';
import { shortenAddr } from 'web3/utils';

import Popover from 'components/antd/popover';
import { Button, ExplorerAddressLink, Link } from 'components/button';
import { Badge, SquareBadge } from 'components/custom/badge';
import IconOld from 'components/custom/icon';
import Identicon from 'components/custom/identicon';
import { Text } from 'components/custom/typography';
import { Icon } from 'components/icon';
import { useGeneral } from 'components/providers/generalProvider';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useNetwork } from 'components/providers/networkProvider';
import { useTokens } from 'components/providers/tokensProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import { TokenIcon } from 'components/token-icon';
import { useFetchQueuePositions } from 'modules/smart-alpha/api';
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
        <Icon name={navOpen ? 'close' : 'burger'} className="hidden-desktop" color="icon" />
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
    <button type="button" onClick={handleAddProjectToken} className={cn(s.actionButton, 'hidden-mobile')}>
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
      className={cn(s.actionButton, 'hidden-mobile hidden-tablet')}>
      <Icon name={activeNetwork.meta.logo} size={24} className="mr-8" />
      <Text type="p2" weight="semibold" color="secondary">
        {activeNetwork.meta.name}
      </Text>
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
                <Text type="p1" weight="semibold" color="blue">
                  {wallet.ens.name || shortenAddr(wallet.account, 8, 8)}
                </Text>
              </ExplorerAddressLink>
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
              <Text type="p1" weight="semibold" color="blue">
                {wallet.ens.name || shortenAddr(wallet.account, 8, 8)}
              </Text>
            </ExplorerAddressLink>
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
