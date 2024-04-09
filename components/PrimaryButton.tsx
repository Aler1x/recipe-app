import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from './Text';

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
    }
  });

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={textStyle} onForeground>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
