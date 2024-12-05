import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Animated, {Easing, FadeIn, FadeOut} from 'react-native-reanimated';

import tw from '../../../tailwind';
import {TimePicker} from '../elements';
import {GENERAL_CONST} from '../../constants';
import {SectionWrapper} from '../screens/BusinessSetup';
import {Button, CheckBoxGroup, FullScreenModalWrapper} from '../commons';
import dayjs from 'dayjs';
import {useMutation} from 'react-query';
import axios from 'axios';

const AvailabilityModal = ({route}) => {
  const {goBack} = useNavigation();
  const now = dayjs(new Date().setMinutes(0));
  const {
    onSubmit = () => false,
    initialTimeList,
    id,
    title,
    tempArray,
  } = route.params;
  const [availableTimeList, setAvailableTimeList] = useState(
    // initialTimeList.length > 0
    //   ? initialTimeList
    //   :
    [
      {
        id: 1,
        startTime: now.toDate(),
        endTime: now.minute(15).toDate(),
      },
    ],
  );
  const [otherDays] = useState(
    GENERAL_CONST.weekDays.filter(item => item.title !== route.params.title),
  );

  // const updateTimes = useMutation({
  //   mutationFn: async () => {
  //     tempArray.current[id - 1] = availableTimeList.map(item => {
  //       return {
  //         from:
  //           item.startTime.getHours() * 3600 + item.startTime.getMinutes() * 60,
  //         to: item.endTime.getHours() * 3600 + item.endTime.getMinutes() * 60,
  //       };
  //     });
  //     return await axios.post('/pro/setup/times', {
  //       times: JSON.stringify(tempArray.current),
  //     });
  //   },
  //   onSuccess: goBack,
  // });

  const onAddTimeSlot = id => {
    const endTime = dayjs(availableTimeList[id - 1].endTime);

    setAvailableTimeList(prevState => [
      ...prevState,
      {
        id: id + 1,
        startTime: availableTimeList[id - 1].endTime,
        endTime: endTime.minute(endTime.minute() + 15).toDate(),
      },
    ]);
  };

  const onRemoveHandler = id => {
    if (availableTimeList.length > 1) {
      let tempList = [...availableTimeList];
      var filteredList = tempList.filter(i => i.id !== id);
      setAvailableTimeList(filteredList);
    }
  };

  const onPressHandler = (selectedTime, id) => {
    let findedIndex = availableTimeList.findIndex(item => item.id === id);

    setAvailableTimeList(prevState =>
      prevState.map((item, index) => {
        if (item.id === id) {
          item.startTime = selectedTime.startTime;
          item.endTime = selectedTime.endTime;
        }
        if (index > findedIndex) {
          const prevItem = prevState[index - 1];
          const endTime = dayjs(prevItem.endTime);

          if (item.startTime < prevItem.endTime) {
            item.startTime = prevItem.endTime;
            item.endTime = endTime.minute(endTime.minute() + 15).toDate();
          }
        }
        return item;
      }),
    );
  };

  return (
    <FullScreenModalWrapper
      title={'Availability'}
      backButton
      buttonTitle={'Save'}
      contentContainerStyle={tw` flex-1`}
      onSubmit={goBack}>
      <SectionWrapper
        title={route.params.title}
        headerSeparator
        type="switch"
        isAccordion
        isActiveDefaultValue={true}
        onPress={() => setAvailableTimeList([])}>
        {availableTimeList.map(item => {
          return (
            <Animated.View
              key={item.id}
              entering={FadeIn.duration(350).easing(Easing.cubic(Easing.out))}
              exiting={FadeOut.duration(200).easing(Easing.cubic(Easing.out))}>
              <TimePicker
                startTimePrefix="from"
                ednTimePrefix="to"
                startTime={
                  dayjs(item.startTime).isBefore(
                    dayjs(
                      availableTimeList.find(p => p.id === item.id - 1)
                        ?.startTime,
                    ).format('HH:mm'),
                    'hour',
                  )
                    ? availableTimeList.find(p => p.id === item.id - 1)
                        ?.startTime
                    : item.startTime
                }
                endTime={item.endTime}
                minimumTime={
                  availableTimeList.length > 1
                    ? availableTimeList.find(p => p.id === item.id - 1)?.endTime
                    : null
                }
                isRemoveable={item.id > 1}
                onDelete={() => onRemoveHandler(item.id)}
                onSubmit={selectedTime => onPressHandler(selectedTime, item.id)}
              />
            </Animated.View>
          );
        })}
        <Button
          title={'Add Additional Hours'}
          defaultColor={'#FF6E00'}
          titleStyle={tw`bv-sans-sm text-primary`}
          onPress={() => onAddTimeSlot(availableTimeList.length)}
        />

        <View style={tw`w-full h-0.25 bg-black opacity-10 mb-4`} />
        {/* <SectionWrapper
          title="Apply to other days"
          type="switch"
          isAccordion
          isActiveDefaultValue={false}
          containerStyle={tw`p-0`}>
          <Animated.View
            entering={FadeIn.duration(350).easing(Easing.cubic(Easing.out))}
            exiting={FadeOut.duration(200).easing(Easing.cubic(Easing.out))}>
            <CheckBoxGroup options={otherDays} row style={tw`mb-2`} />
          </Animated.View>
        </SectionWrapper> */}
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {AvailabilityModal};
