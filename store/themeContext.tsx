import React, { ReactNode, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';
import { useColorScheme } from 'react-native';
import { getStoreData, storeData } from './asyncStore';

const ThemeContext = React.createContext({
  isDark: false,
  theme: lightTheme,
  toggleTheme: () => { },
});

export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');
  const [theme, setTheme] = useState(isDark ? darkTheme : lightTheme);

  useEffect(() => {
    const get = async () => {
      return (await getStoreData('isDark')) === 'dark' ? 'dark' : 'light';
    };

    const isDark = colorScheme === 'dark' || (async () => (await get() === 'dark'));
    setTheme(isDark ? darkTheme : lightTheme);
    // @ts-ignore
    setIsDark(isDark);
  }, [colorScheme]);


  const toggleTheme = useCallback(() => {
    setIsDark((wasDark) => {
      const save = async () => {
        await storeData('theme', !wasDark ? 'dark' : 'light');
      };
      save();
      const newIsDark = !wasDark;
      setTheme(newIsDark ? darkTheme : lightTheme);
      return newIsDark;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export default ThemeProvider;
