import React from 'react';

export type GeneralContextType = {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const GeneralContext = React.createContext<GeneralContextType>({} as any);

const GeneralContextProvider: React.FC = props => {
  const [navOpen, setNavOpen] = React.useState<boolean>(false);

  return (
    <GeneralContext.Provider
      value={{
        navOpen,
        setNavOpen,
      }}>
      {props.children}
    </GeneralContext.Provider>
  );
};

export default GeneralContextProvider;

export function useGeneral(): GeneralContextType {
  return React.useContext<GeneralContextType>(GeneralContext);
}
