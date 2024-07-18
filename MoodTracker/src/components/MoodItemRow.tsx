import {StyleSheet, Text, View, Pressable} from 'react-native';
import {MoodOptionWithTimestamp} from '../types';
import React from 'react';

import {format} from 'date-fns';

import {theme} from '../theme';

type MoodItemProps = {
  moodItem: MoodOptionWithTimestamp;
  handDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

const MoodItemRow: React.FC<MoodItemProps> = ({moodItem, handDeleteMood}) => {
  const onDelete = () => {
    console.log('Deleted Mood');
    handDeleteMood(moodItem);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{moodItem.mood.emoji}</Text>
      <Text style={styles.description}>{moodItem.mood.description}</Text>
      <View style={styles.timeStampContainer}>
        <Text style={styles.timeStampText}>
          {format(new Date(moodItem.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
        </Text>
      </View>
      <Pressable style={styles.button} onPress={onDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 20,
    alignContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: theme.colorWhite,
  },
  emoji: {
    fontSize: 30,
    fontFamily: theme.fontFamilyBold,
    textAlign: 'center',
  },
  description: {
    fontSize: 25,
    flex: 1,
    fontFamily: theme.fontFamilyBold,
    textAlign: 'left',
    color: theme.colorPurple,
  },
  timeStampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timeStampText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: theme.fontFamilyBold,
    color: theme.colorLavender,
  },
  button: {
    justifyContent: 'center',
    paddingRight: 5,
  },
  buttonText: {
    color: theme.colorBlue,
    fontFamily: theme.fontFamilyLight,
  },
});

export default MoodItemRow;
