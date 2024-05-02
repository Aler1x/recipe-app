import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../store/themeContext';

const StatusBarHandler = () => {
  const { theme, isDark } = useTheme();
  return (
    <StatusBar
      style={isDark ? 'light' : 'dark'}
      backgroundColor={theme.background}
    />
  )
}

export default StatusBarHandler
