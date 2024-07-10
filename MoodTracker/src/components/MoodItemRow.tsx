import {StyleSheet, Text, View} from 'react-native';
import {MoodOptionType, MoodOptionWithTimestamp} from '../types';
import React from 'react';

import {format} from 'date-fns';

import {theme} from '../theme';

type MoodItemProps = {
  moodItem: MoodOptionWithTimestamp;
};

const MoodItemRow: React.FC<MoodItemProps> = ({moodItem}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{moodItem.mood.emoji}</Text>
      <Text style={styles.description}>{moodItem.mood.description}</Text>
      <View style={styles.timeStampContainer}>
        <Text style={styles.timeStampText}>
          {format(new Date(moodItem.timestamp), "dd MMM, yyyy 'at' h:mmaaa")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    columnGap: 20,
    // alignContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: theme.colorWhite,
  },
  emoji: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: theme.colorPurple,
  },
  timeStampContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  timeStampText: {
    fontSize: 15,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    color: theme.colorLavender,
  },
});

export default MoodItemRow;
