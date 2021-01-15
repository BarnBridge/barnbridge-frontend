import React from 'react';
import { useLocalStorage } from 'react-use-storage';

export type ThemeContextType = {
  theme: string;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextType>(undefined as any);

export function useTheme(): ThemeContextType {
  return React.useContext<ThemeContextType>(ThemeContext);
}

const DEFAULT_THEME_KEY = 'default';
const DARK_THEME_KEY = 'dark';

const ThemeProvider: React.FunctionComponent = props => {
  const [theme, setTheme] = useLocalStorage('bb-theme', DEFAULT_THEME_KEY);

  const value = React.useMemo<ThemeContextType>(() => ({
    theme,
    isDarkTheme: theme === DARK_THEME_KEY,
    toggleDarkTheme: () => {
      if (theme !== DARK_THEME_KEY) {
        setTheme(DARK_THEME_KEY);
      } else {
        setTheme(DEFAULT_THEME_KEY);
      }
    },
  }), [theme, setTheme]);

  React.useEffect(() => {
    Array.from(document.body.classList.values())
      .forEach(value => {
        if (value.startsWith('theme-')) {
          document.body.classList.remove(value);
        }
      });

    if (theme) {
      document.body.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
