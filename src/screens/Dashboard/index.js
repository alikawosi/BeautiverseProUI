import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import DashboardIntro from './DashboardIntro';

const Stack = createNativeStackNavigator();

const Dashboard = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="DashboardIntro">
      <Stack.Screen name="DashboardIntro" component={DashboardIntro} />
    </Stack.Navigator>
  );
};

export default Dashboard;
