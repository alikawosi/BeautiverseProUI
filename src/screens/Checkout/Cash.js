import React, {useMemo} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {Input, PageWrapper} from '../../components/commons';
import {SectionWrapper, Footer} from '../../components/elements';
import {Header} from '../../components/screens/Checkout';

const Cash = () => {
  const {navigate} = useNavigation();
  const {bookId} = useRoute().params;
  const {charge} = useQueryClient().getQueryData('checkoutAppointment');
  const mutation = useMutation(
    () =>
      axios.post('/pro/checkout', {
        book_id: bookId,
        type: 'cash',
      }),
    {
      onSuccess: () => navigate('CheckoutSuccessfulModal'),
    },
  );

  const footerOptions = useMemo(() => {
    return [
      {
        title: 'Confirm',
        loading: mutation.isLoading,
        onPress: () => mutation.mutate(),
      },
    ];
  }, [mutation.isLoading]);

  return (
    <PageWrapper
      headerShown
      backButton
      headerTitle="Cash"
      StickyFooterComponent={<Footer.Primary options={footerOptions} />}>
      <Header amount={charge} />
      <SectionWrapper>
        <Input
          label="Aamount"
          disabled
          style={tw`opacity-100 rounded-lg`}
          formValue={charge}
        />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default Cash;
