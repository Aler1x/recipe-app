import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RecipeCard from '../components/HomePage/RecipeCard';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import { Recipe } from '../types/types';
import BackgroundCircle from '../assets/Icons/backgroundCircle';
import usePaginated from '../hooks/usePaginated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { RefreshControl } from 'react-native-gesture-handler';
import { AddIcon, BackIcon } from '../assets/Icons';
import { Theme } from '../styles/theme';
import { useFavesContext } from '../store/favesContext';

/**
 * TODO: for now it only for my recipes, 
 * but in future it can be a category screen
 * category with images will redirect here
 */

const MyRecipes = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const styles = geStyles(theme);

  const {
    data: recipes,
    error,
    fetchMore,
    refetch,
  } = usePaginated<Recipe[]>('/recipes/my', 10);

  const { faves } = useFavesContext();

  if (error) {
    return (
      <View style={[styles.centered, styles.background]}>
        <View style={[styles.topContainer, {
          width: Dimensions.get('window').width,
        }]}>
          <Pressable onPress={() => navigation.goBack()} style={styles.topButton}>
            <BackIcon color={theme.text} />
          </Pressable>
          <Text style={styles.listName}>Your recipes 🥗</Text>
          <Pressable onPress={() => navigation.navigate('Main', {
            screen: 'AddRecipe'
          })} style={styles.topButton}>
            <AddIcon color={theme.text} />
          </Pressable>
        </View>
        <View style={[styles.centered, {justifyContent: 'center'}]}>
          <Text>Error: {error.message}</Text>
        </View>
        <BackgroundCircle color={theme.bgCircle} style={styles.circle} />
      </View>
    );
  }

  const redirect = (id: number) => {
    navigation.navigate('Recipe', { id });
  };

  if (recipes && faves) {
    recipes.forEach(recipe => {
      if (faves.includes(recipe.id)) {
        recipe.isSaved = true;
      } else {
        recipe.isSaved = false;
      }
    });
  }

  return (
    <View style={styles.background}>
      <FlatList
        data={recipes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => redirect(item.id)}>
            <RecipeCard recipe={item} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchMore}
        onEndReachedThreshold={1}
        ListHeaderComponent={
          <View style={styles.topContainer}>
            <Pressable onPress={() => navigation.goBack()} style={styles.topButton}>
              <BackIcon color={theme.text} />
            </Pressable>
            <Text style={styles.listName}>Your recipes 🥗</Text>
            <Pressable onPress={() => navigation.navigate('Main', {
              screen: 'AddRecipe'
            })} style={styles.topButton}>
              <AddIcon color={theme.text} />
            </Pressable>
          </View>
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
          <RefreshControl refreshing={!recipes} onRefresh={refetch} />
        }
        windowSize={15}
      />
      <BackgroundCircle color={theme.bgCircle} style={styles.circle} />
    </View>
  );
};

export default MyRecipes;

const geStyles = (theme: Theme) => StyleSheet.create({
  background: {
    backgroundColor: theme.background,
    height: '100%',
  },
  recipesContainer: {
    zIndex: 1,
  },
  listName: {
    color: theme.text,
    fontFamily: 'TurbotaBold',
    fontSize: 18,
    alignSelf: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    paddingTop: Dimensions.get('window').width * 0.02,
    paddingHorizontal: 26,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topButton: {
    width: Dimensions.get('window').width * 0.11,
    height: Dimensions.get('window').width * 0.11,
    borderRadius: 12,
    backgroundColor: theme.bgCircle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    paddingBottom: Dimensions.get('window').height * 0.1, // for better spinner visibility (nav bar hides it otherwise)
  },
  circle: {
    top: '35%',
    left: 0,
  },
});
