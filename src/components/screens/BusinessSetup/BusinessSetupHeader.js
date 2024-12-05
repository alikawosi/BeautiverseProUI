import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {BackButton} from '../../commons';

const BusinessSetupHeader = ({route}) => {
  const insets = useSafeAreaInsets();
  const {reset, goBack} = useNavigation();
  return (
    <View
      style={tw.style(
        'w-screen bg-background border-b border-gray-200 flex-row  items-center px-5',
        {
          paddingTop: insets.top,
          height: insets.top + 60,
          'justify-center': route.params.stepsHidden,
          'justify-between': !route.params.stepsHidden,
        },
      )}>
      <BackButton onPress={() => goBack()} />
      {route.params.stepsHidden ? (
        <View style={tw`w-full items-center `}>
          <Text style={tw`bv-heading-lg text-black`}>{route.params.title}</Text>
        </View>
      ) : (
        <Pressable
          style={tw`p-1`}
          onPress={() =>
            reset({
              index: 0,
              routes: [{name: 'TabBar'}],
            })
          }>
          <Text style={tw`bv-sans-sm text-primary`}>Save & Exit</Text>
        </Pressable>
      )}
    </View>
  );
};

export {BusinessSetupHeader};
