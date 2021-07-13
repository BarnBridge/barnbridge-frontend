import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types/dist';

import { BaseWalletConfig } from 'wallets/types';

const GnosisAppsSDK = new SafeAppsSDK({
  // whitelistedDomains: [/gnosis-safe\\.io/],
});

class GnosisSafeConnector extends AbstractConnector {
  private _provider?: SafeAppProvider;
  private _chainId?: number;
  private _account?: string;

  activate(): Promise<ConnectorUpdate> {
    return GnosisAppsSDK.getSafeInfo().then(safe => {
      this._provider = new SafeAppProvider(safe, GnosisAppsSDK);
      this._chainId = this._provider?.chainId;
      this._account = safe.safeAddress;

      return {
        provider: this._provider,
        chainId: this._chainId,
        account: this._account,
      };
    });
  }

  deactivate(): void {
    this._provider?.disconnect();
    this._provider = undefined;
    this._chainId = undefined;
    this._account = undefined;
  }

  getProvider(): Promise<any> {
    return this._provider ? Promise.resolve(this._provider) : Promise.reject();
  }

  getChainId(): Promise<number> {
    return this._chainId ? Promise.resolve(this._chainId) : Promise.reject();
  }

  getAccount(): Promise<string | null> {
    return this._account ? Promise.resolve(this._account) : Promise.reject();
  }
}

const GnosisSafeConfig: BaseWalletConfig = {
  id: 'gnosis-safe',
  logo: ['', ''],
  name: 'Gnosis Safe',
  factory(): AbstractConnector {
    return new GnosisSafeConnector();
  },
};

export default GnosisSafeConfig;
