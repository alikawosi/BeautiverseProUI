import {Text, Pressable} from 'react-native';
import React from 'react';
import tw from '../../../tailwind';
import LinearGradient from 'react-native-linear-gradient';

const Tag = ({title, value, selected, style, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={tw.style(
        'border  mx-1 border-grayBorder  border-opacity-50 rounded-xl',
        style,
        {
          'border-0': selected,
        },
      )}>
      {selected ? (
        <LinearGradient
          useAngle={true}
          angle={198.2}
          colors={['#FBA301', '#FF6E00']}
          style={tw.style(' w-full rounded-xl px-3 py-2 z-10', style)}>
          <Text style={tw`bv-sans-sm text-white z-20`}>{title}</Text>
        </LinearGradient>
      ) : (
        <Text style={tw`px-3 py-2 bv-sans-sm text-grayBorder `}>{title}</Text>
      )}
    </Pressable>
  );
};

export {Tag};
