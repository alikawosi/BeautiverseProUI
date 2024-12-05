import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
  Dimensions,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {ArrowLeft2, ArrowRight2} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from 'react-query';
import axios from 'axios';
import dayjs from 'dayjs';

import tw from '../../../../../tailwind';
import {EmptyScreen, FullScreenModalWrapper} from '../../../commons';
import {SectionWrapper} from '../../../elements';
import {GENERAL_CONST} from '../../../../constants';

const windowWidth = Dimensions.get('window').width;
const DATE_FORMAT = 'YYYY-MM-DD';

const DateAndTimeModal = () => {
  const {params} = useRoute();
  const {goBack} = useNavigation();
  const today = dayjs(new Date());
  const selectedDateTime = params?.selectedDateTimestamp
    ? dayjs.utc(params?.selectedDateTimestamp * 1000)
    : null;
  const currentDate = today.format(DATE_FORMAT);
  const [selectedTime, setSelectedTime] = useState(
    selectedDateTime
      ? selectedDateTime.hour() * 3600 + selectedDateTime.minute() * 60
      : null,
  );
  const [selectedDate, setSelectedDate] = useState(
    selectedDateTime
      ? selectedDateTime.hour(today.hour()).minute(today.minute())
      : today,
  );
  const date = selectedDate.format(DATE_FORMAT);
  const monthIsChange = useRef(false);
  const offDays = useQuery({
    queryKey: ['offDays'],
    queryFn: () => axios.get('/pro/booking/off_days'),
  });
  const {data: dayTimes, isLoading} = useQuery({
    queryKey: ['dayTimes', date, ...params?.variations],
    queryFn: () =>
      axios.get('/pro/booking/times', {
        params: {
          date: selectedDate.unix(),
          variations: params?.variations,
        },
      }),
  });

  console.log(dayjs(selectedDate).day());
  const weekDay = GENERAL_CONST.weekDays.find(
    ({id}) => id === dayjs(selectedDate).day(),
  )?.title;
  const onDayPress = ({dateString, timestamp}) => {
    setSelectedDate(dateString === currentDate ? today : dayjs(timestamp));
    setSelectedTime(null);
  };
  const onMonthChange = ({day, dateString, month, timestamp}) => {
    if (!monthIsChange.current) return;

    setSelectedDate(
      (month == today.month() + 1 && day < today.date()) ||
        dateString === currentDate
        ? today
        : dayjs(timestamp).date(1),
    );
    monthIsChange.current = false;
  };
  const onPressArrowLeft = subtractMonth => {
    if (date === currentDate) return;

    monthIsChange.current = true;
    subtractMonth();
  };
  const onPressArrowRight = addMonth => {
    monthIsChange.current = true;
    addMonth();
  };
  const onTimePress = seconds => {
    setSelectedTime(seconds);
  };

  const onSubmit = () => {
    const value = dayjs(
      selectedDate.hour(0).minute(0).second(selectedTime).utc(true).unix() *
        1000,
    );
    params?.setDate({
      timestamp: value.unix(),
      title: `${weekDay}, ${value.format('MMM DD [at] HH:mm A')} `,
    });
    goBack();
  };

  const markedDates = offDays?.data?.reduce(
    (disableDays, day) => {
      disableDays[dayjs().date(day).format(DATE_FORMAT)] = {
        disabled: true,
        disableTouchEvent: true,
      };
      return disableDays;
    },
    {[date]: {selected: true}},
  );
  const availableTimes = [
    dayTimes?.morning,
    dayTimes?.afternoon,
    dayTimes?.evening,
  ].filter(item => item?.length);

  return (
    <FullScreenModalWrapper
      backButton
      onSubmit={onSubmit}
      buttonTitle="Save"
      title="Date & Time"
      hasSeparator={false}
      contentContainerStyle={tw`flex-grow`}>
      <SectionWrapper style={tw`flex-grow`}>
        <Calendar
          initialDate={date}
          minDate={currentDate}
          onPressArrowRight={onPressArrowRight}
          onPressArrowLeft={onPressArrowLeft}
          onDayPress={onDayPress}
          enableSwipeMonths={true}
          markedDates={markedDates}
          onMonthChange={onMonthChange}
          renderArrow={direction => {
            if (direction === 'right') {
              return <ArrowRight2 size={16} color="#7A7A8A" />;
            } else {
              return <ArrowLeft2 size={16} color="#7A7A8A" />;
            }
          }}
          headerStyle={tw`flex-col-reverse`}
          theme={{
            textDayFontSize: 14,
            selectedDayBackgroundColor: '#313244',
            textDayFontFamily: 'Gilroy-SemiBold',
            'stylesheet.calendar.header': {
              monthText: tw`text-descGray text-sm`,
              dayHeader: tw`text-descGray text-xs`,
            },
          }}
        />
        <Text
          style={tw`text-descGray text-sm mt-5 pt-5 border-t border-[#E4E7EC] text-center mb-5`}>
          Availability for{' '}
          {`${weekDay}, ${dayjs(selectedDate).format('MMM D')}`}
        </Text>
        <>
          {isLoading ? (
            <View style={tw`items-center justify-center flex-1`}>
              <ActivityIndicator />
            </View>
          ) : (
            <>
              {Boolean(availableTimes.length) ? (
                <View style={tw`flex-row flex-wrap`}>
                  {availableTimes
                    .reduce((array, times) => {
                      return array.concat(
                        times.map(minutes => ({
                          value: minutes,
                          title: dayjs(
                            dayjs()
                              .hour(0)
                              .minute(0)
                              .second(minutes)
                              .utc(true)
                              .unix() * 1000,
                          ).format('HH:mm A'),
                        })),
                      );
                    }, [])
                    .map(({title, value}, index) => (
                      <Pressable
                        key={value}
                        onPress={onTimePress.bind(null, value)}
                        style={tw.style(
                          `border border-[#CACED9] px-[7.5px] py-[8.5px] rounded-xl`,
                          {
                            'mt-4': index > 3,
                            'mr-2': index % 4 < 3,
                            width: (windowWidth - 64) / 4,
                            'bg-black border-transparent shadow-lg':
                              value === selectedTime,
                          },
                        )}>
                        <Text
                          style={tw.style(`text-descGray text-sm text-center`, {
                            'text-white': value === selectedTime,
                          })}>
                          {title}
                        </Text>
                      </Pressable>
                    ))}
                </View>
              ) : (
                <EmptyScreen />
              )}
            </>
          )}
        </>
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {DateAndTimeModal};
