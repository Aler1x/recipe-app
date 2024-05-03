import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RecipeCard from '../components/HomePage/RecipeCard';
import { useTheme } from '../store/themeContext';
import SearchBar from '../components/HomePage/SearchBar';
import Text from '../components/Text';
import { Category, Recipe } from '../types/types';
import BackgroundCircle from '../assets/Icons/backgroundCircle';
import usePaginated from '../hooks/usePaginated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { RefreshControl } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Theme } from '../styles/theme';
import { set } from 'react-hook-form';
import { ref } from 'yup';

const Home = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [activeCategory, setActiveCategory] = useState<string[]>([]); // store names

  const styles = getStyles(theme);

  const {
    data: recipes,
    error,
    fetchMore,
    refetch,
  } = usePaginated<Recipe[]>('/recipes', 10, activeCategory);

  useEffect(() => {
    refetch();
  }, [activeCategory]);

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

  const { data: categories } = useFetch<Category[]>('/categories/important');

  const isActive = (name: string) => {
    return activeCategory.includes(name);
  };

  const toggleCategory = useCallback((name: string) => {
    if (isActive(name)) {
      setActiveCategory(activeCategory.filter((category) => category !== name));
    } else {
      setActiveCategory([...activeCategory, name]);
    }
  }, [activeCategory]);

  return (
    <View style={styles.background}>
      <SearchBar style={{ zIndex: 2 }} includeCuisines search={() => { }} />
      {categories && (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            {categories
              .filter(category => category.image === null)
              .map(category => (
                <Pressable
                  key={category.id}
                  onPress={() => toggleCategory(category.name)}
                  style={[
                    styles.categoryName,
                    isActive(category.name) ? styles.active : {},
                  ]}
                >
                  <Text
                    style={
                      isActive(category.name)
                        ? { color: theme.fgText }
                        : { color: theme.text }
                    }
                  >
                    {category.name}
                  </Text>
                </Pressable>
              ))}
          </ScrollView>
        </View>
      )}
      <FlatList
        data={filteredRecipes.length > 0 ? filteredRecipes : recipes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => redirect(item.id)}>
            <RecipeCard recipe={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchMore}
        onEndReachedThreshold={1}
        ListHeaderComponent={
          <Text style={styles.listName}>Your results 🥗</Text>
        }
        style={styles.recipesContainer}
        ListFooterComponent={
          <>
            {recipes &&
              <ActivityIndicator size="large" color={theme.text} />
            }
          </>
        }
        refreshControl={
          <RefreshControl refreshing={!recipes} onRefresh={() => {
            refetch()
            setFilteredRecipes([])
          }} />
        }
        windowSize={15}
      />
      <BackgroundCircle color={theme.bgCircle} style={styles.circle} />
    </View>
  );
};

export default Home;

const getStyles = (theme: Theme) => StyleSheet.create({
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
    top: '35%',
    left: 0,
  },
  categoryName: {
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: theme.text,
    marginRight: 8, // for spacing between categories (gap)
  },
  active: {
    backgroundColor: theme.foreground,
  },
  scrollContainer: {
    paddingHorizontal: 12,
    paddingBottom: 16,
  },
});
