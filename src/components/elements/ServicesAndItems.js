import React from 'react';
import {Text, View} from 'react-native';

import tw from '../../../tailwind';
import {GENERAL_CONST} from '../../constants';

const ServicesAndItems = ({
  style,
  services = [],
  custom_items = [],
  servicesTitleColor = 'text-primary',
  subtotal,
  tip,
  discount,
  hst,
  total,
}) => {
  const factor = [subtotal, tip, discount, hst, total];

  return (
    <View style={tw.style(style)}>
      {services.map(
        ({service_title, variation_title, duration, price}, index) => (
          <View key={service_title + index} style={tw`mb-3`}>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`${servicesTitleColor} text-sm font-sans`}>
                {service_title}
              </Text>
              <Text style={tw`bv-sans-xs`}>${price}</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-sm  text-descGray font-sans`}>
                {variation_title}
              </Text>
              <View style={tw`w-1 h-1 rounded-full bg-descGray mx-1`} />
              <Text style={tw`text-sm text-descGray`}>{duration}</Text>
            </View>
          </View>
        ),
      )}
      {custom_items.map(({title, price}, index) => (
        <View
          key={`${title}_${index}_${price}`}
          style={tw.style('flex-row items-center justify-between', {
            'mt-3': index >= 1,
          })}>
          <Text style={tw`text-xs font-sans text-descGray`}>{title}</Text>
          <Text style={tw`bv-sans-xs`}>{price}</Text>
        </View>
      ))}
      <View style={tw`border-t border-[#E4E7EC] pt-4 mt-4`}>
        {GENERAL_CONST.factor.map((key, index) => (
          <View
            key={key}
            style={tw.style('flex-row items-center justify-between', {
              'mt-3': index >= 1,
              'border-t border-[#E4E7EC] pt-4 mt-4': key === 'Total',
            })}>
            <Text style={tw`text-xs font-sans text-descGray`}>{key}</Text>
            <Text
              style={tw.style('bv-sans-xs', {
                'text-sm text-[#545569]': key === 'Total',
              })}>
              ${factor[index]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export {ServicesAndItems};
