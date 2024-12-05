import {FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';

import tw from '../../../../tailwind';
import {SettingCard} from '../../../components/screens/Setting';

const MenuScreenLayout = ({menuData}) => {
  const renderOption = ({item}) => {
    return (
      <SettingCard
        key={item.key}
        title={item.title}
        rootRoute={item.rootRoute}
        route={item.route}
        screenParams={item.params}
      />
    );
  };
  return (
    <SafeAreaView style={tw`flex bg-background  flex-1  `}>
      <FlatList
        contentContainerStyle={tw`bg-white rounded-15 p-1`}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.key)}
        data={menuData}
        renderItem={renderOption}
      />
    </SafeAreaView>
  );
};

export {MenuScreenLayout};
