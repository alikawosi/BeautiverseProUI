import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ArrowDown2, ArrowLeft2, ArrowRight2} from 'iconsax-react-native';
import {Calendar} from 'react-native-calendars';

import tw from '../../../../tailwind';
import {DatePicker} from '../../commons';
import {CALENDAR_CONST} from '../../../constants';
import { useNavigation } from '@react-navigation/native';

const markedDatesData = {
  '2022-11-25': {dots: CALENDAR_CONST.servicesDotData},
  '2022-11-26': {dots: CALENDAR_CONST.servicesDotData},
};

const Evening = () => {
  const [todayDate] = useState(new Date());
  const {navigate} = useNavigation()
  const [markedDates, setMarkedDates] = useState(markedDatesData);
  const onPress = day => {
    var tempMarkDateList = Object.fromEntries(
      Object.entries(markedDatesData).map(([key, val]) => {
        val.selected = false;
        return [key, val];
      }),
    );
    if (Object.keys(markedDatesData).find(item => item === day)) {
      tempMarkDateList[day].selected = true;
      setMarkedDates(tempMarkDateList);
    } else {
      var dateSelected = {[day]: {selected: true}};
      tempMarkDateList = {...tempMarkDateList, ...dateSelected};
      setMarkedDates(tempMarkDateList);
    }
    return;
  };

  return (
    <View style={tw`w-full`}>
      <DatePicker
        label={'Current Day'}
        suffix={<ArrowDown2 color={'#7A7A8A'} />}
      />
      <Calendar
        //renderHeader={<View />}
        initialDate={todayDate.toISOString().substring(0, 10)}
        accessibilityValue={todayDate.toISOString().substring(0, 10)}
        minDate={todayDate.toISOString().substring(0, 10)}
        onDayPress={day =>  navigate('Appointments',{selectedDay:day})}
        renderArrow={direction => {
          if (direction === 'right') {
            return <ArrowRight2 size={18} color="#545569" />;
          } else {
            return <ArrowLeft2 size={18} color="#545569" />;
          }
        }}
        hideExtraDays={true}
        monthFormat={'MMM yyyy'}
        disableAllTouchEventsForDisabledDays={true}
        onPressArrowLeft={subtractMonth => subtractMonth()}
        onPressArrowRight={addMonth => addMonth()}
        enableSwipeMonths={true}
        markingType={'multi-dot'}
        markedDates={markedDates}
        theme={{
          dayTextColor: '#313244',
          textDayFontFamily: 'Gilroy-SemiBold',
          textDayFontSize: 14,
          monthTextColor: '#545569',
          dotColor: '#5948AA',
          selectedDotColor: 'white',
          'stylesheet.calendar.header': {
            week: {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 12,
              paddingBottom: 4,
              borderBottomWidth: 1,
              borderColor: '#CACED9',
            },
            monthText: {
              fontSize: 14,
              fontFamily: 'Gilroy-SemiBold',
              color: '#545569',
              margin: 0,
            },
            dayHeader: {
              marginTop: 0,
              marginBottom: 0,
              width: 32,
              textAlign: 'center',
              fontSize: 12,
              fontFamily: 'Gilroy-SemiBold',
              color: '#545569',
            },
          },
          'stylesheet.day.basic': {
            selected: {
              backgroundColor: '#FF6E00',
              borderRadius: 100,
            },
            todayText: {color: '#5948AA'},
            today: {
              backgroundColor: 'red',
              borderBottomWidth: 1,
              borderColor: '#5948AA',
            },
            disabledText: {
              color: '#7A7A8A',
              // backgroundColor: '#F2F3F6',
              // borderRadius: 100,
              opacity: 0.5,
            },
            inactiveText: {
              color: '#7A7A8A',
              opacity: 0.5,
            },
          },
        }}
      />
      <Text style={tw`bv-med-sm text-center mt-4`}>Augest 2022</Text>
    </View>
  );
};

export {Evening};
