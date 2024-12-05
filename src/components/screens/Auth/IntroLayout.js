import React from 'react';
import {Text, View, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {Button} from '../../commons';
import {ArrowCircleRight} from 'iconsax-react-native';

const IntroLayout = ({image, desc, isLast, descStyle, gradient, to}) => {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <Image style={tw`w-full h-[140vw]`} source={image} />
      <View style={tw`flex-1 items-center justify-center pt-4 pb-10`}>
        <Text
          style={tw.style(
            'px-8 font-med text-1.5xl leading-8 text-center',
            descStyle,
          )}>
          {desc}
        </Text>
      </View>
      <View
        style={tw.style('px-7 mb-6 flex-row', {
          'justify-end': !isLast,
          'items-stretch flex-col': isLast,
        })}>
        <Button
          style={tw.style('', {
            'w-30': !isLast,
          })}
          primary
          //size="large"
          title={isLast ? 'Get Started' : 'Next'}
          reverse
          icon={isLast ? null : <ArrowCircleRight color="white" size={25} />}
          gradient={gradient}
          onPress={() => navigate(to)}
        />
      </View>
    </SafeAreaView>
  );
};

export {IntroLayout};
