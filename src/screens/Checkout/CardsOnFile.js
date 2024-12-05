import React, {useEffect, useMemo, useState} from 'react';
import {ActivityIndicator, Image, Text, View} from 'react-native';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {PaymentIcon} from 'react-native-payment-icons';

import tw from '../../../tailwind';
import {
  Button,
  EmptyScreen,
  InputWrapper,
  PageWrapper,
} from '../../components/commons';
import {Footnote, Header} from '../../components/screens/Checkout';
import {SectionWrapper, Footer} from '../../components/elements';

const CardsOnFile = ({route}) => {
  const {navigate} = useNavigation();
  const {charge} = useQueryClient().getQueryData('checkoutAppointment');
  const mutation = useMutation(
    card_id =>
      axios.post('/pro/checkout', {
        card_id,
        book_id: route.params.bookId,
        type: 'card',
      }),
    {
      onSuccess: () => navigate('CheckoutSuccessfulModal'),
    },
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const {data, isLoading} = useQuery({
    queryKey: ['cardsOnFile'],
    queryFn: () =>
      axios.get('pro/checkout/payment/cards', {
        params: {
          book_id: route.params.bookId,
        },
      }),
  });
  const footerOptions = useMemo(() => {
    return [
      {
        title: 'Charge',
        onPress: () => mutation.mutate(selectedCard),
        loading: mutation.isLoading,
      },
    ];
  }, [selectedCard, mutation.isLoading]);

  useEffect(() => {
    if (data?.length) {
      setSelectedCard(data.find(({primary}) => primary)?.id);
    }
  }, [data]);

  return (
    <PageWrapper
      backButton
      headerShown
      headerTitle="Credit/Debit Card"
      contentContainerStyle={tw`pb-24`}
      StickyFooterComponent={<Footer.Primary options={footerOptions} />}>
      <Header amount={charge} />
      {isLoading ? (
        <View style={tw`items-center justify-center flex-1 my-[42]`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {data?.length ? (
            <SectionWrapper>
              {data.map(({id, last4, brand}, index) => (
                <InputWrapper
                  key={id}
                  isActive={id === selectedCard}
                  onPress={setSelectedCard.bind(null, id)}
                  contentStyle={tw`justify-between`}
                  style={tw.style('rounded-lg', {
                    'mt-4': index > 0,
                  })}>
                  <View style={tw`w-15 items-center`}>
                    {brand ? (
                      <PaymentIcon type={brand.toLowerCase()} />
                    ) : (
                      <PaymentIcon type="general" />
                    )}
                  </View>
                  <View style={tw`flex-row items-center flex-1`}>
                    {new Array(3)
                      .fill('****')
                      .concat(last4)
                      .map((n, i) => (
                        <Text
                          key={i}
                          style={tw.style('text-sm mx-auto text-descGray', {
                            'font-med': i === 3,
                          })}>
                          {n}
                        </Text>
                      ))}
                  </View>
                </InputWrapper>
              ))}
            </SectionWrapper>
          ) : (
            <EmptyScreen
              description={'No Payment Card Added!'}
              style={tw`mt-10`}
            />
          )}
        </>
      )}
      <Footnote />
    </PageWrapper>
  );
};

export default CardsOnFile;
