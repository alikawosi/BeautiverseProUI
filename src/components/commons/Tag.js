import React from 'react';
import {View, Text} from 'react-native';
import tw from '../../../tailwind';

const Tag = ({title, titleStyle, icon, containerStyle}) => {
  return (
    <View
      style={tw.style(' rounded-xl p-3 flex-row items-center', containerStyle)}>
      {icon}
      <Text
        style={tw.style('bv-sans-sm text-descGray', titleStyle, {
          'ml-1': icon !== null,
        })}>
        {title}
      </Text>
    </View>
  );
};

export {Tag};
