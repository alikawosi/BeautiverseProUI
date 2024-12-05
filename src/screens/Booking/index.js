import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  NewPersonalEventModal,
  NewAppointmentModal,
  EditAppointmentModal,
  DiscountOrItemModal,
  DateAndTimeModal,
  CustomTimeModal,
  ClassicLashesModal,
} from '../../components/screens/Booking/modals';
import {
  DiscountModal,
  CustomItemModal,
  ClientsModal,
  ServicesModal,
} from '../../components/modals';

const Stack = createNativeStackNavigator();

const Booking = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="NewAppointmentModal">
      <Stack.Group
        screenOptions={{presentation: 'transparentModal', headerShown: false}}>
        <Stack.Screen
          name="NewPersonalEventModal"
          component={NewPersonalEventModal}
        />
        <Stack.Screen
          name="NewAppointmentModal"
          component={NewAppointmentModal}
        />
        <Stack.Screen
          name="EditAppointmentModal"
          component={EditAppointmentModal}
        />
        <Stack.Screen name="ServicesModal" component={ServicesModal} />
        <Stack.Screen
          name="DiscountOrItemModal"
          component={DiscountOrItemModal}
        />
        <Stack.Screen name="DiscountModal" component={DiscountModal} />
        <Stack.Screen name="CustomItemModal" component={CustomItemModal} />
        <Stack.Screen name="DateAndTimeModal" component={DateAndTimeModal} />
        <Stack.Screen name="CustomTimeModal" component={CustomTimeModal} />
        <Stack.Screen
          name="ClassicLashesModal"
          component={ClassicLashesModal}
        />
        <Stack.Screen name="ClientsModal" component={ClientsModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Booking;
