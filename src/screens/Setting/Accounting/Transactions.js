import {ActivityIndicator, FlatList, SafeAreaView, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import dayjs from 'dayjs';

import {api} from '../../../utils';
import tw from '../../../../tailwind';
import {EmptyScreen} from '../../../components/commons';
import {TransactionHistoryCard} from '../../../components/screens/Setting';
import {useNavigation} from '@react-navigation/native';

const instanse = api.instanse();

const Transactions = () => {
  const {navigate} = useNavigation();
  const [refreshing, setRefresh] = useState(false);
  const {data, hasNextPage, refetch, isRefetching, fetchNextPage, isLoading} =
    useInfiniteQuery(
      ['getTransactions'],
      async ({pageParam = 1}) => {
        const response = await instanse.get('/pro/setting/transactions', {
          params: {
            limit: 20,
            page: pageParam,
          },
        });
        return {
          data: response.data,
          nextPageParam: response.headers['x-next-page'] || null,
        };
      },
      {
        getNextPageParam: lastPage => lastPage.nextPageParam,
      },
    );
  const flatListData = data?.pages?.flatMap(page => page.data);

  const onEndReached = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const onRefresh = () => {
    refetch({
      refetchPage: (_, index) => index === 0,
    });

    setRefresh(true);
  };

  useEffect(() => {
    if (refreshing && !isRefetching) {
      setRefresh(false);
    }
  }, [isRefetching, refreshing]);

  return (
    <SafeAreaView style={tw`flex bg-background flex-1 pb-4  `}>
      {isLoading ? (
        <View style={tw`items-center justify-center my-8`}>
          <ActivityIndicator />
        </View>
      ) : flatListData?.length ? (
        <FlatList
          bounces={false}
          style={tw`flex-grow`}
          contentContainerStyle={tw`p-4 bg-white mt-4 rounded-15`}
          removeClippedSubviews
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          data={flatListData}
          keyExtractor={(_, index) => index}
          renderItem={({item, index}) => (
            <TransactionHistoryCard
              key={item.id}
              price={item.amount}
              title={item.title}
              date={dayjs(item.created_date * 1000).format('DD MMMM YYYY')}
              type={item.type}
              style={tw` mb-2 py-2`}
              onPress={() =>
                navigate('Client', {
                  screen: 'Transaction',
                  params: {type: 'transaction', id: item.id},
                })
              }
            />
          )}
        />
      ) : (
        <EmptyScreen
          style={tw`mt-14`}
          description="You have no transactions ..."
        />
      )}
    </SafeAreaView>
  );
};

export default Transactions;
