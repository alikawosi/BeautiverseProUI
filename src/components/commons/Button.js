import React from 'react';
import {Pressable, Text, View, ActivityIndicator} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import tw from '../../../tailwind';

const Button = ({
  style,
  containerStyle,
  loading,
  reverse,
  size,
  disabled,
  primary,
  secondary,
  onPress,
  icon,
  iconSize,
  iconStyle,
  title,
  titleStyle,
  gradient,
  gradientStyle,
  defaultColor,
  children,
}) => {
  let textColor = defaultColor || '#000';
  let iconColor = defaultColor || '#000';

  // if (disabled) {
  //   textColor = iconColor = 'gray';
  // } else
  if (primary) {
    textColor = iconColor = '#FFFFFF';
  } else if (secondary) {
    textColor = iconColor = '#FF6E00';
  }

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={tw.style('w-auto', containerStyle, {
        'opacity-50': disabled,
      })}>
      <View
        style={tw.style(
          'relative z-20 flex items-center justify-center h-12 flex-row',
          {
            'rounded-10': primary || secondary,
            'bg-[#FF6E0020]': secondary,
            //'opacity-50': disabled,
            'flex-row-reverse': reverse,
          },
          style,
        )}>
        {loading ? (
          <View style={tw`items-center justify-center`}>
            <ActivityIndicator size="small" color={iconColor} />
          </View>
        ) : icon ? (
          icon
        ) : null}
        {title && (icon || loading) ? <View style={tw`w-2`} /> : null}
        {title ? (
          <Text
            style={tw.style(
              {
                'bv-heading-base leading-6 text-center':
                  primary || secondary,
                'text-lg': size === 'small',
                'text-xl': size === 'medium',
                'text-2xl': size === 'large',
                'text-3xl': size === 'xlarge',
              },
              {
                color: textColor,
              },
              titleStyle,
            )}>
            {title}
          </Text>
        ) : null}
        {children && title ? <View style={tw`w-2`} /> : null}
        {children}
      </View>
      {primary && (
        <LinearGradient
          useAngle={true}
          angle={90.6}
          colors={gradient ? gradient : ['#FBA301', '#FF6E00']}
          style={tw.style(
            'w-full rounded-10 h-full top-0 left-0 absolute z-10',
            gradientStyle,
          )}
        />
      )}
    </Pressable>
  );
};

export {Button};
