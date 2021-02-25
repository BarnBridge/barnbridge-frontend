import React from 'react';
import * as Antd from 'antd';
import { formatBigValue, getHumanValue } from 'web3/utils';

import Button from 'components/antd/button';
import Card from 'components/antd/card';
import Divider from 'components/antd/divider';
import IconBubble from 'components/custom/icon-bubble';
import { Text } from 'components/custom/typography';
import { UseLeftTime } from 'hooks/useLeftTime';
import { useReload } from 'hooks/useReload';
import { SYOriginator, useSYPools } from 'modules/smart-yield/providers/sy-pools-provider';
import { SYSeniorBondToken } from 'modules/smart-yield/providers/sy-pools-provider/sy/contract';
import ConfirmRedeemModal, { ConfirmRedeemModalArgs, } from 'modules/smart-yield/views/portfolio-view/confirm-redeem-modal';

import { doSequential, getFormattedDuration } from 'utils';

import s from './s.module.scss';
import ConfirmTransferModal, { ConfirmTransferModalArgs } from 'modules/smart-yield/views/portfolio-view/confirm-transfer-modal';
import { useWallet } from 'wallets/wallet';

type ActiveToken = {
  originator: SYOriginator;
  token: SYSeniorBondToken;
};

type ActiveTokenWithActions = ActiveToken & {
  redeem: () => void;
};

const ActivePositionsList: React.FC = () => {
  const wallet = useWallet();
  const syPools = useSYPools();
  const { originators, contracts } = syPools.state;

  const [tokens, setTokens] = React.useState<ActiveTokenWithActions[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [redeemModal, setRedeemModal] = React.useState<ActiveToken | undefined>();
  const [transferModal, setTransferModal] = React.useState<ActiveToken | undefined>();
  const [reload, version] = useReload();

  React.useEffect(() => {
    setLoading(true);

    (async () => {
      const result = await doSequential<SYOriginator>(originators, async originator => {
        return new Promise<any>(async resolve => {
          await originator.contract.commonPromise;

          const seniorBondTokens = await originator.contract.getSeniorBondTokens();

          const sbTokens =
            seniorBondTokens?.map<ActiveTokenWithActions>(sbToken => ({
              originator,
              token: sbToken,
              redeem: () => {
                setRedeemModal({
                  originator,
                  token: sbToken,
                });
              },
            })) ?? [];

          resolve(sbTokens);
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

    return originator.contract.redeemBondSend(token.tokenId, args.gasFee).then(() => {
      reload();
    });
  }

  function handleRedeemCancel() {
    setRedeemModal(undefined);
  }

  function handleTransferConfirm(args: ConfirmTransferModalArgs): Promise<void> {
    if (!transferModal) {
      return Promise.reject();
    }

    const { originator, token } = transferModal;

    return originator.contract.seniorBond
      ?.transferFromSend(wallet.account!, args.address, token.tokenId, args.gasFee)
      .then(() => {
        reload();
      }) ?? Promise.reject();
  }

  function handleTransferCancel() {
    setTransferModal(undefined);
  }

  return (
    <div className={s.cards}>
      {loading && <Antd.Spin />}
      {tokens.map(token => (
        <Card key={token.token.tokenId} noPaddingBody>
          <div className="flex p-24">
            <IconBubble name={token.originator.icon} bubbleName={token.originator.market.icon} className="mr-16" />
            <div>
              <Text type="p1" weight="semibold" color="primary" className="mb-4">
                {token.originator.name}
              </Text>
              <Text type="small" weight="semibold">
                {token.originator.market.name}
              </Text>
            </div>
          </div>
          <Divider />
          <div className="p-24">
            <Text type="small" weight="semibold" color="secondary">
              Deposited
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatBigValue(getHumanValue(token.token.principal, 6))}
            </Text>
          </div>
          <Divider />
          <div className="p-24">
            <Text type="small" weight="semibold" color="secondary">
              Redeemable
            </Text>
            <Text type="p1" weight="semibold" color="primary">
              {formatBigValue(getHumanValue(token.token.principal.plus(token.token.gain), 6))}
            </Text>
          </div>
          <Divider />
          <div className="p-24">
            <Text type="small" weight="semibold" color="secondary">
              Time left until maturity
            </Text>
            <UseLeftTime end={token.token.maturesAt * 1_000} delay={1_000}>
              {leftTime => (
                <Text type="p1" weight="semibold" color="primary">
                  {leftTime > 0 ? getFormattedDuration(0, token.token.maturesAt * 1_000) : 'Redeem now'}
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
                token.token.gain
                  .dividedBy(token.token.principal)
                  .dividedBy(token.token.maturesAt - token.token.issuedAt)
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
              disabled={token.token.maturesAt * 1_000 > Date.now()}
              onClick={() => setRedeemModal(token)}>
              Redeem
            </Button>
            <Button
              type="ghost"
              disabled={Boolean(token.token.liquidated)}
              onClick={() => setTransferModal(token)}>
              Transfer
            </Button>
          </div>
        </Card>
      ))}

      {redeemModal && <ConfirmRedeemModal visible onConfirm={handleRedeemConfirm} onCancel={handleRedeemCancel} />}
      {transferModal &&
      <ConfirmTransferModal visible onConfirm={handleTransferConfirm} onCancel={handleTransferCancel} />}
    </div>
  );
};

export default ActivePositionsList;
