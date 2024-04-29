import { ActivityIndicator, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, View } from 'react-native';
import RecipeCard from '../components/HomePage/RecipeCard';
import { useTheme } from '../store/themeContext';
import SearchBar from '../components/HomePage/SearchBar';
import Text from '../components/Text';
import { Recipe } from '../types/types';
import BackgroundCircle from '../assets/Icons/backgroundCircle';
import usePaginated from '../hooks/usePaginated';

const Home = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    background: {
      backgroundColor: theme.background,
    },
    recipesContainer: {
      marginBottom: Dimensions.get('window').height * 0.1,
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
      bottom: -Dimensions.get('window').width,
      left: Dimensions.get('window').width / 10,
    }
  });

  const { data: recipes, loading, error, fetchMore } = usePaginated<Recipe[]>('/recipes', 10);

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

  return (
    <View style={styles.background}>
      <SearchBar style={{ zIndex: 2 }} />
      <FlatList
        data={recipes}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={fetchMore}
        onEndReachedThreshold={1}
        ListHeaderComponent={
          <Text style={styles.listName}>Your results 🥗</Text>
        }
        style={styles.recipesContainer}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color={theme.text} /> : null
        }
        windowSize={10}
      />
      <BackgroundCircle color={theme.bgCircle} style={styles.circle} />
    </View>
  );
};

export default Home;
