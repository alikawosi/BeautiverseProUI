import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ClientInfo from './ClientInfo';
import ToolBox from './ToolBox';
import Transaction from './Transaction';
import ToCheckout from './ToCheckout';
import {
  ServiceOrItemModal,
  DiscountModal,
  CustomItemModal,
  ClientsModal,
  ServicesModal,
  AddClientModal,
} from '../../components/modals';
import {
  EditClientModal,
  NewAddressModal,
  NewCardModal,
} from '../../components/screens/Client/modals';

const Stack = createNativeStackNavigator();

const Client = () => {
  return (
    <Stack.Navigator
      initialRouteName="ToolBox"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="ClientInfo" component={ClientInfo} />
      <Stack.Screen name="ToolBox" component={ToolBox} />
      <Stack.Screen name="Transaction" component={Transaction} />
      <Stack.Screen name="ToCheckout" component={ToCheckout} />
      <Stack.Group screenOptions={{presentation: 'modal', headerShown: false}}>
        <Stack.Screen
          name="ServiceOrItemModal"
          component={ServiceOrItemModal}
        />
        <Stack.Screen name="AddClientModal" component={AddClientModal} />
        <Stack.Screen name="ServicesModal" component={ServicesModal} />
        <Stack.Screen name="DiscountModal" component={DiscountModal} />
        <Stack.Screen name="CustomItemModal" component={CustomItemModal} />
        <Stack.Screen name="NewAddressModal" component={NewAddressModal} />
        <Stack.Screen name="EditClientModal" component={EditClientModal} />
        <Stack.Screen name="NewCardModal" component={NewCardModal} />
        <Stack.Screen name="ClientsModal" component={ClientsModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Client;
