import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';

import tw from '../../../tailwind';
import {Switch} from '.';

const SwitchBox = ({
  label,
  labelStyle,
  desc,
  disabled,
  containerStyle,
  size = 8,
  formValue,
  hasError,
  onPress = () => false,
  onChange = () => false,
  onFocus = () => false,
  onBlur = () => false,
}) => {
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (typeof formValue !== 'boolean') {
      return;
    }

    if (formValue !== value) {
      setValue(formValue);
    }
  }, [formValue]);

  const pressHandler = val => {
    setValue(!value);
    onPress();
    onChange(!value);
  };

  return (
    <Pressable
      onPress={() => pressHandler()}
      disabled={disabled}
      style={tw.style(
        'w-full flex-row justify-between items-center',
        containerStyle,
        {
          'opacity-50': disabled,
        },
      )}>
      <View style={tw`flex-1`}>
        <Text style={tw.style('bv-sans-sm', labelStyle)} numberOfLines={2}>
          {`${label} `}
          <Text style={tw.style('bv-sans-xs text-descGray')}>{desc}</Text>
        </Text>
      </View>
      <Switch
        disabled={disabled}
        size={size}
        onPress={val => pressHandler(val)}
        isActive={value}
      />
    </Pressable>
  );
};

export {SwitchBox};
