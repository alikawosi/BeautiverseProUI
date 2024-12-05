import React from 'react';
import {Image, Text, View} from 'react-native';
import {More, Shop, Verify} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {Button} from '../../commons';

const SubscriptionTab = ({data}) => {
  return (
    <>
      {data.map(({id, img, name, distance, context, isBooked}, index) => (
        <View
          key={id}
          style={tw.style('pt-5', {
            'mt-4': index >= 1,
            'opacity-60': !isBooked,
          })}>
          <View style={tw`flex-row items-center mb-6`}>
            <Image
              style={tw`w-12 h-12 rounded-full mr-3`}
              source={
                img
                  ? {uri: img}
                  : require('../../../assets/media/UserDefault.png')
              }
            />
            <View style={tw`flex-1`}>
              <View style={tw`flex-row items-center`}>
                <Text style={tw`bv-sans-base mr-1`}>{name}</Text>
                <Verify size={14} color="#FBA301" variant="Bold" />
                <Button
                  containerStyle={tw`ml-auto`}
                  style={tw`h-auto`}
                  icon={
                    <More
                      size={16}
                      color="#7A7A8A"
                      style={{
                        transform: [{rotate: '90deg'}],
                      }}
                    />
                  }
                />
              </View>
              <View style={tw`flex-row items-center`}>
                <Shop size={12} color="#7A7A8A" />
                <Text style={tw`text-xs text-descGray ml-1 font-med`}>
                  {distance}
                </Text>
              </View>
            </View>
          </View>
          <View>
            {Object.keys(context).map((key, contextIndex) => (
              <View
                key={key}
                style={tw.style('flex-row justify-between items-center', {
                  'mt-4': contextIndex >= 1,
                })}>
                <Text style={tw`text-xs font-med`}>{key}</Text>
                <Text
                  style={tw.style('bv-sans-xs', {
                    'px-2 py-1 rounded-lg bg-primary bg-opacity-10 text-primary':
                      key === 'Category',
                  })}>
                  {context[key]}
                </Text>
              </View>
            ))}
          </View>
          {!isBooked && (
            <Button
              primary
              title="Book Now"
              titleStyle={tw`text-xs`}
              containerStyle={tw`mt-6`}
              gradientStyle={tw`rounded-lg`}
            />
          )}
        </View>
      ))}
    </>
  );
};

export {SubscriptionTab};
