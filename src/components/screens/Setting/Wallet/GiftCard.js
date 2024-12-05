import {View, Text, Image} from 'react-native';
import React from 'react';

import tw from '../../../../../tailwind';
import LinearGradient from 'react-native-linear-gradient';
tw;

const GiftCard = ({name, amount, style}) => {
  return (
    <LinearGradient
      useAngle={true}
      angle={270}
      colors={['#D7D7D7', '#FFFFFF']}
      style={tw.style('w-full p-4 h-51 rounded-15 shadow-md', style)}>
      <View style={tw`flex-row justify-between items-center`}>
        <Image
          source={require('../../../../assets/media/GiftCardLogo.png')}
          style={tw`w-16 h-12`}
        />
        <Text style={tw`bv-sans-xs text-grayBorder capitalize`}>
          Gift Card Amount:
          <Text style={tw`bv-sans-base text-grayBorder capitalize`}>
            {' ' + amount}
          </Text>
        </Text>
      </View>
      <Text style={tw`bv-sans-sm tracking-[0.16rem] mt-24`}>{name}</Text>
    </LinearGradient>
  );
};

export {GiftCard};
