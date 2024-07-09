import React, {useState} from 'react';

import {View, FlatList, Text, StyleSheet, Pressable} from 'react-native';
import {MoodOptionType} from '../types';
import {theme} from '../theme';

const moodOptions = [
  {emoji: '🧑‍💻', description: 'studious'},
  {emoji: '🤔', description: 'pensive'},
  {emoji: '😊', description: 'happy'},
  {emoji: '🥳', description: 'celebratory'},
  {emoji: '😤', description: 'frustrated'},
];

const MoodPicker: React.FC = () => {
  const [pickedMood, setPickedMood] = useState<MoodOptionType>({
    emoji: '',
    description: '',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you right now?</Text>
      <FlatList
        horizontal={true}
        data={moodOptions}
        renderItem={({item}) => (
          <View style={styles.moodContainer}>
            <Pressable
              style={[
                styles.mood,
                pickedMood?.emoji === item.emoji
                  ? styles.pickedMood
                  : undefined,
              ]}
              onPress={() => {
                setPickedMood(item);
              }}>
              <Text style={styles.emoji}>{item.emoji}</Text>
            </Pressable>
            <Text style={styles.pickedMoodText}>
              {pickedMood?.emoji === item.emoji ? pickedMood.description : ''}
            </Text>
          </View>
        )}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colorPurple,
    borderRadius: 20,
    paddingVertical: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    rowGap: 20,
    borderWidth: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colorPurple,
  },
  moodContainer: {
    paddingHorizontal: 15,
    alignItems: 'center',
    paddingVertical: 10,
  },
  mood: {
    borderRadius: 30,
    width: 40,
    height: 40,
  },
  pickedMood: {
    backgroundColor: theme.colorPurple,
    borderColor: theme.colorWhite,
  },
  pickedMoodText: {
    color: theme.colorPurple,
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: theme.colorPurple,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 30,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 15,
    color: theme.colorWhite,
  },
});

export default MoodPicker;
