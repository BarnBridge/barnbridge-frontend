import { createContext, useState, useContext } from 'react';

export type GeneralContextType = {
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>,
};

const GeneralContext = createContext<GeneralContextType>({} as any);

const GeneralContextProvider: React.FC = props => {
  const [navOpen, setNavOpen] = useState<boolean>(false);

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
  return useContext<GeneralContextType>(GeneralContext);
}
