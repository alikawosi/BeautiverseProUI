import React, {useEffect, useState} from 'react';
import {useInfiniteQuery} from 'react-query';
import {ActivityIndicator, View} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';

import tw from '../../../../tailwind';
import {InvoicesCard} from './InvoicesCard';
import {EmptyScreen} from '../../commons';
import {api} from '../../../utils';

const instanse = api.instanse();

const InvoicesTab = ({id}) => {
  const [refreshing, setRefresh] = useState(false);
  const {data, hasNextPage, refetch, isRefetching, fetchNextPage, isLoading} =
    useInfiniteQuery(
      ['invoicesTab', id],
      async ({pageParam = 1}) => {
        const response = await instanse.get('/pro/client/invoices', {
          params: {
            id,
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
  const flatListData = data?.pages
    ?.flatMap(page => page.data)
    .filter(item => item.id);

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
    <>
      {isLoading ? (
        <View style={tw`items-center justify-center my-8`}>
          <ActivityIndicator />
        </View>
      ) : Boolean(flatListData?.length) ? (
        <BottomSheetFlatList
          bounces={false}
          style={tw`flex-grow`}
          contentContainerStyle={tw`pb-5`}
          removeClippedSubviews
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          data={flatListData}
          keyExtractor={(_, index) => index}
          renderItem={({item, index}) => (
            <InvoicesCard
              {...item}
              clientId={id}
              style={tw.style('bg-background rounded-2xl py-5 px-4', {
                'mt-4': index >= 1,
              })}
            />
          )}
        />
      ) : (
        <EmptyScreen style={tw`mt-14`} description="You have no invoices ..." />
      )}
    </>
  );
};

export {InvoicesTab};
