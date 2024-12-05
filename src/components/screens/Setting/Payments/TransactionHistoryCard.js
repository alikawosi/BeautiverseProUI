import {View, Text} from 'react-native';
import React from 'react';

import tw from '../../../../../tailwind';
import {Button} from '../../../commons';

const TransactionHistoryCard = ({
  style,
  title,
  time,
  date,
  type,
  amount,
  onPress = () => false,
}) => {
  return (
    <View
      style={tw.style('border-b border-black border-opacity-9 mb-4', style)}>
      <View style={tw` flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`bv-heading-base text-primary mr-2`}>{title}</Text>
          <Text style={tw` bv-med-xs text-grayBorder`}>{type}</Text>
        </View>
        <Text style={tw`bv-sans-sm text-grayBorder`}>{amount}</Text>
      </View>
      <View style={tw` flex-row justify-between items-center`}>
        <Text style={tw`bv-sans-xs text-grayBorder`}>
          {time + ' | ' + date}{' '}
        </Text>
        <Button
          onPress={onPress}
          title={'Details'}
          titleStyle={tw`bv-sans-xs text-primary `}
        />
      </View>
    </View>
  );
};

export {TransactionHistoryCard};
