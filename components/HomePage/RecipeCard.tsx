import { Recipe } from '../../types/types';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Pressable
} from 'react-native';
import Text from '../Text';
import { CalorieIcon, TimeIcon, HearthIcon, MoneyIcon } from '../../assets/Icons';
import { useTheme } from '../../store/themeContext';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../styles/theme';
import { useFavesContext } from '../../store/favesContext';

type RecipeCardProps = {
  recipe: Recipe;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { theme } = useTheme();
  const { addFave, removeFave, faves } = useFavesContext();
  const [isSaved, setIsSaved] = useState(recipe.isSaved ?? faves.includes(recipe.id));
  const { width } = Dimensions.get('window');

  useEffect(() => {
    setIsSaved(faves.includes(recipe.id));
  }, [faves]);

  const toggleSaved = () => {
    setIsSaved(prev => !prev);
    if (recipe.isSaved === false) {
      addFave(recipe.id);
      recipe.isSaved = true;
    } else {
      removeFave(recipe.id);
      recipe.isSaved = false;
    }
  };

  const styles = getStyles(theme, width);

  if (!recipe.calories) { recipe.calories = 0; }

  if(!recipe.image) { recipe.image = 'https://i.imgur.com/Wf18se2.png'; }

  if (recipe.price === 0) {
    recipe.price = 0.01;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: recipe.image }}
        style={styles.background}
        onError={(e) => console.log(e.nativeEvent.error)} // add default icon
        imageStyle={{ resizeMode: 'cover' }}
      >
        {/* top section tags and like */}
        <View style={styles.topContainer}>
          <View style={styles.tagsContainer}>
            {recipe.categories.slice(0, 2).map((category, index) => (
              <Text key={index} style={styles.tag}>
                {category.name}
              </Text>
            ))}
          </View>
          <Pressable style={{ zIndex: 1 }} onPress={toggleSaved}>
            <HearthIcon color="#F3F3F3" isFilled={isSaved} size={33} />
          </Pressable>
        </View>

        {/* bottom section with fucking gradient (please fuck out) */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.45)', 'rgba(0, 0, 0, 0.69)', 'rgba(0, 0, 0, 1)']}
          style={styles.gradient}
        >
          <View style={styles.bottomContainer}>
            <Text style={styles.title}>{recipe.title}</Text>
            {/* info with icons */}
            <View style={styles.infoContainer}>
              <View style={styles.infoBlock}>
                <CalorieIcon />
                <Text style={{ color: '#F3F3F3' }}>{`${recipe.calories ?? "null"} kcal`}</Text>
              </View>
              <View style={styles.infoBlock}>
                <TimeIcon />
                <Text style={{ color: '#F3F3F3' }}>{`${recipe.time ?? "null"} min`}</Text>
              </View>
              {recipe.price && recipe.servings && (
                <View style={styles.infoBlock}>
                  <MoneyIcon />
                  <Text style={{ color: '#F3F3F3' }}>
                    {`$${(recipe.price / recipe.servings).toFixed(2)}`}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default RecipeCard;

const getStyles = (theme: Theme, width: number) => StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    width: width * 0.8,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
    elevation: 4,
    marginBottom: 16,
  },
  background: {
    width: '100%',
    aspectRatio: 1,
  },
  gradient: {
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 16,
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  tag: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#F3F3F3',
    fontSize: 12,
    letterSpacing: 3,
    padding: 4,
    borderRadius: 8,
  },
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  title: {
    color: '#F3F3F3',
    fontSize: width * 0.05,
    fontFamily: 'TurbotaBold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoBlock: {
    alignItems: 'center',
  },
});
