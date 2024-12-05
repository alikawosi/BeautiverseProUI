import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, SectionList, ActivityIndicator} from 'react-native';
import {useInfiniteQuery} from 'react-query';
import {useIsFocused} from '@react-navigation/native';

import tw from '../../../tailwind';
import {ContactCard} from '.';
import {api} from '../../utils';
import {EmptyScreen} from '../commons';

const instanse = api.instanse();

const ClientsList = ({
  type,
  style,
  isSelected = false,
  selectContact = () => false,
  searchValue = '',
}) => {
  const [refreshing, setRefresh] = useState(false);
  const isFocused = useIsFocused();
  const sortContacts = useCallback(data => {
    let contactsArr = [];
    let aCode = 'A'.charCodeAt(0);

    for (let i = 0; i < 26; i++) {
      let currChar = String.fromCharCode(aCode + i);
      let obj = {
        title: currChar,
      };
      let currContacts = data.filter(item => {
        return item.name[0].toUpperCase() === currChar;
      });
      if (currContacts.length > 0) {
        currContacts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        obj.data = currContacts;
        contactsArr.push(obj);
      }
    }
    return contactsArr;
  }, []);

  const {data, refetch, isRefetching, hasNextPage, fetchNextPage, isLoading} =
    useInfiniteQuery({
      queryKey: ['clients'],
      queryFn: async ({pageParam}) => {
        const response = await instanse.get('/pro/clients', {
          params: {
            limit: 10,
            page: pageParam,
          },
        });

        return {
          data: response.data,
          nextPageParam: response.headers['x-next-page'] || null,
        };
      },
      getNextPageParam: lastPage => lastPage.nextPageParam,
    });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  const sectionListData = data?.pages
    ?.flatMap(page => page.data)
    ?.filter(({phone, name, email}) => {
      const filter = searchValue.toLowerCase();

      return (
        phone.toLowerCase().includes(filter) ||
        email.toLowerCase().includes(filter) ||
        name.toLowerCase().includes(filter)
      );
    });

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
        <View style={tw`items-center justify-center flex-1`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {Boolean(sectionListData.length) ? (
            <SectionList
              refreshing={refreshing}
              style={tw.style(style)}
              onRefresh={onRefresh}
              onEndReached={onEndReached}
              onEndReachedThreshold={0.5}
              sections={sortContacts(sectionListData)}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderSectionHeader={({section: {title}}) => (
                <Text style={tw`bv-sans-sm text-descGray ml-5 mb-3`}>
                  {title}
                </Text>
              )}
              renderItem={({item, index, section}) => (
                <View
                  style={tw.style('px-5 bg-white', {
                    'rounded-t-3xl pt-[12px]': index === 0,
                    'rounded-b-3xl pb-[12px] mb-5':
                      index === section.data.length - 1,
                  })}>
                  <ContactCard
                    type={type}
                    isSelected={isSelected}
                    {...{
                      name: item?.name,
                      email: item.email,
                      image: item?.avatar,
                      phoneNumber: item?.phone,
                    }}
                    isVerify={item?.verified}
                    onPress={() => selectContact(item)}
                  />
                </View>
              )}
            />
          ) : (
            <View style={tw`flex-grow justify-center`}>
              <EmptyScreen description="You have no clients..." />
            </View>
          )}
        </>
      )}
    </>
  );
};

export {ClientsList};
