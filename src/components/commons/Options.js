import React from 'react';
import {More} from 'iconsax-react-native';
import {Menu, MenuOptions, MenuTrigger} from 'react-native-popup-menu';

import tw from '../../../tailwind';

const Options = ({
  style,
  children,
  trigger = (
    <More
      size="18"
      color="#7A7A8A"
      style={tw.style(`p-2 m-2`, {
        transform: [{rotate: '90deg'}],
      })}
    />
  ),
}) => {
  return (
    <Menu style={tw.style(style)}>
      <MenuTrigger>{trigger}</MenuTrigger>
      <MenuOptions
        optionsContainerStyle={tw`w-auto min-w-32 rounded-2xl py-2 px-4`}>
        {children}
      </MenuOptions>
    </Menu>
  );
};

export {Options};
