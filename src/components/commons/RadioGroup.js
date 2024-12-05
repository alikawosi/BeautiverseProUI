import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import tw from '../../../tailwind';
import {RadioButton} from '.';

const RadioGroup = ({
  label,
  labelStyle,
  options,
  row,
  size,
  formValue,
  hasError,
  style,
  containerStyle,
  itemStyle,
  itemLableStyle,
  required,
  onChange = () => false,
  onSelect = () => false,
  onFocus = () => false,
  onBlur = () => false,
}) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (typeof formValue !== 'string') {
      return;
    }
    console.log('form', formValue);
    if (formValue !== active) {
      setActive(formValue);
      //setIsActive(value !== '' && value !== null);
    }
  }, [formValue]);

  return (
    <View style={tw.style('w-full', style)}>
      <View style={tw`flex-row`}>
        {label ? (
          <Text style={tw.style('bv-med-xs text-descGray', labelStyle)}>
            {label}
          </Text>
        ) : null}
        {required ? (
          <Text
            style={tw.style(
              'bg-white text-xs mx-1 h-4 z-20 leading-none text-red-700 ',
            )}>
            *
          </Text>
        ) : null}
      </View>
      <View
        style={tw.style('mt-4', containerStyle, {
          'flex-row flex-wrap justify-between': row,
          'items-start': !row,
        })}>
        {options.map((item, index) => (
          <RadioButton
            key={item.id}
            label={item.title}
            size={size}
            labelStyle={itemLableStyle}
            isChecked={active === item.id ? true : false}
            onPress={() => {
              setActive(item.id);
              onChange(item.id);
              onSelect(item);
            }}
            style={tw.style(
              {
                'mt-4': index >= 1 && !row,
              },
              itemStyle,
            )}
          />
        ))}
      </View>
    </View>
  );
};

export {RadioGroup};
