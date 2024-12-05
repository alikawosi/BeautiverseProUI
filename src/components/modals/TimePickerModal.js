import {View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Button, ModalWrapper} from '../commons';

const TimePickerModal = ({route}) => {
  const {
    onSubmit = () => {
      false;
    },
  } = route.params;
  const [startTime, setStartTime] = useState(new Date());

  const {goBack} = useNavigation();

  return (
    <ModalWrapper titleSeparator title={'Set Time'} type="fromBottom">
      <View style={tw.style('flex-row w-full justify-center  items-center')}>
        <DatePicker
          date={startTime}
          mode="time"
          onDateChange={setStartTime}
          style={tw`p-5 m-5 w-[130px]`}
          textColor={'#5948AA'}
          minuteInterval={15}
        />
      </View>
      <Button
        title="Confrim"
        onPress={() => {
          onSubmit(startTime.toTimeString().substring(0, 5));
          goBack();
        }}
        primary
      />
    </ModalWrapper>
  );
};

export {TimePickerModal};
