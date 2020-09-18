import React from 'react';

import { useWeb3 } from 'context/Web3Provider';

import { ReactComponent as LogoWithNameSvg } from 'resources/svg/logo-with-name.svg';
import { ReactComponent as ShieldSvg } from 'resources/svg/shield.svg';

import s from './styles.module.css';

const ConnectView: React.FunctionComponent<{}> = props => {
  const web3 = useWeb3();

  async function handleProviderClick(connectorId: string, ev: React.MouseEvent) {
    ev.preventDefault();
    web3.connect(connectorId);
  }

  return (
    <div className={s.container}>
      <LogoWithNameSvg className={s.logo} />
      <div className={s.boxWrap}>
        <div className={s.box}>
          <div className={s.boxLabel}>Connect Wallet</div>
          <div className={s.boxContent}>
            {web3.connectors.map(connector => (
              <button
                key={connector.id}
                className={s.boxItem}
                onClick={handleProviderClick.bind(this, connector.id as any)}
              >
                <img src={connector.logo} alt={connector.name} />
                <span>{connector.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className={s.noteBlock}>
        <div className={s.noteRow}>
          <ShieldSvg />
        </div>
        <div className={s.noteRow}>
          <div className={s.noteLabel}>Non-custodial & Secure</div>
          <div>We do not own your private keys and cannot access your funds without your confirmation</div>
        </div>
      </div>
    </div>
  );
};

export default ConnectView;
