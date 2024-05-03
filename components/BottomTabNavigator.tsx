import { Dimensions, StyleSheet, View } from 'react-native';
import {
  AddIcon,
  HomeIcon,
  CatIcon,
  HearthIcon,
  ListIcon,
} from '../assets/Icons';
import { useTheme } from '../store/themeContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import GroceryList from '../screens/GroceryList';
import Add from '../screens/Add';
import Saved from '../screens/Saved';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    bar: {
      backgroundColor: theme.background,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      shadowColor: 'rgba(0,0,0,0.1)', // You can adjust the shadow color
      shadowOffset: { width: -10, height: -16 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 16, // For Android
      borderTopWidth: 0,
      height: Dimensions.get('window').height * 0.075,
    },
    activeIcon: {
      backgroundColor: theme.foreground,
      color: theme.background,
      borderRadius: 12,
      padding: Dimensions.get('window').width * 0.02,
    },
  });

  return (
    <Tab.Navigator
      screenOptions={
        {
          tabBarHideOnKeyboard: true,
          tabBarStyle: styles.bar,
          tabBarShowLabel: false,
          headerShown: false,
          tabBarBackground() {
            return (
              <View style={{ backgroundColor: theme.background, flex: 1 }} />
            );
          },

        }
      }
    >
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIcon : {}}>
              <HomeIcon color={focused ? theme.fgText : theme.text} />
            </View>
          ),
        }}
      />
      <Tab.Screen name="Saved" component={Saved}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIcon : {}}>
              <HearthIcon color={focused ? theme.fgText : theme.text} />
            </View>
          ),
        }}
      />
      <Tab.Screen name="AddRecipe" component={Add}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIcon : {}}>
              <AddIcon color={focused ? theme.fgText : theme.text} />
            </View>
          ),
        }}
      />
      <Tab.Screen name="GroceryList" component={GroceryList}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIcon : {}}>
              <ListIcon color={focused ? theme.fgText : theme.text} />
            </View>
          ),
        }}
      />
      <Tab.Screen name="Profile" component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.activeIcon : {}}>
              <CatIcon color={focused ? theme.fgText : theme.text} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
