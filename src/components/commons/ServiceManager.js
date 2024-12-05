import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import {AddCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Button, Tag} from '.';

const ServiceManager = ({serviceList, setServiceList}) => {
  const {navigate, goBack} = useNavigation();
  const renderItem = item => {
    return (
      <Tag
        key={item.id}
        title={item.title.replace(/\s-\s\d{2}/g, '')}
        titleStyle={tw`bv-sans-sm text-black`}
        containerStyle={tw`bg-selectedGray`}
        icon={item.icon}
      />
    );
  };

  return (
    <View>
      <FlatList
        contentContainerStyle={serviceList?.length > 0 ? tw`mb-4` : null}
        data={serviceList}
        renderItem={({item}) => renderItem(item)}
        ItemSeparatorComponent={<View style={tw`w-2`} />}
        keyExtractor={(item, index) => String(item.id || index)}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
      <Button
        secondary
        containerStyle={tw`mb-4`}
        title={'Assign / Manage Services'}
        titleStyle={tw`bv-sans-sm text-primary`}
        icon={<AddCircle size={16} color="#FF6E00" />}
        onPress={() => {
          goBack();
          navigate('Booking', {
            screen: 'ServicesModal',
            params: {
              setVariations: val => setServiceList(Object.values(val)),
            },
          });
        }}
      />
    </View>
  );
};

export {ServiceManager};
