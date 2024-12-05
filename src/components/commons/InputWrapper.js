import React, {useEffect, useRef} from 'react';
import {
  Text,
  View,
  Easing,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';

import tw from '../../../tailwind';
import { FadeIn, FadeOut } from 'react-native-reanimated';

const INPUT_HEIGHT = 48;

const InputWrapper = ({
  label,
  style,
  children,
  inputType,
  preffix,
  suffix,
  icon,
  placeholder,
  hasError,
  disabled,
  isActive = false,
  required,
  contentStyle,
  onPress = () => false,
}) => {
  const activeAnimate = useRef(new Animated.Value(0)).current;
  const textAreaStyle = {
    ' justify-start pr-1 min-h-25 ': inputType === 'textArea',
  };
  //console.log(hasError);
  const textAnimStyle = {
    transform: [
      {
        translateY: activeAnimate.interpolate({
          inputRange: [0, 1],
          outputRange: [2, -INPUT_HEIGHT / 2],
        }),
      },
      {
        scale: activeAnimate.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0.9],
        }),
      },
    ],
  };
  const containerAnimStyle = {
    borderColor: activeAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [
        hasError ? 'red' : 'rgba(201, 210, 221, 1)',
        hasError ? 'red' : '#FF6E00',
      ],
    }),
  };

  useEffect(() => {
    Animated.timing(activeAnimate, {
      toValue: isActive ? 1 : 0,
      duration: 250,
      easing: Easing.out(Easing.sin),
      useNativeDriver: false,
    }).start();
  }, [activeAnimate, isActive]);

  return (
    <TouchableWithoutFeedback>
      <Animated.View
        entering={FadeIn.duration(350).easing(Easing.cubic(Easing.out))}
        style={[
          tw.style(
            'border rounded-lg w-full flex-row h-12',
            {
              'opacity-50': disabled,
              'h-auto': inputType === 'textArea',
            },
            style,
          ),
          containerAnimStyle,
        ]}>
        {icon && (children === null || children === undefined) ? (
          <View style={tw.style('h-full justify-center ml-2', textAreaStyle)}>
            {icon}
          </View>
        ) : (
          preffix && (
            <View style={tw.style('h-full justify-center ml-2')}>
              {preffix}
            </View>
          )
        )}
        <View style={tw.style('justify-center', textAreaStyle)}>
          {placeholder ? (
            <Text style={tw`bv-sans-sm text-descGray mx-1 absolute z-10`}>
              {placeholder}
            </Text>
          ) : null}
        </View>
        <Pressable
          style={tw.style(
            'flex-row justify-center items-center relative h-full z-30 px-1 flex-1',
            contentStyle,
            textAreaStyle,
          )}
          onPress={onPress}>
          {Boolean(label) && (
            <Animated.View
              style={[
                tw.style(
                  'absolute left-1 top-0 h-12 justify-center items-center flex-row',
                ),
                textAnimStyle,
              ]}>
              <Text
                adjustsFontSizeToFit
                style={tw.style(
                  'bg-white text-xs text-descGray h-4 z-20 leading-none',
                  {
                    'px-1': Boolean(label),
                    'text-red-700': hasError,
                    //'text-primary': isActive,
                  },
                )}>
                {label}
              </Text>
              {required ? (
                <Text
                  style={tw.style(
                    'bg-white text-xs  h-4 z-20 leading-none text-red-700 ',
                  )}>
                  *
                </Text>
              ) : null}
            </Animated.View>
          )}
          {children}
        </Pressable>
        {suffix && (
          <View style={tw.style('h-full justify-center mr-2')}>{suffix}</View>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export {InputWrapper};
