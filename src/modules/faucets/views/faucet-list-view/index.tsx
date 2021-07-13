import { useState } from 'react';
import cn from 'classnames';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import Spin from 'components/antd/spin';
import IconBubble from 'components/custom/icon-bubble';
import { ColumnType, Table } from 'components/custom/table';
import { FaucetType, useFauceteer } from 'modules/faucets/providers/fauceteerProvider';
import { useWallet } from 'wallets/walletProvider';

import s from './s.module.scss';

const columns: ColumnType<FaucetType>[] = [
  {
    heading: 'Token Name',
    // @ts-ignore
    render: item => {
      return (
        <div className="flex align-center">
          <IconBubble
            name={item.icon}
            bubbleName={item.markets?.[0]?.icon!}
            secondBubbleName={item.markets?.[1]?.icon!}
            width={40}
            height={40}
            className="mr-16"
          />
          <div>
            <div className="text-p1 fw-semibold mb-4">{item.name}</div>
            {item.label && <div className="text-sm fw-semibold color-secondary">{item.label}</div>}
            {item.markets && (
              <div className="text-sm fw-semibold color-secondary">{item.markets.map(m => m.name).join(' / ')}</div>
            )}
          </div>
        </div>
      );
    },
  },
  {
    heading: 'Your balance',
    // @ts-ignore
    render: function YourBalance(item) {
      const wallet = useWallet();
      return (
        <div className="text-p1 fw-semibold">
          {formatToken((item.name === 'kETH' ? wallet.ethBalance : item.token?.balance)?.unscaleBy(item.decimals)) ??
            '-'}
        </div>
      );
    },
  },
  {
    heading: '',
    // @ts-ignore
    render: item => {
      return (
        <>
          {item.link && (
            <a href={item.link.url} target="_blank" rel="noopener noreferrer" className="button-ghost ml-auto">
              {item.link.label}
            </a>
          )}
          <GetButton faucet={item} />
        </>
      );
    },
  },
];

const FaucetListView: React.FC = () => {
  const { faucets } = useFauceteer();

  return (
    <>
      <Alert
        type="info"
        message="In order to use the testnet app you must first use the kETH faucets to get kETH. The BOND faucet is a Uniswap market that allows you to swap kETH for BOND."
        className={s.alert}
      />
      <section className={cn('card', s.faucets)}>
        <Table<FaucetType> columns={columns} data={faucets} />
      </section>
    </>
  );
};

export default FaucetListView;

const GetButton = ({ faucet }: { faucet: FaucetType }) => {
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);

  if (!faucet.fauceteer || !faucet.token) return null;

  async function getFaucets() {
    setLoading(true);
    await faucet.fauceteer?.drip(faucet.token!.address, faucet.decimals).finally(() => setLoading(false));
    faucet.token!.loadBalance().catch(Error);
  }

  return (
    <button
      type="button"
      className="button-primary ml-auto"
      onClick={getFaucets}
      disabled={!wallet.isActive || loading}
      style={{ width: '100%' }}>
      {loading && <Spin spinning style={{ marginRight: 8 }} />}
      Get {faucet.name}
    </button>
  );
};
