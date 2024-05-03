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
import {
  BackIcon,
  HomeIcon,
  StatisticIcon,
} from '../assets/Icons';
import ProfileButton from '../components/Profile/ProfileButton';
import BackgroundCircle from '../assets/Icons/backgroundCircle';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User } from '../types/types';
import useFetch from '../hooks/useFetch';
import { ContributionGraph } from 'react-native-chart-kit';

const Statistic = () => {
  const { theme, isDark } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const route = useRoute();

  const styles = getStyles(theme);

  // @ts-ignore - if user is not defined it will drop but it's not a problem
  const data = route.params?.user as User;

  const user: User = {
    id: 1,
    username: 'admin',
    email: 'me@admin.com',
    role: 'user'
  };

  if (!user) {
    return (
      <View style={[styles.centered, styles.background]}>
        <View style={[styles.topContainer, {
          width: Dimensions.get('window').width,
        }]}>
          <Pressable onPress={() => navigation.goBack()} style={styles.topButton}>
            <BackIcon color={theme.text} />
          </Pressable>
          <Text style={styles.listName}>{ }</Text>
          <Pressable onPress={() => navigation.navigate('Main', {
            screen: 'Home'
          })} style={styles.topButton}>
            <HomeIcon color={theme.text} />
          </Pressable>
        </View>
        <View style={[styles.centered, { justifyContent: 'center' }]}>
          <Text>Error: routing error</Text>
        </View>
      </View>
    );
  }

  // if (user.role === 'admin') {

  // } else if (user.role === 'user') {

  // } else {

  // }

  const commitsData = [
    { date: "2024-03-02", count: 1 },
    { date: "2024-03-03", count: 2 },
    { date: "2024-03-04", count: 3 },
    { date: "2024-03-05", count: 4 },
    { date: "2024-03-06", count: 5 },
    { date: "2024-03-30", count: 2 },
    { date: "2024-03-31", count: 3 },
    { date: "2024-03-01", count: 2 },
    { date: "2024-03-02", count: 4 },
    { date: "2024-03-05", count: 2 },
    { date: "2024-03-30", count: 4 }
  ];

  const chartConfig = {
    backgroundGradientFrom: theme.cardBackground,
    backgroundGradientTo: theme.cardBackground,
    color (opacity = 1) {
      if (isDark) {
        return `rgba(243, 243, 243, ${opacity})`;
      }
      return `rgba(24, 24, 24, ${opacity})`;
    }
  };

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <BackgroundCircle style={{ top: -650, right: -300 }} />
      <BackgroundCircle style={{ top: Dimensions.get('window').height * 0.3, left: 0 }} />

      <ScrollView style={{ paddingHorizontal: 15 }}>

        <View style={styles.centered}>
          <View style={[styles.topContainer, {
            width: Dimensions.get('window').width,
          }]}>
            <Pressable onPress={() => navigation.goBack()} style={styles.topButton}>
              <BackIcon color={theme.text} />
            </Pressable>
            <Text style={styles.listName}>{user.role === 'admin' ? 'App stats' : 'Your stats'}</Text>
            <Pressable onPress={() => navigation.navigate('Main', {
              screen: 'Home'
            })} style={styles.topButton}>
              <HomeIcon color={theme.text} />
            </Pressable>
          </View>
        </View>

        {user.role === 'admin' && (
          <View style={{ marginTop: Dimensions.get('window').height * 0.05 }}>
            <ProfileButton
              text={'User statistics'}
              onPress={() => {
                console.log('User statistics')
              }}
              Icon={StatisticIcon}
            />

            <ProfileButton
              text={'Recipe statistics'}
              onPress={() => {
                console.log('Recipe statistics')
              }}
              Icon={StatisticIcon}
            />
          </View>
        )}

        {user.role === 'user' && (
          <View style={{ marginTop: Dimensions.get('window').height * 0.05 }}>
            <ProfileButton
              text={'Your statistics'}
              onPress={() => {
                console.log('Your statistics')
              }}
              Icon={StatisticIcon}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
            >

              <ContributionGraph
                values={commitsData}
                endDate={new Date('2024-04-03')}
                numDays={85}
                width={Dimensions.get('window').width * 0.89}
                height={Dimensions.get('window').height * 0.35}
                chartConfig={chartConfig}
                tooltipDataAttrs={(value) => {
                  return {
                    fill: 'rgba(26, 255, 146, 0.5)',
                  }
                }}
                style={{
                  marginTop: 10,
                  borderRadius: 16,
                  padding: 0,
                  elevation: 3,
                  marginHorizontal: 5,
                  marginBottom: 10,
                }}
              />
            </ScrollView>
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

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    background: {
      backgroundColor: theme.background,
      height: '100%',
    },
    header: {
      marginVertical: Dimensions.get('window').height * 0.02,
      marginHorizontal: 5,
    },
    title: {
      fontSize: Dimensions.get('window').width * 0.06,
      fontFamily: 'TurbotaBold',
    },
    listName: {
      color: theme.text,
      fontFamily: 'TurbotaBold',
      fontSize: 18,
      alignSelf: 'center',
    },
    topContainer: {
      flexDirection: 'row',
      paddingTop: Dimensions.get('window').width * 0.02,
      paddingHorizontal: 26,
      paddingBottom: 16,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    topButton: {
      width: Dimensions.get('window').width * 0.11,
      height: Dimensions.get('window').width * 0.11,
      borderRadius: 12,
      backgroundColor: theme.bgCircle,
      justifyContent: 'center',
      alignItems: 'center',
    },
    centered: {
      alignItems: 'center',
      flex: 1,
      paddingBottom: Dimensions.get('window').height * 0.1, // for better spinner visibility (nav bar hides it otherwise)
    },
    chartContainer: {
      backgroundColor: theme.cardBackground,
      marginHorizontal: 5,
      marginBottom: 10,
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 25,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      zIndex: 1,
    },
  });
