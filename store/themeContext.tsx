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
    getStoreData('isDark').then((value) => {
      console.log('value', value);
      const isDark = colorScheme === 'dark';
      if (value === 'dark' || isDark) {
        setIsDark(true);
        setTheme(darkTheme);
      } else {
        setIsDark(false);
        setTheme(lightTheme);
      }
    });
  }, [colorScheme]);


  const toggleTheme = useCallback(() => {
    storeData('isDark', isDark ? 'light' : 'dark').then(() => {
      getStoreData('isDark').then((value) => {
        console.log('value', value);
        console.log('isDark', isDark);
        if (value === 'dark') {
          setIsDark(true);
          setTheme(darkTheme);
        } else {
          setIsDark(false);
          setTheme(lightTheme);
        }
      });
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export default ThemeProvider;
