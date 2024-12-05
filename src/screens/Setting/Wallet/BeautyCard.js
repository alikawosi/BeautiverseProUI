import {View, Text, Image, Dimensions} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Carousel from 'react-native-reanimated-carousel';

import tw from '../../../../tailwind';
import {PaymentMethodCard} from '../../../components/screens/Setting';
import {Cards} from 'iconsax-react-native';
import {Button} from '../../../components/commons';
import {SETTING_CONST} from '../../../constants';

const width = Dimensions.get('window').width;

const BeautyCard = () => {
  return (
    <SafeAreaView style={tw`flex bg-white flex-1 pb-4 px-7 `}>
      <View style={tw`w-full `}>
        <Carousel
          width={width * 0.7}
          enabled
          height={width / 2}
          loop={true}
          scrollAnimationDuration={1000}
          style={tw`w-full justify-center items-center`}
          data={SETTING_CONST.beautyCardCarouselData}
          renderItem={index => (
            <Image
              style={tw`w-full h-40 rounded-15 `}
              source={index.item.image}
            />
          )}
        />
      </View>
      <View
        style={tw`flex-row justify-between pb-4 mb-4 border-b border-black border-opacity-10`}>
        <Text style={tw`bv-heading-base text-grayBorder`}>Credit Balance</Text>
        <Text style={tw`bv-heading-base `}>$69</Text>
      </View>
      <View
        style={tw`flex-row justify-between pb-4 mb-4 border-b border-black border-opacity-10`}>
        <Text style={tw`bv-heading-base text-grayBorder`}>
          Spendable Credit:
        </Text>
        <Text style={tw`bv-heading-base `}>$54</Text>
      </View>

      <Text style={tw`bv-heading-base text-grayBorder mb-4`}>
        Payment Method
      </Text>
      <PaymentMethodCard
        preffix={<Cards size={20} color="#5948AA" />}
        value="****   ****   ****   8742 "
        style={tw`mb-12`}
      />
      <Button
        title="Buy more credits for less "
        primary
        titleStyle={tw`text-base`}
      />
    </SafeAreaView>
  );
};

export default BeautyCard;
