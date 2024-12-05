import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {ArrowDown2, ArrowUp2, More} from 'iconsax-react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

import tw from '../../../tailwind';

const Accordion = ({
  title,
  titleStyle,
  icon,
  description,
  descriptionStyle,
  headerSeparator,
  style,
  children,
  contentContainerStyle,
  onPress = () => false,
  suffix = null,
  option,
  isOpen = false,
}) => {
  const [isContentShow, setIsContentShow] = useState(isOpen);

  return (
    <View style={tw.style('', style)}>
      <Pressable
        onPress={() => {
          setIsContentShow(!isContentShow);
          onPress();
        }}
        style={tw.style('flex-row  justify-between', {
          'border-b border-b-gray-200 mb-2 pb-2':
            isContentShow && headerSeparator,
        })}>
        <View style={tw`flex-row items-center w-full`}>
          <View style={tw`flex-row items-center mr-auto`}>
            {icon}
            <Text
              style={tw.style(
                'bv-sans-base capitalize',
                {
                  'ml-2': Boolean(icon),
                },
                titleStyle,
              )}>
              {title}
            </Text>
            {suffix}
          </View>
          {isContentShow ? (
            <ArrowUp2 size={18} color="#717171" />
          ) : (
            <ArrowDown2 size={18} color="#717171" />
          )}
          {option ? (
            <Menu>
              <MenuTrigger>
                <More
                  size="18"
                  color="#7A7A8A"
                  //style={tw`p-2 m-2`}
                  style={tw.style('px-2 mx-2', {
                    transform: [{rotate: '90deg'}],
                  })}
                />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={tw`w-30 rounded-lg`}>
                {option?.map(item => (
                  <MenuOption key={item.title} onSelect={item.onPress}>
                    <Text
                      key={item.title}
                      style={tw.style('bv-med-sm', item.style)}>
                      {item.title}
                    </Text>
                  </MenuOption>
                ))}
                {/* {onEdit ? (
                  <MenuOption onSelect={onEdit}>
                    <Text style={tw`bv-med-sm`}>Edit</Text>
                  </MenuOption>
                ) : null}
                {onDelete ? (
                  <MenuOption onSelect={onDelete}>
                    <Text style={tw`bv-med-sm text-basicRed`}>Delete</Text>
                  </MenuOption>
                ) : null} */}
              </MenuOptions>
            </Menu>
          ) : null}
        </View>
      </Pressable>
      {!isContentShow && description ? (
        <Text
          style={tw.style('bv-sans-xs text-grayBorder mt-2', descriptionStyle)}>
          {description}
        </Text>
      ) : null}
      <View
        style={tw.style('overflow-hidden', contentContainerStyle, {
          maxHeight: isContentShow ? '100%' : 0,
        })}>
        {children}
      </View>
    </View>
  );
};

export {Accordion};
