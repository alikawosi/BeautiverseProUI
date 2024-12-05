import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {AddCircle} from 'iconsax-react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../../../tailwind';
import {Button, FullScreenModalWrapper} from '../../../commons';
import {SectionWrapper, ServicesAndItems} from '../../../elements';

const CheckoutAppointmentModal = ({route}) => {
  const {navigate} = useNavigation();
  const {bookId} = route.params;
  const {data, isLoading} = useQuery({
    queryKey: ['checkoutAppointment'],
    queryFn: () =>
      axios.get('/pro/checkout', {
        params: {
          book_id: bookId,
        },
      }),
  });

  const navigateToPaymentMethod = () =>
    navigate('PaymentMethod', {bookId: bookId});
  const navigateToServiceOrItemModal = () => navigate('ServiceOrItemModal');

  return (
    <FullScreenModalWrapper
      title="Checkout Appointment"
      backButton
      contentContainerStyle={tw`flex-grow`}
      hasSeparator={false}>
      {isLoading ? (
        <View style={tw`items-center justify-center flex-1`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <SectionWrapper>
            <ServicesAndItems {...data} />
            <Button
              title="Add service or item"
              titleStyle={tw`text-descGray font-sans`}
              onPress={navigateToServiceOrItemModal}
              icon={<AddCircle size={16} color="#7A7A8A" />}
              style={tw`mt-5 bg-[#54556914] rounded-lg`}
            />
          </SectionWrapper>
          <View style={tw`mx-5 mb-5`}>
            <Button
              primary
              onPress={navigateToPaymentMethod}
              title={`Charge $${data?.charge}`}
              titleStyle={tw`text-sm`}
              gradientStyle={tw`rounded-lg`}
            />
            <Text style={tw`text-center text-xs text-descGray mt-2`}>
              {
                ' Finalize the price for each of your services and add any\n additional products or discounts'
              }
            </Text>
          </View>
        </>
      )}
    </FullScreenModalWrapper>
  );
};

export {CheckoutAppointmentModal};
