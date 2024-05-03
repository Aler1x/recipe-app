import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import useFetch from '../hooks/useFetch';
import { Ingredient, RecipeFull } from '../types/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Theme } from '../styles/theme';
import {
  BackIcon,
  CalorieIcon,
  LikeIcon,
  ListIcon,
  MoneyIcon,
  TimeIcon,
} from '../assets/Icons';
import BackgroundCircle from '../assets/Icons/backgroundCircle';
import { useState } from 'react';
import { getStoreData } from '../store/asyncStore';
import { GROCERY_ITEMS_KEY, GroceryItem, useGroceryContext } from '../store/groceryItemsContext';
import PRODUCT_TO_EMOJI from '../store/productToEmoji';
import { useFavesContext } from '../store/favesContext';

const Recipe = () => {
  const { theme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const { groceryItems, saveGroceryItems } = useGroceryContext();

  const styles = getStyles(theme);
  const [checkedSteps, setCheckedSteps] = useState<number[]>([]);

  // @ts-ignore - id is number this is all what you need to know
  const id = route.params?.id as number;

  const checkStep = (id: number) => {
    if (checkedSteps.includes(id)) {
      setCheckedSteps(checkedSteps.filter(stepId => stepId !== id));
      return;
    }
    setCheckedSteps([...checkedSteps, id]);
  };

  const {
    data: recipe,
    loading,
    error,
  } = useFetch<RecipeFull>(`/recipes/${id}`);

  const { faves, addFave, removeFave } = useFavesContext();

  if (loading) {
    return (
      <View style={styles.background}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.centered, styles.background]}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.background}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  if(recipe && faves) {
    if(faves.includes(recipe.id)){
      recipe.isSaved = true;
    } else {
      recipe.isSaved = false;
    }
  }

  const handleSave = () => {
    if (recipe.isSaved === false) {
      addFave(recipe.id);
      recipe.isSaved = true;
    } else {
      removeFave(recipe.id);
      recipe.isSaved = false;
    }
  }

  const saveIngredientToGroceryList = (ingredient: Ingredient) => {
    getStoreData<GroceryItem[]>(GROCERY_ITEMS_KEY).then((data) => {
      if (!data) {
        data = [];
      }

      const existing = data.find((item) => item.id === ingredient.id.toString());
      if (existing) {
        existing.quantity += ingredient.amount;
        saveGroceryItems(data);
        return;
      }

      const fileName = ingredient.product.image?.split('.')[0]
      const newData = [...data, {
          id: ingredient.id.toString(),
          title: ingredient.product.name,
          quantity: ingredient.amount,
          unit: ingredient.unit.name,
          completed: false,
          icon: PRODUCT_TO_EMOJI[fileName ?? ""] ?? '🤔',
        } satisfies GroceryItem
      ];  
      saveGroceryItems(newData);
    });
  }

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <ScrollView style={styles.background}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
            style={styles.topButtons}
            onPress={() => navigation.goBack()}
          >
            <BackIcon color={theme.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.topButtons}
            onPress={() => handleSave()}
          >
            <LikeIcon color={theme.text} filled={recipe.isSaved} />
          </TouchableOpacity>
        </View>
        <View style={styles.mainInfoContainer}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <Text style={styles.title}>{recipe.title}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoBlock}>
              <CalorieIcon color={theme.text} />
              <Text>{`${recipe.calories} kcal`}</Text>
            </View>
            <View style={styles.infoBlock}>
              <TimeIcon color={theme.text} />
              <Text>{`${recipe.time} min`}</Text>
            </View>
            <View style={styles.infoBlock}>
              <MoneyIcon color={theme.text} />
              <Text>{`$${(recipe.price / recipe.servings).toFixed(2)}`}</Text>
            </View>
          </View>
        </View>
        {recipe.categories.length > 0 && (
          <View style={styles.categoriesContainer}>
            {recipe.categories.slice(0, 5).map(category => (
              <Text
                key={category.id}
                style={styles.category}
                onForeground={true}
              >
                {category.name}
              </Text>
            ))}
          </View>
        )}
        <View style={styles.ingredientsContainer}>
          <Text style={styles.descriptionTitle}>Ingredients 🥑</Text>
          {recipe.products.map(ingredient => (
            <View key={ingredient.id} style={styles.ingredient}>
              <Text style={styles.ingredientName}>
                {ingredient.product.name}
              </Text>
              <View
                style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}
              >
                <Text>{`${Math.round(ingredient.amount * 10)/10} ${ingredient.unit.name}`}</Text>
                {
                  groceryItems.find(item => item.id === ingredient.id.toString()) ? (
                    <Text style={{ color: 'green', fontSize: 16 }}>🛒</Text>
                  ) : <TouchableOpacity
                  onPress={() => saveIngredientToGroceryList(ingredient)}
                  style={{
                    padding: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    borderRadius: 50,
                  }}
                >
                  <ListIcon color={theme.text} />
                </TouchableOpacity>
                }
              </View>
            </View>
          ))}
        </View>
        <View style={styles.stepsContainer}>
          <Text style={styles.descriptionTitle}>Steps ️📋</Text>
          {recipe.steps.map((step, index) => (
            <TouchableOpacity
              key={step.id}
              onPress={() => checkStep(step.id)}
              style={styles.step}
            >
              <View
                style={[
                  styles.stepCircle,
                  checkedSteps.includes(step.id)
                    ? { backgroundColor: theme.stepDone }
                    : { backgroundColor: theme.stepUndone },
                ]}
              >
                <Text>{index + 1}</Text>
              </View>
              <View style={styles.stepLine} />
              <Text style={{ marginLeft: 20 }}>{step.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <BackgroundCircle color={theme.bgCircle} style={styles.circle} />
    </View>
  );
};

export default Recipe;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    background: {
      flex: 1,
      overflow: 'hidden',
      paddingHorizontal: 20,
      zIndex: 1,
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
    topButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: Dimensions.get('window').width * 0.02,
      paddingHorizontal: Dimensions.get('window').width * 0.01,
    },
    topButtons: {
      width: Dimensions.get('window').width * 0.11,
      height: Dimensions.get('window').width * 0.11,
      borderRadius: 12,
      backgroundColor: theme.bgCircle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    mainInfoContainer: {
      width: '100%',
      justifyContent: 'center',
      alignContent: 'center',
    },
    image: {
      height: Dimensions.get('window').width * 0.5,
      aspectRatio: 1,
      alignSelf: 'center',
      borderRadius: 12,
    },
    title: {
      color: theme.text,
      fontSize: 24,
      textAlign: 'center',
      marginVertical: Dimensions.get('window').width * 0.02,
      fontFamily: 'TurbotaBold',
    },
    infoContainer: {
      borderColor: theme.text,
      borderWidth: 1,
      borderRadius: 16,
      paddingHorizontal: Dimensions.get('window').width * 0.02,
      paddingVertical: Dimensions.get('window').width * 0.03,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    infoBlock: {
      alignItems: 'center',
      gap: 4,
    },
    categoriesContainer: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
      paddingVertical: Dimensions.get('window').width * 0.02,
    },
    category: {
      backgroundColor: theme.foreground,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 16,
    },
    ingredientsContainer: {
      paddingVertical: Dimensions.get('window').width * 0.02,
      gap: 12,
    },
    descriptionTitle: {
      fontSize: 22,
      fontFamily: 'TurbotaBold',
    },
    ingredient: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 4,
      borderBottomColor: theme.text,
      borderBottomWidth: 1,
      paddingHorizontal: 8,
    },
    ingredientName: {
      maxWidth: '60%',
    },
    stepsContainer: {
      paddingVertical: Dimensions.get('window').width * 0.02,
      paddingHorizontal: 8,
      gap: 12,
    },
    stepCircle: {
      width: 20,
      height: 20,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      zIndex: 1,
    },
    stepLine: {
      width: 1,
      backgroundColor: theme.text,
      height: '85%',
      position: 'absolute',
      left: 10,
      bottom: 0,
    },
    step: {
      paddingVertical: 4,
    },
  });
