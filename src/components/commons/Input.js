import React, {useRef, useState, useEffect} from 'react';
import MaskInput from 'react-native-mask-input';

import tw from '../../../tailwind';
import {textUtil} from '../../utils';
import {InputWrapper} from './InputWrapper';

const Input = ({
  label,
  inputType,
  preffix,
  suffix,
  style,
  textInputStyle,
  icon,
  placeholder,
  maxLength,
  keyboardType,
  disabled,
  isMultiline,
  formValue,
  hasError,
  labelFix = false,
  textContentType,
  mask,
  required,
  contentStyle,
  readOnly,
  defaultVlaue = null,
  onChange = () => false,
  onSubmit = () => false,
  onFocus = () => false,
  onBlur = () => false,
  onPress = () => false,
}) => {
  const input = useRef();
  const [value, setValue] = useState(defaultVlaue || formValue);
  const [isActive, setIsActive] = useState(labelFix || placeholder || value);

  const handleChange = (unmasked, masked) => {
    if (keyboardType === 'phone-pad') {
      if (unmasked.charAt(0) === '0') {
        return;
      } else {
        setValue(unmasked);
        onChange(unmasked, masked);
      }
    } else {
      setValue(unmasked);
      onChange(unmasked, masked);
    }
  };

  useEffect(() => {
    if (typeof formValue === 'string' && formValue !== value) {
      handleChange(formValue);
      if (formValue) {
        setIsActive(true);
      }
    }
  }, [formValue]);

  return (
    <InputWrapper
      {...{
        label,
        style: tw.style(style, {
          'opacity-100': readOnly,
        }),
        disabled: readOnly || disabled,
        icon,
        preffix,
        suffix,
        isActive,
        labelFix,
        inputType,
        onPress,
        placeholder: value ? null : placeholder,
        hasError,
        required,
        contentStyle,
      }}>
      <MaskInput
        ref={input}
        keyboardType={keyboardType}
        maxLength={maxLength}
        onSubmitEditing={onSubmit}
        editable={!(readOnly || disabled)}
        blurOnSubmit
        textContentType={textContentType}
        multiline={isMultiline}
        underlineColorAndroid={'rgba(0,0,0,0)'}
        autoCorrect={false}
        value={textUtil.toEnglishDigits(value || '')}
        mask={mask}
        placeholderTextColor="rgba(0,0,0,0)"
        textAlignVertical={inputType === 'textArea' ? 'top' : 'center'}
        style={tw.style(
          'w-full z-30 text-black h-full',
          {'text-red-700': hasError},
          textInputStyle,
        )}
        onChangeText={(masked, unmasked) => {
          handleChange(unmasked, masked);
        }}
        onFocus={() => {
          onFocus();
          setIsActive(true);
        }}
        onBlur={() => {
          onBlur();
          if (value === '' && !labelFix && !placeholder) {
            setIsActive(false);
          }
        }}
      />
    </InputWrapper>
  );
};

export {Input};
