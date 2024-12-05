import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {AddCircle} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {
  BusinessSetupLayout,
  SectionWrapper,
} from '../../components/screens/BusinessSetup';
import {Button, Form} from '../../components/commons';
import {BUSINESSSETUP_CONST} from '../../constants';
import {useForm} from '../../hooks';

const PaymentMethods = () => {
  const {navigate, goBack, addListener} = useNavigation();
  const {params} = useRoute();

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      getPayment.refetch();
    });
    return unsubscribe;
  }, [getPayment, addListener]);

  const getPayment = useQuery({
    queryFn: () => axios.get('pro/setup/payment'),
    queryKey: ['getPayment'],
  });

  const postPayment = useMutation({
    mutationFn: data =>
      axios.post('pro/setup/payment', {
        methods: JSON.stringify(Object.keys(data).filter(key => data[key])),
      }),
    onSuccess: () => {
      !params?.stepsHidden ? navigate('IdentityVerification') : goBack();
    },
  });

  const methods = getPayment?.data?.methods;

  const {form, handleSubmit} = useForm({
    fields: BUSINESSSETUP_CONST.paymentMeyhodFormData.slice(0, 3),
    defaultValue: {
      in_app: methods ? Boolean(methods?.includes('in_app')) : false,
      cash: methods ? Boolean(methods?.includes('cash')) : false,
      e_transfer: methods ? Boolean(methods?.includes('e_transfer')) : false,
    },
    onSubmit: postPayment.mutate,
  });

  return (
    <BusinessSetupLayout
      isLoading={getPayment.isLoading}
      progress={13}
      isProgressVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      footerButtonTitle={params?.stepsHidden ? 'Save' : 'Next'}
      headerTitle={'Payment Methods'}
      headerDesc={'This is how clients can pay you'}
      onPressNextButton={handleSubmit}
      onPressSkipButton={() => navigate('IdentityVerification')}
      isNextButtonLoading={postPayment.isLoading}
      isNextButtonDisabled={getPayment.isFetching}
      twoButtonFooter={!params?.stepsHidden}>
      <SectionWrapper
        title={'Which payment methods do you accept?'}
        containerStyle={tw`mb-4`}
        contentContainerStyle={tw`pt-4 px-2`}>
        <Form
          fields={BUSINESSSETUP_CONST.paymentMeyhodFormData.slice(0, 3)}
          form={form}
        />
      </SectionWrapper>
      {/* <SectionWrapper
        title={'Taxes - 13%'}
        containerStyle={tw`mb-4`}
        type={'switch'}
        isAccordion
        isActiveDefaultValue={false}
        desc={
          'You’ll be able to charge a cancellation fee in case of a late cancelation for the following services'
        }>
        <Button
          title={'Assign Service'}
          defaultColor={'#7A7A8A'}
          titleStyle={tw`bv-sans-sm `}
          icon={<AddCircle size={16} color="#7A7A8A" />}
          containerStyle={tw`bg-grayBg mt-4 rounded-2xl`}
          onPress={() => alert('Under Construction')}
        />
      </SectionWrapper> */}
    </BusinessSetupLayout>
  );
};

export default PaymentMethods;
