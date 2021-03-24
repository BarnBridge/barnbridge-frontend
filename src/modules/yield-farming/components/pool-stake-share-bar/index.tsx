import React from 'react';

import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';

import s from './s.module.scss';

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

const PoolStakeShareBar: React.FC<PoolStakeShareBarProps> = props => {
  const { shares } = props;

  const rates = (shares ?? []).map(tokenShare => `${tokenShare.share}%`);

  return (
    <Grid flow="col" className={s.component} colsTemplate={rates.join(' ')}>
      {shares?.map((tokenShare, index) => (
        <Tooltip
          key={index}
          overlayStyle={{ maxWidth: 'none' }}
          overlayInnerStyle={{ maxWidth: '520px' }}
          placement="top"
          title={
            <div className="flex col-gap-8 align-center">
              {tokenShare.icon}
              <Text type="p1" color="secondary">
                {tokenShare.name}:
              </Text>
              <Text type="p1" weight="semibold" color="primary">
                {tokenShare.value}
              </Text>
            </div>
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
