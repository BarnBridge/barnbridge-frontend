import React from 'react';

import Tooltip from 'components/antd/tooltip';
import { Paragraph } from 'components/custom/typography';
import Grid from 'components/custom/grid';

import s from './styles.module.scss';

export type PoolTokenShare = {
  icon: React.ReactNode;
  name: string;
  color: string;
  value?: string;
  share?: number;
};

export type PoolStakeShareBarProps = {
  shares?: PoolTokenShare[];
};

const PoolStakeShareBar: React.FunctionComponent<PoolStakeShareBarProps> = props => {
  const { shares } = props;

  const rates = (shares ?? []).map(tokenShare => `${tokenShare.share}%`);

  return (
    <Grid flow="col" className={s.component} colsTemplate={rates.join(' ')}>
      {shares?.map((tokenShare, index) => (
        <Tooltip
          key={index}
          overlayInnerStyle={{ maxWidth: '520px' }}
          placement="top"
          title={
            <Grid flow="col" gap={8} align="center" padding={[10, 16]}>
              {tokenShare.icon}
              <Paragraph type="p1" color="secondary">
                {tokenShare.name}:
              </Paragraph>
              <Paragraph type="p1" semiBold color="primary">
                {tokenShare.value}
              </Paragraph>
            </Grid>
          }>
          <div
            className={s.item}
            style={{
              backgroundColor: tokenShare.color,
            }}
          />
        </Tooltip>
      ))}
    </Grid>
  );
};

export default PoolStakeShareBar;
