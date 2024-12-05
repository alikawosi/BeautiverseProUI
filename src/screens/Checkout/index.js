import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useMutation} from 'react-query';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

import PaymentMethod from './PaymentMethod';
import CardsOnFile from './CardsOnFile';
import ManualCreditCardEntry from './ManualCreditCardEntry';
import Cash from './Cash';
import {
  CheckoutAppointmentModal,
  CheckoutSuccessfulModal,
} from '../../components/screens/Checkout/modals';
import {
  ServiceOrItemModal,
  DiscountModal,
  CustomItemModal,
} from '../../components/modals';

const Checkout = () => {
  const {navigate} = useNavigation();
  const {bookId} = useRoute().params;
  const discountMutation = useMutation(
    ({discount}) =>
      axios.post('/pro/checkout/discount', {
        book_id: bookId,
        value: discount.value,
      }),
    {
      onSuccess: () => navigate('CheckoutAppointmentModal'),
    },
  );
  const customItemModalMutation = useMutation(
    ({name, price}) =>
      axios.post('pro/checkout/custom_item', {
        name,
        price,
        book_id: bookId,
      }),
    {
      onSuccess: () => navigate('CheckoutAppointmentModal'),
    },
  );

  return (
    <Stack.Navigator
      initialRouteName="CheckoutAppointmentModal"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
      <Stack.Screen name="CardsOnFile" component={CardsOnFile} />
      <Stack.Screen
        name="ManualCreditCardEntry"
        component={ManualCreditCardEntry}
      />
      <Stack.Screen name="Cash" component={Cash} />
      <Stack.Group
        screenOptions={{presentation: 'transparentModal', headerShown: false}}>
        <Stack.Screen
          name="CheckoutAppointmentModal"
          component={CheckoutAppointmentModal}
          initialParams={{bookId}}
        />
        <Stack.Screen
          name="ServiceOrItemModal"
          component={ServiceOrItemModal}
        />
        <Stack.Screen
          name="DiscountModal"
          component={DiscountModal}
          initialParams={{
            onSubmit: discountMutation.mutate,
          }}
        />
        <Stack.Screen
          name="CustomItemModal"
          component={CustomItemModal}
          initialParams={{
            onSubmit: customItemModalMutation.mutate,
          }}
        />
        <Stack.Screen
          name="CheckoutSuccessfulModal"
          component={CheckoutSuccessfulModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Checkout;
