import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowDown2, Note, Setting4} from 'iconsax-react-native';
import {Line, Svg} from 'react-native-svg';
import {TimelineCalendar} from 'calendar-kit';

import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';
import axios from 'axios';
import {useQueries} from 'react-query';

import tw from '../../../tailwind';
import {
  CalendarFooter,
  MonthlyCalendar,
} from '../../components/screens/Calendar';

const calendarModeDays = {
  day: 1,
  threeDays: 3,
};

const CalendarIntro = () => {
  const {navigate} = useNavigation();
  const [params, setParams] = useState({
    my_location: false,
    client_location: false,
    unconfirmed: false,
    confirm: false,
    in_progress: false,
    completed: false,
  });
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [calendarMode, setCalendarMode] = useState('threeDays');
  const today = dayjs(new Date());
  const [selectedDate, setSelectedDate] = useState(today);
  const [newDate, setNewDate] = useState(null);
  const hasMount = useRef(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  // Calendar const
  const calendarRef = useRef(null);
  const [events, setEvents] = useState({});
  const [selectedEvent, setSelectedEvent] = useState({id: null, event: null});
  const [isLoading, setIsLoading] = useState(false);
  const sholudRefetch = useRef(false);
  const currentDate = useRef(null);
  const days = useMemo(
    () =>
      new Array(calendarModeDays[calendarMode])
        .fill(newDate)
        .map((date, index) => date?.set('date', date?.date() + index)),
    [newDate, calendarMode],
  );
  const data = useQueries(
    days.map(date => ({
      enabled: Boolean(date),
      queryKey: ['calendar', date?.format('YYYY-MM-DD')],
      queryFn: () =>
        axios.get('/pro/calendar', {
          params: {
            date: date.utc(true).unix(),
            ...params,
            limit: 100,
          },
        }),
    })),
  );
  const loadings = useMemo(
    () => data?.map(query => query.isLoading || query.isFetching),
    [data],
  );

  useEffect(() => {
    const queriesData = data
      ?.flatMap(query => query.data)
      .filter(item => item?.id);
    setIsLoading(loadings.some(loading => loading));

    if (
      queriesData?.filter(event => event)?.length &&
      (sholudRefetch.current
        ? !loadings[currentDate.current]
        : loadings.every(loading => !loading))
    ) {
      const newEvents = (
        sholudRefetch.current ? data[currentDate.current].data : queriesData
      ).reduce((obj, {id, time, services, user, distance}) => {
        obj[id] = {
          id: id,
          start: dayjs(time[0] * 1000).toISOString(),
          end: dayjs(time[1] * 1000).toISOString(),
          event: {
            title: user || 'Personal Event',
            type: user ? 'appointment' : 'personal',
            category: services,
            description: distance,
            reservedByClient: false,
            haveAttachment: false,
          },
        };
        return obj;
      }, {});

      sholudRefetch.current = false;
      currentDate.current = null;

      if (Object.values(newEvents).length) {
        setEvents(prev => ({...prev, ...newEvents}));
      }
    }
  }, [loadings.join('')]);

  const goToDate = useCallback(
    value => {
      const date = dayjs(value || today);
      calendarRef.current?.goToDate({
        date: date.format('YYYY-MM-DD'),
      });
      calendarRef.current?.goToHour(today.hour());
    },
    [calendarRef.current],
  );

  const _onDragCreateEnd = event => {
    if (dayjs(event.start).diff(today.format(), 'minute') < 0) return;

    const id = Math.random().toString(36).slice(2, 10);
    const newEvent = {
      id,
      start: event.start,
      end: event.end,
      event: {
        title: '+ New',
        type: 'add',
        reservedByClient: false,
      },
    };
    setSelectedEvent({id, event});
    setIsAddMenuOpen(true);
    setEvents(prev => ({...prev, [id]: newEvent}));
  };

  const onCancel = openMenu => {
    setIsAddMenuOpen(openMenu);

    if (!selectedEvent.id) return;

    setEvents(prev => {
      delete prev[selectedEvent.id];
      return prev;
    });
    setSelectedEvent({id: null, event: null});
  };

  const onDateChanged = date => {
    setNewDate(dayjs(date));
  };

  const setInitialDate = ({date}) => {
    if (hasMount.current) return;
    onDateChanged(date);
    hasMount.current = true;
  };

  const onCreatedEvent = value => {
    const index = days.findIndex(
      date =>
        dayjs(date).format('YYYY-MM-DD') === dayjs(value).format('YYYY-MM-DD'),
    );
    if (index < 0) {
      goToDate(value);
    } else {
      currentDate.current = index;
      data[index].refetch();
      sholudRefetch.current = true;
    }
    onCancel(false);
  };

  const onPressEvent = selectedEvent => {
    const {
      event: {type},
      id,
    } = selectedEvent;

    if (type === 'appointment') {
      navigate('AppointmentDetails', {
        screen: 'AppointmentDetailsModal',
        params: {
          bookId: id,
        },
      });
    } else if (type === 'personal') {
      navigate('Booking', {
        screen: 'NewPersonalEventModal',
        params: {
          id,
          onCreatedEvent,
          eventDate: selectedEvent,
        },
      });
    }
  };

  const _renderHalfLineCustom = useCallback(
    width => (
      <Svg>
        <Line
          x1="0"
          y1="1"
          x2={width}
          y2="1"
          stroke="#ececec"
          strokeDasharray={5}
          strokeWidth={2}
        />
      </Svg>
    ),
    [],
  );

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1 bg-white`}>
      <View style={tw`w-full h-14 px-5 items-center flex-row`}>
        <Pressable
          onPress={() =>
            navigate('CalendarSettingModal', {
              initialCalendarMode: calendarMode,
              setParams,
              params,
              onSubmit: mode => {
                setCalendarMode(mode);
              },
              refetchEvents: () => data.forEach(query => query.refetch()),
            })
          }>
          <Setting4 color="#313244" />
        </Pressable>
        <Pressable
          onPress={() => setIsCalendarOpen(true)}
          style={tw`flex-1 items-center flex-row justify-center`}>
          <Text style={tw`bv-med-sm mr-2`}>
            {selectedDate.format('MMM YYYY')}
          </Text>
          <ArrowDown2 size={16} color="#313244" />
        </Pressable>
        <Pressable onPress={() => navigate('BookingAvailability')}>
          <Note color="#313244" />
        </Pressable>
      </View>
      <TimelineCalendar
        viewMode={calendarMode}
        ref={calendarRef}
        onChange={setInitialDate}
        onDateChanged={onDateChanged}
        events={Object.values(events)}
        onPressEvent={onPressEvent}
        onDragCreateEnd={_onDragCreateEnd}
        selectedEvent={selectedEvent?.event}
        hourFormat="hh:mm a"
        useHaptic
        renderHalfLineCustom={_renderHalfLineCustom}
        halfLineContainerStyle={styles.halfLineContainer}
        isLoading={isLoading}
      />
      <CalendarFooter
        goToDate={goToDate}
        onCancel={onCancel}
        selectedEvent={selectedEvent}
        isAddMenuOpen={isAddMenuOpen}
        onCreatedEvent={onCreatedEvent}
      />
      <MonthlyCalendar
        today={today}
        goToDate={goToDate}
        selectedDate={selectedDate}
        isCalendarOpen={isCalendarOpen}
        setSelectedDate={setSelectedDate}
        setIsCalendarOpen={setIsCalendarOpen}
      />
    </SafeAreaView>
  );
};

export default CalendarIntro;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFF'},
  headerRight: {marginRight: 16},
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    height: 85,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    height: 45,
    paddingHorizontal: 24,
    backgroundColor: '#1973E7',
    justifyContent: 'center',
    borderRadius: 24,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  btnText: {fontSize: 16, color: '#FFF', fontWeight: 'bold'},
  halfLineContainer: {backgroundColor: 'transparent'},
});
