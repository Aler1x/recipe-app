import React from 'react';
import { StyleSheet, ViewStyle, TextStyle, Pressable } from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from './Text';

type OwnProps = {
  children: string;
  onPress: () => void;
  buttonStyle?: ViewStyle; 
  textStyle?: TextStyle; 
};

const PrimaryButton: React.FC<OwnProps> = ({ children, onPress, buttonStyle, textStyle }) => {
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
    <Pressable style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={textStyle} onForeground>{children}</Text>
    </Pressable>
  );
};

export default PrimaryButton;
