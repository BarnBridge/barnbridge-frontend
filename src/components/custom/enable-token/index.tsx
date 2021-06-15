import { useState } from 'react';
import classNames from 'classnames';
import Erc20Contract from 'web3/erc20Contract';

import { Spinner } from 'components/custom/spinner';
import { TrancheApiType } from 'modules/smart-exposure/api';

export const EnableTokens = ({
  tokenAContract,
  tokenBContract,
  poolAddress,
  tranche,
  className,
}: {
  tokenAContract: Erc20Contract;
  tokenBContract: Erc20Contract;
  poolAddress: string;
  tranche: TrancheApiType;
  className?: string;
}) => {
  if (tokenAContract.isAllowedOf(poolAddress) !== false && tokenBContract.isAllowedOf(poolAddress) !== false) {
    return null;
  }

  return (
    <div className={classNames('flex align-center col-gap-24', className)}>
      <EnableTokenButton contract={tokenAContract} address={poolAddress} tokenSymbol={tranche.tokenA.symbol} />
      {tokenAContract.isAllowedOf(poolAddress) === false && tokenBContract.isAllowedOf(poolAddress) === false && (
        <span className="middle-dot color-border" />
      )}
      <EnableTokenButton contract={tokenBContract} address={poolAddress} tokenSymbol={tranche.tokenB.symbol} />
    </div>
  );
};

export const EnableTokenButton = ({
  contract,
  address,
  tokenSymbol,
  className,
  style = {},
}: {
  contract: Erc20Contract;
  address: string;
  tokenSymbol: string;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const [loading, setLoading] = useState(false);

  if (contract.isAllowedOf(address) !== false) {
    return null;
  }

  return (
    <button
      type="button"
      className={classNames('button-primary', className)}
      style={{
        flexGrow: 1,
        ...style,
      }}
      disabled={loading}
      onClick={() => {
        setLoading(true);
        contract.approve(address, true).finally(() => setLoading(false));
      }}>
      {loading && <Spinner className="mr-8" />}
      Enable {tokenSymbol}
    </button>
  );
};
