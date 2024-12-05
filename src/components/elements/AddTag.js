import React from 'react';
import {Text, View} from 'react-native';
import {Add} from 'iconsax-react-native';

import tw from '../../../tailwind';

const AddTag = () => {
  return (
    <View
      style={tw`w-[94px] bg-gray-100 flex-row items-center rounded-full h-8 pl-2 pr-1 justify-between`}>
      <Text style={tw`bv-sans-xs text-descGray mr-2`}>Add tags</Text>
      <View
        style={tw`bg-white w-6 h-6 rounded-full items-center justify-center`}>
        <Add size={14} color={'#7A7A8A'} />
      </View>
    </View>
  );
};

export {AddTag};
