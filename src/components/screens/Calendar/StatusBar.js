import React from 'react';
import {View, Text} from 'react-native';

import tw from '../../../../tailwind';

const StatusBar = ({value = 0, appointments = 0, occupancy = 0}) => {
  return (
    <View
      style={tw`w-full p-5 bg-white rounded-3xl flex-row justify-between mt-3`}>
      <View style={tw`px-2 py-1.5 bg-gray-100 rounded-10`}>
        <Text style={tw`bv-sans-sm text-descGray`}>
          Value: <Text style={tw`bv-sans-sm text-black`}>{`$${value}`}</Text>
        </Text>
      </View>
      <View style={tw`px-2 py-1.5 bg-gray-100 rounded-10`}>
        <Text style={tw`bv-sans-sm text-descGray`}>
          Appointments:{' '}
          <Text style={tw`bv-sans-sm text-black`}>{appointments}</Text>
        </Text>
      </View>
      <View style={tw`px-2 py-1.5 bg-gray-100 rounded-10`}>
        <Text style={tw`bv-sans-sm text-descGray`}>
          Occupancy:{' '}
          <Text style={tw`bv-sans-sm text-black`}>{`${occupancy}%`}</Text>
        </Text>
      </View>
    </View>
  );
};

export {StatusBar};
