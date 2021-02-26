import React from 'react';
import * as Antd from 'antd';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { mergeState } from 'hooks/useMergeState';
import SeniorBondContract from 'modules/smart-yield/contracts/seniorBondContract';
import SmartYieldContract, { SYSeniorBondToken } from 'modules/smart-yield/contracts/smartYieldContract';
import PoolsProvider, { PoolsSYPool, usePools } from 'modules/smart-yield/views/overview-view/pools-provider';
import ConfirmRedeemModal, {
  ConfirmRedeemModalArgs,
} from 'modules/smart-yield/views/portfolio-view/confirm-redeem-modal';
import ConfirmTransferModal, {
  ConfirmTransferModalArgs,
} from 'modules/smart-yield/views/portfolio-view/confirm-transfer-modal';
import { useWallet } from 'wallets/wallet';

import { doSequential, getFormattedDuration } from 'utils';

import s from './s.module.scss';

type ListEntity = {
  pool: PoolsSYPool;
  sBond: SYSeniorBondToken;
};

type State = {
  loading: boolean;
  data: ListEntity[];
};

const InitialState: State = {
  loading: false,
  data: [],
};

const ActivePositionsListInner: React.FC = () => {
  const wallet = useWallet();
  const pools = usePools();

  const [state, setState] = React.useState<State>(InitialState);
  const [redeemModal, setRedeemModal] = React.useState<ListEntity | undefined>();
  const [transferModal, setTransferModal] = React.useState<ListEntity | undefined>();

  React.useEffect(() => {
    setState(
      mergeState<State>({
        loading: true,
      }),
    );

    (async () => {
      const result = await doSequential<PoolsSYPool>(pools.pools, async pool => {
        return new Promise<any>(async resolve => {
          const seniorBondContract = new SeniorBondContract(pool.seniorBondAddress, '');
          seniorBondContract.setProvider(wallet.provider);
          seniorBondContract.setAccount(wallet.account);

          const sBondIds = await seniorBondContract.getSeniorTokens();

          if (sBondIds.length === 0) {
            return resolve(undefined);
          }

          const smartYieldContract = new SmartYieldContract(pool.smartYieldAddress, '');
          smartYieldContract.setProvider(wallet.provider);

          const sBonds = await smartYieldContract.getSeniorBonds(sBondIds);

          if (sBonds.length === 0) {
            return resolve(undefined);
          }

          resolve(
            sBonds.map(sBond => ({
              pool,
              sBond,
            })),
          );
        });
      });

      setState(
        mergeState<State>({
          loading: false,
          data: result.flat().filter(Boolean),
        }),
      );
    })();
  }, [wallet.account, pools]);

  function handleRedeemConfirm(args: ConfirmRedeemModalArgs): Promise<void> {
    if (!redeemModal || !wallet.account) {
      return Promise.reject();
    }

    const { pool, sBond } = redeemModal;

    const smartYieldContract = new SmartYieldContract(pool.smartYieldAddress, '');
    smartYieldContract.setProvider(wallet.provider);
    smartYieldContract.setAccount(wallet.account);

    return smartYieldContract.redeemBondSend(sBond.sBondId, args.gasFee);
  }

  function handleRedeemCancel() {
    setRedeemModal(undefined);
  }

  function handleTransferConfirm(args: ConfirmTransferModalArgs): Promise<void> {
    if (!transferModal || !wallet.account) {
      return Promise.reject();
    }

    const { pool, sBond } = transferModal;

    const seniorBondContract = new SeniorBondContract(pool.seniorBondAddress, '');
    seniorBondContract.setProvider(wallet.provider);
    seniorBondContract.setAccount(wallet.account);

    return seniorBondContract.transferFromSend(wallet.account, args.address, sBond.sBondId, args.gasFee);
  }

  function handleTransferCancel() {
    setTransferModal(undefined);
  }

  return (
    <div className={s.cards}>
      {state.loading && <Antd.Spin />}
      {state.data.map(entity => (
        <Card key={entity.sBond.sBondId} noPaddingBody>
          <div className="flex p-24">
            <IconBubble name={entity.pool.meta?.icon!} bubbleName={entity.pool.market?.icon!} className="mr-16" />
            <div>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                {entity.pool.meta?.name}
              </Text>
              <Text type="small" weight="semibold">
                {entity.pool.market?.name}
              </Text>
            </div>
          </div>
          <Divider />
          <div className="p-24">
            <Text type="small" weight="semibold" color="secondary">
              Deposited
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatBigValue(getHumanValue(entity.sBond.principal, entity.pool.underlyingDecimals))}
            </Text>
          </div>
          <Divider />
          <div className="p-24">
            <Text type="small" weight="semibold" color="secondary">
              Redeemable
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatBigValue(
                getHumanValue(entity.sBond.principal.plus(entity.sBond.gain), entity.pool.underlyingDecimals),
              )}
            </Text>
          </div>
          <Divider />
          <div className="p-24">
            <Text type="small" weight="semibold" color="secondary">
              Time left until maturity
            </Text>
            <UseLeftTime end={entity.sBond.maturesAt} delay={1_000}>
              {leftTime => (
                <Text type="p1" weight="semibold" color="primary">
                  {leftTime > 0 ? getFormattedDuration(0, entity.sBond.maturesAt) : 'Redeem now'}
                </Text>
              )}
            </UseLeftTime>
          </div>
          <Divider />
          <div className="p-24">
            <Text type="small" weight="semibold" color="secondary">
              APY
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatBigValue(
                entity.sBond.gain
                  .dividedBy(entity.sBond.principal)
                  .dividedBy(entity.sBond.maturesAt - entity.sBond.issuedAt)
                  .multipliedBy(365 * 24 * 60 * 60)
                  .multipliedBy(100),
              )}{' '}
              %
            </Text>
          </div>
          <Divider />
          <div className="grid flow-col gap-24 p-24" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <Button
              type="primary"
              disabled={entity.sBond.maturesAt > Date.now()}
              onClick={() => setRedeemModal(entity)}>
              Redeem
            </Button>
            <Button type="ghost" disabled={entity.sBond.liquidated} onClick={() => setTransferModal(entity)}>
              Transfer
            </Button>
          </div>
        </Card>
      ))}

      {redeemModal && <ConfirmRedeemModal visible onConfirm={handleRedeemConfirm} onCancel={handleRedeemCancel} />}
      {transferModal && (
        <ConfirmTransferModal visible onConfirm={handleTransferConfirm} onCancel={handleTransferCancel} />
      )}
    </div>
  );
};

const ActivePositionsList: React.FC = () => {
  return (
    <PoolsProvider>
      <ActivePositionsListInner />
    </PoolsProvider>
  );
};

export default ActivePositionsList;
