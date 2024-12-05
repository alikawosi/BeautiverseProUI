import React from 'react';
import {View, Text, FlatList} from 'react-native';

import tw from '../../../../tailwind';
import {Tag} from '../../commons';

const TransporationCard = ({
  feeList,
  serviceList = [],
  //onEdit,
  //onDelete,
  //number,
  isManual = false,
  fee,
}) => {
  const renderItem = item => {
    return (
      <Tag
        title={item.title}
        titleStyle={tw`bv-sans-sm text-black`}
        containerStyle={tw`bg-grayBg`}
        icon={item.icon}
      />
    );
  };

  const renderFee = item => {
    const type = item.type === 'percent' ? '%' : '$';
    const value = Boolean(Number(item.value))
      ? `${item.value}${type}`
      : item.value;

    return (
      <Text style={tw`bv-heading-sm text-descGray my-2`}>
        {`${item.min_distance} - ${item.max_distance} Km: `}
        <Text style={tw`bv-heading-sm text-primary`}>{value}</Text>
      </Text>
    );
  };
  return (
    <View>
      {isManual ? (
        <FlatList
          contentContainerStyle={tw`my-2`}
          data={feeList}
          renderItem={({item}) => renderFee(item)}
          ItemSeparatorComponent={() => (
            <View style={tw`mx-2 justify-center`}>
              <View style={tw`w-px h-5 bg-gray-200`} />
            </View>
          )}
          keyExtractor={(item, index) => String(item.id || index)}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      ) : null}
      {!isManual ? (
        <Text style={tw`bv-heading-sm text-descGray my-2`}>
          Uber prices markup:
          <Text style={tw`bv-heading-sm text-primary`}>{` ${fee} `}</Text>
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

export {TransporationCard};
