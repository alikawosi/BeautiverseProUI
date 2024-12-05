import {View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Button, Form, ModalWrapper} from '../commons';
import {useForm} from 'react-hook-form';

const FormModal = ({route}) => {
  const {
    title,
    description,
    descStyle,
    formData,
    isEditMode,
    onSubmit = () => false,
    onUpdate = () => false,
    style,
    defaultValues,
  } = route.params;
  const form = useForm({
    fields: formData,
    defaultValues: defaultValues,
  });

  const {goBack} = useNavigation();

  return (
    <ModalWrapper
      titleSeparator
      title={title}
      type="fromBottom"
      style={tw.style('w-full h-auto bg-white rounded-[30px] px-5', style)}>
      <View style={tw.style('w-11/12 self-center flex-col pb-2')}>
        <Text
          style={tw.style(
            'bv-sans-sm text-grayBorder text-center capitalize mb-3',
            descStyle,
          )}>
          {description}
        </Text>
        <Form fields={formData} form={form} />
        {!isEditMode ? (
          <Button
            title={'Confirm'}
            primary
            onPress={() => {
              onSubmit(form.getValues());
              goBack();
            }}
          />
        ) : (
          <Button
            title={'Update'}
            secondary
            onPress={() => {
              onUpdate(form.getValues());
              goBack();
            }}
          />
        )}
      </View>
    </ModalWrapper>
  );
};

export {FormModal};
