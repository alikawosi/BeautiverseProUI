import {InfoCircle, More} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

import tw from '../../../../tailwind';
import {CheckBox, Switch} from '../../commons';
import Animated, {Easing, FadeInDown, FadeInUp} from 'react-native-reanimated';

const SectionWrapper = ({
  title,
  titleStyle,
  headerStyle,
  headerSeparator,
  icon,
  iconStyle,
  isAccordion = false,
  isActiveDefaultValue = true,
  desc,
  descStyle,
  descLink,
  descLinkStyle,
  descLinkIcon,
  descLinkIconStyle,
  subTitle,
  subTitleStyle,
  containerStyle,
  contentContainerStyle,
  type, // check, switch
  number,
  option,
  onEdit,
  onDelete,
  editOptionText = 'Edit',
  DeleteOptionText = 'Delete',
  customOptions,
  onPress = () => false,
  children,
}) => {
  const [isActive, setIsActive] = useState(
    !isAccordion || isActiveDefaultValue,
  );
  const [isContentVisible, setIsContentVisible] = useState(
    !isAccordion || isActiveDefaultValue,
  );
  useEffect(() => {
    setIsActive(isActiveDefaultValue);
    setIsContentVisible(isActiveDefaultValue);
  }, [isActiveDefaultValue]);

  const Separator = () => {
    return <View style={tw`w-full h-px  bg-gray-200 my-3`} />;
  };
  //console.log('content', isContentVisible);
  const onWrapperPress = () => {
    if (isAccordion) {
      setIsContentVisible(!isContentVisible);
      setIsActive(!isActive);
    }
    onPress();
  };

  return (
    <View style={tw.style('bg-white rounded-3xl p-5', containerStyle)}>
      {/* Header */}
      {title ? (
        <Pressable
          onPress={() => onWrapperPress()}
          style={tw.style('px-2', headerStyle)}>
          <View style={tw`flex-row justify-between items-center mb-2`}>
            <View style={tw.style('flex-row items-center')}>
              {icon ? (
                <View style={tw.style('self-start mr-2', iconStyle)}>
                  {icon}
                </View>
              ) : null}
              {type === 'check' ? (
                <CheckBox
                  onPress={() => onWrapperPress()}
                  style={tw`mr-1 w-auto`}
                  isChecked={isActive}
                />
              ) : null}
              <Text style={tw.style('bv-sans-sm mr-1 flex-shrink', titleStyle)}>
                {number ? (
                  <Text
                    style={tw`bv-sans-sm text-primary`}>{`${number}. `}</Text>
                ) : null}
                {title}
              </Text>
              <Text style={tw.style('bv-sans-xs text-descGray', subTitleStyle)}>
                {subTitle}
              </Text>
            </View>
            <View style={tw`flex-row items-center`}>
              {type === 'switch' ? (
                <Switch
                  onPress={() => onWrapperPress()}
                  isActive={isActive}
                  size={6}
                />
              ) : null}
              {option ? (
                <Menu>
                  <MenuTrigger style={tw`p-2`}>
                    <More size="18" color="#7A7A8A" />
                  </MenuTrigger>
                  <MenuOptions
                    optionsContainerStyle={tw`w-40 p-2 bg-white rounded-lg`}>
                    {onEdit ? (
                      <MenuOption onSelect={onEdit}>
                        <Text style={tw`bv-sans-sm text-black`}>
                          {editOptionText}
                        </Text>
                      </MenuOption>
                    ) : null}
                    {customOptions
                      ? customOptions.map(item => (
                          <MenuOption
                            style={item.style}
                            onSelect={item.onPress}>
                            <Text style={item.titleStyle}>{item.title}</Text>
                          </MenuOption>
                        ))
                      : null}
                    {onDelete ? (
                      <MenuOption onSelect={onDelete}>
                        <Text style={tw`bv-sans-sm text-basicRed`}>
                          {DeleteOptionText}
                        </Text>
                      </MenuOption>
                    ) : null}
                  </MenuOptions>
                </Menu>
              ) : null}
            </View>
          </View>
        </Pressable>
      ) : null}
      {desc ? (
        <Text style={tw.style('bv-med-sm text-descGray mb-2 mx-2', descStyle)}>
          {desc}
        </Text>
      ) : null}
      {descLink ? (
        <View style={tw.style('flex-row items-center mt-2', descLinkIconStyle)}>
          {descLinkIcon ? (
            <InfoCircle size={16} color="#7A7A8A" style={tw`mr-2`} />
          ) : null}
          <Pressable>
            <Text
              style={tw.style(
                'bv-med-sm text-descGray underline',
                descLinkStyle,
              )}>
              {descLink}
            </Text>
          </Pressable>
        </View>
      ) : null}
      {isContentVisible ? (
        <View style={tw.style('', contentContainerStyle)}>
          {headerSeparator && <Separator />}
          {children}
        </View>
      ) : null}
    </View>
  );
};

export {SectionWrapper};
