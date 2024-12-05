import React from 'react';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import tw from '../../../../tailwind';

const Header = ({amount, description}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0.9}}
      locations={[0, 0.57, 1.24]}
      style={tw`h-[137px] mx-5 rounded-3xl items-center justify-center mb-4`}
      colors={['#AFA2EF', '#6F58E2', '#C34EFE']}>
      <Text style={tw`text-2xl text-white`}>${amount}</Text>
      <Text style={tw`text-sm mt-2 text-[#E4E7EC]`}>
        {description || 'Choose a payment method to charge'}
      </Text>
    </LinearGradient>
  );
};

export {Header};
