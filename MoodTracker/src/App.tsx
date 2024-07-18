import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import BottomTabsNavigator from './screens/BottomTabs.navigator';
import {AppProvider} from './App.provider';

import {Platform, UIManager} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

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
