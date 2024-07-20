import React from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {useAppContext} from '../App.provider';
import {MoodOptionWithTimestamp} from '../types';
import groupBy from 'lodash/groupBy';
import {PieChart} from 'react-native-chart-kit';
import {theme} from '../theme';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = 220;
const CHARTCONFIG = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const Analytics: React.FC = () => {
  const appContext = useAppContext();

  if (!appContext.moodList.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Mood To Visualize</Text>
      </View>
    );
  }
  const groupByEmoji = (mood: MoodOptionWithTimestamp) => {
    console.log(`${mood.mood.description} ${mood.mood.emoji}`);
    return `${mood.mood.description}${mood.mood.emoji}`;
  };

  function generateRandomColor(): string {
    // Generating a random number between 0 and 0xFFFFFF
    const randomColor = Math.floor(Math.random() * 0xffffff);
    // Converting the number to a hexadecimal string and padding with zeros
    return `#${randomColor.toString(16).padStart(6, '0')}`;
  }

  const groupedMood = groupBy(appContext.moodList, groupByEmoji);

  // Function to transform the raw data into the required format
  const data = Object.entries(groupedMood).map(([name, entries]) => {
    return {
      name: name,
      count: entries.length,
      color: generateRandomColor(),
      legendFontSize: 15,
    };
  });

  return (
    <View style={styles.container}>
      <PieChart
        data={data}
        width={WIDTH}
        height={HEIGHT}
        chartConfig={CHARTCONFIG}
        accessor={'count'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        center={[0, 0]}
        absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: theme.fontFamilyBold,
    fontSize: 25,
    color: theme.colorLavender,
    textAlign: 'center',
  },
});

export default Analytics;
