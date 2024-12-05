import {TimelineCalendar} from 'calendar-kit';
import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Line, Svg} from 'react-native-svg';

const unavailableHours = {
  0: [{start: 0, end: 24}],
  1: [
    {start: 0, end: 7},
    {start: 18, end: 24},
  ],
};

const Test = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();

  const _onDragCreateEnd = event => {
    const randomId = Math.random().toString(36).slice(2, 10);
    const newEvent = {
      id: randomId,
      start: event.start,
      end: event.end,
      event: {
        title: 'Alice barton',
        type: 'appointment',
        category: 'Hybrid Lashes',
        reservedByClient: false,
      },
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const _onLongPressEvent = event => {
    setSelectedEvent(event);
  };

  const _onPressCancel = () => {
    setSelectedEvent(undefined);
  };

  const _onPressSubmit = () => {
    setEvents(prevEvents =>
      prevEvents.map(ev => {
        if (ev.id === selectedEvent?.id) {
          return {...ev, ...selectedEvent};
        }
        return ev;
      }),
    );
    setSelectedEvent(undefined);
  };

  const _renderEditFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={_onPressCancel}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={_onPressSubmit}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
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
    <SafeAreaView style={styles.container}>
      <TimelineCalendar
        ref={calendarRef}
        events={events}
        unavailableHours={unavailableHours}
        onDragCreateEnd={_onDragCreateEnd}
        onLongPressEvent={_onLongPressEvent}
        selectedEvent={selectedEvent}
        onEndDragSelectedEvent={setSelectedEvent}
        hourFormat="hh:mm a"
        useHaptic
        renderHalfLineCustom={_renderHalfLineCustom}
        halfLineContainerStyle={styles.halfLineContainer}
      />
      {!!selectedEvent && _renderEditFooter()}
    </SafeAreaView>
  );
};

export default Test;

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
