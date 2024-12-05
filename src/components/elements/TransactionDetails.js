import React from 'react';
import {Text, View} from 'react-native';
import dayjs from 'dayjs';

import tw from '../../../tailwind';
import {TransactionContext} from './';

const TransactionDetails = ({
  invoice_id,
  issue_date,
  services,
  factor,
  style,
  ...data
}) => {
  return (
    <View style={tw.style(style)}>
      <View style={tw`flex-row`}>
        <TransactionContext
          title="ID:"
          style={tw`w-[55%] pr-4`}
          value={`Invoice#${invoice_id}`}
        />
        <TransactionContext
          hasBorder
          title="Date:"
          style={tw`flex-1`}
          value={dayjs(issue_date * 1000).format('DD MMM YYYY')}
        />
      </View>
      <View style={tw`mt-6 pt-4 border-t border-black border-opacity-10`}>
        {services?.map(({count, name, price}, index) => (
          <View
            key={name}
            style={tw.style('flex-row', {
              'mt-4': index >= 1,
            })}>
            <Text style={tw`text-xs text-descGray font-sans mr-auto`}>
              {name}
            </Text>
            <Text style={tw`text-xs text-descGray font-sans`}>x {count}</Text>
            <Text style={tw`bv-sans-xs w-[44px] text-right`}>{price}</Text>
          </View>
        ))}
      </View>
      <View style={tw`mt-4 pt-4 border-t border-black border-opacity-10`}>
        {factor?.map((key, index) => (
          <View
            key={key}
            style={tw.style('flex-row justify-between', {
              'mt-3': index >= 1,
              'mt-4 pt-4 border-t border-black border-opacity-10':
                key === 'Total',
            })}>
            <Text
              style={tw.style('text-xs text-descGray font-sans', {
                'text-primary': key === 'Total',
              })}>
              {key}
            </Text>
            <Text
              style={tw.style('bv-sans-xs', {
                'text-primary text-sm': key === 'Total',
              })}>
              {data[key.toLowerCase()]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export {TransactionDetails};
