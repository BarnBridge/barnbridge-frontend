import React from 'react';
import * as Antd from 'antd';
import { UnsupportedChainIdError } from '@web3-react/core';

import UnsupportedChainModal from 'components/unsupported-chain-modal';
import Identicon from 'components/identicon';
import ExternalLink from 'components/externalLink';

import { useWeb3 } from 'web3/provider';
import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

import { ReactComponent as ZeroNotificationsSvg } from 'resources/svg/zero-notifications.svg';
import { ReactComponent as ChevronTopSvg } from 'resources/svg/icons/chevron-top.svg';
import { ReactComponent as BellSvg } from 'resources/svg/icons/bell.svg';
import { ReactComponent as GlobeSvg } from 'resources/svg/icons/globe.svg';
import { ReactComponent as WalletSvg } from 'resources/svg/icons/wallet.svg';
import { ReactComponent as NetworkSvg } from 'resources/svg/icons/network.svg';

import s from './styles.module.css';

const ConnectedWallet: React.FunctionComponent = props => {
  const web3 = useWeb3();
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);
  const [unsupportedChainVisible, setUnsupportedChainVisible] = React.useState<boolean>(false);

  function handleConnectWallet() {
    setVisibleModal(true);
  }

  function handleSwitchWallet() {
    setUnsupportedChainVisible(false);
    setVisibleModal(true);
  }

  async function handleProviderClick(connectorId: string) {
    setVisibleModal(false);

    try {
      await web3.connect(connectorId);
    } catch (error) {
      console.log({error});
      if (error instanceof UnsupportedChainIdError) {
        setUnsupportedChainVisible(true);
      }
    }
  }

  function handleDisconnect() {
    web3.disconnect();
  }

  if (!web3.tried) {
    return null;
  }

  return (
    <div className={s.component}>
      {!web3.isActive ? (
        <>
          <Antd.Button type="primary" size="large" className={s.connectBtn} onClick={handleConnectWallet}>
            Connect Wallet
          </Antd.Button>

          <Antd.Modal
            className={s.modal}
            visible={visibleModal}
            centered
            closable
            onCancel={() => setVisibleModal(false)}
            footer={[]}
          >
            <p className={s.modalLabel}>Connect Wallet</p>
            <p className={s.modalNote}>Please select the wallet of your liking</p>
            <div className={s.connectorList}>
              {web3.connectors.map(connector => (
                <Antd.Button
                  key={connector.id}
                  type="ghost"
                  className={s.connectorBox}
                  disabled={connector.name !== 'MetaMask'}
                  onClick={handleProviderClick.bind(this, connector.id as any)}
                >
                  <img src={connector.logo} alt={connector.name} className={s.connectorLogo} />
                  <span className={s.connectorName}>{connector.name}</span>
                </Antd.Button>
              ))}
            </div>
          </Antd.Modal>
          <UnsupportedChainModal
            visible={unsupportedChainVisible}
            onSwitchWallet={handleSwitchWallet} />
        </>
      ) : (
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
                    <ZeroNotificationsSvg />
                    <span>There are no notifications to show</span>
                  </div>
                </Antd.Row>
              </div>
            }
            trigger="click"
          >
            <Antd.Badge dot count={0} showZero={false}><BellSvg /></Antd.Badge>
          </Antd.Popover>
          <div className={s.divider} />
          <Antd.Popover
            overlayClassName={s.overlay}
            placement="bottomRight"
            content={
              <div>
                <Antd.Row className={s.walletHeader}>
                  <Antd.Col>
                    <Identicon address={web3.account} className={s.walletAvatar} />
                  </Antd.Col>
                  <Antd.Col>
                    <ExternalLink
                      href={getEtherscanAddressUrl(web3.account!)}
                      className={s.walletPreviewHash}
                    >{shortenAddr(web3.account!, 8, 8)}</ExternalLink>
                  </Antd.Col>
                </Antd.Row>
                <div className={s.stats}>
                  <Antd.Row className={s.statRow}>
                    <Antd.Col>
                      <GlobeSvg className={s.statIcon} />
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
                      <WalletSvg className={s.statIcon} />
                    </Antd.Col>
                    <Antd.Col>
                      <span className={s.statName}>Wallet</span>
                    </Antd.Col>
                    <Antd.Col>
                      <span className={s.statValue}>{web3.connector?.name}</span>
                    </Antd.Col>
                  </Antd.Row>
                  <Antd.Row className={s.statRow}>
                    <Antd.Col>
                      <NetworkSvg className={s.statIcon} />
                    </Antd.Col>
                    <Antd.Col>
                      <span className={s.statName}>Network</span>
                    </Antd.Col>
                    <Antd.Col>
                      <span className={s.statValue}>{web3.network?.name}</span>
                    </Antd.Col>
                  </Antd.Row>
                </div>
                <Antd.Row className={s.disconnectBtnRow}>
                  <Antd.Button
                    type="ghost"
                    className={s.disconnectBtn}
                    onClick={handleDisconnect}
                  >Disconnect</Antd.Button>
                </Antd.Row>
              </div>
            }
            trigger="click"
          >
            <Antd.Row className={s.walletPreview}>
              <Antd.Col>
                <Identicon address={web3.account} className={s.walletPreviewAvatar} />
              </Antd.Col>
              <Antd.Col>
                <span className={s.walletPreviewHash}>{shortenAddr(web3.account!, 4, 4)}</span>
              </Antd.Col>
              <Antd.Col>
                <ChevronTopSvg className={s.walletPreviewArrow} />
              </Antd.Col>
            </Antd.Row>
          </Antd.Popover>
        </div>
      )}
    </div>
  );
};

export default ConnectedWallet;
