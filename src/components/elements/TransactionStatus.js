import React from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';

import tw from '../../../tailwind';
import {TransactionContext} from './';

const TransactionStatus = ({
  style,
  status,
  receipt_id,
  payment_date,
  payment_method,
}) => {
  return (
    <View style={tw.style(style)}>
      <View style={tw`flex-row justify-between`}>
        <TransactionContext
          title="Status"
          style={tw`w-[55%] pr-4`}
          value={status === 'paid' ? 'Paid' : 'Unpaid'}
          valueStyle={tw.style(`text-[#FF4444]`, {
            'text-basicGreen': status === 'paid',
          })}
        />
        {status === 'paid' && (
          <TransactionContext
            hasBorder
            style={tw`flex-1`}
            value={payment_method}
            title="Payment Method:"
          />
        )}
      </View>
      {status === 'paid' && (
        <View
          style={tw`flex-row mt-3 pt-3 border-t border-black border-opacity-10 `}>
          <TransactionContext
            title="Receipt ID:"
            style={tw`w-[55%] pr-4`}
            value={`Receipt#${receipt_id}`}
          />
          <TransactionContext
            hasBorder
            style={tw`flex-1`}
            title="Payment Date:"
            value={dayjs(payment_date * 1000).format('DD MMM YYYY')}
          />
        </View>
      )}
    </View>
  );
};

export {TransactionStatus};
