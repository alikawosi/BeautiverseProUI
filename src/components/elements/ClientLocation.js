import React from 'react';
import {Pressable, Text, View} from 'react-native';

import tw from '../../../tailwind';
import {FormItem, Input} from '../commons';
import {Map} from './Map';
import {useLocation} from '../../hooks';

const ClientLocation = ({
  style,
  form,
  setValue,
  onMapPress,
  address,
  distance,
  duration,
  transportation_fee,
}) => {
  const {getCoords} = useLocation({address});

  const OnRegionChange = ({latitude, longitude}) => {
    setValue('location.lat', latitude);
    setValue('location.lng', longitude);
  };

  return (
    <>
      <View
        style={tw.style(
          `rounded-3xl overflow-hidden w-full h-[178px] relative`,
          style,
        )}>
        {!address && (
          <Pressable
            onPress={onMapPress}
            style={tw`absolute left-0 right-0 bottom-0 top-0 bg-black z-10 bg-opacity-60 justify-center items-center`}>
            <Text style={tw`text-white text-base`}>Choose Client Location</Text>
          </Pressable>
        )}
        <Map
          enable={false}
          lat={getCoords.data?.lat}
          lng={getCoords.data?.lng}
          onChange={OnRegionChange}
        />
      </View>
      {form && (
        <>
          <FormItem
            form={form}
            name="location.address"
            validation="required"
            style={tw`my-4`}>
            <Input
              readOnly
              isMultiline
              onPress={onMapPress}
              label="Client Address"
              style={tw`min-h-12 h-auto`}
            />
          </FormItem>
          <FormItem form={form} name="transportation_fee">
            <Input label="Transportation" readOnly />
          </FormItem>
        </>
      )}
      {distance && duration && transportation_fee && (
        <View style={tw`flex-row mx-auto mt-4`}>
          <Routing2 size={16} color="#7A7A8A" />
          <Text style={tw`text-descGray text-xs ml-1`}>
            {distance}, {duration} drive | ${transportation_fee} transportation
            fee
          </Text>
        </View>
      )}
    </>
  );
};

export {ClientLocation};
