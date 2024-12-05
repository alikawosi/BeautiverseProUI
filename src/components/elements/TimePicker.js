import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';

import tw from '../../../tailwind';
import DatePicker from 'react-native-date-picker';
import {Button} from '../commons';
import Animated, {Easing, FadeIn, FadeOut} from 'react-native-reanimated';
import dayjs from 'dayjs';

const TimePicker = ({
  startTime,
  endTime,
  style,
  isRemoveable,
  minimumTime,
  startTimePrefix,
  ednTimePrefix,
  onDelete = () => false,
  onSubmit = () => false,
}) => {
  const [selectedStartTime, setSelectedStartTime] = useState(startTime);
  const [selectedEndTime, setSelectedEndTime] = useState(endTime);
  const [picker, setPicker] = useState();
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (selectedStartTime >= selectedEndTime) {
      const endTime = dayjs(selectedStartTime);
      setSelectedEndTime(endTime.minute(endTime.minute() + 15).toDate());
    }
    onSubmit({
      startTime: selectedStartTime,
      endTime: selectedEndTime,
    });
  }, [selectedStartTime, selectedEndTime]);

  useEffect(() => {
    setSelectedStartTime(startTime);
  }, [startTime]);

  useEffect(() => {
    setSelectedEndTime(endTime);
  }, [endTime]);

  const Picker = ({defaultTime, minimumTime, onTimeChange = () => false}) => {
    return (
      <Animated.View
        entering={FadeIn.duration(350).easing(Easing.cubic(Easing.out))}
        exiting={FadeOut.duration(50).easing(Easing.cubic(Easing.in))}>
        <DatePicker
          mode="time"
          textColor="black"
          date={defaultTime}
          minimumDate={minimumTime}
          style={tw`self-center`}
          onDateChange={onTimeChange}
          minuteInterval={15}
        />
      </Animated.View>
    );
  };

  const onSelectTime = (defaultTime, onTimeChange, minimumTime) => {
    if (showPicker) {
      setShowPicker(!showPicker);
      setPicker();
    } else {
      setShowPicker(!showPicker);
      setPicker(
        <Picker
          defaultTime={defaultTime}
          minimumTime={minimumTime}
          onTimeChange={val => {
            onTimeChange(val);
          }}
        />,
      );
    }
  };

  return (
    <View>
      <View style={tw.style(' flex-row justify-between ', style)}>
        <View style={tw`flex-row justify-between w-[75%]`}>
          <Pressable
            style={tw`p-1 flex-row flex-basis-[50%]`}
            onPress={() => {
              onSelectTime(
                selectedStartTime,
                setSelectedStartTime,
                minimumTime,
              );
            }}>
            {startTimePrefix && (
              <Text style={tw`text-sm text-descGray mr-2`}>
                {startTimePrefix}
              </Text>
            )}
            <Text style={tw`bv-sans-sm`}>
              {selectedStartTime.toTimeString().substring(0, 5)}
            </Text>
          </Pressable>
          <Pressable
            style={tw`p-1 flex-row flex-basis-[50%]`}
            onPress={() => {
              const minimumDate = dayjs(selectedStartTime);
              onSelectTime(
                selectedEndTime,
                setSelectedEndTime,
                minimumDate.minute(minimumDate.minute() + 15).toDate(),
              );
            }}>
            {ednTimePrefix && (
              <Text style={tw`text-sm text-descGray mr-2`}>
                {ednTimePrefix}
              </Text>
            )}
            <Text style={tw`bv-sans-sm`}>
              {selectedEndTime.toTimeString().substring(0, 5)}
            </Text>
          </Pressable>
        </View>
        {isRemoveable ? (
          <Button
            title={'Remove'}
            defaultColor="#FF4444"
            style={tw`p-0 m-0 h-auto`}
            containerStyle={tw`p-1 m-0 h-auto`}
            titleStyle={tw`bv-sans-sm text-basicRed`}
            onPress={onDelete}
          />
        ) : null}
      </View>
      {picker}
    </View>
  );
};

export {TimePicker};
