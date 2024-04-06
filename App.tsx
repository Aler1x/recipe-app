import ThemeProvider from './store/themeContext';
import Home from './screens/Home';
import { useFonts } from 'expo-font';
// import { useFonts } from 'expo-font';
// import { useCallback, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
// import { View } from 'react-native';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'TurbotaBold': require('./assets/fonts/TurbotaBold.ttf'),
    'TurbotaBoldItalic': require('./assets/fonts/TurbotaBoldItalic.ttf'),
    'TurbotaBook': require('./assets/fonts/TurbotaBook.ttf'),
    'TurbotaBookItalic': require('./assets/fonts/TurbotaBookItalic.ttf'),
    'TurbotaHeavy': require('./assets/fonts/TurbotaHeavy.ttf'),
  });

  
  // const onLayoutRootView = useCallback(async () => {
  //   console.log('onLayoutRootView', fontsLoaded, fontError);
  //   if (fontsLoaded || fontError) {
  //     console.log('Hiding splash screen');
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, fontError]);

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (fontError) {
    console.error('Failed to load fonts:', fontError);
    return null;
  }

  return (
    <ThemeProvider >
      <Home />
    </ThemeProvider>
  );
}
