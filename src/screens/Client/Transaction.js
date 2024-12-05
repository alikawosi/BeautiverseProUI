import React from 'react';
import {ArrowRight2} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import tw from '../../../tailwind';
import {PageWrapper} from '../../components/commons';
import {
  SectionWrapper,
  Profile,
  TransactionStatus,
  TransactionDetails,
  Footer,
} from '../../components/elements';
import {GENERAL_CONST} from '../../constants';
import {useQuery} from 'react-query';
import axios from 'axios';
import {ActivityIndicator, View} from 'react-native';

const Transaction = () => {
  const {params} = useRoute();
  const {goBack} = useNavigation();
  const {data, isLoading} = useQuery({
    queryKey: ['invoiceDetail', params.id, params.clientId],
    queryFn: () =>
      axios.get(
        `/pro${
          params.type === 'transaction'
            ? '/setting/transactions/detail'
            : '/client/invoice'
        }`,
        {
          params:
            params.type === 'transaction'
              ? {id: params.id}
              : {
                  client_id: params.clientId,
                  invoice_id: params.id,
                },
        },
      ),
    onError: () => goBack(),
  });

  return (
    <PageWrapper
      headerShown
      backButton
      headerTitle="Transaction"
      contentContainerStyle={tw`pb-22 flex-grow`}>
      {isLoading ? (
        <View style={tw`items-center justify-center flex-1`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <SectionWrapper>
            <Profile {...data.client} />
          </SectionWrapper>
          <SectionWrapper>
            <TransactionStatus {...data} />
          </SectionWrapper>
          <SectionWrapper>
            <TransactionDetails {...data} factor={GENERAL_CONST.factor} />
          </SectionWrapper>
        </>
      )}
    </PageWrapper>
  );
};

export default Transaction;
