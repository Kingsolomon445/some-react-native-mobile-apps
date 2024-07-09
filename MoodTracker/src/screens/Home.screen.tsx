import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MoodPicker from '../components/MoodPicker';

const Home: React.FC = () => {
  return (
    <View style={styles.container}>
      <MoodPicker />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 300,
  },
});
export default Home;
