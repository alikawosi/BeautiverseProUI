import {More} from 'iconsax-react-native';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import tw from '../../../../../tailwind';

import {InputWrapper} from '../../../commons';

const PaymentMethodCard = ({primary, value, preffix, style}) => {
  return (
    <InputWrapper
      label={primary ? 'Primary' : null}
      isActive
      value={value}
      style={tw.style(style)}
      preffix={preffix}
      suffix={
        <Pressable style={tw`p-3 `}>
          <More color="#5948AA" size={20} />
        </Pressable>
      }>
      <View style={tw` px-4 ml-5`}>
        <Text style={tw`bv-med-lg `}>{value}</Text>
      </View>
    </InputWrapper>
  );
};

export {PaymentMethodCard};
