import React, {useEffect, useMemo, useState} from 'react';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import tw from '../../../tailwind';
import {InputWrapper} from './InputWrapper';
import {GENERAL_CONST} from '../../constants';

const DatePicker = ({
  title,
  disabled,
  label,
  labelFix,
  style,
  icon,
  preffix,
  suffix,
  placeholder,
  formValue,
  hasError,
  required,
  mode = 'date',
  minimumDate,
  onChange = () => false,
  onFocus = () => false,
  onBlur = () => false,
}) => {
  const {weekDays} = GENERAL_CONST;
  const {navigate} = useNavigation();
  const [value, setValue] = useState('');
  const [isActive, setIsActive] = useState(false);
  const formatedValue = useMemo(() => {
    if (!value) return;

    const date = dayjs(value * 1000);

    return {
      date: date.format('MMM/DD/YYYY'),
      time: date.format('HH:mm A'),
      datetime: `${
        weekDays.find(({id}) => id === date.day()).title
      }, ${date.format('MMM DD [at] HH:mm A')}`,
    }[mode];
  }, [mode, value]);

  useEffect(() => {
    if (labelFix) {
      setIsActive(true);
    }
  }, [labelFix]);

  const showModal = () => {
    if (!disabled) {
      onFocus();
      navigate('DatePickerModal', {
        mode,
        minimumDate,
        type: 'center',
        title: title,
        value: value ? new Date(value * 1000) : new Date(),
        onSubmit: val => {
          onChange(dayjs(val).unix());
        },
        onBlur,
      });
    }
  };

  useEffect(() => {
    setValue(formValue);
    setIsActive(Boolean(formValue));
  }, [formValue]);

  return (
    <InputWrapper
      onPress={showModal}
      {...{
        label,
        style,
        disabled,
        icon,
        labelFix,
        preffix,
        suffix,
        hasError,
        isActive,
        required,
      }}>
      <Text style={tw.style('bv-med-sm ml-2 text-black h-6 z-20 w-full')}>
        {value ? formatedValue : placeholder}
      </Text>
    </InputWrapper>
  );
};

export {DatePicker};
