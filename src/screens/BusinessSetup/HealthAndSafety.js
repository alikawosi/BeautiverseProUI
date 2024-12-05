import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {useMutation, useQuery} from 'react-query';

import tw from '../../../tailwind';
import {
  BusinessSetupLayout,
  SectionWrapper,
} from '../../components/screens/BusinessSetup';
import {CheckBox, Input} from '../../components/commons';
import {Text} from 'react-native';

const HealthAndSafety = () => {
  const {navigate, goBack, addListener} = useNavigation();
  const {params} = useRoute();
  const [isHealthAccepted, setIsHealthAccepted] = useState(false);
  const [value, setValue] = useState();
  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      getHealth.refetch();
    });
    return unsubscribe;
  }, [getHealth, addListener]);

  const getHealth = useQuery({
    queryFn: async () => await axios.get('pro/setup/health'),
    queryKey: ['getHealth'],
    onSuccess: res => {
      //console.log('res', res);
      setValue(res);
    },
  });

  const postHealth = useMutation({
    mutationFn: params => {
      //console.log('p', JSON.stringify(params));
      return axios.post('pro/setup/health', params);
    },
    onSuccess: () => {
      !params?.stepsHidden ? navigate('PaymentMethods') : goBack();
    },
  });

  return (
    <BusinessSetupLayout
      isLoading={getHealth.isLoading || getHealth.isFetching}
      progress={12}
      isProgressVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      headerTitle={'Health & Safety'}
      headerDesc={
        'This will be shown on your profile in Health and Safety section'
      }
      onPressNextButton={() => postHealth.mutate({policy: value})}
      onPressSkipButton={() => navigate('PaymentMethods')}
      isNextButtonLoading={postHealth.isLoading}
      footerButtonTitle={params?.stepsHidden ? 'Save' : 'Next'}
      twoButtonFooter={!params?.stepsHidden}>
      <SectionWrapper
        title={
          'Do you respect and follow your provincial and federal health and safety protocols?'
        }
        titleStyle={tw`mb-4 bv-sans-sm text-black`}
        containerStyle={tw`mb-4`}
        contentContainerStyle={tw`px-1`}>
        <CheckBox
          label={'Yes I follow all required health & safety & protocols.'}
          labelStyle={tw`bv-reg-xs text-black`}
          style={tw`justify-start items-start`}
          isChecked={isHealthAccepted}
          onPress={() => setIsHealthAccepted(!isHealthAccepted)}
        />
      </SectionWrapper>
      <SectionWrapper
        title={'Your own Health & Safety'}
        containerStyle={tw`mb-4`}
        contentContainerStyle={tw`pt-4`}>
        <Input
          label={'Own Policy '}
          formValue={value}
          onChange={val => setValue(val)}
        />
        <Text style={tw`bv-med-xs text-descGray mt-4`}>
          Add your own health and safety guidelines, etc
        </Text>
      </SectionWrapper>
    </BusinessSetupLayout>
  );
};

export default HealthAndSafety;
