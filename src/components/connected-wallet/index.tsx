import React from 'react';
import * as Antd from 'antd';

import { useWeb3 } from 'web3/provider';

import { ReactComponent as BellSvg } from 'resources/svg/icons/bell.svg';
import { ReactComponent as AvatarSvg } from 'resources/svg/avatar.svg';
import { ReactComponent as GlobeSvg } from 'resources/svg/icons/globe.svg';
import { ReactComponent as WalletSvg } from 'resources/svg/icons/wallet.svg';
import { ReactComponent as NetworkSvg } from 'resources/svg/icons/network.svg';

import s from './styles.module.css';

const ConnectedWallet: React.FunctionComponent = props => {
  const web3 = useWeb3();
  const [visibleModal, setVisibleModal] = React.useState<boolean>(false);

  function handleConnectWallet() {
    setVisibleModal(true);
  }

  async function handleProviderClick(connectorId: string) {
    setVisibleModal(false);
    web3.connect(connectorId);
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
                <button
                  key={connector.id}
                  className={s.connectorBox}
                  onClick={handleProviderClick.bind(this, connector.id as any)}
                >
                  <img src={connector.logo} alt={connector.name} className={s.connectorLogo} />
                  <span className={s.connectorName}>{connector.name}</span>
                </button>
              ))}
            </div>
          </Antd.Modal>
        </>
      ) : (
        <div className={s.walletBox}>
          <Antd.Badge dot><BellSvg /></Antd.Badge>
          <div className={s.divider} />
          <Antd.Popover
            overlayClassName={s.overlay}
            placement="bottomRight"
            content={
              <div>
                <Antd.Row className={s.walletHeader}>
                  <Antd.Col>
                    <Antd.Avatar icon={<AvatarSvg />} className={s.walletAvatar} />
                  </Antd.Col>
                  <Antd.Col>
                    <span className={s.walletHash}>{web3.account!.slice(0, 10)}...{web3.account!.slice(-10)}</span>
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
                <Antd.Avatar icon={<AvatarSvg />} className={s.walletPreviewAvatar} />
              </Antd.Col>
              <Antd.Col>
                <span className={s.walletPreviewHash}>{web3.account!.slice(0, 4)}...{web3.account!.slice(-3)}</span>
              </Antd.Col>
            </Antd.Row>
          </Antd.Popover>
        </div>
      )}
    </div>
  );
};

export default ConnectedWallet;
