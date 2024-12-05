import React, {useEffect} from 'react';
import {Text, FlatList, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {ModalWrapper} from '../commons/ModalWrapper';

const SelectModal = ({route}) => {
  const {
    label,
    onSubmit = () => false,
    onBlur = () => false,
    options = [],
  } = route.params;
  const {goBack} = useNavigation();

  useEffect(() => {
    return () => {
      onBlur();
    };
  }, []);

  const renderOption = item => {
    return (
      <Pressable
        key={item.key}
        style={tw`flex-row border border-basicGray rounded-20 mb-3 py-4 items-center justify-center`}
        onPress={() => {
          onSubmit(item, true);
          goBack();
        }}>
        {item.icon ? item.icon : null}
        <Text
          style={tw.style('bv-heading-base text-center ml-2 ')}
          value={item.value}>
          {item.title}
        </Text>
      </Pressable>
    );
  };

  return (
    <ModalWrapper
      titleSeparator
      title={label}
      titleStyle={tw`bv-heading-lg`}
      type="fromBottom"
      style={tw`w-full px-6 pb-8 bg-white rounded-30 flex-none`}>
      <FlatList
        data={options}
        keyExtractor={(item, index) => String(item.id || index)}
        renderItem={({item}) => renderOption(item)}
        showsVerticalScrollIndicator={false}
      />
    </ModalWrapper>
  );
};

export {SelectModal};
