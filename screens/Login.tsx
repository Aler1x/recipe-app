import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import PrimaryButton from '../components/PrimaryButton';

WebBrowser.maybeCompleteAuthSession();

const Login = () => {
    const { theme } = useTheme();
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    const styles = StyleSheet.create({
        background: {
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
            <Text>Login</Text>
            <PrimaryButton onPress={() => navigation.navigate('Main')}>Login</PrimaryButton>
        </View>
    );
};

export default Login;
