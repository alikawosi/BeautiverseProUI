import {Image, ScrollView, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../../tailwind';
import {FAKE_CONST} from '../../../constants/FAKE_CONST';
import {GiftCard} from '../../../components/screens/Setting';
import {Footer} from '../../../components/elements';
import {EmptyScreen} from '../../../components/commons';
import {useNavigation} from '@react-navigation/native';

const GiftCards = ({giftCardsList = FAKE_CONST.GiftcardData}) => {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={tw`flex bg-white flex-1 pb-4 px-7 `}>
      {giftCardsList.length === 0 ? (
        <EmptyScreen description={'you have no Gift Cards yet...'} />
      ) : (
        <View style={tw`flex-1`}>
          <Text style={tw`bv-heading-base mb-4`}>Available Gift Cards</Text>
          <Image
            source={require('../../../assets/media/GiftCard.png')}
            style={tw`w-full h-44 rounded-10 mb-4 `}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            {giftCardsList.map(item => {
              return (
                <GiftCard
                  key={item.key}
                  name={item.name}
                  amount={item.amount}
                  style={tw`mb-4`}
                />
              );
            })}
          </ScrollView>
          <Footer
            twobutton
            firstButtonTitle="buy gift card"
            secondButtonTitle="redeem"
            onPressSecondButton={() => {
              navigate('RedeemGiftCard');
            }}
            onPressFirstButton={() => {
              navigate('BuyGiftCard');
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default GiftCards;
