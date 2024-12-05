import React, {useEffect} from 'react';
import {useMutation, useQueryClient} from 'react-query';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import dayjs from 'dayjs';

import tw from '../../../tailwind';
import {PageWrapper} from '../../components/commons';
import {CreditCardForm, Footer} from '../../components/elements';
import {Footnote, Header} from '../../components/screens/Checkout';

const ManualCreditCardEntry = () => {
  const {navigate} = useNavigation();
  const {charge} = useQueryClient().getQueryData('checkoutAppointment');
  const {handleSubmit, control, formState, getFieldState, watch, reset} =
    useForm({
      defaultValues: {
        name: null,
        number: null,
        expiryDate: null,
        cvc: null,
        postal_code: null,
      },
    });
  const mutation = useMutation(({expiryDate, ...data}) => {
    const date = dayjs(expiryDate * 1000);

    return axios.post('pro/checkout/payment/card/create', {
      ...data,
      book_id: 64,
      exp_month: String(date.month() + 1),
      exp_year: String(date.year()),
    });
  });

  const form = {watch, control, getFieldState, formState};

  const footerOptions = [
    {
      title: 'Charge',
      loading: mutation.isLoading,
      onPress: handleSubmit(mutation.mutate),
    },
  ];

  useEffect(() => {
    if (mutation.data) {
      reset();
      navigate('CardsOnFile');
    }
  }, [mutation.data]);

  return (
    <PageWrapper
      backButton
      headerShown
      contentContainerStyle={tw`pb-28`}
      headerTitle="Credit/Debit Card"
      StickyFooterComponent={<Footer.Primary options={footerOptions} />}>
      <Header amount={charge} />
      <CreditCardForm form={form} />
      <Footnote />
    </PageWrapper>
  );
};

export default ManualCreditCardEntry;
