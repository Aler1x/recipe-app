import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../store/themeContext';

type OwnProps = {
  title: string;
  onPress: () => void;
  buttonStyle?: ViewStyle; 
  textStyle?: TextStyle; 
};

const PrimaryButton: React.FC<OwnProps> = ({ title, onPress, buttonStyle, textStyle }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.foreground, 
      paddingHorizontal: 28,
      paddingVertical: 12,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontFamily: 'TurbotaBold',
      color: theme.fgText,
      fontSize: 16,
      // fontWeight: 'bold', // when using custom font this will break the font
    },
  });

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
