import { useState } from 'react';
import BigNumber from 'bignumber.js';

import { Alert } from 'components/alert';
import { Button } from 'components/button';
import { TokenAmount } from 'components/custom/token-amount-new';
import { Text } from 'components/custom/typography';
import { useTokens } from 'components/providers/tokensProvider';
import { TokenIcon } from 'components/token-icon';
import { PoolApiType } from 'modules/smart-alpha/api';

export const JuniorWithdraw = ({ pool }: { pool: PoolApiType }) => {
  const [tokenState, setTokenState] = useState<string>('');
  const { getToken } = useTokens();

  const poolToken = getToken(pool.poolToken.symbol);
  // const oracleToken = getToken(pool.oracleAssetSymbol);

  const tokenMax = new BigNumber(3.21312);

  return (
    <div className="card p-24">
      <Text type="h3" weight="bold" color="primary" tag="h3" className="mb-16">
        Junior withdraw
      </Text>
      <Text type="p2" weight="semibold" color="secondary" tag="p" className="mb-32">
        Choose the amount of tokens you want to withdraw from the junior side. Make sure you double check the amounts.
      </Text>
      <Text type="small" weight="semibold" color="secondary" className="mb-8">
        bb_jwETH-USD amount
      </Text>
      <TokenAmount
        before={
          <TokenIcon
            name={poolToken?.icon ?? 'unknown'}
            bubble1Name="bond"
            // bubble2Name={oracleToken?.icon ?? 'unknown'}
            bubble2Name="usd"
            size={24}
            outline="purple"
          />
        }
        value={tokenState}
        onChange={setTokenState}
        slider
        max={tokenMax}
        placeholder={`0 (Max ${tokenMax ?? 0})`}
        className="mb-32"
      />

      <Alert type="info" className="mb-32">
        Sed elementum nulla sit amet accumsan dapibus. Integer auctor et elit in lobortis. Fusce ex nulla
      </Alert>

      <div className="flex justify-end align-center">
        <Button variation="primary">Signal withdraw</Button>
      </div>
    </div>
  );
};
