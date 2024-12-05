import {View, Text} from 'react-native';
import React from 'react';
import tw from '../../../tailwind';

const Legal = () => {
  return (
    <View style={tw`bg-background flex-1 items-center justify-center `}>
      <Text style={tw`bv-heading-1.5xl`}>❌Design❌</Text>
    </View>
  );
};

export default Legal;
