import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Theme } from '../styles/theme';
import { useTheme } from '../store/themeContext';

type OwnProps = {
  children: React.ReactNode;
  onClose?: () => void;
  timeout?: number;
};

const MessageAlert = ({ children, onClose, timeout }: OwnProps) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (timeout && onClose) {
      timer = setTimeout(() => {
        onClose();
      }, timeout);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timeout, onClose]);

  return (
    <TouchableOpacity style={styles.container} onPress={onClose}>
      <View style={styles.messageBox}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.05,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  messageBox: {
    backgroundColor: theme.background,
    borderRadius: 8,
    padding: 10,
    maxWidth: '80%',
  },
});

export default MessageAlert;
