import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FilterIcon, SearchIcon } from '../../assets/Icons';
import { useTheme } from '../../store/themeContext';
import Text from '../Text';
import { mockup_categories, mockup_name_categories } from '../../store/mockup';
import Category from './Category';
import { useState } from 'react';
import useFetchData from '../../hooks/useFetchData';
import { Category as CategoryType } from '../../types/types';

const SearchBar = () => {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState<number[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const toggleCategory = (id: number) => {
    setActiveCategory(prev => {
      if (prev.includes(id)) {
        return prev.filter(categoryId => categoryId !== id);
      }
      return [...prev, id];
    });
  };

  const isActive = (id: number) => {
    return activeCategory.includes(id);
  };

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

  const styles = StyleSheet.create({
    bar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.searchBarBg,
      borderRadius: 16,
      paddingVertical: 8,
      paddingHorizontal: 22,
      shadowColor: 'rgba(0,0,0,0.1)', // You can adjust the shadow color
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3, // For Android
      alignSelf: 'center',
      width: '90%',
      // for spacing between the search bar and the content below and status bar
      // i use marginVertical instead of paddingVertical
      // because padding will make bar bigger only
      marginVertical: 16,
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
    centered: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    }
  });

  const { data: categories, loading, error } = useFetchData<CategoryType[]>('/categories');

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  if (error) {
    console.error('Error loading categories: ', error);
    return (
      <View style={styles.centered}>
        {/* What evil make that string[] not work here */}
        <Text>{`Error: ${error.message}`}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.bar}>
        <SearchIcon />
        <TextInput
          placeholder="Search"
          style={{
            flex: 1,
            color: theme.text,
            fontFamily: 'TurbotaBook',
            fontSize: 16,
            paddingHorizontal: 12,
          }}
        />
        <TouchableOpacity onPress={() => toggleFilter()}>
          <FilterIcon />
        </TouchableOpacity>
      </View>
      {isFilterOpen && categories && (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            {categories.slice(0, 10).map(category => (
              <TouchableOpacity
                key={category.id}
                onPress={() => toggleCategory(category.id)}
                style={[
                  styles.categoryName,
                  isActive(category.id) ? styles.active : {},
                ]}
              >
                <Text
                  style={
                    isActive(category.id)
                      ? { color: theme.fgText }
                      : { color: theme.text }
                  }
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
          >
            {mockup_categories.map(category => (
              <Category
                key={category.id}
                id={category.id}
                name={category.name}
                categoryImage={category.categoryImage}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default SearchBar;
