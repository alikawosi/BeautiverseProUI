import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {MenuOption} from 'react-native-popup-menu';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {PaymentIcon} from 'react-native-payment-icons';

import tw from '../../../../tailwind';
import {EmptyScreen, InputWrapper, Options} from '../../commons';

const PaymentCardsTab = ({id}) => {
  const {navigate} = useNavigation();
  const [selected, setSelected] = useState(null);
  const isFocused = useIsFocused();
  const {data, refetch, isLoading} = useQuery({
    queryKey: ['clientCards', id],
    queryFn: () =>
      axios.get('/pro/client/cards', {
        params: {
          client_id: id,
        },
      }),
  });
  const deleteCard = useMutation(
    cardId =>
      axios.delete('/pro/client/card', {
        params: {
          client_id: id,
          card_id: cardId,
        },
      }),
    {
      onSuccess: refetch,
    },
  );
  const onEdit = card_id => {
    navigate('NewCardModal', {
      id,
      isEdit: true,
      cardId: card_id,
    });
  };

  useEffect(() => {
    if (isFocused) refetch();
  }, [isFocused]);

  const navigateToDeleteModal = (last4, id) => {
    navigate('DeleteModal', {
      title: 'Delete Card',
      question: 'Are you sure to remove',
      keyword: last4,
      onSubmit: () => {
        setSelected(id);
        deleteCard.mutate(id);
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <View style={tw`items-center justify-center my-8`}>
          <ActivityIndicator />
        </View>
      ) : Boolean(data?.length) ? (
        <BottomSheetScrollView
          style={tw`flex-grow`}
          contentContainerStyle={tw`pb-5`}>
          {data
            .filter(item => item.id)
            .map(({id, last4, brand, primary}, index) => (
              <View
                key={id}
                style={tw.style({
                  'mt-5': index >= 1,
                })}>
                <InputWrapper
                  key={id}
                  style={tw.style(`rounded-lg px-4`, {
                    'opacity-50': Boolean(id === selected),
                  })}
                  isActive={primary}>
                  {brand && (
                    <PaymentIcon
                      type={brand.toLowerCase('')}
                      style={tw`mr-auto`}
                    />
                  )}
                  <View
                    style={tw`
                  flex-row items-center left-16 right-10 flex-1 absolute`}>
                    {new Array(3)
                      .fill('****')
                      .concat(last4)
                      .map((n, i) => (
                        <Text
                          key={i}
                          style={tw.style('text-sm mx-auto', {
                            'font-med': i === 3,
                            'text-primary': primary,
                          })}>
                          {n}
                        </Text>
                      ))}
                  </View>
                  <Options style={tw`ml-auto`}>
                    <MenuOption
                      onSelect={onEdit.bind(null, id)}
                      style={tw`h-9`}>
                      <Text style={tw`bv-med-sm`}>Edit</Text>
                    </MenuOption>
                    <MenuOption
                      onSelect={navigateToDeleteModal.bind(null, last4, id)}
                      style={tw`h-9`}>
                      <Text style={tw`bv-med-sm text-basicRed`}>Delete</Text>
                    </MenuOption>
                  </Options>
                </InputWrapper>
              </View>
            ))}
        </BottomSheetScrollView>
      ) : (
        <EmptyScreen
          style={tw`mt-14`}
          description="You have no payment cards ..."
        />
      )}
    </>
  );
};

export {PaymentCardsTab};
