import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, View} from 'react-native';

import tw from '../../../tailwind';
import {Button} from './';

const DropDown = ({style, onRequestClose, options}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      duration: 200,
      toValue: 1,
    }).start();
  }, []);

  return (
    <Pressable
      onPress={onRequestClose}
      style={tw`absolute top-0 left-0 right-0 bottom-0 z-50`}>
      <Animated.View
        style={tw.style(
          `w-[176px] absolute`,
          {
            opacity,
          },
          style,
        )}>
        <View
          style={tw`absolute top-4 left-0 right-0 bottom-0 shadow-2xl opacity-30 rounded-2xl`}
        />
        <View style={tw`bg-white rounded-2xl px-4 py-2 w-full`}>
          {options.map(({id, style, titleStyle, ...items}) => (
            <Button
              key={id}
              {...items}
              titleStyle={tw.style(`bv-sans-sm`, titleStyle)}
              style={tw.style(`h-9 justify-start`, style)}
            />
          ))}
        </View>
      </Animated.View>
    </Pressable>
  );
};

export {DropDown};
