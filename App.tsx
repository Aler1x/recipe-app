import ThemeProvider from './store/themeContext';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/BottomTabNavigator';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './styles/theme';
import { createStackNavigator } from '@react-navigation/stack';
import Recipe from './screens/Recipe';
import Login from './screens/Login';
import { RootStackParamList } from './types/types';
import { GroceryProvider } from './store/groceryItemsContext';

const Stack = createStackNavigator<RootStackParamList>();


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
        react render from children to parent
        and I cannot access to new state in ThemeProvider
        from StatusBar */}
        <StatusBar
          backgroundColor={
            colorScheme === 'dark'
              ? darkTheme.background
              : lightTheme.background
          }
        />
        <GroceryProvider>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={BottomTabNavigator} />
                <Stack.Screen name="Recipe" component={Recipe} />
            </Stack.Navigator>
          </SafeAreaView>
        </GroceryProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
