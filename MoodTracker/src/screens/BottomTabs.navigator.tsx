import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Text} from 'react-native';
import Home from './Home.screen';
import History from './History.screen';
import Analytics from './Analytics.screen';

import {HomeIcon, HistoryIcon, AnalyticsIcon} from '../components/Icons';
import {theme} from '../theme';

const BottomTabs = createBottomTabNavigator();

const BottomTabsNavigator: React.FC = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        tabBarIcon: ({color, size}) => {
          return route.name === 'Home' ? (
            <HomeIcon color={color} size={size} />
          ) : route.name === 'Analytics' ? (
            <AnalyticsIcon color={color} size={size} />
          ) : route.name === 'History' ? (
            <HistoryIcon color={color} size={size} />
          ) : null;
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{title: "Today's Mood"}}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{title: 'Past Moods'}}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{title: 'Fancy Charts'}}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabsNavigator;
