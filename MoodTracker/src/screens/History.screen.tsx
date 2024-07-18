import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useAppContext} from '../App.provider';

import MoodItemRow from '../components/MoodItemRow';

const History: React.FC = () => {
  const appContext = useAppContext();

  return (
    <ScrollView style={styles.container}>
      {appContext.moodList.map(item => (
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
});

export default History;
