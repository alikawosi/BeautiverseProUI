import React from 'react';
import {View, Text, Image} from 'react-native';
import {Add, Clock, InfoCircle, Notepad2, Send2} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {Button} from '../../commons';

const RequestCard = ({
  name,
  image,
  requestTime,
  date,
  time,
  category,
  distance,
  address,
  isAvailable,
  isWaitList,
  isBookable,
}) => {
  return (
    <View
      style={tw`mt-3 w-full bg-white p-5 border-l-2 border-[#5948AA] rounded-3xl`}>
      <View style={tw`flex-row items-center justify-between mb-4`}>
        <View style={tw`flex-row items-center`}>
          <Image
            style={tw`rounded-full h-8 w-8`}
            source={
              image ? image : require('../../../assets/media/UserDefault.png')
            }
          />
          <Text style={tw`ml-2 bv-sans-sm`}>{name}</Text>
        </View>
        <Text style={tw`bv-sans-xs text-descGray`}>{requestTime}</Text>
      </View>
      <View style={tw`flex-row mb-3`}>
        <Clock size={16} color={'#7A7A8A'} />
        <Text style={tw`bv-sans-xs ml-2`}>
          {date}
          <Text style={tw`text-gray-200`}>{' | '}</Text>
          {time}
        </Text>
      </View>
      <View style={tw`flex-row mb-3`}>
        <Notepad2 size={16} color={'#7A7A8A'} />
        <Text style={tw`bv-sans-xs ml-2`}>{category}</Text>
      </View>
      <View style={tw`flex-row mb-3`}>
        <Send2 size={16} color={'#7A7A8A'} />
        <Text style={tw`bv-sans-xs ml-2`}>
          {`${distance} KM`}
          <Text style={tw`text-gray-200`}>{' | '}</Text>
          {address}
        </Text>
      </View>
      {isAvailable ? (
        <View style={tw`flex-row mb-3`}>
          <InfoCircle size={16} color={'#00C851'} variant={'Bold'} />
          <Text style={tw`bv-sans-xs ml-2 text-basicGreen`}>
            There is an open availability
          </Text>
        </View>
      ) : null}
      <View style={tw`mb-3 w-full h-px bg-gray-200`} />
      {!isWaitList ? (
        <View style={tw`flex-row items-center`}>
          <Button
            containerStyle={tw`flex-1`}
            style={tw`h-5`}
            title={'Accept'}
            titleStyle={tw`bv-sans-xs`}
            defaultColor={'#00C851'}
          />
          <View style={tw`w-px h-4 bg-gray-200`} />
          <Button
            containerStyle={tw`flex-1`}
            style={tw`h-5`}
            title={'Reject'}
            titleStyle={tw`bv-sans-xs`}
            defaultColor={'#FF4444'}
          />
          <View style={tw`w-px h-4 bg-gray-200`} />
          <Button
            containerStyle={tw`flex-1`}
            style={tw`h-5`}
            title={'+ Wait List'}
            titleStyle={tw`bv-sans-xs`}
            defaultColor={'#7A7A8A'}
          />
        </View>
      ) : null}
      {isWaitList ? (
        <View style={tw`flex-row items-center`}>
          {isBookable ? (
            <>
              <Button
                containerStyle={tw`flex-1`}
                style={tw`h-5`}
                title={'Book'}
                titleStyle={tw`bv-sans-xs`}
                defaultColor={'#00C851'}
              />
              <View style={tw`w-px h-4 mx-1 bg-gray-200`} />
            </>
          ) : null}
          <Button
            containerStyle={tw`flex-1`}
            style={tw`h-5`}
            title={'Remove'}
            titleStyle={tw`bv-sans-xs`}
            defaultColor={'#FF4444'}
          />
        </View>
      ) : null}
    </View>
  );
};

export {RequestCard};
