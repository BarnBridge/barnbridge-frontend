import React from 'react';
import { shortenAddr } from 'web3/utils';

import Divider from 'components/antd/divider';
import { ExplorerAddressLink } from 'components/button';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import { Text } from 'components/custom/typography';

import { useAbrogation } from '../../providers/AbrogationProvider';

const AbrogationDetailsCard: React.FC = () => {
  const abrogationCtx = useAbrogation();

  return (
    <div className="card">
      <div className="card-header">
        <Text type="p1" weight="semibold" color="primary">
          Details
        </Text>
      </div>
      <Grid flow="col" gap={32} justify="space-between" padding={24}>
        <Grid flow="col" gap={32}>
          <Grid flow="row" gap={4}>
            <Text type="small" weight="semibold" color="secondary">
              Created by
            </Text>
            <Grid flow="col" gap={8}>
              <Identicon address={abrogationCtx.abrogation?.caller} width={24} height={24} />
              <ExplorerAddressLink address={abrogationCtx.abrogation?.caller}>
                <Text type="p1" weight="semibold" color="blue">
                  {shortenAddr(abrogationCtx.abrogation?.caller)}
                </Text>
              </ExplorerAddressLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Grid flow="row" gap={16} padding={24}>
        <Text type="small" weight="semibold" color="secondary">
          Description
        </Text>
        <Text type="p1" color="primary" wrap>
          {abrogationCtx.abrogation?.description}
        </Text>
      </Grid>
    </div>
  );
};

export default AbrogationDetailsCard;
