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

const mqlDark = window.matchMedia('(prefers-color-scheme: dark)');
const defaultTheme = mqlDark.matches ? 'dark' : 'light';

const ThemeProvider: React.FC = props => {
  const { children } = props;

  const [theme, setTheme] = useLocalStorage('bb_theme', defaultTheme);

  React.useEffect(() => {
    if (theme) {
      document.body.setAttribute('data-theme', theme);
    } else {
      document.body.removeAttribute('data-theme');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkTheme: theme === 'dark',
        toggleDarkTheme: () => {
          setTheme(theme === 'dark' ? 'light' : 'dark');
        },
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
