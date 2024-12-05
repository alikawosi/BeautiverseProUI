import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

import tw from '../../../../tailwind';

const MenuCard = ({
  title,
  titleStyle,
  desc,
  disabled,
  descStyle,
  isActive,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={tw.style(
        'w-full p-4 rounded-xl',
        {'bg-selectedGray': isActive, 'opacity-50': disabled},
        style,
      )}>
      <Text style={tw.style('bv-sans-base mb-2', titleStyle)}>{title}</Text>
      {desc ? (
        <Text style={tw.style('bv-sans-sm text-descGray mb-2', descStyle)}>
          {desc}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export {MenuCard};
