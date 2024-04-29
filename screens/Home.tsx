import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import RecipeCard from '../components/HomePage/RecipeCard';
import { useTheme } from '../store/themeContext';
import SearchBar from '../components/HomePage/SearchBar';
import Text from '../components/Text';
import useFetchData from '../hooks/useFetchData';
import { Recipe } from '../types/types';

const Home = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    background: {
      backgroundColor: theme.background,
    },
    recipesContainer: {
      paddingVertical: 16,
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
    }
  });

  const { data: recipes, loading, error } = useFetchData<Recipe[]>('/recipes', true);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        {/* What evil make that string[] not work here */}
        <Text>{`Error: ${error.message}`}</Text>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <SearchBar />
      <ScrollView style={styles.recipesContainer}>
        <Text style={styles.listName}>Your results 🥗</Text>
        {recipes && recipes.map((recipe, index) => (
          <RecipeCard recipe={recipe} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Home;
