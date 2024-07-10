import React, {useState} from 'react';

import {MoodOptionWithTimestamp, MoodOptionType} from './types';

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  updateMoodList: (moodItem: MoodOptionType) => void;
};

const defaultValue = {
  moodList: [],
  updateMoodList: () => {},
};

const AppContext = React.createContext<AppContextType>(defaultValue);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const updateMoodList = (pickedMood: MoodOptionType) => {
    const newMood = {mood: pickedMood, timestamp: Date.now()};
    const newMoodList = [...moodList, newMood];
    setMoodList(newMoodList);
  };

  return (
    <AppContext.Provider value={{moodList, updateMoodList}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
