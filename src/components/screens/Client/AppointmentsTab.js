import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {BottomSheetSectionList} from '@gorhom/bottom-sheet';

import tw from '../../../../tailwind';
import {AppointmentCard} from '../../elements';
import {EmptyScreen} from '../../commons';
import {api} from '../../../utils';

const instanse = api.instanse();

const AppointmentsTab = ({id}) => {
  const {navigate} = useNavigation();

  const [refreshing, setRefresh] = useState(false);
  const {data, hasNextPage, refetch, isRefetching, fetchNextPage, isLoading} =
    useInfiniteQuery(
      ['clientApps', id],
      async ({pageParam = 1}) => {
        const response = await instanse.get('/pro/client/apps', {
          params: {
            id,
            limit: 5,
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
  const sectionListData = data?.pages
    ?.flatMap(page => page.data)
    ?.filter(item => item.id)
    ?.reduce(
      (list, {upcoming, past}) => {
        list.Upcoming.push(...upcoming);
        list.Past.push(...past);
        return list;
      },
      {Upcoming: [], Past: []},
    );

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
      {isLoading && !sectionListData ? (
        <View style={tw`items-center justify-center my-8`}>
          <ActivityIndicator />
        </View>
      ) : (
        <BottomSheetSectionList
          style={tw`flex-grow`}
          contentContainerStyle={tw`pb-5`}
          showsVerticalScrollIndicator={false}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          keyExtractor={item => item.id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          sections={Object.keys(sectionListData).map(title => ({
            title,
            data: sectionListData[title],
          }))}
          renderSectionHeader={({section: {title}}) => (
            <Text style={tw`text-base text-black font-sans mb-4`}>{title}</Text>
          )}
          renderSectionFooter={({section: {data, title}}) => (
            <>
              {Boolean(!data.length) && (
                <EmptyScreen
                  style={tw`mt-4 mb-8`}
                  description={`You have no ${title.toLowerCase()} appointment ...`}
                />
              )}
            </>
          )}
          renderItem={({item, section: {title}, index}) => (
            <AppointmentCard
              themeStep={2}
              onPress={() =>
                navigate('AppointmentDetails', {
                  screen: 'AppointmentDetailsModal',
                  params: {
                    bookId: item.id,
                    clientId: id,
                  },
                })
              }
              style={tw`mb-4 py-2`}
              isPrimary={title !== 'Past'}
              styleTheme={index + 1}>
              <AppointmentCard.Checkout
                {...item}
                fontSize={12}
                isPast={title === 'Past'}
              />
            </AppointmentCard>
          )}
        />
      )}
    </>
  );
};

export {AppointmentsTab};
