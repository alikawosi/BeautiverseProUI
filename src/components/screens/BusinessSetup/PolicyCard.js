import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {Shop} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {Tag} from '../../commons';

const PolicyCard = ({
  title,
  policyList,
  serviceList,
  number,
  isNoShow = false,
  percentage,
}) => {
  const renderItem = item => {
    return (
      <Tag
        title={item.title}
        titleStyle={tw`capitalize bv-sans-sm text-black`}
        containerStyle={tw`bg-[#54556914] mr-2 px-2 py-1.5`}
        icon={<Shop size={16} color="#000000" />}
      />
    );
  };

  const renderPolicy = item => {
    return (
      <Text style={tw`bv-heading-sm text-descGray my-2`}>
        {item.title}
        <Text
          style={tw`bv-heading-sm text-primary`}>{`: ${item.percentage}%`}</Text>
      </Text>
    );
  };

  return (
    <View style={tw`w-full border-t border-t-gray-200 pt-4 mt-4`}>
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`bv-sans-sm`}>
          <Text style={tw`bv-sans-sm text-primary`}>{number}. </Text>
          {title}
        </Text>
      </View>
      {!isNoShow ? (
        <FlatList
          contentContainerStyle={tw`my-2`}
          data={policyList}
          renderItem={({item}) => renderPolicy(item)}
          ItemSeparatorComponent={() => (
            <View style={tw`w-px h-full mx-2 bg-gray-200`} />
          )}
          keyExtractor={(item, index) => String(item.id || index)}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      ) : null}
      {isNoShow ? (
        <Text style={tw`bv-heading-sm text-descGray my-2`}>
          No-Show prices:
          <Text
            style={tw`bv-heading-sm text-primary`}>{` ${percentage}%`}</Text>
        </Text>
      ) : null}
      <Text style={tw`bv-heading-sm text-descGray my-2`}>
        Applied on:
        <Text
          style={tw`bv-heading-sm text-primary`}>{` ${serviceList.length} Services`}</Text>
      </Text>
      <FlatList
        //contentContainerStyle={serviceList.length > 0 ? tw`mb-4` : null}
        data={serviceList}
        renderItem={({item}) => renderItem(item)}
        ItemSeparatorComponent={() => <View style={tw`w-2`} />}
        keyExtractor={(item, index) => String(item.id || index)}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

export {PolicyCard};
