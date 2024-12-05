import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import tw from '../../../tailwind';
import {CALENDAR_CONST} from '../../constants';
import {ModalWrapper, SwitchBox} from '../commons';
import {SectionWrapper, Tag} from '../elements';

const CalendarSettingModal = ({route}) => {
  const {
    initialCalendarMode,
    onSubmit = () => false,
    setParams,
    params,
    refetchEvents,
  } = route.params;
  const [selectedMode, setSelectedMode] = useState(initialCalendarMode);

  const Separator = ({style}) => {
    return <View style={tw.style('w-full h-px bg-gray-200', style)} />;
  };

  useFocusEffect(() => {
    return () => {
      refetchEvents();
    };
  });

  return (
    <ModalWrapper
      style={tw`bg-background pb-5 max-h-[80%]`}
      title={'Calendar Settings'}
      titleSeparator>
      <SectionWrapper style={tw`mb-0 flex-1`}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tw`bv-sans-base mb-4`}>Calendar View</Text>
          <View style={tw`flex-row justify-between`}>
            {CALENDAR_CONST.calendarMode.map(item => {
              return (
                <Tag
                  onPress={() => {
                    setSelectedMode(item.id);
                    onSubmit(item.id);
                  }}
                  style={tw`flex-1 items-center`}
                  title={item.value}
                  selected={item.id === selectedMode ? true : false}
                />
              );
            })}
          </View>
          <Separator style={tw`my-6`} />
          <Text style={tw`bv-sans-base`}>Filters</Text>
          {CALENDAR_CONST.filtersFormData.map(({name, label}) => (
            <SwitchBox
              label={label}
              key={name}
              formValue={params[name]}
              containerStyle={tw`mt-4`}
              onChange={value => setParams(prev => ({...prev, [name]: value}))}
            />
          ))}
          <Separator style={tw`my-6`} />
          <Text style={tw`bv-sans-base`}>Attributes</Text>
          {CALENDAR_CONST.attributesFormData.map(({name, label}) => (
            <SwitchBox
              key={name}
              label={label}
              formValue={params[name]}
              containerStyle={tw`mt-4`}
              onChange={value => setParams(prev => ({...prev, [name]: value}))}
            />
          ))}
        </ScrollView>
      </SectionWrapper>
    </ModalWrapper>
  );
};

export {CalendarSettingModal};
