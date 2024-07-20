import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import BottomTabsNavigator from './screens/BottomTabs.navigator';
import {AppProvider} from './App.provider';

import {Platform, UIManager} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const App: React.FC = () => {
  // Hides the splash screen after js loaded to hide white screen from showing before app load
  React.useEffect(() => {
    console.log('SplashScreen:', SplashScreen);
    if (SplashScreen) {
      SplashScreen.hide();
    } else {
      console.error('SplashScreen module is not available');
    }
  }, []);
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabsNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
