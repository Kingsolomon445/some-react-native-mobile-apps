import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import BottomTabsNavigator from './screens/BottomTabs.navigator';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
};

export default App;
