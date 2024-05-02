import {
  Dimensions,
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import { Theme } from '../styles/theme';
import { CollapseIcon } from '../assets/Icons';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackgroundCircle from '../assets/Icons/backgroundCircle';
import { GroceryItem, useGroceryContext } from '../store/groceryItemsContext';


const GroceryList = () => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [loading, setLoading] = useState(false);
  const [isCompletedCollapsed, setIsCompletedCollapsed] = useState(true);
  const { groceryItems, saveGroceryItems } = useGroceryContext();

  const activeItems = groceryItems.filter(item => !item.completed);
  const completedItems = groceryItems.filter(item => item.completed);

  const onItemPress = (item: GroceryItem) => {
    item.completed = !item.completed;
    saveGroceryItems([...groceryItems]);
  };

  const removeCompletedItems = () => {
    saveGroceryItems(activeItems);
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Grocery list 🥦</Text>
        {loading && <ActivityIndicator size="large" color={theme.text} />}
        <FlatList
          data={activeItems}
          contentContainerStyle={{ paddingVertical: 16 }}
          ListFooterComponent={() =>
            completedItems.length > 0 ? (
              <View>
                <Pressable
                  style={styles.header}
                  onPress={() => setIsCompletedCollapsed(!isCompletedCollapsed)}
                >
                  <Text style={styles.headerText}>Completed</Text>
                  <CollapseIcon
                    open={!isCompletedCollapsed}
                    color={theme.text}
                  />
                </Pressable>
                {!isCompletedCollapsed && (
                  <FlatList data={completedItems}
                    renderItem={({ item }) => renderItem(item, styles, true, () => onItemPress(item))}
                    keyExtractor={item => item.id}
                    ListFooterComponent={() => (
                      <Pressable onPress={removeCompletedItems}>
                        <Text style={{ color: theme.text, textAlign: 'center', textDecorationLine: 'underline', marginBottom: 28 }}>
                          Remove completed
                        </Text>
                      </Pressable>
                    )}
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
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
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
          {Math.round(item.quantity * 10) / 10} {item.unit}
        </Text>
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
      fontSize: 21,
      marginBottom: Dimensions.get('window').height * 0.01,
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
      borderRadius: 12,
      marginBottom: Dimensions.get('window').height * 0.017,
      backgroundColor: theme.cardBackground,
    },
    itemCardCompleted: {
      backgroundColor: theme.inactiveCardBg,
    },
    icon: {
      minWidth: 30,
    },
    itemText: {
      fontSize: 16,
      maxWidth: '70%',
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
