import ThemeProvider from './store/themeContext';
import { useFonts } from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './components/BottomTabNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import Recipe from './screens/Recipe';
import Login from './screens/Login';
import { RootStackParamList } from './types/types';
import { GroceryProvider } from './store/groceryItemsContext';
import StatusBarHandler from './components/StatusBarHandler';
import MyRecipes from './screens/MyRecipes';
import { FavesProvider } from './store/favesContext';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
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
        <StatusBarHandler />
        <FavesProvider>
          <GroceryProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Main" component={BottomTabNavigator} />
                <Stack.Screen name="Recipe" component={Recipe} />
                <Stack.Screen name="MyRecipes" component={MyRecipes} />
                <Stack.Screen name="Statistics" component={MyRecipes} />
              </Stack.Navigator>
            </SafeAreaView>
          </GroceryProvider>
        </FavesProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
