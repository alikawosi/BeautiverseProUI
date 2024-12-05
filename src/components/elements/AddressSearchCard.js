import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {Location} from 'iconsax-react-native';

import tw from '../../../tailwind';

const AddressSearchCard = ({
  address,
  iconContainerStyle,
  style,
  titleStyle,
  disabled = false,
  isActive,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={tw.style(
        'min-h-14 flex-row items-center px-2 rounded-xl',
        {
          'bg-[#FF6E00] bg-opacity-10': isActive,
        },
        style,
      )}>
      <View
        style={tw.style(
          'w-10 h-10 rounded-xl bg-gray-200 items-center justify-center mr-3',
          {
            'bg-[#FF6E00]': isActive,
          },
          iconContainerStyle,
        )}>
        <Location size={20} color={isActive ? '#FFFFFF' : '#7A7A8A'} />
      </View>
      <Text
        style={tw.style(
          'bv-sans-sm flex-1',
          {
            'text-[#FF6E00]': isActive,
          },
          titleStyle,
        )}>
        {address}
      </Text>
    </Pressable>
  );
};

export {AddressSearchCard};
