import React from 'react';
import { ColumnsType } from 'antd/lib/table/interface';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Table from 'components/antd/table';
import Grid from 'components/custom/grid';
import Icons from 'components/custom/icon';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useReload } from 'hooks/useReload';
import { SYOriginator, useSYPools } from 'modules/smart-yield/providers/sy-pools-provider';
import { SYJuniorBondToken } from 'modules/smart-yield/providers/sy-pools-provider/sy/contract';
import ConfirmRedeemModal, {
  ConfirmRedeemModalArgs,
} from 'modules/smart-yield/views/portfolio-view/confirm-redeem-modal';

import { doSequential, getFormattedDuration } from 'utils';

type LockedToken = {
  originator: SYOriginator;
  token: SYJuniorBondToken;
};

type LockedTokenWithActions = LockedToken & {
  redeem: () => void;
};

const Columns: ColumnsType<LockedTokenWithActions> = [
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
    width: 'min-content',
    render: (_, entity) => (
      <Button type="ghost" disabled={entity.token.maturesAt * 1_000 > Date.now()} onClick={() => entity.redeem()}>
        Redeem
      </Button>
    ),
  },
];

const LockedTokensTable: React.FC = () => {
  const syPools = useSYPools();
  const { originators, contracts } = syPools.state;

  const [tokens, setTokens] = React.useState<LockedTokenWithActions[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [redeemModal, setRedeemModal] = React.useState<LockedToken | undefined>();
  const [reload, version] = useReload();

  React.useEffect(() => {
    setLoading(true);

    (async () => {
      const result = await doSequential<SYOriginator>(originators, async originator => {
        return new Promise<any>(async resolve => {
          await originator.contract.commonPromise;

          const juniorBondTokens = await originator.contract.getJuniorBondTokens();
          const jbTokens =
            juniorBondTokens?.map<LockedTokenWithActions>(jbToken => ({
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

      setTokens(result.flat().filter(Boolean));
      setLoading(false);
    })();
  }, [originators, contracts, version]);

  function handleRedeemConfirm(args: ConfirmRedeemModalArgs): Promise<void> {
    if (!redeemModal) {
      return Promise.reject();
    }

    const { originator, token } = redeemModal;

    return originator.contract.redeemJuniorBondSend(token.tokenId, args.gasFee).then(() => {
      reload();
    });
  }

  function handleRedeemCancel() {
    setRedeemModal(undefined);
  }

  return (
    <Card
      className="mb-32"
      noPaddingBody
      title={
        <Grid flow="col" colsTemplate="1fr max-content">
          <Text type="p1" weight="semibold" color="primary">
            Locked positions
          </Text>
          <Button type="light">
            <Icons name="filter" />
            Filter
          </Button>
        </Grid>
      }>
      <Table<LockedTokenWithActions>
        columns={Columns}
        dataSource={tokens}
        rowKey={row => row.token.tokenId}
        loading={loading}
        scroll={{
          x: true,
        }}
      />

      {redeemModal && <ConfirmRedeemModal visible onConfirm={handleRedeemConfirm} onCancel={handleRedeemCancel} />}
    </Card>
  );
};

export default LockedTokensTable;
