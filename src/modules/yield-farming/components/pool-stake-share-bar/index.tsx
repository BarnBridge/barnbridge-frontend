import React from 'react';
import * as Antd from 'antd';

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

  return (
    <div className={s.component}>
      {shares?.map((tokenShare, index) => {
        return tokenShare.share! > 0 ? (
          <Antd.Tooltip
            key={index}
            placement="top"
            title={
              <Grid flow="col" gap={8} padding={[10, 16]}>
                {tokenShare.icon}
                <Paragraph type="p1" color="grey500">
                  {tokenShare.name}:
                </Paragraph>
                <Paragraph type="p1" semiBold color="grey900">
                  {tokenShare.value}
                </Paragraph>
              </Grid>
            }>
            <div
              className={s.item}
              style={{
                width: `${tokenShare.share}%`,
                backgroundColor: tokenShare.color,
              }}
            />
          </Antd.Tooltip>
        ) : undefined;
      })}
    </div>
  );
};

export default PoolStakeShareBar;
