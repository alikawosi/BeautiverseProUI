import React from 'react';
import {View} from 'react-native';

import tw from '../../../tailwind';

const SectionWrapper = ({children, style}) => {
  return (
    <View style={tw.style('bg-white w-full p-5 rounded-3xl mb-4', style)}>
      {children}
    </View>
  );
};

export {SectionWrapper};
