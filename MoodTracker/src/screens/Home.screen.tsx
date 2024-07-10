import React from 'react';
import {StyleSheet, View} from 'react-native';

import MoodPicker from '../components/MoodPicker';

import {useAppContext} from '../App.provider';

const Home: React.FC = () => {
  const appContext = useAppContext();

  return (
    <View style={styles.container}>
      <MoodPicker handleSelectMood={appContext.updateMoodList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default Home;
