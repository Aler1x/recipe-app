import {
  ActivityIndicator,
  Dimensions,
  FlatList,
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
import usePaginated from '../hooks/usePaginated';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { RefreshControl } from 'react-native-gesture-handler';
import { useFavesContext } from '../store/favesContext';
import { useEffect } from 'react';

const Home = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const styles = StyleSheet.create({
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
  });

  const {
    data: recipes,
    error,
    fetchMore,
    refetch,
  } = usePaginated<Recipe[]>('/recipes', 10);

  const { faves } = useFavesContext();

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

  useEffect(() => {
    if (recipes && faves) {
      recipes.forEach(recipe => {
        if (faves.includes(recipe.id)) {
          recipe.isSaved = true;
        } else {
          recipe.isSaved = false;
        }
      });
    }
  }, [faves, recipes]);

  return (
    <View style={styles.background}>
      <SearchBar style={{ zIndex: 2 }} includeCuisines search={() => { }} />
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
          <RefreshControl refreshing={!recipes} onRefresh={refetch} />
        }
        windowSize={15}
      />
      <BackgroundCircle color={theme.bgCircle} style={styles.circle} />
    </View>
  );
};

export default Home;
