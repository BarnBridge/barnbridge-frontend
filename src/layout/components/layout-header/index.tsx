import React from 'react';
import { Route, Switch } from 'react-router-dom';
import classnames from 'classnames';

import Button from 'components/antd/button';
import Icon, { IconNames } from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import { useGeneral } from 'components/providers/generalProvider';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { useNetwork } from 'components/providers/networkProvider';
import { useWeb3 } from 'components/providers/web3Provider';
import ConnectedWallet from 'wallets/components/connected-wallet';
import MetamaskWalletConfig, { MetamaskConnector } from 'wallets/connectors/metamask';
import { useWallet } from 'wallets/walletProvider';

import s from './s.module.scss';

const LayoutHeader: React.FC = () => {
  const { setNavOpen } = useGeneral();
  const { activeNetwork } = useNetwork();
  const { showNetworkSelect } = useWeb3();
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

  return (
    <header className={s.component}>
      <Button type="link" className={s.burger} onClick={() => setNavOpen(prevState => !prevState)}>
        <Icon name="burger" />
      </Button>
      <Icon name="bond-square-token" className={s.logo} />
      <Text type="h3" weight="semibold" color="primary" className={s.title}>
        <Switch>
          <Route path="/yield-farming">Yield Farming</Route>
          <Route path="/governance">Governance</Route>
          <Route path="/smart-yield">SMART Yield</Route>
          <Route path="/smart-alpha">SMART Alpha</Route>
          <Route path="/smart-exposure">SMART Exposure</Route>
          <Route path="/faucets">Faucets</Route>
          <Route path="*">BarnBridge</Route>
        </Switch>
      </Text>
      <div className="flex align-center ml-auto">
        {wallet.meta === MetamaskWalletConfig && (
          <button className={classnames('button-text mr-24', s.addToken)} onClick={handleAddProjectToken}>
            <Icon name="bond-add-token" />
          </button>
        )}
        <button
          className="button-ghost-monochrome mr-24"
          style={{ padding: '8px 12px 8px 8px' }}
          onClick={() => showNetworkSelect()}>
          <Icon name={activeNetwork.meta.logo as IconNames} width={24} height={24} className="mr-8" />
          <Text type="p2" weight="semibold" color="secondary">
            {activeNetwork.meta.name}
          </Text>
        </button>
        <ConnectedWallet />
      </div>
    </header>
  );
};

export default LayoutHeader;
