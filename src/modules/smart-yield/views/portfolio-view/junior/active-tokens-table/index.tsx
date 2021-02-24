import React from 'react';
import { useHistory } from 'react-router';
import { ColumnsType } from 'antd/lib/table/interface';
import BigNumber from 'bignumber.js';
import { ZERO_BIG_NUMBER } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { useReload } from 'hooks/useReload';
import { SYOriginator, useSYPools } from 'modules/smart-yield/providers/sy-pools-provider';
import { useWallet } from 'wallets/wallet';

import { doSequential } from 'utils';

type ActiveToken = {
  originator: SYOriginator;
  balance?: BigNumber;
};

type ActiveTokenWithActions = ActiveToken & {
  goWithdraw: () => void;
};

const Columns: ColumnsType<ActiveTokenWithActions> = [
  {
    title: () => (
      <Text type="small" weight="semibold">
        Token Name
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={entity.originator.icon} bubbleName={entity.originator.market.icon} />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary">
            {entity.originator.name}
          </Text>
          <Text type="small" weight="semibold">
            {entity.originator.market.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        Current balance
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        -
      </Text>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        APY
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        -
      </Text>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        Withdraw wait time
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        -
      </Text>
    ),
  },
  {
    title: null,
    width: 'min-content',
    render: (_, entity) => (
      <Button type="primary" onClick={() => entity.goWithdraw()}>
        Withdraw
      </Button>
    ),
  },
];

const ActiveTokensTable: React.FC = () => {
  const history = useHistory();
  const wallet = useWallet();
  const syPools = useSYPools();
  const { originators, contracts } = syPools.state;

  const [tokens, setTokens] = React.useState<ActiveTokenWithActions[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [reload, version] = useReload();

  React.useEffect(() => {
    setLoading(true);

    (async () => {
      const result = await doSequential<SYOriginator>(originators, async originator => {
        return new Promise<any>(async resolve => {
          const balance = await originator.contract.getBalance();

          if (balance?.isGreaterThan(ZERO_BIG_NUMBER)) {
            resolve({
              originator,
              balance,
              goWithdraw: () => {
                history.push(`/smart-yield/${originator.address}/withdraw`);
              },
            });
          } else {
            resolve(undefined);
          }
        });
      });

      setTokens(result.flat().filter(Boolean));
      setLoading(false);
    })();
  }, [wallet.account, originators, contracts, version]);

  return (
    <Card
      noPaddingBody
      title={
        <Grid flow="col" colsTemplate="1fr max-content">
          <Text type="p1" weight="semibold" color="primary">
            Active positions
          </Text>
          <Button type="light">
            <Icons name="filter" />
            Filter
          </Button>
        </Grid>
      }>
      <Table<ActiveTokenWithActions>
        columns={Columns}
        dataSource={tokens}
        rowKey={row => row.originator.address}
        loading={loading}
        scroll={{
          x: true,
        }}
      />
    </Card>
  );
};

export default ActiveTokensTable;
