import { ActivityIndicator, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import RecipeCard from '../components/HomePage/RecipeCard';
import { useTheme } from '../store/themeContext';
import SearchBar from '../components/HomePage/SearchBar';
import Text from '../components/Text';
import { Recipe } from '../types/types';
import BackgroundCircle from '../assets/Icons/backgroundCircle';
import usePaginated from '../hooks/usePaginated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

const Home = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const styles = StyleSheet.create({
    background: {
      backgroundColor: theme.background,
    },
    recipesContainer: {
      marginBottom: Dimensions.get('window').height * 0.08,
      zIndex: 1,
    },
    listName: {
      color: theme.text,
      width: Dimensions.get('window').width * 0.8,
      alignSelf: 'center',
      fontFamily: 'TurbotaBold',
      fontSize: 18,
      paddingBottom: 16,
    },
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      paddingBottom: Dimensions.get('window').height * 0.1, // for better spinner visibility (nav bar hides it otherwise)
    },
    circle: {
      position: 'absolute',
      top: "25%",
      left: 0,
    }
  });

  const { data: recipes, error, fetchMore } = usePaginated<Recipe[]>('/recipes', 10);

  if (error) {
    return (
      <View style={styles.centered}>
        {/* What evil make that string[] not work here */}
        <Text>{`Error: ${error.message}`}</Text>
      </View>
    );
  }

  if (recipes) {
    recipes.forEach(recipe => {
      recipe.calories = Math.floor(Math.random() * 1000);
    });
  }

  const redirect = (id: number) => {
    navigation.navigate('Recipe', { id });
  }

  return (
    <View style={styles.background}>
      <SearchBar style={{ zIndex: 2 }} />
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => redirect(item.id)}>
            <RecipeCard recipe={item} />
          </TouchableOpacity> 
        )}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchMore}
        onEndReachedThreshold={1}
        ListHeaderComponent={
          <Text style={styles.listName}>Your results 🥗</Text>
        }
        style={styles.recipesContainer}
        ListFooterComponent={
          <ActivityIndicator size="large" color={theme.text} />
        }
        windowSize={15}
      />
      <BackgroundCircle color={theme.bgCircle} style={styles.circle} />
    </View>
  );
};

export default Home;
