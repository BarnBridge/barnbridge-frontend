import React from 'react';
import { TokenMeta } from 'web3/types';

import Icon from 'components/custom/icon';

export const CONTRACT_DAI_ADDR = String(process.env.REACT_APP_CONTRACT_DAI_ADDR).toLowerCase();

export const DAITokenMeta: TokenMeta = {
  icon: <Icon key="dai" name="token-dai" />,
  name: 'DAI',
  address: CONTRACT_DAI_ADDR,
  decimals: 18,
};
