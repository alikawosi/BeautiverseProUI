import React, {useMemo} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {ArrowRight2, TickCircle, Warning2} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from 'react-query';
import {MenuOption} from 'react-native-popup-menu';
import axios from 'axios';
import dayjs from 'dayjs';

import tw from '../../../../../tailwind';
import {
  Accordion,
  Button,
  FullScreenModalWrapper,
  Input,
} from '../../../commons';
import {
  Profile,
  SectionWrapper,
  ServicesAndItems,
  ClientLocation,
  PhotoPicker,
} from '../../../elements';

const AppointmentDetailsModal = () => {
  const {navigate} = useNavigation();
  const {bookId, clientId} = useRoute().params;
  const {data, isLoading} = useQuery({
    queryKey: ['appointmentDetails', bookId],
    queryFn: () =>
      axios.get('/pro/appointment', {
        params: {
          book_id: bookId,
        },
      }),
  });
  const bookDate = data?.book_date && dayjs(data.book_date * 1000);
  const status = data?.status;
  const confirmed = data?.confirmed;
  const paid = status === 'paid';
  const collectFeeAmount = data?.no_show_fee || data?.cancellation_fee;

  const collectFee = useMutation(type =>
    axios.post(
      `/pro/appointment/${type === 'canceled' ? 'cancel' : 'no_show'}/collect`,
      {
        book_id: bookId,
      },
    ),
  );

  const STEPS = {
    unpaid: {
      button: {
        title: 'Checkout',
        onPress: () =>
          navigate('Checkout', {
            bookId: bookId,
          }),
      },
      caption: 'Unpaid',
    },
    canceled: {
      title: 'Appointment is Cancelled',
      caption: `${collectFeeAmount} Cancelation Fee`,
      button: {
        title: 'Collect Cancellation Fee',
        onPress: () => collectFee.mutate('canceled'),
      },
    },
    no_show: {
      title: 'Appointment is No Show',
      caption: `${collectFeeAmount} No Show Fee`,
      button: {
        title: 'Collect No-Show Fee',
        onPress: () => collectFee.mutate('noShow'),
      },
    },
    paid: {
      title: 'Completed',
      caption: 'Paid',
    },
  };
  const options = useMemo(
    () => [
      // {
      //   id: 1,
      //   title: 'Confirm appointment',
      //   titleStyle: 'text-[#FF6E00]',
      //   style: 'mb-2 h-9 border-b border-[#E4E7EC]',
      //   onSelect: () => null,
      // },
      // {
      //   id: 2,
      //   title: 'Edit',
      //   onSelect: () => null,
      // },
      // {
      //   id: 3,
      //   title: 'Book Next',
      //   onSelect: () => null,
      // },
      {
        id: 4,
        title: 'Mark as No-Show',
        titleStyle: 'bv-sans-sm text-primary',
        onSelect: () => {
          navigate('ConfirmModal', {
            route: 'no_show',
            fee: data?.no_show_fee,
            bookId: bookId,
            onCharge: () => collectFee.mutate('noShow'),
          });
        },
      },
      {
        id: 5,
        title: 'Cancel',
        titleStyle: 'text-[#FF4444]',
        onSelect: () => {
          navigate('ConfirmModal', {
            route: 'cancel',
            fee: data?.cancellation_fee,
            bookId: bookId,
            onCharge: () => collectFee.mutate('canceled'),
          });
        },
      },
    ],
    [data],
  );

  return (
    <FullScreenModalWrapper
      backButton
      MenuOptions={
        <>
          {options.map(({id, title, style, titleStyle, onSelect}) => (
            <MenuOption
              key={id}
              style={tw.style('h-9', style)}
              onSelect={onSelect}>
              <Text style={tw.style('bv-med-sm', titleStyle)}>{title}</Text>
            </MenuOption>
          ))}
        </>
      }
      title="Appointment Details"
      hasSeparator={false}
      contentContainerStyle={tw`flex-grow`}
      buttonTitle="Option">
      {isLoading ? (
        <View style={tw`justify-center items-center flex-grow`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <SectionWrapper>
            <Profile
              hasBg
              {...data.client}
              icon={<ArrowRight2 color="#313244" />}
            />
            <View
              style={tw`flex-row bg-selectedGray rounded-2xl px-3 py-4 my-4`}>
              <Text style={tw`text-[#545569] font-bold text-sm mr-auto`}>
                {bookDate.format('DD MMM YYYY')}
              </Text>
              <Text style={tw`text-[#545569] font-bold text-sm`}>
                {bookDate.format('HH:mm A')}
                <Text style={tw`text-descGray`}> • {data.duration}</Text>
              </Text>
            </View>
            {!paid && (
              <Button
                primary
                titleStyle={tw`text-sm`}
                gradientStyle={tw`rounded-lg`}
                {...STEPS[status].button}
              />
            )}
            <View style={tw`mx-auto flex-row items-center my-4`}>
              {paid ? (
                <TickCircle size={18} variant="Bold" color="#00C851" />
              ) : (
                <Warning2 size={18} variant="Bold" color="#FFBB33" />
              )}
              <Text
                style={tw.style(
                  'text-sm font-bold rounded-10 ml-2 capitalize',
                  {
                    'text-basicGreen ': paid,
                    'text-[#FFBB33] ': !paid || !confirmed,
                  },
                )}>
                {confirmed
                  ? data.total + ' ' + STEPS[status].caption
                  : 'Unconfirmed'}
              </Text>
            </View>
            <View style={tw`items-center mt-2`}>
              <Text style={tw`text-xs text-[#9F9FAB]`}>
                Booked on
                <Text style={tw`font-bold`}>
                  {dayjs(data.book_created_date * 1000).format(' DD MMM YYYY')}
                </Text>
              </Text>
              {data.card_last4 && (
                <View style={tw`flex-row`}>
                  <TickCircle size={16} color="#7A7A8A" />
                  <Text style={tw`text-xs text-[#9F9FAB] ml-1`}>
                    No-show protected with card ending in {data.card_last4}
                  </Text>
                </View>
              )}
            </View>
          </SectionWrapper>
          <Text style={tw`text-sm text-descGray mb-3 mx-5`}>
            Servies & Items
          </Text>
          <SectionWrapper>
            <ServicesAndItems {...data} />
            {/* {paid && (
              <Button
                title="View Transaction"
                titleStyle={tw`text-[#FF6E00] text-xs font-sans`}
                onPress={() =>
                  navigate('Client', {
                    screen: 'Transaction',
                    params: {clientId: clientId, id: bookId},
                  })
                }
              />
            )} */}
          </SectionWrapper>
          {data.client_location.address && (
            <>
              <Text style={tw`text-sm text-descGray mb-3 mx-5`}>
                Client Location
              </Text>
              <SectionWrapper>
                <ClientLocation {...data.client_location} />
              </SectionWrapper>
            </>
          )}
          <SectionWrapper>
            <Accordion title="Client Note / Attachment">
              <View style={tw`mb-2 px-2`}>
                <Text style={tw`bv-sans-sm my-2`}>Note : </Text>
                {data.note ? (
                  <Text style={tw`bv-reg-sm`}>{data.user_note}</Text>
                ) : (
                  <Text style={tw`self-center my-2`}>No note added !</Text>
                )}
              </View>
              <PhotoPicker
                style={tw`mt-4`}
                buttonTheme={2}
                defaultValue={data.user_attachments}
                chooseable={false}
              />
            </Accordion>
          </SectionWrapper>
          <SectionWrapper>
            <Accordion title="Beautician Note / Attachments">
              <View style={tw`mb-2 px-2`}>
                <Text style={tw`bv-sans-sm my-2`}>Note : </Text>
                {data.beautician_note ? (
                  <Text style={tw`bv-reg-sm`}>{data.beautician_note}</Text>
                ) : (
                  <Text style={tw`self-center my-2`}>No note added !</Text>
                )}
              </View>
              <PhotoPicker
                style={tw`mt-4`}
                buttonTheme={2}
                defaultValue={data.beautician_attachments}
                chooseable={false}
              />
            </Accordion>
          </SectionWrapper>
        </>
      )}
    </FullScreenModalWrapper>
  );
};

export {AppointmentDetailsModal};
