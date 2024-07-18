import React, {useEffect, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {MoodOptionWithTimestamp, MoodOptionType} from './types';

type AppData = {
  moodList: MoodOptionWithTimestamp[];
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  updateMoodList: (moodItem: MoodOptionType) => void;
  deleteMood: (moodItem: MoodOptionWithTimestamp) => void;
};

const defaultValue = {
  moodList: [],
  updateMoodList: () => {},
  deleteMood: () => {},
};

const AppContext = React.createContext<AppContextType>(defaultValue);

type AppProviderProps = {
  children: React.ReactNode;
};

const setAppData = async (appData: AppData) => {
  try {
    await AsyncStorage.setItem('mood-list', JSON.stringify(appData));
  } catch (error) {
    // Error saving data
    console.log(error);
  }
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const value = await AsyncStorage.getItem('mood-list');
    if (value !== null) {
      // We have data!!
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    // Error retrieving data
    console.log(error);
    return null;
  }
};

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const updateMoodList = async (pickedMood: MoodOptionType) => {
    const newMood = {mood: pickedMood, timestamp: Date.now()};
    const newMoodList = [...moodList, newMood];
    const newAppData = {moodList: newMoodList};
    setAppData(newAppData);
    setMoodList(newMoodList);
  };

  const deleteMood = async (mood: MoodOptionWithTimestamp) => {
    const data = await getAppData();
    if (data) {
      const currentMoodList = data.moodList;
      const newMoodList = currentMoodList.filter(moodItem => {
        return moodItem.timestamp !== mood.timestamp;
      });
      console.log('New Mood List', newMoodList);
      const newAppData = {moodList: newMoodList};
      setAppData(newAppData);
      setMoodList(newMoodList);
    }
  };

  useEffect(() => {
    const fetchAppData = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moodList);
      }
    };

    fetchAppData();
  }, []);

  return (
    <AppContext.Provider value={{moodList, updateMoodList, deleteMood}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
