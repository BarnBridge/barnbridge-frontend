import React from 'react';
import { TokenMeta } from 'web3/types';

import Icon from 'components/custom/icon';

export const CONTRACT_USDC_ADDR = String(process.env.REACT_APP_CONTRACT_USDC_ADDR).toLowerCase();

export const USDCTokenMeta: TokenMeta = {
  icon: <Icon key="usdc" name="token-usdc" />,
  name: 'USDC',
  address: CONTRACT_USDC_ADDR,
  decimals: 6,
};
