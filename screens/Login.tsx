import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import PrimaryButton from '../components/PrimaryButton';
import { getStoreData, storeData } from '../store/asyncStore';
import { API_URL } from '../constants';

const Login = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleIsLogin = () => {
    setIsSignIn(prev => !prev);
  };

  useEffect(() => {
    getStoreData('jwtToken').then(token => {
      if (token) {
        fetch(API_URL + '/recipes?size=1',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }).then(response => {
            if (response.ok) {
              navigation.navigate('Main');
            }
          });
      }
    });
  }, []);

  const styles = StyleSheet.create({
    background: {
      backgroundColor: theme.background,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'TurbotaBold',
      fontSize: 20,
      position: 'absolute',
      top: 40,
      left: 20,
    },
    inputField: {
      backgroundColor: theme.background,
      width: Dimensions.get('window').width * 0.8,
      height: Dimensions.get('window').height * 0.07,
      marginBottom: 20,
      borderRadius: 16,
      alignSelf: 'center',
      padding: 10,
      color: theme.text,
      borderColor: theme.text,
      borderWidth: 1,
    },
    buttonStyle: {
      width: Dimensions.get('window').width * 0.8,
      alignSelf: 'center',
    },
    signInShitTapper: {
      marginTop: 20,
      alignItems: 'center',
    },
  });

  const handleLogin = async () => {
    try {
      const response = await fetch(API_URL + '/login/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();
      if (response.status === 200) {
        storeData('jwtToken', data.token).then(() => {
          navigation.navigate('Main');
        });
      } else {
        console.error(data.message); // Handling error message from server
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch(API_URL + '/login/sign-up', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (response.status === 200) {
        storeData('jwtToken', data.token).then(async () => {
          console.log(await getStoreData('jwtToken'));
          navigation.navigate('Main');
        });
      } else {
        console.error(data.message); // Handling error message from server
      }
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  return (
    <View style={styles.background}>
      <Text style={styles.title}>Hi 👋‍️‍</Text>
      <View>
        {isSignIn && (
          <TextInput
            placeholder="Username"
            style={[styles.inputField]}
            onChangeText={setUsername}
            placeholderTextColor={theme.text}
          />
        )}
        <TextInput
          placeholder="Email"
          style={styles.inputField}
          autoComplete="email"
          onChangeText={setEmail}
          placeholderTextColor={theme.text}
        />
        <TextInput
          placeholder="Password"
          style={styles.inputField}
          onChangeText={setPassword}
          placeholderTextColor={theme.text}
        />
        <PrimaryButton
          buttonStyle={styles.buttonStyle}
          onPress={isSignIn ? handleSignUp : handleLogin}
        >
          {isSignIn ? 'Create account' : 'Login'}
        </PrimaryButton>
        <TouchableOpacity
          style={styles.signInShitTapper}
          onPress={handleIsLogin}
        >
          <Text style={{ color: theme.text }}>
            {isSignIn ? 'Login' : 'Create account'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
