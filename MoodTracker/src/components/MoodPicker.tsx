import React, {useState} from 'react';

import {View, FlatList, Text, StyleSheet, Pressable, Image} from 'react-native';
import {MoodOptionType} from '../types';
import {theme} from '../theme';

const imageSrc = require('../../assets/butterflies.png');

const moodOptions = [
  {emoji: '🧑‍💻', description: 'studious'},
  {emoji: '🤔', description: 'pensive'},
  {emoji: '😊', description: 'happy'},
  {emoji: '🥳', description: 'celebratory'},
  {emoji: '😤', description: 'frustrated'},
];

type MoodPickerProps = {
  handleSelectMood: (moodOption: MoodOptionType) => void;
};

const initialMood: MoodOptionType = {
  emoji: '',
  description: '',
};

const MoodPicker: React.FC<MoodPickerProps> = ({handleSelectMood}) => {
  const [pickedMood, setPickedMood] = useState<MoodOptionType>(initialMood);
  const [hasSelected, setHasSelected] = useState(false);

  if (hasSelected) {
    return (
      <View style={styles.container}>
        <Image source={imageSrc} />
        <Pressable style={styles.button} onPress={() => setHasSelected(false)}>
          <Text style={styles.buttonText}>Choose another</Text>
        </Pressable>
      </View>
    );
  }

  const onChoose = () => {
    pickedMood?.emoji ? handleSelectMood(pickedMood) : undefined;
    setPickedMood(initialMood);
    setHasSelected(true);
  };

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
      <Pressable style={styles.button} onPress={onChoose}>
        <Text style={styles.buttonText}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderColor: theme.colorPurple,
    borderRadius: 20,
    paddingVertical: 20,
    marginHorizontal: 10,
    alignItems: 'center',
    rowGap: 20,
    borderWidth: 2,
    height: 250,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colorWhite,
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
    fontWeight: 'bold',
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
