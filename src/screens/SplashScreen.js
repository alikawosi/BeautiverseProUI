import React from 'react';
import {View, ActivityIndicator, Image} from 'react-native';


import tw from '../../tailwind';


const SplashScreen = () => {
  return (
    <View style={tw`bg-white flex-1 items-center justify-center`}>
      <Image
        style={tw`w-33 h-33 mb-4`}
        source={require('../assets/media/logoWithoutText.png')}
      />
      <ActivityIndicator size={35} color={'#FF9100'} />
    </View>
  );
};

export default SplashScreen;
