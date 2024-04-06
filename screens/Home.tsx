import React from 'react'
import {  StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../store/themeContext';
import PrimaryButton from '../components/PrimaryButton';

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
      <Text style={{color: theme.text}}>Hello world!</Text>
      <Text style={{color: theme.bgCircle}}>Circle color!</Text>
      <PrimaryButton title="Toggle Theme" onPress={toggleTheme} />
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
