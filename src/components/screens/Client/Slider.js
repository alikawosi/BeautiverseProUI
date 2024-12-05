import React from 'react';
import {Dimensions, Text, View, FlatList} from 'react-native';

import tw from '../../../../tailwind';
import {Button} from '../../commons';

const GUTTER = 20;

const Slider = ({
  title,
  style,
  gap = 8,
  data = [],
  leftAlign = 12,
  renderItem = () => null,
}) => {
  const width = Dimensions.get('window').width;

  return (
    <View style={tw.style('mb-6', style)}>
      <View
        style={tw.style('flex-row items-center justify-between', {
          paddingLeft: GUTTER,
          paddingRight: GUTTER,
        })}>
        <Text style={tw`bv-med-lg`}>{title}</Text>
        <Button
          title="See All"
          titleStyle={tw`text-descGray text-xs font-sans`}
        />
      </View>
      <FlatList
        horizontal
        data={data}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: GUTTER,
        }}
        renderItem={({item, index}) => (
          <View
            style={tw.style('flex-1', {
              marginLeft: index >= 1 ? gap : 0,
              width: width - (GUTTER + gap + leftAlign),
            })}>
            {renderItem(item, index)}
          </View>
        )}
      />
    </View>
  );
};

export {Slider};
