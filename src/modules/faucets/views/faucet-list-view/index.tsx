import { useState } from 'react';
import cn from 'classnames';
import { formatToken } from 'web3/utils';

import Alert from 'components/antd/alert';
import Spin from 'components/antd/spin';
import IconBubble from 'components/custom/icon-bubble';
import { FaucetType, useFauceteer } from 'modules/faucets/providers/fauceteerProvider';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

const FaucetListView: React.FC = () => {
  const wallet = useWallet();
  const { faucets } = useFauceteer();

  return (
    <>
      <Alert
        type="info"
        message="In order to use the testnet app you must first use the kETH faucets to get kETH. The BOND faucet is a Uniswap market that allows you to swap kETH for BOND."
        className={s.alert}
      />
      <section className={cn('card', s.faucets)}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Token Name</th>
                <th>Your balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {faucets.map((faucet, idx) => (
                <tr key={idx}>
                  <td>
                    <div className="flex align-center">
                      <IconBubble
                        name={faucet.icon}
                        bubbleName={faucet.markets?.[0]?.icon!}
                        secondBubbleName={faucet.markets?.[1]?.icon!}
                        width={40}
                        height={40}
                        className="mr-16"
                      />
                      <div>
                        <div className="text-p1 fw-semibold mb-4">{faucet.name}</div>
                        {faucet.label && <div className="text-sm fw-semibold color-secondary">{faucet.label}</div>}
                        {faucet.markets && (
                          <div className="text-sm fw-semibold color-secondary">
                            {faucet.markets.map(m => m.name).join(' / ')}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-p1 fw-semibold">
                      {formatToken(
                        (faucet.name === 'kETH' ? wallet.ethBalance : faucet.token?.balance)?.unscaleBy(
                          faucet.decimals,
                        ),
                      ) ?? '-'}
                    </div>
                  </td>
                  <td>
                    {faucet.link && (
                      <a
                        href={faucet.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button-ghost ml-auto">
                        {faucet.link.label}
                      </a>
                    )}
                    <GetButton faucet={faucet} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default FaucetListView;

const GetButton = ({ faucet }: { faucet: FaucetType }) => {
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);

  if (!faucet.fauceteer || !faucet.token) return null;

  return (
    <button
      type="button"
      className="button-primary ml-auto"
      onClick={async () => {
        setLoading(true);
        await faucet.fauceteer?.drip(faucet.token!.address, faucet.decimals).finally(() => setLoading(false));
        faucet.token!.loadBalance().catch(Error);
      }}
      disabled={!wallet.isActive || loading}
      style={{ width: '100%' }}>
      {loading && <Spin spinning style={{ marginRight: 8 }} />}
      Get {faucet.name}
    </button>
  );
};
