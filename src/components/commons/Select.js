import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ArrowDown2} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {InputWrapper} from './InputWrapper';

const Select = ({
  label,
  modalTitle,
  labelFix,
  style,
  options = [],
  disabled,
  icon,
  preffix,
  suffix,
  formValue,
  hasError,
  placeholder,
  required,
  contentStyle,
  defaultValue = null,
  hasTitle = true,
  hasIcon = false,
  titleStyle,
  onChange = () => false,
  onFocus = () => false,
  onBlur = () => false,
}) => {
  const {navigate} = useNavigation();
  const [value, setValue] = useState(
    options.find(i => i.value === defaultValue),
  );
  const [isActive, setIsActive] = useState(value);

  useEffect(() => {
    if (labelFix) {
      setIsActive(true);
    }
  }, [labelFix]);

  useEffect(() => {
    const finded = options.find(
      item => item.value === (formValue?.value || formValue),
    );
    setValue(finded);
    setIsActive(Boolean(finded));
  }, [formValue]);

  const showModal = () => {
    if (!disabled) {
      onFocus();
      navigate('SelectModal', {
        type: 'fromBottom',
        options,
        label: modalTitle ? modalTitle : label,
        onSubmit: (item, flag) => {
          onChange(item);
          setValue(item);
          setIsActive(flag);
        },
        onBlur,
      });
    }
  };

  return (
    <InputWrapper
      onPress={showModal}
      {...{
        label,
        style,
        disabled,
        contentStyle,
        icon,
        preffix,
        labelFix,
        suffix,
        hasError,
        isActive,
        required,
      }}>
      <View style={tw`flex-row items-center w-full ml-2 justify-between`}>
        {hasIcon && value?.icon}
        {hasTitle && (
          <Text
            style={tw.style(
              'bv-med-sm z-30',
              {
                'ml-1': Boolean(hasIcon && value.icon),
              },
              titleStyle,
            )}>
            {value?.title || placeholder}
          </Text>
        )}
        <ArrowDown2 size={16} color="#7A7A8A" style={tw`mx-2`} />
      </View>
    </InputWrapper>
  );
};

export {Select};
