import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, TouchableOpacity, Pressable} from 'react-native';
import Animated, {Easing, FadeIn, FadeInUp} from 'react-native-reanimated';
import dayjs from 'dayjs';

import tw from '../../../../tailwind';
import {Add, CloseCircle, ProfileAdd, Shop} from 'iconsax-react-native';

const CalendarFooter = ({
  goToDate,
  selectedEvent,
  onCreatedEvent,
  isAddMenuOpen,
  onCancel,
}) => {
  const {navigate} = useNavigation();

  return (
    <View style={tw`absolute bottom-5 right-5 items-end h-50 justify-end`}>
      {isAddMenuOpen && (
        <Animated.View
          entering={FadeInUp.duration(250)
            .easing(Easing.cubic(Easing.out))
            .delay(220)}>
          <View style={tw`flex-row-reverse items-center mb-3`}>
            <TouchableOpacity
              style={tw`bg-white h-12 w-12 rounded-2xl justify-center items-center shadow-lg`}
              onPress={() =>
                navigate('Booking', {
                  screen: 'NewPersonalEventModal',
                  params: {
                    onCreatedEvent,
                    minimumDate: dayjs().toDate(),
                    eventDate: selectedEvent.event,
                  },
                })
              }>
              <ProfileAdd size={24} color="#FF9100" />
            </TouchableOpacity>
            <View style={tw`bg-white p-2 shadow-lg h-8 rounded-lg mr-2`}>
              <Text style={tw`bv-sans-sm text-descGray`}>Personal Event</Text>
            </View>
          </View>
          {!selectedEvent.id && (
            <>
              <View style={tw`flex-row-reverse items-center mb-3`}>
                <TouchableOpacity
                  onPress={() =>
                    navigate('Booking', {
                      screen: 'NewAppointmentModal',
                      params: {
                        onCreatedEvent,
                      },
                    })
                  }
                  style={tw`bg-white h-12 w-12 rounded-2xl justify-center items-center shadow-lg`}>
                  <Shop size={24} color="#FF9100" />
                </TouchableOpacity>
                <View style={tw`bg-white p-2 shadow-lg h-8 rounded-lg mr-2`}>
                  <Text style={tw`bv-sans-sm text-descGray`}>
                    Appointment Event
                  </Text>
                </View>
              </View>
            </>
          )}
        </Animated.View>
      )}
      {!isAddMenuOpen && (
        <Animated.View
          style={tw`items-end`}
          //exiting={FadeOut.duration(1).easing(Easing.cubic(Easing.in))}
          entering={FadeIn.duration(200)
            .easing(Easing.cubic(Easing.in))
            .delay(150)}>
          <TouchableOpacity
            style={tw`bg-white h-12 w-12 rounded-2xl justify-center items-center mb-3 shadow-lg`}
            onPress={goToDate.bind(null, null)}>
            <Text style={tw`bv-sans-sm text-primary`}>Today</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      <Pressable
        style={tw.style(
          'bg-primary h-12 w-12 rounded-2xl justify-center items-center shadow-lg',
          {
            'bg-white': isAddMenuOpen,
          },
        )}
        onPress={onCancel.bind(null, !isAddMenuOpen)}>
        {isAddMenuOpen ? (
          <Animated.View
            entering={FadeIn.duration(500).easing(Easing.cubic(Easing.out))}>
            <CloseCircle size={32} color="#FF6E00" />
          </Animated.View>
        ) : (
          <Animated.View
            entering={FadeIn.duration(500).easing(Easing.cubic(Easing.out))}>
            <Add size={32} color="white" />
          </Animated.View>
        )}
      </Pressable>
    </View>
  );
};

export {CalendarFooter};
