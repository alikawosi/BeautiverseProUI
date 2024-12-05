import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, Pressable} from 'react-native';
import DatePicker from 'react-native-date-picker';

import tw from '../../../tailwind';
import {ModalWrapper} from '../commons';

const DatePickerModal = ({route}) => {
  const {goBack} = useNavigation();
  const {
    mode,
    title,
    value,
    onSubmit = () => false,
    onBlur = () => false,
  } = route.params;
  const [date, setDate] = useState(value);

  useEffect(() => {
    return () => {
      onBlur();
    };
  }, []);

  return (
    <ModalWrapper type="center" title={title} style={tw`h-auto flex-none`}>
      <View style={tw`items-center`}>
        <DatePicker
          date={date}
          mode={mode}
          onDateChange={setDate}
          textColor="#FF6E00"
          minimumDate={route.params?.minimumDate}
        />
      </View>
      <View style={tw.style('flex-row-reverse p-5 items-center')}>
        <Pressable
          onPress={() => {
            onSubmit(date);
            goBack();
          }}>
          <Text style={tw.style('font-heading text-[#FF6E00] text-xl')}>
            OK
          </Text>
        </Pressable>
        <Pressable onPress={goBack}>
          <Text style={tw.style('font-med mr-6 text-[#131212] text-sm')}>
            CANCEL
          </Text>
        </Pressable>
      </View>
    </ModalWrapper>
  );
};

export {DatePickerModal};
