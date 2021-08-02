import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { formatToken } from 'web3/utils';

import Icon from 'components/custom/icon';
import { Spinner } from 'components/custom/spinner';
import { Tabs } from 'components/custom/tabs';
import { Text } from 'components/custom/typography';
import { useKnownTokens } from 'components/providers/knownTokensProvider';
import { TokenIconPair } from 'components/token-icon';
import { useContract } from 'hooks/useContract';
import { TrancheApiType, useSeAPI } from 'modules/smart-exposure/api';
import { useSEPools } from 'modules/smart-exposure/providers/se-pools-provider';
import { useWallet } from 'wallets/walletProvider';

import { MultipleTokensForm } from './Multiple';
import { SingleTokenForm } from './Single';

const tabs = [
  {
    children: 'Multiple tokens',
    id: 'multiple',
  },
  {
    children: 'Single token',
    id: 'single',
  },
];

const WithdrawView: React.FC = () => {
  const wallet = useWallet();
  const { getTokenBySymbol, getTokenIconBySymbol } = useKnownTokens();
  const { pool: poolAddress, tranche: trancheAddress } = useParams<{ pool: string; tranche: string }>();
  const [tranche, setTranche] = useState<TrancheApiType>();
  const [activeTab, setActiveTab] = useState<string>('multiple');
  const { ePoolPeripheryContract } = useSEPools();
  const seAPI = useSeAPI();

  useEffect(() => {
    seAPI.fetchTranche(trancheAddress).then(result => {
      setTranche(result);
    });
  }, [trancheAddress]);

  const tokenAContract = useContract(tranche?.tokenA.address, {
    loadAllowance: [poolAddress, ePoolPeripheryContract.address],
    loadCommon: true,
    loadBalance: true,
  });
  const tokenBContract = useContract(tranche?.tokenB.address, {
    loadAllowance: [poolAddress, ePoolPeripheryContract.address],
    loadCommon: true,
    loadBalance: true,
  });
  const tokenEContract = useContract(trancheAddress, {
    loadAllowance: [poolAddress, ePoolPeripheryContract.address],
    loadCommon: true,
    loadBalance: true,
  });

  if (!tranche || !tokenEContract || !tokenAContract || !tokenBContract) {
    return <Spinner className="mh-auto" />;
  }

  const tokenA = getTokenBySymbol(tranche.tokenA.symbol);
  const tokenB = getTokenBySymbol(tranche.tokenB.symbol);

  const tokenAIcon = getTokenIconBySymbol(tranche.tokenA.symbol);
  const tokenBIcon = getTokenIconBySymbol(tranche.tokenB.symbol);

  return (
    <>
      <div className="flex mb-16">
        <Link to={`/smart-exposure/pools/${poolAddress}/${trancheAddress}`} className="button-text">
          <Icon name="arrow-back" color="inherit" className="mr-8" />
          Tranche details
        </Link>
      </div>
      <div className="flex justify-center row-gap-12 col-gap-64 mb-40">
        <div className="flex">
          <TokenIconPair name1={tokenAIcon} name2={tokenBIcon} size={40} className="mr-16" />
          <div>
            <div className="text-p1 fw-semibold color-primary mr-4">{`${Number(tranche.tokenARatio) * 100}% ${
              tranche.tokenA.symbol
            } / ${Number(tranche.tokenBRatio) * 100}% ${tranche.tokenB.symbol}`}</div>
            <div className="text-sm fw-semibold color-secondary">{`${tokenA?.name} / ${tokenB?.name}`}</div>
          </div>
        </div>
        <div>
          <div className="text-sm fw-semibold color-secondary mb-4">Wallet {tranche.tokenA.symbol} balance</div>
          <div>
            <span className="text-p1 fw-semibold color-primary mr-8">
              {formatToken(tokenAContract.getBalanceOf(wallet.account), {
                scale: tranche.tokenA.decimals,
              }) ?? '-'}
            </span>
            <span className="text-sm fw-semibold color-secondary">{tranche.tokenA.symbol}</span>
          </div>
        </div>
        <div>
          <div className="text-sm fw-semibold color-secondary mb-4">Wallet {tranche.tokenB.symbol} balance</div>
          <div>
            <span className="text-p1 fw-semibold color-primary mr-8">
              {' '}
              {formatToken(tokenBContract.getBalanceOf(wallet.account), {
                scale: tranche.tokenB.decimals,
              }) ?? '-'}
            </span>
            <span className="text-sm fw-semibold color-secondary">{tranche.tokenB.symbol}</span>
          </div>
        </div>
        <div>
          <div className="text-sm fw-semibold color-secondary mb-4">Wallet {tranche.eTokenSymbol} balance</div>
          <div>
            <span className="text-p1 fw-semibold color-primary mr-8">
              {formatToken(tokenEContract.getBalanceOf(wallet.account), {
                scale: tokenEContract.decimals,
              }) ?? '-'}
            </span>
            <span className="text-sm fw-semibold color-secondary">{tranche.eTokenSymbol}</span>
          </div>
        </div>
      </div>
      <div
        className="card ph-32 pv-32 mh-auto"
        style={{
          width: '100%',
          maxWidth: 640,
        }}>
        <Text type="h3" weight="semibold" color="primary" className="mb-16">
          Withdraw
        </Text>
        <Text type="p2" weight="semibold" color="secondary" className="mb-32">
          {activeTab === 'multiple'
            ? 'Withdraw from your position by burning eTokens of this tranche for the underlying tranche tokens according to the current tranche ratio.'
            : 'Withdraw from your position by burning eTokens of this tranche for one of the underlying tranche tokens. The second underlying token will be swapped for the token you want to receive, which is where the slippage and deadline parameters will be used.'}
        </Text>
        <Tabs
          tabs={tabs}
          activeKey={activeTab}
          onClick={setActiveTab}
          className="mb-32"
          variation="elastic"
          size="small"
        />
        {activeTab === 'multiple' ? (
          <MultipleTokensForm
            tranche={tranche}
            tokenAContract={tokenAContract}
            tokenBContract={tokenBContract}
            tokenEContract={tokenEContract}
          />
        ) : (
          <SingleTokenForm
            tranche={tranche}
            tokenAContract={tokenAContract}
            tokenBContract={tokenBContract}
            tokenEContract={tokenEContract}
          />
        )}
      </div>
    </>
  );
};

export default WithdrawView;
