import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import BottomTabsNavigator from './screens/BottomTabs.navigator';
import {AppProvider} from './App.provider';

import {MoodOptionWithTimestamp} from './types';

const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
