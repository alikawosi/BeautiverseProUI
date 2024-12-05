import {View, Text} from 'react-native';
import React from 'react';
import tw from '../../../tailwind';

const FormItemHeader = ({title, style, titleStyle}) => {
  return (
    <View style={tw.style(style)}>
      <Text style={tw.style('bv-heading-base capitalize', titleStyle)}>
        {title}
      </Text>
    </View>
  );
};

export {FormItemHeader};
