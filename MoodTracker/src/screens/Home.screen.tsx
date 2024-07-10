import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import MoodPicker from '../components/MoodPicker';

import {MoodOptionType, MoodOptionWithTimestamp} from '../types';
import MoodItemRow from '../components/MoodItemRow';

const Home: React.FC = () => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback(
    (selectedMood: MoodOptionType) => {
      const newMood = {mood: selectedMood, timestamp: Date.now()};
      const newMoodList = [...moodList, newMood];
      console.log(moodList);
      console.log(newMoodList);
      setMoodList(newMoodList);
    },
    [moodList],
  );
  return (
    <View style={styles.container}>
      <MoodPicker handleSelectMood={handleSelectMood} />
      <View style={styles.moodItemRowListContainer}>
        {moodList.map(item => (
          <MoodItemRow moodItem={item} key={item.timestamp} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  moodItemRowListContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
});
export default Home;
