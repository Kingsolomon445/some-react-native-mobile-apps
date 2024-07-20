import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {useAppContext} from '../App.provider';

import MoodItemRow from '../components/MoodItemRow';
import {theme} from '../theme';

const History: React.FC = () => {
  const appContext = useAppContext();

  if (!appContext.moodList.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Mood To Display</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {appContext.moodList
        .slice()
        .reverse()
        .map(item => (
          <MoodItemRow
            moodItem={item}
            key={item.timestamp}
            handDeleteMood={appContext.deleteMood}
          />
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  title: {
    fontFamily: theme.fontFamilyBold,
    fontSize: 25,
    color: theme.colorLavender,
    textAlign: 'center',
  },
});

export default History;
