import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

import tw from '../../../tailwind';
import {CheckBox} from '.';

const CheckBoxGroup = ({
  label,
  labelStyle,
  options,
  initialCheckedList = [],
  row,
  size,
  col,
  formValue,
  hasError,
  containerStyle,
  checkBoxLableStyle,
  selectAll = false,
  style,
  onPress = () => false,
  onChange = () => false,
  onFocus = () => false,
  onBlur = () => false,
}) => {
  const [value, setValue] = useState(initialCheckedList.map(item => item.id));

  useEffect(() => {
    if (typeof formValue !== 'object') {
      return;
    }

    if (formValue !== value) {
      setValue(formValue);
      //setIsActive(value !== '' && value !== null);
    }
  }, [formValue]);

  useEffect(() => {
    if (selectAll) {
      let tempList = options.map(item => {
        return item.id;
      });
      setValue(tempList);
    } else {
      setValue([]);
    }
  }, [selectAll]);

  const checkBoxPressHandler = id => {
    let tempList = [...value];
    if (tempList.includes(id)) {
      var filteredList = tempList.filter(p => p !== id);
      var selectedTempList = options.filter(t => filteredList.includes(t.id));
      onChange(selectedTempList);
      onPress(selectedTempList);
      setValue(filteredList);
    } else {
      tempList.push(id);
      var selectedTempList = options.filter(t => tempList.includes(t.id));
      onChange(tempList);
      onPress(selectedTempList);
      setValue(tempList);
    }
  };

  return (
    <View style={tw`w-full`}>
      {label ? (
        <Text style={tw.style('bv-med-xs text-descGray', labelStyle)}>
          {label}
        </Text>
      ) : null}
      <View
        style={tw.style('mt-4', containerStyle, {
          'flex-row flex-wrap': row,
          'items-start': !row,
        })}>
        {options.map(item => (
          <CheckBox
            key={item.id}
            labelStyle={checkBoxLableStyle}
            label={item.title}
            size={size}
            isChecked={value.includes(item.id) ? true : false}
            onPress={() => {
              checkBoxPressHandler(item.id);
            }}
            style={tw.style(
              'w-1/2 justify-start',
              {
                'mb-4': options.length !== item.id && !row,
              },
              style,
            )}
          />
        ))}
      </View>
    </View>
  );
};

export {CheckBoxGroup};
