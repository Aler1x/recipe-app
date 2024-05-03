import { View, StyleSheet } from 'react-native';
import Text from './Text';

// Define the props type for TypeScript
type ContributionGraphProps = {
  data: { date: string; count: number }[];
  startDate: string;
  endDate: string;
  color: string;
  maxHeight?: number;
};

const ContributionGraph = ({ data, startDate, endDate, color, maxHeight }: ContributionGraphProps) => {
  const gridData = prepareGridData(data, startDate, endDate);

  const monthArray = getMonthNames(new Date(startDate), new Date(endDate));

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column', // Adjust based on your layout; you might need wrapping
      flexWrap: 'wrap',
      maxHeight: maxHeight || 110 // or any size you want
    },
    daySquare: {
      width: 15, // or any size you want
      height: 15, // or any size you want
      margin: 1.1
    },
    title: {
      textAlign: 'center',
      width: '100%',
      fontSize: 16,
    },
    monthContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    monthText: {
      fontSize: 12,
    },
  });

  return (
    <>
      <View style={styles.monthContainer}>
        {monthArray.map((month, index) => (
          <Text key={index} style={styles.monthText}>{month}</Text>
        ))}
      </View>
      <View style={styles.container}>
        {gridData.map((item, index) => (
          <View key={index} style={[styles.daySquare, {
            backgroundColor: `${color}${Math.min(99, item.count * 10 + 10).toString().padStart(2, '0')}`
          }]} />
        ))}
      </View>
    </>
  );
};

const prepareGridData = (data: { date: string; count: number }[], startDate: string, endDate: string) => {
  const gridData = [];
  let currentDate = new Date(startDate);

  while (currentDate.toISOString().slice(0, 10) <= endDate) {
    const date = currentDate.toISOString().slice(0, 10);
    const item = data.find((item) => item.date === date);
    gridData.push(item || { date, count: 0 });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return gridData;
};

const getMonthNames = (startDate: Date, endDate: Date) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  let current = new Date(startDate);
  let months = [];

  while (current <= endDate) {
    months.push(monthNames[current.getMonth()]);
    current.setMonth(current.getMonth() + 1);
  }

  // Remove duplicates
  months = [...new Set(months)];

  return months;
};

export default ContributionGraph;
