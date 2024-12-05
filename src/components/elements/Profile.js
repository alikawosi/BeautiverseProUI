import React from 'react';
import {Pressable, Image, View, Text} from 'react-native';
import {Verify} from 'iconsax-react-native';

import tw from '../../../tailwind';

const Profile = ({
  name,
  phone,
  email,
  style,
  avatar,
  onPress,
  verifed,
  cards_count,
  icon = null,
  hasBg = false,
  is_first_client,
}) => {
  return (
    <Pressable
      style={tw.style(
        {
          'bg-selectedGray rounded-3xl px-4 py-6': hasBg,
        },
        style,
      )}
      onPress={onPress}>
      <View style={tw`flex-row items-center`}>
        <Image
          style={tw`w-12 h-12 rounded-full mr-2`}
          source={
            avatar
              ? {uri: avatar}
              : require('../../assets/media/UserDefault.png')
          }
        />
        <View style={tw`flex-1`}>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`bv-sans-base mr-1`}>{name}</Text>
            {verifed && <Verify size="16" color="#7A7A8A" variant="Bold" />}
          </View>
          <View style={tw`flex-row`}>
            {phone && (
              <Text style={tw`text-xs text-descGray mt-1`}>
                {email ? `${phone} | ` : phone}
              </Text>
            )}
            {email && (
              <Text style={tw`text-xs text-descGray mt-1`}>{email}</Text>
            )}
          </View>
          {cards_count && (
            <Text style={tw`text-xs text-descGray mt-1`}>
              {cards_count} Card on file
            </Text>
          )}
        </View>
        {icon &&
          React.cloneElement(icon, {
            size: 18,
            style: tw`ml-auto`,
          })}
      </View>
      {is_first_client && (
        <Text style={tw`text-[#545569] text-xs mx-auto mt-4`}>
          First time client
        </Text>
      )}
    </Pressable>
  );
};

export {Profile};
