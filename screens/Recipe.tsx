import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import useFetch from '../hooks/useFetch';
import { RecipeFull } from '../types/types';
import { useRoute } from '@react-navigation/native';

const Recipe = () => {
  const { theme } = useTheme();
  const route = useRoute();

  const styles = StyleSheet.create({
    background: {
      backgroundColor: theme.background,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
    }
  });

  // @ts-ignore - id is number this is all what you need to know
  const id = route.params?.id as number;

  const { data: recipe, loading, error } = useFetch<RecipeFull>(`/recipes/${id}`);

  if (loading) {
    return (
      <View style={styles.background}>
         <ActivityIndicator size="large" color={theme.text} />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.background}>
        <Text>{`Error: ${error}`}</Text>
      </View>
    )
  }

  return (
    <View style={styles.background}>
      <Text>Recipe</Text>
    </View>
  )
}

export default Recipe;
