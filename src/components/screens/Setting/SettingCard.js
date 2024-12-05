import {View, Text, Linking} from 'react-native';
import React from 'react';
import {ArrowRight2} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const SettingCard = ({
  icon,
  title,
  description,
  route,
  rootRoute,
  style,
  link,
  screenParams,
  onPress = () => false,
}) => {
  const {navigate} = useNavigation();
  return (
    <Pressable
      onPress={() => {
        link
          ? Linking.openURL(link)
          : rootRoute
          ? navigate(rootRoute, {screen: route, params: screenParams})
          : navigate(route, screenParams);
      }}
      style={tw.style('flex-row justify-between p-4 mb-2', style)}>
      {icon}
      <View style={tw`ml-2.5 flex-1 `}>
        <Text style={tw`bv-sans-base`}>{title}</Text>
        {description ? (
          <Text style={tw`bv-med-xs text-descGray`}>{description}</Text>
        ) : null}
      </View>
      <ArrowRight2 color="#7A7A8A" size={20} />
    </Pressable>
  );
};

export {SettingCard};
