import {View, Text, Image} from 'react-native';
import React from 'react';

import tw from '../../../tailwind';

const EmptyScreen = ({description, style}) => {
  return (
    <View style={tw.style('justify-center items-center relative', style)}>
      <Image
        style={tw`w-48 h-48`}
        source={require('../../assets/media/EmptyScreen.png')}
      />
      {description && (
        <Text style={tw`text-[#545569] text-sm font-sans absolute bottom-8`}>
          {description}
        </Text>
      )}
    </View>
  );
};

export {EmptyScreen};
