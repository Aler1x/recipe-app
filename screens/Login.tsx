import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { APP_URL } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
    const { theme } = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const discovery = {
        authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
        tokenEndpoint: 'https://oauth2.googleapis.com/token',
        revocationEndpoint: `https://oauth2.googleapis.com/revoke`,
    };

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: 'YOUR_GOOGLE_CLIENT_ID',
            scopes: ['profile', 'email'],
            redirectUri: makeRedirectUri({
                // Use this if you need to use a dedicated deep link
                native: 'your.app://redirect',
            }),
            responseType: 'token',
        },
        discovery
    );

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { access_token } = response.params;

            // Here you would send the access_token to your backend for verification and to manage the user session
            fetch(`${APP_URL}/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: access_token,
                }),
            })
            .then(async response => {
                const data = await response.json();
                console.log(data); // Handle the response from your backend
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [response]);

    const handleLogin = () => {
        // promptAsync();
        navigation.navigate('Main');
    };

    const styles = StyleSheet.create({
        background: {
            backgroundColor: theme.background,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
    });

    return (
        <View style={styles.background}>
            <Text>Login with Google</Text>
            <Button onPress={handleLogin} title="Login" disabled={!request}/>
        </View>
    );
};

export default Login;
