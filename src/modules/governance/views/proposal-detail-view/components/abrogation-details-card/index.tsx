import React from 'react';

import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import ExternalLink from 'components/custom/externalLink';
import { Text } from 'components/custom/typography';
import { useAbrogation } from '../../providers/AbrogationProvider';

import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

const AbrogationDetailsCard: React.FC = () => {
  const abrogationCtx = useAbrogation();

  return (
    <Card
      title={
        <Text type="p1" weight="semibold" color="primary">
          Details
        </Text>
      }
      noPaddingBody>
      <Grid flow="col" gap={32} justify="space-between" padding={24}>
        <Grid flow="col" gap={32}>
          <Grid flow="row" gap={4}>
            <Text type="small" weight="semibold" color="secondary">
              Created by
            </Text>
            <Grid flow="col" gap={8}>
              <Identicon
                address={abrogationCtx.abrogation?.caller}
                width={24}
                height={24}
              />
              <ExternalLink
                href={`${getEtherscanAddressUrl(
                  abrogationCtx.abrogation?.caller!,
                )}`}>
                <Text type="p1" weight="semibold" color="blue">
                  {shortenAddr(abrogationCtx.abrogation?.caller)}
                </Text>
              </ExternalLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Card.Delimiter />
      <Grid flow="row" gap={16} padding={24}>
        <Text type="small" weight="semibold" color="secondary">
          Description
        </Text>
        <Text type="p1" color="primary" wrap>
          {abrogationCtx.abrogation?.description}
        </Text>
      </Grid>
    </Card>
  );
};

export default AbrogationDetailsCard;
