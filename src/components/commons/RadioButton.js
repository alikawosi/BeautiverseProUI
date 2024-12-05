import React from 'react';
import {View, Text, Pressable} from 'react-native';

import tw from '../../../tailwind';

const RadioButton = ({
  size = 16,
  label,
  disabled,
  onPress = () => false,
  isChecked = false,
  style,
  labelStyle,
}) => {
  const pressHandler = () => {
    isChecked === !isChecked;
    onPress();
  };
  return (
    <Pressable
      style={tw.style('flex-row items-center justify-center', style)}
      disabled={disabled}
      onPress={pressHandler}>
      <View
        style={tw.style(
          'border border-basicGray rounded-full mr-2 justify-center items-center bg-white',
          {
            width: size,
            height: size,
            'border-primary': isChecked,
          },
        )}>
        <View
          style={tw.style(
            'rounded-full bg-white',
            {
              height: size * 0.55,
              width: size * 0.55,
            },
            {
              'bg-primary': isChecked,
            },
          )}
        />
      </View>
      <View style={tw`justify-center items-center`}>
        <Text
          style={tw.style(
            'font-sans text-black',
            {fontSize: size},
            labelStyle,
          )}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export {RadioButton};
