import React from 'react';
import {Text, View} from 'react-native';
import {TickCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../../tailwind';
import {Button, ModalWrapper} from '../../../commons';
import {SectionWrapper} from '../../../elements';

const CheckoutSuccessfulModal = () => {
  const {navigate} = useNavigation();

  return (
    <ModalWrapper>
      <View style={tw`items-center`}>
        <View
          style={tw`w-[60px] h-[60px] rounded-full bg-white -mt-10 items-center justify-center`}>
          <TickCircle size={60} color="#00C851" variant="Bold" />
        </View>
        <Text style={tw`text-basicGreen text-2xl font-heading`}>
          Checkout Successful
        </Text>
      </View>
      <SectionWrapper style={tw`bg-background mt-4 mb-5`}>
        <Text style={tw`text-descGray text-sm text-center`}>
          {`We’ve send the booking Confirmation to your\n phone`}
        </Text>
      </SectionWrapper>
      <Button
        primary
        containerStyle={tw`pb-5`}
        onPress={() => navigate('Calendar')}
        title="Got it!"
        gradientStyle={tw`rounded-xl`}
        titleStyle={tw`text-base`}
      />
    </ModalWrapper>
  );
};

export {CheckoutSuccessfulModal};
