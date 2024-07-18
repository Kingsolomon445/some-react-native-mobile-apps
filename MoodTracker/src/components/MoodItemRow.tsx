import {StyleSheet, Text, View, Pressable, LayoutAnimation} from 'react-native';
import {MoodOptionWithTimestamp} from '../types';
import React from 'react';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import {format} from 'date-fns';

import {theme} from '../theme';

const maxPan = 80;

type MoodItemProps = {
  moodItem: MoodOptionWithTimestamp;
  handDeleteMood: (mood: MoodOptionWithTimestamp) => void;
};

const MoodItemRow: React.FC<MoodItemProps> = ({moodItem, handDeleteMood}) => {
  const offset = useSharedValue(0);
  const shouldRemove = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: offset.value}],
  }));

  const onDelete = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    handDeleteMood(moodItem);
  };

  const removeWithDelay = () => {
    setTimeout(() => {
      onDelete();
    }, 250);
  };

  const pan = Gesture.Pan()
    .onUpdate(e => {
      const xVal = Math.floor(e.translationX);
      offset.value = xVal;
      // use Absolute value so the user could swipe either left or right
      if (Math.abs(xVal) <= maxPan) {
        shouldRemove.value = false;
      } else {
        shouldRemove.value = true;
      }
    })
    .onEnd(() => {
      if (shouldRemove.value) {
        // if the item should be removed, animate it off the screen first
        offset.value = withTiming(Math.sign(offset.value) * 2000);

        // then trigger the remove mood item with a small delay
        removeWithDelay();
        // runOnJS(removeWithDelay)();
      } else {
        // otherwise, animate the item back to the start
        offset.value = withTiming(0);
      }
    })
    .runOnJS(true);
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <Text style={styles.emoji}>{moodItem.mood.emoji}</Text>
          <Text style={styles.description}>{moodItem.mood.description}</Text>
          <View style={styles.timeStampContainer}>
            <Text style={styles.timeStampText}>
              {format(
                new Date(moodItem.timestamp),
                "dd MMM, yyyy 'at' h:mmaaa",
              )}
            </Text>
          </View>
          <Pressable style={styles.button} onPress={onDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </Pressable>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
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
