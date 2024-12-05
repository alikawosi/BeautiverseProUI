/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {View, Text, ScrollView, Pressable} from 'react-native';
import {ArrowDown2, ArrowUp2, More} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';

const BookServiceCard = ({
  title,
  priceRange,
  duration,
  desc,
  isAddOn,
  style,
  variations = [],
  onEdit = () => false,
  onDelete = () => false,
}) => {
  const [isContentShow, setIsContentShow] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const DetailCard = ({variationTitle, price, sale_price, time, index}) => {
    return (
      <Pressable>
        <View
          style={tw.style(`w-full flex-row`, {
            'mt-2': index >= 1,
          })}>
          <View style={tw`w-11/12`}>
            <View style={tw`flex-row items-center mb-1`}>
              <Text style={tw`bv-sans-sm text-primary mr-1`}>•</Text>
              <Text style={tw`capitalize bv-sans-sm text-descGray`}>
                {variationTitle}
              </Text>
            </View>
            <View style={tw`flex flex-row`}>
              {price ? (
                <Text
                  style={tw.style('bv-med-xs text-black', {
                    'text-descGray line-through': sale_price ? true : false,
                  })}>{`${price}`}</Text>
              ) : null}
              {sale_price ? (
                <Text
                  style={tw`bv-med-xs ml-2 text-descGray`}>{`${sale_price}`}</Text>
              ) : null}
              {time ? (
                <View style={tw`flex-row`}>
                  <Text style={tw`bv-sans-xs text-descGray mx-2 `}>{'|'}</Text>
                  <Text
                    style={tw`bv-sans-xs text-descGray mr-2`}>{`${time}`}</Text>
                </View>
              ) : null}
            </View>
          </View>
          <View style={tw`w-1/12 items-center justify-center`} />
        </View>
      </Pressable>
    );
  };

  const itemPressHandler = () => {
    if (variations.length === 0) {
      setIsActive(!isActive);
    } else {
      setIsContentShow(!isContentShow);
    }
  };

  return (
    <View style={tw.style(`w-full mb-2 px-2 pb-2`, style)}>
      {isAddOn ? (
        <Text
          style={tw`bv-sans-xs text-primary absolute right-7 top-0 -mt-2 bg-white px-1`}>
          Add-On
        </Text>
      ) : null}
      <Pressable onPress={() => itemPressHandler()}>
        <View style={tw`flex-row`}>
          <View style={tw` w-3/4 justify-center`}>
            <View style={tw`flex-row items-center mb-2`}>
              <Text style={tw`capitalize bv-sans-base mr-2`}>{title}</Text>
            </View>
            {!isContentShow && desc ? (
              <Text style={tw`capitalize bv-sans-sm text-descGray`}>
                {desc}
              </Text>
            ) : null}
            {!isContentShow && (
              <View style={tw`flex flex-row`}>
                <Text style={tw`font-med text-sm text-descGray`}>{`${
                  priceRange ? priceRange : '-'
                }`}</Text>
                <View style={tw`flex-row`}>
                  <Text style={tw`font-sans text-xs text-grayBorder mx-2`}>
                    {'|'}
                  </Text>
                  <Text style={tw`font-med text-sm text-descGray`}>{`${
                    duration ? duration : '-'
                  }`}</Text>
                </View>
              </View>
            )}
          </View>
          <View style={tw`w-1/4 items-center justify-end flex-row`}>
            {variations.length > 0 ? (
              !isContentShow ? (
                <ArrowDown2
                  size={18}
                  color="#7A7A8A"
                  onPress={() => itemPressHandler()}
                />
              ) : (
                <ArrowUp2
                  size={18}
                  color="#7A7A8A"
                  onPress={() => itemPressHandler()}
                />
              )
            ) : null}
            <Menu>
              <MenuTrigger>
                <More size="18" color="#7A7A8A" style={tw`p-2 m-2`} />
              </MenuTrigger>
              <MenuOptions
                optionsContainerStyle={tw`w-40 p-2 bg-white rounded-lg`}>
                <MenuOption onSelect={onEdit}>
                  <Text style={tw`bv-sans-sm text-black`}>Edit </Text>
                </MenuOption>
                <MenuOption onSelect={onDelete}>
                  <Text style={tw`bv-sans-sm text-basicRed`}>Delete</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        </View>
      </Pressable>
      {isContentShow && variations.length > 0 && (
        <View style={tw`w-full`}>
          <ScrollView>
            {variations.length > 0
              ? variations.map((item, index) => (
                  <DetailCard
                    index={index}
                    key={item.id}
                    variationTitle={item.title}
                    {...item}
                  />
                ))
              : null}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export {BookServiceCard};
