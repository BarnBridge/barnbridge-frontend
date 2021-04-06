type SessionContractType = {
  symbol: string;
};

export function getSessionContractByAddress(address: string): SessionContractType | undefined {
  try {
    const contracts = window.sessionStorage.getItem('contracts');

    if (!contracts) {
      return;
    }
    const parsedContracts = JSON.parse(contracts);

    return parsedContracts?.[address];
  } catch {}
}

export function setSessionContractByAddress(address: string, data: Partial<SessionContractType>): void {
  try {
    const contracts: Record<string, SessionContractType> = JSON.parse(
      window.sessionStorage.getItem('contracts') ?? '{}',
    );

    contracts[address] = {
      ...contracts[address],
      ...data,
    };

    window.sessionStorage.setItem('contracts', JSON.stringify(contracts));
  } catch {}
}
