import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { isDevelopmentMode } from 'utils';

export function useENS(address: string) {
  const RPC_KEY = !isDevelopmentMode ? '6c58700fe84943eb83c4cd5c23dff3d8' : 'aacf4c6a162a483eab3163105bebe222';
  const RPC_HTTPS_URL = `https://mainnet.infura.io/v3/${RPC_KEY}`;
  const provider = new ethers.providers.JsonRpcProvider(RPC_HTTPS_URL);
  const [ensName, setENSName] = useState<string | null>(null);
  const [ensAvatar, setENSAvatar] = useState<string | null>(null);

  useEffect(() => {
    const resolveENS = async () => {
      if (ethers.utils.isAddress(address)) {
        let ensName = await provider.lookupAddress(address);
        let avatar = ensName ? await provider.getAvatar(ensName) : null;
        if (ensName) setENSName(ensName);
        if (avatar) setENSAvatar(avatar);
      }
    };
    resolveENS();
  }, [address]);

  return { ensAvatar, ensName };
}
