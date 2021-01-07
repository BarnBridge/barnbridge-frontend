import React from 'react';
import cx from 'classnames';

import { Paragraph, Small } from 'components/custom/typography';
import Card from 'components/antd/card';

import { ProposalData } from 'web3/contracts/daoGovernance';
import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

import s from './styles.module.scss';
import { useWeb3Contracts } from 'web3/contracts';
import { useAsyncEffect } from 'hooks/useAsyncEffect';
import Button from 'components/antd/button';
import ExternalLink from 'components/custom/externalLink';
import { Tooltip } from 'antd';

export type ProposalDetailsCardProps = {
  proposal: ProposalData;
};

const ProposalDetailsCard: React.FunctionComponent<ProposalDetailsCardProps> = props => {
  const web3c = useWeb3Contracts();
  const { proposal } = props;

  const [threshold, setThreshold] = React.useState<boolean>(true);

  useAsyncEffect(async () => {
    const [votingPower] = await web3c.daoBarn.actions.votingPower(proposal.proposer);
    const bondStaked = web3c.daoBarn.bondStaked;

    setThreshold(bondStaked?.div(100).isLessThan(votingPower) ?? true);
  }, [proposal.proposer, web3c.daoBarn.bondStaked]);

  return (
    <Card title="Details" className={s.component}>
      <div className={cx(s.row, s.inline)}>
        <div>
          <Small semiBold className={s.rowLabel}>Created by</Small>
          <Paragraph type="p1" semiBold>{shortenAddr(proposal.proposer)}</Paragraph>
        </div>
        <div>
          <Small semiBold className={s.rowLabel}>Creator threshold</Small>
          {threshold ? (
            <Paragraph type="p1" semiBold>Above 1%</Paragraph>
          ) : (
            <Paragraph type="p1" semiBold>Below 1%</Paragraph>
          )}
          {!threshold && (
            <Button type="default">Cancel proposal</Button>
          )}
        </div>
      </div>

      <div className={s.row}>
        <Small semiBold className={s.rowLabel}>Description</Small>
        <Paragraph type="p1">
          {proposal.description}
        </Paragraph>
      </div>

      <div className={s.row}>
        <Small semiBold className={s.rowLabel}>Actions</Small>
        {proposal.targets.map((target: string, index: number) => {
          return (
            <Paragraph type="p1" key={target}>
              <Tooltip title={shortenAddr(target)}>
                <ExternalLink href={`${getEtherscanAddressUrl(target)}#writeContract`}>Contract</ExternalLink>
              </Tooltip>.{/(\w+)\((.*)\)/gm.exec(proposal.signatures[index])?.[1]}({proposal.values[index]})
            </Paragraph>
          );
        })}
      </div>
    </Card>
  );
};

export default ProposalDetailsCard;
