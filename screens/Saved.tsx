import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import RecipeCard from '../components/HomePage/RecipeCard';
import { useTheme } from '../store/themeContext';
import SearchBar from '../components/HomePage/SearchBar';
import Text from '../components/Text';

const Saved = () => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    background:{
      backgroundColor: theme.background,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
    }
  });

  return (
    <View style={styles.background}>
      <Text>Saved</Text>
    </View>
  )
}

export default Saved;
