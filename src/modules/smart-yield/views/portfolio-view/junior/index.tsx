import React from 'react';
import { shortenAddr, ZERO_BIG_NUMBER } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';
import { SYOriginatorType, useSYPools } from 'modules/smart-yield/providers/sy-pools-provider';
import { SYContract } from 'modules/smart-yield/providers/sy-pools-provider/sy/contract';
import { ColumnsType } from 'antd/lib/table/interface';
import { useHistory } from 'react-router';
import ConfirmRedeemModal from 'modules/smart-yield/components/confirm-redeem-modal';

type LockedPositionsTableEntity = SYOriginatorType & {
  contract?: SYContract;
  redeem: (bondId: number) => void;
};

const LockedPositions: ColumnsType<LockedPositionsTableEntity> = [
  {
    title: () => (
      <Text type="small" weight="semibold">
        Token Name
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={entity.icon} bubbleName={entity.market.icon} />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary">
            {entity.name}
          </Text>
          <Text type="small" weight="semibold">
            {entity.market.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    title: null,
    render: (_, entity) => (
      <Grid flow="col" gap={24}>
        <Button type="ghost" onClick={() => entity.redeem(1)}>
          Redeem
        </Button>
      </Grid>
    ),
  },
];

type ActivePositionsTableEntity = SYOriginatorType & {
  contract?: SYContract;
  goWithdraw: () => void;
  goSell: () => void;
};

const ActivePositions: ColumnsType<ActivePositionsTableEntity> = [
  {
    title: () => (
      <Text type="small" weight="semibold">
        Token Name
      </Text>
    ),
    render: (_, entity) => (
      <Grid flow="col" gap={16} align="center">
        <IconBubble name={entity.icon} bubbleName={entity.market.icon} />
        <Grid flow="row" gap={4} className="ml-auto">
          <Text type="p1" weight="semibold" color="primary">
            {entity.name}
          </Text>
          <Text type="small" weight="semibold">
            {entity.market.name}
          </Text>
        </Grid>
      </Grid>
    ),
  },
  {
    dataIndex: 'transactionHash',
    title: () => (
      <Text type="small" weight="semibold">
        Transaction Hash
      </Text>
    ),
    render: (value: string) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="blue">
          -
        </Text>
      </Grid>
    ),
  },
  {
    dataIndex: 'date',
    title: () => (
      <Text type="small" weight="semibold">
        Date
      </Text>
    ),
    render: (value: Date) => (
      <>
        <Text type="p1" weight="semibold" color="primary" className="mb-4">
          -
        </Text>
        <Text type="small" weight="semibold">
          -
        </Text>
      </>
    ),
  },
  {
    dataIndex: 'amount',
    title: () => (
      <Text type="small" weight="semibold">
        Amount
      </Text>
    ),
    render: (value: string) => (
      <Grid flow="row" gap={4}>
        <Text type="p1" weight="semibold" color="primary">
          -
        </Text>
        <Text type="small" weight="semibold">
          -
        </Text>
      </Grid>
    ),
  },
  {
    dataIndex: 'tranch',
    title: () => (
      <Text type="small" weight="semibold">
        Tranch
      </Text>
    ),
    render: (value: string) => (
      <Text type="p1" weight="semibold" color="primary">
        -
      </Text>
    ),
  },
  {
    title: null,
    render: (_, entity) => (
      <Grid flow="col" gap={24}>
        <Button type="primary" onClick={() => entity.goWithdraw()}>
          Withdraw
        </Button>
        <Button type="ghost" onClick={() => entity.goSell()}>
          Sell
        </Button>
      </Grid>
    ),
  },
];

export default function PortfolioJunior() {
  const history = useHistory();
  const syPools = useSYPools();
  const { originators, contracts, loading } = syPools.state;

  const [showRedeem, setRedeem] = React.useState<boolean>(false);
  const [redeemId, setRedeemId] = React.useState<number | undefined>();
  const [redeemContract, setRedeemContract] = React.useState<any | undefined>();

  const lockedPositionsSource = React.useMemo(() => {
    return originators
      .map<LockedPositionsTableEntity>(originator => {
        const contract = contracts.get(originator.address);

        return {
          ...originator,
          contract,
          redeem: (bondId: number) => {
            setRedeem(true);
            setRedeemId(bondId);
            setRedeemContract(contract);
          },
        };
      })
      .filter(originator => originator.contract?.balance?.isGreaterThan(ZERO_BIG_NUMBER))
  }, [originators, contracts, loading]);

  const activePositionsSource = React.useMemo(() => {
    return originators
      .map<ActivePositionsTableEntity>(originator => ({
        ...originator,
        contract: contracts.get(originator.address),
        goWithdraw: () => {
          history.push(`/smart-yield/${originator.address}/withdraw`);
        },
        goSell: () => {
          history.push(`/smart-yield/${originator.address}/withdraw`);
        },
      }))
      .filter(originator => originator.contract?.balance?.isGreaterThan(ZERO_BIG_NUMBER))
  }, [originators, contracts, loading]);

  return (
    <>
      <div className="grid mb-32" style={{ gridTemplateColumns: '40% 1fr', columnGap: 32 }}>
        <PortfolioBalance />
        <PortfolioValue />
      </div>
      <Card
        noPaddingBody
        title={
          <Grid flow="col" colsTemplate="1fr max-content">
            <Text type="p1" weight="semibold" color="primary">
              Locked positions
            </Text>
            <Button type="light" onClick={() => console.log('Le open filter modal')}>
              <Icons name="filter" />
              Filter
            </Button>
          </Grid>
        }
        className="mb-32">
        <Table
          columns={LockedPositions}
          dataSource={lockedPositionsSource}
          rowKey="address"
          loading={loading}
        />
      </Card>
      <Card
        noPaddingBody
        title={
          <Grid flow="col" colsTemplate="1fr max-content">
            <Text type="p1" weight="semibold" color="primary">
              Active positions
            </Text>
            <Button type="light" onClick={() => console.log('Le open filter modal')}>
              <Icons name="filter" />
              Filter
            </Button>
          </Grid>
        }>
        <Table<ActivePositionsTableEntity>
          columns={ActivePositions}
          dataSource={activePositionsSource}
          rowKey="address"
          loading={loading}
        />
      </Card>

      {showRedeem && (
        <ConfirmRedeemModal visible  type="junior" redeemId={redeemId} contract={redeemContract} onCancel={() => setRedeem(false)} />
      )}
    </>
  );
}
