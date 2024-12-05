import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CalendarIntro from './CalendarIntro';
import BookingAvailability from './BookingAvailability';

const Stack = createNativeStackNavigator();

const Calendar = () => {
  return (
    <Stack.Navigator
      initialRouteName="CalendarIntro"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="CalendarIntro" component={CalendarIntro} />
      <Stack.Screen
        name="BookingAvailability"
        component={BookingAvailability}
      />
    </Stack.Navigator>
  );
};

export default Calendar;
