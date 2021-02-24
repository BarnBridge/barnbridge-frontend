import React from 'react';
import { useHistory } from 'react-router';
import { ColumnsType } from 'antd/lib/table/interface';

import { formatBigValue, getHumanValue, ZERO_BIG_NUMBER } from 'web3/utils';
import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import PortfolioBalance from 'modules/smart-yield/components/portfolio-balance';
import PortfolioValue from 'modules/smart-yield/components/portfolio-value';
import { SYOriginator, useSYPools } from 'modules/smart-yield/providers/sy-pools-provider';
import { SYJuniorBondToken } from 'modules/smart-yield/providers/sy-pools-provider/sy/contract';
import ConfirmRedeemModal, { ConfirmRedeemModalArgs } from 'modules/smart-yield/components/confirm-redeem-modal';
import { doSequential, getFormattedDuration } from 'utils';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useReload } from 'hooks/useReload';
import BigNumber from 'bignumber.js';
import { useWallet } from 'wallets/wallet';

import s from './s.module.scss';

type LockedToken = {
  originator: SYOriginator;
  token: SYJuniorBondToken;
};

type LockedTokenWithActions = LockedToken & {
  redeem: () => void;
};

const LockedPositionsColumns: ColumnsType<LockedTokenWithActions> = [
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
        Redeemable balance
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        {formatBigValue(getHumanValue(entity.token.amount, entity.originator.contract.decimals), 4, '-', 4)}
      </Text>
    ),
  },
  {
    title: () => (
      <Text type="small" weight="semibold">
        Time left
      </Text>
    ),
    render: (_, entity) => (
      <Text type="p1" weight="semibold" color="primary">
        <UseLeftTime end={entity.token.maturesAt * 1_000} delay={1_000}>
          {leftTime => (
            <Text type="p1" weight="semibold" color="primary">
              {leftTime > 0 ? getFormattedDuration(0, entity.token.maturesAt * 1_000) : 'Redeem now'}
            </Text>
          )}
        </UseLeftTime>
      </Text>
    ),
  },
  {
    title: null,
    render: (_, entity) => (
      <Grid flow="col" gap={24}>
        <Button
          type="ghost"
          disabled={entity.token.maturesAt * 1_000 > Date.now()}
          onClick={() => entity.redeem()}>
          Redeem
        </Button>
      </Grid>
    ),
  },
];

type ActiveToken = {
  originator: SYOriginator;
  balance?: BigNumber;
};

type ActiveTokenWithActions = ActiveToken & {
  goWithdraw: () => void;
  goSell: () => void;
};

const ActivePositionsColumns: ColumnsType<ActiveTokenWithActions> = [
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

const PortfolioJunior: React.FC = () => {
  const history = useHistory();
  const syPools = useSYPools();
  const { originators, contracts, loading } = syPools.state;

  const wallet = useWallet();

  const [lockedTokens, setLockedTokens] = React.useState<LockedTokenWithActions[]>([]);
  const [lockedTokensLoading, setLockedTokensLoading] = React.useState<boolean>(false);
  const [reloadLockedTokens, lockedTokensVersion] = useReload();
  const [redeemModal, setRedeemModal] = React.useState<LockedToken | undefined>();

  const [activeTokens, setActiveTokens] = React.useState<ActiveTokenWithActions[]>([]);
  const [activeTokensLoading, setActiveTokensLoading] = React.useState<boolean>(false);
  const [reloadActiveTokens, activeTokensVersion] = useReload();

  React.useEffect(() => {
    setLockedTokensLoading(true);

    (async () => {
      const result = await doSequential<SYOriginator>(originators, async originator => {
        return new Promise<any>(async resolve => {
          await originator.contract.commonPromise;

          const juniorBondTokens = await originator.contract.getJuniorBondTokens();
          const jbTokens = juniorBondTokens?.map<LockedTokenWithActions>(jbToken => ({
            originator,
            token: jbToken,
            redeem: () => {
              setRedeemModal({
                originator,
                token: jbToken,
              });
            },
          })) ?? [];

          resolve(jbTokens);
        });
      });

      setLockedTokens(result.flat().filter(Boolean));
      setLockedTokensLoading(false);
    })();
  }, [originators, contracts, lockedTokensVersion]);

  React.useEffect(() => {
    setActiveTokensLoading(true);

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
              goSell: () => {
                history.push(`/smart-yield/${originator.address}/withdraw`);
              },
            });
          } else {
            resolve(undefined);
          }
        });
      });

      setActiveTokens(result.flat().filter(Boolean));
      setActiveTokensLoading(false);
    })();
  }, [wallet.account, originators, contracts, activeTokensVersion]);

  function handleRedeemConfirm(args: ConfirmRedeemModalArgs): Promise<void> {
    if (!redeemModal) {
      return Promise.reject();
    }

    const { originator, token } = redeemModal;

    return originator.contract.redeemJuniorBondSend(token.tokenId, args.gasFee)
      .then(() => {
        reloadLockedTokens();
      });
  }

  return (
    <>
      <div className={s.portfolioContainer}>
        <PortfolioBalance />
        <PortfolioValue />
      </div>
      <Card
        className="mb-32"
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
        }>
        <Table<LockedTokenWithActions>
          columns={LockedPositionsColumns}
          dataSource={lockedTokens}
          rowKey={row => row.token.tokenId}
          loading={lockedTokensLoading}
          scroll={{
            x: true,
          }}
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
        <Table<ActiveTokenWithActions>
          columns={ActivePositionsColumns}
          dataSource={activeTokens}
          rowKey={row => row.originator.address}
          loading={activeTokensLoading}
          scroll={{
            x: true,
          }}
        />
      </Card>

      {redeemModal && (
        <ConfirmRedeemModal
          visible
          onConfirm={handleRedeemConfirm}
          onCancel={() => setRedeemModal(undefined)} />
      )}
    </>
  );
};

export default PortfolioJunior;
