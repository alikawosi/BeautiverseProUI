import {View, Text, Image} from 'react-native';
import React from 'react';

import tw from '../../../../../tailwind';
import {Button} from '../../../commons';

const CouponCard = ({title, code, value, description, style}) => {
  return (
    <View style={tw`flex-row mb-4`}>
      <Image
        source={require('../../../../assets/media/Coupon.png')}
        style={tw.style()}
      />
      <View
        style={tw` w-60 h-29 border  rounded-15 border-grayBorder absolute m-4 py-4 px-3`}>
        <View>
          <Text style={tw`bv-heading-base text-primary mb-1`}>{title}</Text>
          <Text style={tw`bv-med-xs text-grayBorder mb-4`}>{description}</Text>
        </View>
        <View style={tw`flex-row items-end mb-1 absolute bottom-0 right-0`}>
          <Button
            title="Copy Code"
            size="small"
            titleStyle={tw`bv-med-xs text-grayBorder`}
            style={tw` h-7 border py-2 px-2.5 border-primary mr-2.5 rounded-10`}
            containerStyle={tw`items-center  justify-center`}
          />
          <Button
            title={code}
            size="small"
            titleStyle={tw`bv-med-xs text-grayBorder`}
            style={tw` h-7 border-dashed border border-indigo-800 py-2 px-2.5  mr-2.5 rounded-10`}
            value={value}
          />
        </View>
      </View>

      <Image
        source={require('../../../../assets/media/Barcode.png')}
        style={tw.style()}
      />
    </View>
  );
};

export {CouponCard};
