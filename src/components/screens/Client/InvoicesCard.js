import React from 'react';
import {Text, View, Pressable} from 'react-native';
import {ArrowRight2} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import dayjs from 'dayjs';

const InvoicesCard = ({
  id,
  style,
  status,
  amount,
  clientId,
  issue_date,
  payment_date,
  payment_method,
}) => {
  const {navigate} = useNavigation();
  const issueDate = dayjs(issue_date * 1000);
  const paymentDate = payment_date && dayjs(payment_date * 1000);
  const onInvoicesCardPress = () => {
    navigate('Client', {
      screen: 'Transaction',
      params: {
        id,
        clientId,
      },
    });
  };

  return (
    <Pressable
      onPress={onInvoicesCardPress}
      style={tw.style('bg-white rounded-[24px] p-5', style)}>
      <View style={tw`flex-row border-b border-black border-opacity-10 pb-4`}>
        <View style={tw`pr-4 mr-4 border-r border-black border-opacity-10`}>
          <Text style={tw`text-descGray text-xs`}>Issue Date:</Text>
          <Text style={tw`text-black font-sans text-sm mt-2`}>
            {issueDate.format('DD MMM, YYYY') +
              ' l ' +
              issueDate.format('HH:mm A')}
          </Text>
        </View>
        <View>
          <Text style={tw`text-descGray text-xs`}>Amount</Text>
          <Text style={tw`text-black font-sans text-sm mt-2`}>${amount}</Text>
        </View>
      </View>
      <View style={tw`mt-4 flex-row relative justify-center`}>
        <Text
          style={tw.style('text-descGray', {
            'text-[#FF4444]': status === 'not_paid',
          })}>
          {status === 'paid'
            ? `Paid on ${paymentDate.format(
                'DD MMM, HH:mm A',
              )} with card ending in ${payment_method}`
            : 'Not Paid!'}
        </Text>
        <ArrowRight2 size={16} color="#7A7A8A" style={tw`absolute right-0`} />
      </View>
    </Pressable>
  );
};

export {InvoicesCard};
