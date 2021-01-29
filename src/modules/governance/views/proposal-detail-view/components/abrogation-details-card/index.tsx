import React from 'react';

import Card from 'components/antd/card';
import Grid from 'components/custom/grid';
import Identicon from 'components/custom/identicon';
import ExternalLink from 'components/custom/externalLink';
import { Paragraph, Small } from 'components/custom/typography';
import { useAbrogation } from '../../providers/AbrogationProvider';

import { getEtherscanAddressUrl, shortenAddr } from 'web3/utils';

const AbrogationDetailsCard: React.FunctionComponent = () => {
  const abrogationCtx = useAbrogation();

  return (
    <Card
      title={(
        <Paragraph type="p1" semiBold color="grey900">Details</Paragraph>
      )}
      noPaddingBody>
      <Grid flow="col" gap={32} justify="space-between" padding={24}>
        <Grid flow="col" gap={32}>
          <Grid flow="row" gap={4}>
            <Small semiBold color="grey500">Created by</Small>
            <Grid flow="col" gap={8}>
              <Identicon address={abrogationCtx.abrogation?.caller} width={24} height={24} />
              <ExternalLink href={`${getEtherscanAddressUrl(abrogationCtx.abrogation?.caller!)}`}>
                <Paragraph type="p1" semiBold color="blue500" loading={!abrogationCtx.abrogation}>
                  {shortenAddr(abrogationCtx.abrogation?.caller)}
                </Paragraph>
              </ExternalLink>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Card.Delimiter />
      <Grid flow="row" gap={16} padding={24}>
        <Small semiBold color="grey500">Description</Small>
        <Paragraph type="p1" color="grey900" loading={!abrogationCtx.abrogation} wrap>
          {abrogationCtx.abrogation?.description}
        </Paragraph>
      </Grid>
    </Card>
  );
};

export default AbrogationDetailsCard;
