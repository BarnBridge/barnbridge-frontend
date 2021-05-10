import { AbstractConnector } from '@web3-react/abstract-connector';
import { LedgerConnector } from '@web3-react/ledger-connector';

import config from 'config';
import LedgerLogoDark from 'resources/svg/wallets/ledger-logo-dark.svg';
import LedgerLogo from 'resources/svg/wallets/ledger-logo.svg';

import { WalletConnector } from 'wallets/types';

const LEDGER_BASE_DERIVATION_PATH = 'base_derivation_path';

export type LedgerWalletArgs = {
  baseDerivationPath?: string;
};

const LedgerWalletConfig: WalletConnector = {
  id: 'ledger',
  logo: [LedgerLogo, LedgerLogoDark],
  name: 'Ledger',
  factory(chainId: number, args?: LedgerWalletArgs): AbstractConnector {
    let baseDerivationPath: string | undefined = args?.baseDerivationPath;

    if (!baseDerivationPath) {
      baseDerivationPath = sessionStorage.getItem(LEDGER_BASE_DERIVATION_PATH) ?? undefined;
    }

    return new LedgerConnector({
      chainId,
      url: config.web3.rpc.httpsUrl,
      pollingInterval: config.web3.poolingInterval,
      baseDerivationPath,
    });
  },
  onConnect(connector: AbstractConnector, args?: LedgerWalletArgs): void {
    const { sessionStorage } = window;

    if (args?.baseDerivationPath) {
      sessionStorage.setItem(LEDGER_BASE_DERIVATION_PATH, args?.baseDerivationPath ?? '');
    }
  },
  onDisconnect(): void {
    const { sessionStorage } = window;
    sessionStorage.removeItem(LEDGER_BASE_DERIVATION_PATH);
  },
  onError(error: Error): Error | undefined {
    return error;
  },
};

export default LedgerWalletConfig;
