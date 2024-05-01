import {
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import { Theme } from '../styles/theme';
import { CollapseIcon } from '../assets/Icons';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getStoreData, storeData } from '../store/asyncStore';
import BackgroundCircle from '../assets/Icons/backgroundCircle';

type GroceryItem = {
  id: string;
  title: string;
  quantity: number;
  unit: string;
  icon: string;
  completed: boolean;
};

const GROCERY_ITEMS_KEY = 'groceryItems';

const GroceryList = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [loading, setLoading] = useState(true);
  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(true);
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);

  useEffect(() => {
    getStoreData<GroceryItem[]>(GROCERY_ITEMS_KEY).then(data => {
      if (data) {
        setGroceryItems(data);
      }
    }).finally(() => setLoading(false));
  }, []);

  const activeItems = groceryItems.filter(item => !item.completed);
  const completedItems = groceryItems.filter(item => item.completed);

  const onItemPress = (item: GroceryItem) => {
    item.completed = !item.completed;
    setGroceryItems([...groceryItems]);
    storeData(GROCERY_ITEMS_KEY, groceryItems);
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Grocery list 🥦</Text>
        {loading && <ActivityIndicator size="large" color={theme.text} />}
        <FlatList
          data={activeItems}
          ListFooterComponent={() =>
            completedItems.length > 0 ? (
              <View>
                <TouchableOpacity
                  style={styles.header}
                  onPress={() => setIsCompletedCollapsed(!isCompletedCollapsed)}
                >
                  <Text style={styles.headerText}>Completed</Text>
                  <CollapseIcon
                    open={!isCompletedCollapsed}
                    color={theme.text}
                  />
                </TouchableOpacity>
                {!isCompletedCollapsed && (
                  <FlatList                    data={completedItems}
                    renderItem={({ item }) => renderItem(item, styles, true, () => onItemPress(item))}
                    keyExtractor={item => item.id}
                  />
                )}
              </View>
            ) : null
          }
          renderItem={({ item }) => renderItem(item, styles, false, () => onItemPress(item))}
          keyExtractor={item => item.id}
        />
        {groceryItems.length === 0 && !loading && (
          <View style={styles.emptyViewContainer}>
            <Text style={{ fontSize: 20 }}>{`List is empty :(`}</Text>
            <Text style={{ textAlign: 'center', fontSize: 20 }}>
              {`To add products to your grocery list tap on cart icon on any recipe page or you can add them manually here`}
            </Text>
          </View>
        )}
      </View>
      <BackgroundCircle color={theme.bgCircle} style={styles.circle} />
    </View>
  );
};

function renderItem(item: GroceryItem, styles: any, isCompleted = false, onPress?: () => void) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={styles.itemContainer}
      >
        <View style={[
          styles.itemCard,
          isCompleted && styles.itemCardCompleted,
        ]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text
              style={[styles.itemText, isCompleted && styles.itemTextCompleted]}
            >
              {item.title}
            </Text>
          </View>
          <Text style={styles.itemText}>
            {item.quantity} {item.unit}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default GroceryList;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.background,
      flex: 1,
      alignItems: 'center',
    },
    title: {
      fontSize: 22,
      marginBottom: Dimensions.get('window').height * 0.03,
      fontFamily: 'TurbotaBold',
      paddingHorizontal: Dimensions.get('window').width * 0.08,
    },
    container: {
      paddingVertical: Dimensions.get('window').height * 0.05,
      maxWidth: 500,
      width: '100%',
    },
    itemContainer: {
      paddingHorizontal: Dimensions.get('window').width * 0.08,
    },
    itemCard: {
      width: '100%',
      elevation: 5,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 16,
      marginBottom: Dimensions.get('window').height * 0.017,
      borderRadius: 12,

      backgroundColor: theme.cardBg,
    },
    itemCardCompleted: {
      backgroundColor: theme.inactiveCardBg,
    },
    icon: {
      minWidth: 30,
    },
    itemText: {
      fontSize: 16,
    },
    itemTextCompleted: {
      textDecorationLine: 'line-through',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      paddingHorizontal: Dimensions.get('window').width * 0.085,
    },
    headerText: {
      fontSize: 18,
    },
    emptyViewContainer: {
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: -Dimensions.get('window').height * 0.075,
    },
    circle: {
      position: 'absolute',
      transform: [{ scale: 1.1 }],
      top: "14%",
      left: 0,
      zIndex: -1
    }
  });
