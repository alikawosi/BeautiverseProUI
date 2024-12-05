import React from 'react';
import {Text, View} from 'react-native';

import tw from '../../../tailwind';

const TransactionContext = ({style, valueStyle, hasBorder, title, value}) => {
  return (
    <View
      style={tw.style(
        'w-[45%]',
        {
          'pl-4 border-l border-black border-opacity-10': hasBorder,
        },
        style,
      )}>
      <Text style={tw`text-xs text-descGray font-med mb-1`}>{title}</Text>
      <Text style={tw.style('text-sm text-black font-sans', valueStyle)}>
        {value}
      </Text>
    </View>
  );
};

export {TransactionContext};
