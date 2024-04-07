import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../store/themeContext';

const Home = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBg }]}>
      <Text style={{color: theme.text}}>Hello world!</Text>
      <Text style={{color: theme.bgCircle}}>Circle color!</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
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
