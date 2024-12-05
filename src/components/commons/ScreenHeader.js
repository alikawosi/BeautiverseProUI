import React from 'react';
import {View, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {BackButton} from '../commons';

const ScreenHeader = ({backButton = true, options, style}) => {
  const insets = useSafeAreaInsets();
  const {goBack} = useNavigation();

  return (
    <View
      style={tw.style(
        'w-screen bg-background flex-row justify-between items-center px-3',
        {paddingTop: insets.top, height: insets.top + 60},
        style,
      )}>
      <View style={tw`w-1/5`}>
        {backButton ? <BackButton onPress={() => goBack()} /> : null}
      </View>
      <Text style={tw`bv-sans-lg flex-1 text-center`}>{options.title}</Text>
      <View style={tw`w-1/5`}>{/* */}</View>
    </View>
  );
};

export {ScreenHeader};
