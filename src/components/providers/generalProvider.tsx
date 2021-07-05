import { Dispatch, FC, SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use-storage';
import useWindowEventListener from '@rooks/use-window-event-listener';

import { InvariantContext } from 'utils/context';

export type GeneralContextType = {
  navOpen: boolean;
  setNavOpen: Dispatch<SetStateAction<boolean>>;
  theme: 'light' | 'dark';
  selectedTheme: 'light' | 'dark' | undefined;
  toggleTheme: () => void;
  windowState: {
    visibilityState: VisibilityState;
    isVisible: boolean;
  };
};

const Context = createContext<GeneralContextType>(InvariantContext('GeneralProvider'));

const mqlDark = window.matchMedia('(prefers-color-scheme: dark)');
const defaultTheme = mqlDark.matches ? 'dark' : 'light';

export function useGeneral(): GeneralContextType {
  return useContext<GeneralContextType>(Context);
}

const GeneralProvider: FC = props => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const [visibilityState, setVisibilityState] = useState<VisibilityState>(window.document.visibilityState);
  const [osColorScheme, setOsColorScheme] = useState<'light' | 'dark'>(defaultTheme);
  const [selectedTheme, setSelectedTheme, removeSelectedTheme] = useLocalStorage<'light' | 'dark' | undefined>(
    'bb_theme',
  );

  const theme: 'light' | 'dark' = selectedTheme || osColorScheme;

  useWindowEventListener('visibilitychange', () => {
    setVisibilityState(window.document.visibilityState);
  });

  useEffect(() => {
    setOsColorScheme(defaultTheme);

    mqlDark.addEventListener('change', e => {
      setOsColorScheme(e.matches ? 'dark' : 'light');
    });
  }, []);

  useEffect(() => {
    if (theme) {
      document.body.setAttribute('data-theme', theme);
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [theme]);

  function toggleTheme() {
    if (selectedTheme === 'light') {
      setSelectedTheme('dark');
    } else if (selectedTheme === 'dark') {
      removeSelectedTheme();
    } else {
      setSelectedTheme('light');
    }
  }

  const value: GeneralContextType = {
    navOpen,
    setNavOpen,
    theme,
    selectedTheme,
    toggleTheme,
    windowState: {
      visibilityState,
      isVisible: visibilityState === 'visible',
    },
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
};

export default GeneralProvider;
