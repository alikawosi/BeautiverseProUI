import React from 'react';
import {ArrowLeft2} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {Button} from './Button';

const BackButton = ({onPress, style}) => {
  return (
    <Button
      onPress={onPress}
      style={tw.style('h-auto')}
      containerStyle={tw.style(style)}
      icon={<ArrowLeft2 size={24} color="#717171" />}
    />
  );
};

export {BackButton};
