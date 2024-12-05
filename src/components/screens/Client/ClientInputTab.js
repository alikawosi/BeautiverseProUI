import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import axios from 'axios';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import tw from '../../../../tailwind';
import {CLIENT_CONST} from '../../../constants';
import {Addresses} from '../../elements';
import {EmptyScreen} from '../../commons';

const ClientInputTab = ({id}) => {
  const {clientInputTabItems} = CLIENT_CONST;
  const {data, isLoading} = useQuery({
    queryKey: ['clientInputTab', id],
    queryFn: () =>
      axios.get('/pro/client/inputs', {
        params: {
          id,
        },
      }),
  });

  return (
    <>
      {isLoading ? (
        <View style={tw`items-center justify-center my-8`}>
          <ActivityIndicator />
        </View>
      ) : Boolean(Object.keys(data).length) ? (
        <BottomSheetScrollView
          style={tw`flex-grow`}
          contentContainerStyle={tw`pb-5`}
          showsVerticalScrollIndicator={false}>
          {clientInputTabItems.map(({id, title}, index) => {
            id = id || title.toLowerCase();

            return (
              <View
                key={id || title}
                style={tw.style({
                  'mt-4 pt-4 border-t border-[#E4E7EC]': index >= 1,
                })}>
                <Text style={tw`text-xs mb-1 font-med text-descGray`}>
                  {title}:
                </Text>
                {id === 'addresses' ? (
                  <>
                    {data[id]?.length ? (
                      <Addresses data={data.addresses} clientId={id} />
                    ) : (
                      <EmptyScreen />
                    )}
                  </>
                ) : (
                  <Text style={tw`text-black text-sm font-sans`}>
                    {data[id]}
                  </Text>
                )}
              </View>
            );
          })}
        </BottomSheetScrollView>
      ) : (
        <EmptyScreen />
      )}
    </>
  );
};

export {ClientInputTab};
