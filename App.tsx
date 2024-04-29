import ThemeProvider from './store/themeContext';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/BottomTabNavigator';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './styles/theme';

export default function App() {
  const colorScheme = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    TurbotaBold: require('./assets/fonts/TurbotaBold.ttf'),
    TurbotaBoldItalic: require('./assets/fonts/TurbotaBoldItalic.ttf'),
    TurbotaBook: require('./assets/fonts/TurbotaBook.ttf'),
    TurbotaBookItalic: require('./assets/fonts/TurbotaBookItalic.ttf'),
    TurbotaHeavy: require('./assets/fonts/TurbotaHeavy.ttf'),
  });

  if (!fontsLoaded) {
    console.log('Loading fonts...');
    return null;
  }

  if (fontError) {
    console.error('Error loading fonts: ', fontError);
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        {/* Here is BUTTPLUG because 
          of unexpected reasons theme provider 
          loaded after app, and new styles not applied, 
          even if I use useLayoutEffect */}
        <StatusBar
          backgroundColor={
            colorScheme === 'dark'
              ? darkTheme.background
              : lightTheme.background
          }
        />
        <SafeAreaView style={{ flex: 1 }}>
          <BottomTabNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </ThemeProvider>
  );
}
