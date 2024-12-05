import React, {useRef, useState} from 'react';
import {ArrowRight2} from 'iconsax-react-native';
import {View, Text, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {SectionWrapper} from './';
import {GENERAL_CONST} from '../../../constants';

const AvailibilityTimeCard = ({
  style,
  data,
  type = 'default',
  onEdit = () => false,
  onDelete = () => false,
}) => {
  const {navigate} = useNavigation();
  const tempArray = useRef([]);
  const [availableTimeListInfo, setAvailableTimeListInfo] = useState(
    data?.map((item, index) => {
      return {
        id: index + 1,
        day: GENERAL_CONST.weekDays[index].title,
        availabelTime: item.split('-'),
      };
    }),
  );

  const onTimeSet = (id, list) => {
    let tempList = [...availableTimeListInfo];
    let filteredList = tempList.filter(t => t.id === id);
    let index = tempList.indexOf(t => t.id === id);
    filteredList[0].availabelTime = list;
    tempList[index] = filteredList;
    setAvailableTimeListInfo(tempList);
  };

  return (
    <SectionWrapper
      headerSeparator
      containerStyle={tw.style('px-4 py-6 mb-4', style)}
      option={type === 'specieficAvailibility'}
      onEdit={onEdit}
      onDelete={onDelete}
      title={'Working Hours'}
      titleStyle={tw`bv-sans-base text-black`}>
      {availableTimeListInfo?.map(item => {
        return (
          <Pressable
            key={item.id}
            style={tw`flex-row justify-between p-3 mb-2`}
            onPress={() => {
              navigate('BusinessSetup', {
                screen: 'AvailabilityModal',
                params: {
                  tempArray,
                  id: item.id,
                  title: item.day,
                  onSubmit: timeList => onTimeSet(item.id, timeList),
                },
              });
            }}>
            <Text style={tw`bv-sans-sm`}>{item.day}</Text>
            <View style={tw`flex-row`}>
              {item.availabelTime?.length > 1 ? (
                <Text>
                  {item.availabelTime[0] + ' - ' + item.availabelTime[1]}
                </Text>
              ) : (
                <Text style={tw.style('bv-sans-xs text-primary mr-4')}>
                  Unset
                </Text>
              )}
              <ArrowRight2 size={20} color="#7A7A8A" />
            </View>
          </Pressable>
        );
      })}
    </SectionWrapper>
  );
};

export {AvailibilityTimeCard};
