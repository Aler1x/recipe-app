import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '../../store/themeContext';
import { Theme } from '../../styles/theme';
import Text from '../Text';

type ProfileButtonProps = {
  text: string;
  onPress: () => void;
  Icon: React.ElementType;
}

const ProfileButton = ({ text, onPress, Icon }: ProfileButtonProps) => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icon style={styles.icon} color={theme.foreground} />
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

export default ProfileButton

const getStyles = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.cardBackground,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    zIndex: 1,
  },
  text: {
    fontSize: 16,
    color: theme.text,
  },
  icon: {
    marginRight: 20,
  },
})
