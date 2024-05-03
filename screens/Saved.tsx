import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RecipeCard from '../components/HomePage/RecipeCard';
import { useTheme } from '../store/themeContext';
import SearchBar from '../components/HomePage/SearchBar';
import Text from '../components/Text';
import { Recipe } from '../types/types';
import BackgroundCircle from '../assets/Icons/backgroundCircle';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { Theme } from '../styles/theme';
import useFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';
import { useFavesContext } from '../store/favesContext';

const Saved = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  const { data, error, refetch } = useFetch<{
    id: number;
    name: string;
    recipes: Recipe[];
  }>('/user/lists/faves');

  const { faves } = useFavesContext();

  const styles = getStyles(theme);

  if (error) {
    return (
      <View style={[styles.centered, styles.background]}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  const redirect = (id: number) => {
    navigation.navigate('Recipe', { id });
  };

  if(data && faves) {
    data.recipes.forEach(recipe => {
      if(faves.includes(recipe.id)) {
        recipe.isSaved = true;
      } else {
        recipe.isSaved = false;
      }
    });
  }

  const searchRecipes = (searchText: string) => {
    console.log('searching', searchText);
    if (!data) return;
    const filtered =
      searchText.length === 0
        ? data.recipes
        : data.recipes.filter((recipe) =>
          recipe.title.toLowerCase().includes(searchText.toLowerCase())
        );
    setFilteredRecipes(filtered);
  };

  return (
    <View style={styles.background}>
      <SearchBar style={{ zIndex: 2 }} search={searchRecipes} />
      <FlatList
        data={filteredRecipes.length > 0 ? filteredRecipes : data?.recipes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => redirect(item.id)}>
            <RecipeCard recipe={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        onEndReachedThreshold={1}
        ListHeaderComponent={
          <Text style={styles.listName}>
            Your faves ❤️
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={!data} onRefresh={refetch} />
        }
        style={styles.recipesContainer}
        windowSize={15}
      />
      <BackgroundCircle color={theme.bgCircle} style={styles.circle} />
    </View>
  );
};

export default Saved;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.background,
      height: '100%',
    },
    recipesContainer: {
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
      top: '35%',
      left: 0,
    },
  });
