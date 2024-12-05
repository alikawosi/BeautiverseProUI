import React, {useState} from 'react';
import {View, Text} from 'react-native';
import dayjs from 'dayjs';
import {DirectInbox} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {CALENDAR_CONST} from '../../constants';
import {PageWrapper, UnderLineTabBar} from '../../components/commons';
import {RequestCard, StatusBar} from '../../components/screens/Calendar';
import {AppointmentCard} from '../../components/elements';

const tabBarData = [
  {
    id: 1,
    title: 'Appointments',
  },
  {
    id: 2,
    title: 'Requests',
  },
  {
    id: 3,
    title: 'Waitlist',
  },
];

const Appointments = ({route}) => {
  const [todayDate] = useState(new Date());

  return (
    <PageWrapper headerShown={true} headerTitle={'Appointments'} backButton>
      {CALENDAR_CONST.fakeDays.map(item => (
        <View key={item.id}>
          <Text
            style={tw.style('ml-5 bv-sans-base', {
              'text-primary': dayjs(todayDate).format('MMM DD') === item.date,
            })}>
            {`${item.weekDay},`}
            <Text
              style={tw.style('bv-sans-base text-descGray', {
                'text-primary': dayjs(todayDate).format('MMM DD') === item.date,
              })}>
              {item.date}
            </Text>
          </Text>
          {dayjs(todayDate).format('MMM DD') === item.date ? (
            <StatusBar appointments={item.appointmentList?.length} />
          ) : null}
          <View style={tw`my-3`}>
            {item.appointmentList?.length > 0 ? (
              item.appointmentList.map((subItem, index) => (
                <View key={subItem.id}>
                  <AppointmentCard styleTheme={index}>
                    <AppointmentCard.Booking {...subItem} />
                  </AppointmentCard>
                  {subItem.appointmentList?.length - 1 !== index ? (
                    <View style={tw`h-3`} />
                  ) : null}
                </View>
              ))
            ) : (
              <View style={tw`flex-row p-5 items-center`}>
                <DirectInbox size={20} color={'#7A7A8A'} />
                <Text style={tw`bv-sans-xs text-descGray ml-2`}>
                  there is no upcoming appointment
                </Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </PageWrapper>
  );
};

export default Appointments;
