import React from 'react';

import Tooltip from 'components/antd/tooltip';
import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';

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

const PoolStakeShareBar: React.FC<PoolStakeShareBarProps> = props => {
  const { shares } = props;

  const rates = (shares ?? []).map(tokenShare => `${tokenShare.share}%`);

  return (
    <Grid flow="col" className={s.component} colsTemplate={rates.join(' ')}>
      {shares?.map((tokenShare, index) => {
        return tokenShare.share! > 0 ? (
          <Tooltip
            key={index}
            overlayInnerStyle={{ maxWidth: '520px' }}
            placement="top"
            title={
              <Grid flow="col" gap={8} align="center" padding={[10, 16]}>
                {tokenShare.icon}
                <Text type="p1" color="secondary">
                  {tokenShare.name}:
                </Text>
                <Text type="p1" weight="semibold" color="primary">
                  {tokenShare.value}
                </Text>
              </Grid>
            }>
            <div
              className={s.item}
              style={{
                backgroundColor: tokenShare.color,
              }}
            />
          </Tooltip>
        ) : undefined;
      })}
    </Grid>
  );
};

export default PoolStakeShareBar;
