import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {Verify} from 'iconsax-react-native';

import tw from '../../../../tailwind';

const UserProfileCard = ({
  name,
  isVerified,
  isJoinedDateShowed,
  joinedDate,
  style,
  avatar,
  onPress = ()=>false,
  buttonTitle,
}) => {

  return (
    <View style={tw.style('flex-row bg-white items-start p-4', style)}>
      <View style={tw`items-center mr-4`}>
        <Image source={{uri: avatar}} style={tw`rounded-full w-18 h-18 `} />
        {isJoinedDateShowed ? (
          <Text style={tw`bv-med-xs mt-4 `}>{joinedDate}</Text>
        ) : null}
      </View>
      <View style={tw`items-start my-2`}>
        <View style={tw`flex-row mb-1 items-center`}>
          <Text style={tw`mr-1 bv-sans-lg text-black `}>{name}</Text>
          {isVerified ? (
            <Verify size={18} color="#FF6E00" variant="Bold" />
          ) : null}
        </View>
        <Pressable onPress={onPress}>
          <Text style={tw`bv-sans-sm text-primary `}>{buttonTitle}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export {UserProfileCard};
