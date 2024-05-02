import { Dimensions, StyleSheet, View } from 'react-native';
import { useTheme } from '../store/themeContext';
import Text from '../components/Text';
import { LineChart } from 'react-native-chart-kit';
import { Theme } from '../styles/theme';
import { ScrollView } from 'react-native-gesture-handler';

const Profile = () => {
  const { theme } = useTheme();

  const styles = getStyles(theme);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [75.69, 25.69, 69.69, 7.69, 51.69, 43.69],
        color: (opacity = 1) => `rgba(5, 5, 5, ${opacity})`, // optional
        strokeWidth: 5 // optional
      }
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(5, 5, 5, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Your Profile 😊</Text>
      </View>
      <View style={styles.background}>
        <LineChart
          data={data}
          width={Dimensions.get("window").width}
          height={220}
          chartConfig={chartConfig}
          bezier
        />
      </View>
    </ScrollView>
  )
}

export default Profile;

const getStyles = (theme: Theme) => StyleSheet.create({
  background: {
    backgroundColor: theme.background,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  }
});
