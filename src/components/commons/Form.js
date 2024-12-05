import React from 'react';
import {View} from 'react-native';

import tw from '../../../tailwind';
import {
  Input,
  FormItem,
  Select,
  DatePicker,
  RadioGroup,
  CheckBoxGroup,
  SwitchBox,
  Picker,
  FormItemHeader,
} from '.';
import {PhotoPicker} from '../elements';

const Form = ({fields = [], form, style}) => {
  const renderField = ({type, style, ...props}) => {
    const otherProps = {};
    if (!type) {
      return null;
    }
    const Component = {
      input: Input,
      select: Select,
      datePicker: DatePicker,
      header: FormItemHeader,
      radio: RadioGroup,
      check: CheckBoxGroup,
      switch: SwitchBox,
      picker: Picker,
      photoPicker: PhotoPicker,
      hidden: null,
    }[type];
    if (!Component) {
      return null;
    }
    return (
      <Component
        {...props}
        {...otherProps}
        style={tw.style('rounded-lg', style)}
      />
    );
  };

  return (
    <View style={tw.style('flex-row  flex-wrap w-full', style)}>
      {fields.map(item => (
        <FormItem
          {...item}
          key={item.name}
          name={item.name}
          style={tw.style('w-full mb-4', item.itemStyle)}
          form={
            form && {
              control: form.control,
              error: form.getFieldState(item.name).error,
              errors: form.formState.errors,
              watch: form.watch,
            }
          }>
          {renderField(item)}
        </FormItem>
      ))}
    </View>
  );
};

export {Form};
