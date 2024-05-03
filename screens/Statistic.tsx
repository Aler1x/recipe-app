import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import { Theme } from '../styles/theme';
import { BackIcon, HomeIcon, StatisticIcon } from '../assets/Icons';
import ProfileButton from '../components/Profile/ProfileButton';
import BackgroundCircle from '../assets/Icons/backgroundCircle';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User } from '../types/types';
import useFetch from '../hooks/useFetch';
import ContributionGraph from '../components/ContributionGraph';
import { LineChart } from 'react-native-chart-kit';
import { useState } from 'react';

type Season = 'winter' | 'spring' | 'summer' | 'autumn';

const Statistic = () => {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const [season, setSeason] = useState<Season>(getSeason(new Date(), 'north'));
  const [userDataSeasonable, setUserDataSeasonable] = useState<Boolean>(true);
  const [recipeDataSeasonable, setRecipeDataSeasonable] = useState<Boolean>(true);

  const styles = getStyles(theme);

  // @ts-ignore - if user is not defined it will drop but it's not a problem
  const user = route.params?.user as User;

  const loading = false;

  if (!user) {
    return (
      <View
        style={[
          styles.centered,
          { flex: 1, backgroundColor: theme.background },
        ]}
      >
        <View
          style={[
            styles.topContainer,
            {
              width: Dimensions.get('window').width,
            },
          ]}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.topButton}
          >
            <BackIcon color={theme.text} />
          </Pressable>
          <Text style={styles.listName}>Statistics</Text>
          <Pressable
            onPress={() =>
              navigation.navigate('Main', {
                screen: 'Home',
              })
            }
            style={styles.topButton}
          >
            <HomeIcon color={theme.text} />
          </Pressable>
        </View>
        <View style={[styles.centered, { justifyContent: 'center' }]}>
          <Text>Error: routing error</Text>
        </View>
      </View>
    );
  }

  const userData = generateRandomUserData(4);

  const dateDiff = [formatDate(subtractMonths(3)), formatDate(Date.now())];

  const adminUserData = {
    labels: getMonthsBySeason(season),
    datasets: [
      {
        data: [7, 12, 5],
      },
    ],
  };

  const adminRecipeData = {
    labels: getMonthsBySeason(season),
    datasets: [
      {
        data: [10, 7, 12],
      },
    ],
  };

  const adminUserSeasonData = {
    labels: ['Winter', 'Spring', 'Summer', 'Autumn'],
    datasets: [
      {
        data: [28, 50, 32, 42],
      },
    ],
  };

  const adminRecipeSeasonData = {
    labels: ['Winter', 'Spring', 'Summer', 'Autumn'],
    datasets: [
      {
        data: [38, 69, 41, 31],
      },
    ],
  };

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <BackgroundCircle
        style={{ top: Dimensions.get('window').height * 0.5, left: 0 }}
      />

      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View style={styles.centered}>
          <View
            style={[
              styles.topContainer,
              {
                width: Dimensions.get('window').width,
              },
            ]}
          >
            <Pressable
              onPress={() => navigation.goBack()}
              style={styles.topButton}
            >
              <BackIcon color={theme.text} />
            </Pressable>
            <Text style={styles.listName}>Statistics</Text>
            <Pressable
              onPress={() =>
                navigation.navigate('Main', {
                  screen: 'Home',
                })
              }
              style={styles.topButton}
            >
              <HomeIcon color={theme.text} />
            </Pressable>
          </View>
        </View>

        {user.role === 'admin' && (
          <View>
            <ProfileButton
              text={'User statistic'}
              onPress={() => {
                setUserDataSeasonable(!userDataSeasonable);
              }}
              Icon={StatisticIcon}
            />
            {!loading ? (
              <LineChart
                data={userDataSeasonable ? adminUserSeasonData : adminUserData}
                width={Dimensions.get('window').width * 0.8}
                height={180}
                chartConfig={{
                  backgroundColor: theme.cardBackground,
                  backgroundGradientFrom: theme.cardBackground,
                  backgroundGradientTo: theme.cardBackground,
                  color: (opacity = 1) => {
                    return isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(24, 24, 24, ${opacity})`;
                  },
                }}
                style={styles.adminCharts}
                fromZero={true}
                bezier
                formatYLabel={
                  (value) => {
                    const num = +value;
                    return num.toFixed(0);
                  }
                }
              />) : (
              <View style={styles.chartContainer}>
                <ActivityIndicator size="large" color={theme.text} />
              </View>
            )}

            <ProfileButton
              text={'Recipe statistic'}
              onPress={() => {
                setRecipeDataSeasonable(!recipeDataSeasonable);
              }}
              Icon={StatisticIcon}
            />
            {!loading ? (
              <LineChart
                data={recipeDataSeasonable ? adminRecipeSeasonData : adminRecipeData}
                width={Dimensions.get('window').width * 0.8}
                height={180}
                chartConfig={{
                  backgroundColor: theme.cardBackground,
                  backgroundGradientFrom: theme.cardBackground,
                  backgroundGradientTo: theme.cardBackground,
                  color: (opacity = 1) => {
                    return isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(24, 24, 24, ${opacity})`;
                  },
                }}
                style={styles.adminCharts}
                fromZero={true}
                bezier
                formatYLabel={
                  (value) => {
                    const num = +value;
                    return num.toFixed(0);
                  }
                }
              />
            ) : (
              <View style={styles.chartContainer}>
                <ActivityIndicator size="large" color={theme.text} />
              </View>
            )}
          </View>
        )}

        {user.role === 'user' && (
          <View style={{ marginTop: Dimensions.get('window').height * 0.05 }}>
            <ProfileButton
              text={'Your statistics'}
              onPress={() => {
                console.log('Your statistics');
              }}
              Icon={StatisticIcon}
            />
            <View style={styles.chartContainer}>
              <ContributionGraph
                data={userData}
                startDate={dateDiff[0]}
                endDate={dateDiff[1]}
                color={theme.text}
              />
            </View>
          </View>
        )}

        {user.role !== 'admin' && user.role !== 'user' && (
          <View style={{ marginTop: Dimensions.get('window').height * 0.05 }}>
            <Text>Contact support</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Statistic;

const formatDate = (date: number | Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, '0'); // getMonth() is zero-indexed
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const subtractMonths = (numOfMonths: number, date = new Date()) => {
  date.setMonth(date.getMonth() - numOfMonths);
  return date;
};

const getSeason = (date: Date, hemisphere: 'north' | 'south'): Season => {
  const month = date.getMonth();
  const seasons = {
    north: [
      'winter',
      'winter',
      'spring',
      'spring',
      'spring',
      'summer',
      'summer',
      'summer',
      'autumn',
      'autumn',
      'autumn',
      'winter',
    ] as const,
    south: [
      'summer',
      'summer',
      'autumn',
      'autumn',
      'autumn',
      'winter',
      'winter',
      'winter',
      'spring',
      'spring',
      'spring',
      'summer',
    ] as const,
  };

  return seasons[hemisphere][month]; // month - 1 because array is zero-indexed
};

const getMonthsBySeason = (
  season: Season,
  hemisphere: 'north' | 'south' = 'north',
) => {
  const seasons = {
    north: {
      winter: [12, 1, 2], // December, January, February
      spring: [3, 4, 5], // March, April, May
      summer: [6, 7, 8], // June, July, August
      autumn: [9, 10, 11], // September, October, November
    },
    south: {
      summer: [12, 1, 2], // December, January, February
      autumn: [3, 4, 5], // March, April, May
      winter: [6, 7, 8], // June, July, August
      spring: [9, 10, 11], // September, October, November
    },
  };

  const months = seasons[hemisphere][season].map(index => {
    const date = new Date(2000, index - 1); // Year is arbitrary; using 2000 for simplicity
    return date.toLocaleString('default', { month: 'long' });
  });

  return months;
};

const generateRandomUserData = (numOfMonths: number) => {
  const data = [];
  const currentDate = new Date(); // Start from today

  for (let i = 0; i < numOfMonths; i++) {
    const monthDate = subtractMonths(i, new Date(currentDate));
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the last day of the month

    for (let day = 1; day <= daysInMonth; day++) {
      data.push({
        date: formatDate(new Date(year, month, day)),
        count: Math.floor(Math.random() * 10) // Random count for the example
      });
    }
  }

  return data.reverse(); // Reverse to start from the current month going backwards
};

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    listName: {
      color: theme.text,
      fontFamily: 'TurbotaBold',
      fontSize: 18,
      alignSelf: 'center',
    },
    topContainer: {
      flexDirection: 'row',
      paddingTop: Dimensions.get('window').width * 0.05,
      paddingHorizontal: 26,
      paddingBottom: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    topButton: {
      width: Dimensions.get('window').width * 0.12,
      aspectRatio: 1,
      borderRadius: 12,
      backgroundColor: theme.cardBackground,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centered: {
      alignItems: 'center',
      flex: 1,
    },
    chartContainer: {
      backgroundColor: theme.cardBackground,
      marginHorizontal: 5,
      marginBottom: 10,
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 25,
      flexDirection: 'column',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      zIndex: 1,
    },
    adminCharts: {
      backgroundColor: theme.cardBackground,
      marginHorizontal: 5,
      marginBottom: 10,
      borderRadius: 10,
      paddingVertical: 15,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
  });
