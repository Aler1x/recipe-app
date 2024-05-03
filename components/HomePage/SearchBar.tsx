import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';
import { FilterIcon, SearchIcon } from '../../assets/Icons';
import { useTheme } from '../../store/themeContext';
import Text from '../Text';
import Category from './Category';
import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { Category as CategoryType } from '../../types/types';
import { Theme } from '../../styles/theme';

type SearchBarProps = {
  style?: StyleProp<ViewStyle>;
  includeCuisines?: boolean;
  search: (text: string) => void;
};

const SearchBar = ({ style, includeCuisines = false, search }: SearchBarProps) => {
  const { theme } = useTheme();
  // const [activeCategory, setActiveCategory] = useState<number[]>([]);
  // const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // const isActive = (id: number) => {
  //   return activeCategory.includes(id);
  // };

  // const toggleFilter = () => {
  //   console.log('toggleFilter');
  //   setIsFilterOpen(prev => !prev);
  // };

  const styles = getStyles(theme, style);

  // let categories: CategoryType[] | undefined = undefined;

  // if (includeCuisines) {
  //   const {
  //     data,
  //     loading,
  //     error,
  //   } = useFetch<CategoryType[]>('/categories/important');

  //   if (loading) {
  //     return (
  //       <View style={styles.centered}>
  //         <ActivityIndicator size="large" color={theme.text} />
  //       </View>
  //     );
  //   }

  //   if (error) {
  //     console.error('Error loading categories: ', error);
  //     return (
  //       <View style={styles.centered}>
  //         <Text>Error: ${error.message}</Text>
  //       </View>
  //     );
  //   }

  //   categories = data ?? [];
  // }

  return (
    <>
      <View style={styles.bar}>
        <SearchIcon />
        <TextInput
          placeholder="Search"
          style={{
            flex: 1,
            color: '#181818',
            fontFamily: 'TurbotaBook',
            fontSize: 16,
            paddingHorizontal: 12,
          }}
          placeholderTextColor='#181818'
          onChangeText={search}
        />
        {/* {includeCuisines && (
          <Pressable onPress={() => toggleFilter()}>
            <FilterIcon />
          </Pressable>
        )} */}
      </View>
      {/* {isFilterOpen && categories && (
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
                </Pressable>
              ))}
          </ScrollView>
      {false && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.scrollContainer}
            >
              {categories
                .filter(category => category.image !== null)
                .map(category => (
                  <Category
                    key={category.id}
                    id={category.id}
                    name={category.name}
                    image={category.image}
                  />
                ))}
            </ScrollView>
          )}
      </View>
      )} */}
    </>
  );
};

export default SearchBar;

const getStyles = (theme: Theme, style: StyleProp<ViewStyle>) =>
  StyleSheet.create({
    bar: {
      position: 'relative',
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
      ...{ style },
      zIndex: 1,
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
    },
  });
