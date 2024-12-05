import {FlatList} from 'react-native';
import React from 'react';
import {EmptyScreen, Heading} from '../../../components/commons';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../../tailwind';
import {CouponCard} from '../../../components/screens/Setting';
import {FAKE_CONST} from '../../../constants/FAKE_CONST';

const Coupons = ({couponsList = FAKE_CONST.CouponData}) => {
  return (
    <SafeAreaView style={tw`flex bg-white flex-1 pb-4 px-7 `}>
      <FlatList
        data={couponsList}
        contentContainerStyle={tw.style({'flex-1': couponsList.length === 0})}
        ListHeaderComponent={() => {
          <Heading title={'Available Coupons'} />;
        }}
        renderItem={({item}) => (
          <CouponCard
            title={item.title}
            code={item.code}
            description={item.description}
            value={item.value}
            style={tw`mb-4`}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyScreen description={'you have no Coupons yet...'} />
        )}
      />
    </SafeAreaView>
  );
};

export default Coupons;
