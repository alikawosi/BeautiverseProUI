import React, {useMemo, useRef} from 'react';
import Animated, {FadeInUp, FadeOutUp} from 'react-native-reanimated';
import {BlurView} from '@react-native-community/blur';
import {
  Text,
  Platform,
  Pressable,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ArrowLeft2, ArrowRight2, ArrowUp2} from 'iconsax-react-native';
import dayjs from 'dayjs';
import {useQuery} from 'react-query';
import axios from 'axios';
import {Calendar} from 'react-native-calendars';

import tw from '../../../../tailwind';
import {Button} from '../../commons';

const MonthlyCalendar = ({
  goToDate,
  isCalendarOpen,
  setIsCalendarOpen,
  today,
  selectedDate,
  setSelectedDate,
}) => {
  const {top} = useSafeAreaInsets();
  const monthIsChange = useRef(false);
  const selectedDateFormated = selectedDate.format('YYYY-MM-DD');

  const countDaysAppointments = useQuery({
    queryKey: ['countDaysAppointments', selectedDate.month() + 1],
    queryFn: () =>
      axios.get('/pro/calendar/count', {
        params: {
          month: selectedDate.month() + 1,
        },
      }),
  });

  const markedDates = useMemo(() => {
    const selected = {
      selected: selectedDateFormated !== today.format('YYYY-MM-DD'),
    };

    if (!countDaysAppointments.data?.length)
      return {[selectedDateFormated]: selected};

    return countDaysAppointments.data.reduce(
      (obj, {count, day}) => {
        const date = [selectedDate.date(day).format('YYYY-MM-DD')];

        obj[date] = {
          ...obj[date],
          dots: new Array(count).fill({
            color: '#7C49CE',
          }),
        };

        return obj;
      },
      {
        [selectedDateFormated]: selected,
      },
    );
  }, [selectedDateFormated, countDaysAppointments.data]);

  const onDayPress = ({dateString}) => {
    goToDate(dateString);
    setIsCalendarOpen(false);
    goToDate(dayjs(dateString));
    setSelectedDate(dayjs(dateString));
  };

  const onMonthChange = ({dateString}) => {
    if (!monthIsChange.current) return;
    let date = dayjs(dateString);

    date = date.date(date.month() === today.month() ? today.date() : 1);
    goToDate(date.format('YYYY-MM-DD'));
    setSelectedDate(date);
    monthIsChange.current = false;
  };

  const onPressArrowLeft = subtractMonth => {
    monthIsChange.current = true;
    subtractMonth();
  };

  const onPressArrowRight = addMonth => {
    monthIsChange.current = true;
    addMonth();
  };

  const _renderCalendar = () => (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={tw`absolute z-15 top-0 bottom-0 w-full pt-${top / 4}`}>
      <TouchableWithoutFeedback onPress={setIsCalendarOpen.bind(null, false)}>
        <View style={tw`absolute top-0 right-0 left-0 bottom-0`} />
      </TouchableWithoutFeedback>
      <View style={tw`bg-white px-5 pb-4`}>
        <Calendar
          renderHeader={() => (
            <Pressable
              onPress={() => setIsCalendarOpen(false)}
              style={tw`h-12 items-center flex-row justify-center self-center`}>
              <Text style={tw`bv-med-sm mr-2`}>
                {selectedDate.format('MMM YYYY')}
              </Text>
              <ArrowUp2 size={16} color="#313244" />
            </Pressable>
          )}
          onPressArrowLeft={onPressArrowLeft}
          onPressArrowRight={onPressArrowRight}
          onMonthChange={onMonthChange}
          initialDate={selectedDateFormated}
          accessibilityValue={selectedDate.toISOString().substring(0, 10)}
          onDayPress={onDayPress}
          renderArrow={direction => {
            if (direction === 'right') {
              return <ArrowRight2 size={16} color="#313244" />;
            } else {
              return <ArrowLeft2 size={16} color="#313244" />;
            }
          }}
          hideExtraDays={true}
          monthFormat={'MMM yyyy'}
          disableAllTouchEventsForDisabledDays={true}
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
              week: tw`flex-row justify-between mt-3 pb-1 border-b border-b-[#CACED9]`,
              monthText: tw`text-sm font-sans text-[#545569'] m-0`,
              dayHeader: tw`my-0 w-8 text-center text-xs font-sans text-[#545569']`,
            },
            'stylesheet.day.basic': {
              base: tw`w-9 h-9 items-center`,
              todayText: tw`text-white`,
              inactiveText: tw`text-descGray opacity-50`,
              disabledText: tw`text-descGray opacity-50`,
              today: tw`bg-primary rounded-full`,
              selected: tw`border border-primary rounded-full`,
              selectedText: tw`text-primary`,
            },
            'stylesheet.marking': {
              dots: tw`flex-wrap justify-center w-[90%] flex-row`,
            },
          }}
        />
        <Button
          onPress={() => {
            goToDate({});
            setIsCalendarOpen(false);
          }}
          title={'Today'}
          containerStyle={tw`mt-4`}
          defaultColor={'#7A7A8A'}
          titleStyle={tw`bv-sans-sm`}
          style={tw`border border-gray-400 rounded-xl`}
        />
      </View>
    </Animated.View>
  );

  return (
    <>
      {isCalendarOpen ? (
        <>
          {Platform.OS === 'ios' ? (
            <BlurView
              blurType="dark"
              blurAmount={5}
              style={tw`top-0 left-0 right-0 absolute z-20 bottom-0`}>
              {_renderCalendar()}
            </BlurView>
          ) : (
            <View
              style={tw`top-0 left-0 right-0 absolute z-20 bottom-0 bg-[rgba(255,255,255,0.35)]`}>
              {_renderCalendar()}
            </View>
          )}
        </>
      ) : null}
    </>
  );
};

export {MonthlyCalendar};
