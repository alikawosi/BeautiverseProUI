import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Image, ActivityIndicator} from 'react-native';
import {CloseCircle, Verify} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {CheckBox} from '../commons';

const ContactCard = ({
  style,
  name,
  type,
  email,
  image,
  isVerify,
  phoneNumber,
  isLoading,
  isSelected,
  onPress = () => false,
}) => {
  const [isActive, setIsActive] = useState(isSelected);

  const onItemPress = () => {
    onPress();

    if (type === 'check') {
      setIsActive(!isActive);
    }
  };

  useEffect(() => {
    setIsActive(isSelected);
  }, [isSelected]);

  return (
    <Pressable
      style={tw.style(`w-full flex-row items-center my-2`, style)}
      onPress={onItemPress}>
      <Image
        source={
          image ? {uri: image} : require('../../assets/media/UserDefault.png')
        }
        style={tw`rounded-full h-12 w-12`}
      />
      <View style={tw`ml-2 mr-auto`}>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`bv-sans-base mr-1`}>{name}</Text>
          {isVerify ? (
            <Verify size={16} color="#7A7A8A" variant="Bold" />
          ) : null}
        </View>
        <Text style={tw`bv-med-xs text-descGray`} numberOfLines={1}>
          {email ? `${phoneNumber} | ${email}` : phoneNumber}
        </Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <>
          {type === 'close' && <CloseCircle size={20} color="#7A7A8A" />}
          {type === 'check' && (
            <CheckBox isChecked={isActive} style={tw`w-auto`} />
          )}
        </>
      )}
    </Pressable>
  );
};

export {ContactCard};
