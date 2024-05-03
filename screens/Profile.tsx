import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import { Theme } from '../styles/theme';
import {
  CatIcon,
  MailIcon,
  MoonIcon,
  RecipeIcon,
  StatisticIcon,
  SunIcon,
} from '../assets/Icons';
import ProfileButton from '../components/Profile/ProfileButton';
import BackgroundCircle from '../assets/Icons/backgroundCircle';
import useFetch from '../hooks/useFetch';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, User } from '../types/types';

const Profile = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const styles = getStyles(theme);

  const { data, error, loading } = useFetch<User>('/login/me');

  return (
    <View style={{ backgroundColor: theme.background, flex: 1 }}>
      <BackgroundCircle style={{ top: Dimensions.get('window').height * 0.4, left: 0 }} />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Your Profile 😊</Text>
        <View style={styles.topContainer}>
          <View style={styles.userContainer}>
            <View style={styles.userIcon}>
              <CatIcon color={theme.foreground} />
            </View>
            <View>
              {loading ? (
                <ActivityIndicator size="small" color={theme.text} />
              ) : (
                <>
                  {error ? (
                    <Text style={styles.userText}>{error.message}</Text>
                  ) : (
                    <>
                      <Text style={styles.userText}>{data?.username}</Text>
                      <Text style={styles.userText}>{data?.email}</Text>
                    </>
                  )}
                </>
              )}
            </View>
          </View>
          <Pressable style={styles.themeButton} onPress={toggleTheme}>
            {isDark ? <SunIcon /> : <MoonIcon />}
          </Pressable>
        </View>

        <View style={{ marginTop: Dimensions.get('window').height * 0.05 }}>
          <ProfileButton
            text={'My Recipes'}
            onPress={() => {
              navigation.navigate('MyRecipes');
            }}
            Icon={RecipeIcon}
          />

          <Pressable style={styles.statisticContainer} onPress={
            () => {
              if (data)
                navigation.navigate('Statistics', {
                  user: data,
                });
            }
          }>
            <View style={{ flexDirection: 'row' }}>
              <StatisticIcon style={styles.statisticIcon} color={theme.foreground} />
              <Text style={styles.statisticText}>Statistics</Text>
            </View>
            {/* <View style={styles.statisticLine} />
            <Text style={styles.statisticText}>You waste 69 hours on fucking</Text>
            <Text style={styles.statisticText}>Most looked recipe Shakshuka</Text> */}
          </Pressable>

          <ProfileButton
            text={'Contact developer'}
            onPress={() => {
              setIsOpen(true);
            }}
            Icon={MailIcon}
          />
          <Modal
            animationType='fade'
            transparent={true}
            visible={isOpen}
            onRequestClose={() => {
              setIsOpen(false);
            }}
            style={styles.modal}
          >
            <Pressable style={{ flex: 1, backgroundColor: theme.backdrop }} onPress={() => setIsOpen(false)}>
              <View style={styles.modalContent}>
                <Text style={{ fontSize: 18 }}>Contact developers</Text>
                <View style={{ gap: 3 }}>
                  {['me@alerix.dev', 'me@amy.dev', 'me@marcin.dev'].map((email) => (
                    <Text key={email} style={styles.userText}>{email}</Text>
                  ))}
                </View>
              </View>
            </Pressable>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const getStyles = (theme: Theme) =>
  StyleSheet.create({
    title: {
      fontSize: 21,
      marginBottom: Dimensions.get('window').height * 0.01,
      fontFamily: 'TurbotaBold',
    },
    container: {
      paddingVertical: Dimensions.get('window').height * 0.05,
      maxWidth: 500,
      width: '100%',
      paddingHorizontal: Dimensions.get('window').width * 0.08,
    },
    topContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10,
      marginHorizontal: 5,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userIcon: {
      borderRadius: 16,
      padding: Dimensions.get('window').width * 0.06,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      aspectRatio: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 15,
      backgroundColor: theme.userIcon,
    },
    userText: {
      fontSize: Dimensions.get('window').width * 0.04
    },
    themeButton: {
      borderRadius: 16,
      padding: Dimensions.get('window').width * 0.04,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      backgroundColor: theme.cardBackground,
    },
    statisticContainer: {
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
    statisticLine: {
      backgroundColor: theme.text,
      height: 1,
      width: '100%',
      marginVertical: 6,
    },
    statisticText: {
      fontSize: 16,
      color: theme.text,
    },
    statisticIcon: {
      marginRight: 20,
    },
    modal: {
      backgroundColor: theme.backdrop,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      top: '30%',
      backgroundColor: theme.modalBg,
      padding: 20,
      borderRadius: 10,
      margin: 20,
      gap: 10,
      elevation: 3,
    },
  });
