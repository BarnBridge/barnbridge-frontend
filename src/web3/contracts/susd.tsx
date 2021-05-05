import React from 'react';
import { TokenMeta } from 'web3/types';

import Icon from 'components/custom/icon';

export const CONTRACT_SUSD_ADDR = String(process.env.REACT_APP_CONTRACT_SUSD_ADDR).toLowerCase();

export const SUSDTokenMeta: TokenMeta = {
  icon: <Icon key="susd" name="token-susd" />,
  name: 'sUSD',
  address: CONTRACT_SUSD_ADDR,
  decimals: 18,
};
