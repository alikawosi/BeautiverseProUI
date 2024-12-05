import React from 'react';
import {View, Text} from 'react-native';

import tw from '../../tailwind';

const NetworkDisconectedScreen = () => {
  return (
    <View style={tw`justify-center items-center flex-1 bg-white`}>
      <Text style={tw`bv-heading-1.5xl text-center `}>
        Please Check Your Internet Connection!
      </Text>
    </View>
  );
};

export default NetworkDisconectedScreen;
