import ThemeProvider from './store/themeContext';
import Home from './screens/Home';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'TurbotaBold': require('./assets/fonts/TurbotaBold.ttf'),
    'TurbotaBoldItalic': require('./assets/fonts/TurbotaBoldItalic.ttf'),
    'TurbotaBook': require('./assets/fonts/TurbotaBook.ttf'),
    'TurbotaBookItalic': require('./assets/fonts/TurbotaBookItalic.ttf'),
    'TurbotaHeavy': require('./assets/fonts/TurbotaHeavy.ttf'),
  });

  if (!fontsLoaded) {
    console.log('Loading fonts...');
    return null;
  }

  console.log('Fonts loaded!');

  if (fontError) {
    console.log('Error loading fonts: ', fontError);
  }

  console.log('No font errors!');

  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
