import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from '../../../../tailwind';
import {Input} from '../../../components/commons';
import {SettingCard} from '../../../components/screens/Setting';
import {Footer} from '../../../components/elements';

const RedeemGiftCard = () => {
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <SafeAreaView style={tw`flex bg-white flex-1 pb-4 px-7 `}>
        <Text style={tw`bv-heading-base mb-4 capitalize mb-6`}>
          redeem gift card
        </Text>
        <Image
          source={require('../../../assets/media/RedeemGiftCard.png')}
          style={tw`w-full h-44 rounded-10 mb-6`}
        />
        <Text style={tw`bv-heading-base mb-4 capitalize mb-6`}>redeem PIN</Text>
        <Input label="Pin Code" style={tw`mb-72`} />
        <SettingCard title="FAQ" style={tw`border-b-0`} />
        <Footer firstButtonTitle="redeem gift card" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default RedeemGiftCard;
