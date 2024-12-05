import React from 'react';
import {Image, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import tw from '../../../tailwind';

const Wrapper = ({children, style, angle, gradientColor}) => {
  return (
    <View style={tw.style('relative', style)}>
      <View style={tw`flex-1 z-10`}>{children}</View>
      <LinearGradient
        useAngle={true}
        angle={angle}
        colors={gradientColor}
        style={tw.style('w-full rounded-2xl h-[95%] top-0 left-0 absolute')}
      />
    </View>
  );
};

const Primary = ({style, name, lastName, amount, description}) => {
  return (
    <Wrapper
      angle={287.83}
      style={tw.style('h-[190px]', style)}
      gradientColor={['#694BFF', '#1ABCFE']}>
      <Text style={tw`p-4 text-white text-xs font-med`}>{description}</Text>
      <View
        style={tw`bg-black h-[68px] rounded-2xl mt-auto overflow-hidden relative`}>
        <View
          style={tw`p-4 flex-row items-center h-full w-full justify-between`}>
          <View>
            <Text style={tw`text-white text-xs font-sans`}>{name}</Text>
            <Text style={tw`text-white text-xs font-sans`}>{lastName}</Text>
          </View>
          <Image source={require('../../assets/media/GiftCardLogo2.png')} />
          <View style={tw`flex-row items-baseline`}>
            <Text style={tw`text-white text-sm font-sans`}>$</Text>
            <Text style={tw`text-white text-lg font-sans`}>{amount}</Text>
          </View>
        </View>
        <Image
          source={require('../../assets/media/pattern1.png')}
          style={tw`absolute w-full h-full top-0 left-0`}
        />
      </View>
    </Wrapper>
  );
};

const Secondray = ({style, name, lastName, amount, description}) => {
  return (
    <View style={tw.style('relative', style)}>
      <View
        style={tw`shadow-lg opacity-25 top-0 left-0 w-full h-full absolute rounded-b-2xl`}
      />
      <Wrapper
        style={tw`z-10`}
        angle={90.6}
        gradientColor={['#915EFF', '#5948AA']}>
        <View style={tw`flex-row pt-4 pb-5`}>
          <Text style={tw`text-sm text-white font-sans pl-5 mr-4 flex-1`}>
            {description}
          </Text>
          <View style={tw`items-end`}>
            <View style={tw`flex-row items-baseline pr-4 mb-2`}>
              <Text style={tw`text-white text-lg font-heading`}>$</Text>
              <Text style={tw`text-white text-lg font-heading`}>{amount}</Text>
            </View>
            <Image source={require('../../assets/media/pattern2.png')} />
          </View>
        </View>

        <Text
          style={tw` bg-white rounded-b-2xl text-center text-sm text-[#915EFF] font-heading py-3`}>
          {name} {lastName}
        </Text>
      </Wrapper>
    </View>
  );
};

const GiftCards = {Primary, Secondray};

export {GiftCards};
