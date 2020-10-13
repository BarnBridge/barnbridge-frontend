import React from 'react';

export type EthGasPrice = {
  fastest: number;
  fast: number;
  average: number;
  safeLow: number;
};

export type EthGasInstance = {
  price: EthGasPrice;
  load: () => void;
};

const EthGasPriceContext = React.createContext<EthGasInstance>({} as any);

export function useEthGasPrice() {
  return React.useContext(EthGasPriceContext);
}

const EthGasPriceProvider: React.FunctionComponent = props => {
  const [values, setValues] = React.useState<EthGasPrice>({} as any);
  const load = React.useCallback(() => {
    fetch('https://ethgasstation.info/api/ethgasAPI.json')
      .then(result => result.json())
      .then(result => {
        setValues({
          fastest: Math.round(result.fastest / 10),
          fast: Math.round(result.fast / 10),
          average: Math.round(result.average / 10),
          safeLow: Math.round(result.safeLow / 10),
        });
      });
  }, []);

  const value = React.useMemo(() => ({
    price: values,
    load,
  }), [values, load]);

  return (
    <EthGasPriceContext.Provider value={value}>
      {props.children}
    </EthGasPriceContext.Provider>
  );
};

export default EthGasPriceProvider;
