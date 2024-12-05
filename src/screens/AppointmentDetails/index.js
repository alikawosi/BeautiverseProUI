import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  AppointmentDetailsModal,
  ConfirmModal,
} from '../../components/screens/AppointmentDetails/modals';

const Stack = createNativeStackNavigator();

const AppointmentDetails = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="AppointmentDetailsModal">
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          headerShown: false,
        }}>
        <Stack.Screen
          name="AppointmentDetailsModal"
          component={AppointmentDetailsModal}
        />
        <Stack.Screen name="ConfirmModal" component={ConfirmModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppointmentDetails;
