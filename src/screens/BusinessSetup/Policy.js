import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {
  BusinessSetupLayout,
  PolicyCard,
  SectionWrapper,
} from '../../components/screens/BusinessSetup';
import {Button} from '../../components/commons';
import {AddCircle} from 'iconsax-react-native';

const Policy = () => {
  const {navigate, addListener} = useNavigation();
  const {params} = useRoute();
  const [cancellations, setCancellations] = useState([]);
  const [noShow, setNoShow] = useState([]);

  const {data, isLoading, isFetching, refetch} = useQuery({
    queryFn: () => axios.get('pro/setup/policies'),
    queryKey: ['getPolicies'],
  });

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      refetch();
    });

    return unsubscribe;
  }, [addListener]);

  const updatePolicies = useMutation(
    () =>
      axios.post('/pro/setup/policies', {
        cancellations: JSON.stringify(cancellations),
        no_shows: JSON.stringify(noShow),
        rules: data ? data.rules : '',
      }),
    {
      onSuccess: () => navigate('FAQ'),
    },
  );

  const cancellationData = [
    ...(data ? data.cancellations : []),
    ...cancellations,
  ];

  const noShowsData = [...(data ? data.no_shows : []), ...noShow];

  return (
    <BusinessSetupLayout
      isLoading={isLoading}
      progress={10}
      isNextButtonDisabled={isFetching}
      isProgressVisible={!params?.stepsHidden}
      isFooterVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      headerTitle={'Cancellation and No-Show Protection'}
      headerDesc={
        'These policies protect you from late cancellations and no-shows'
      }
      isNextButtonLoading={updatePolicies.isLoading}
      onPressNextButton={updatePolicies.mutate}
      onPressSkipButton={() => navigate('FAQ')}
      twoButtonFooter>
      <SectionWrapper
        title={'Cancellation Policy'}
        titleStyle={tw`bv-sans-base`}
        desc={
          'You`ll be able to charge a cancellation fee in case of a late cancellation for the following services.'
        }
        descStyle={tw`mt-2`}
        type={'switch'}
        isAccordion
        isActiveDefaultValue={false}
        containerStyle={tw`mb-4`}>
        {cancellationData.map((item, index) => {
          return (
            <PolicyCard
              key={item.id}
              number={index + 1}
              title={'Cancellation Policy'}
              percentage={item.value}
              serviceList={item?.services}
            />
          );
        })}
        <Button
          title={'Add Policy'}
          defaultColor={'#7A7A8A'}
          titleStyle={tw`bv-sans-sm`}
          containerStyle={tw`bg-[#54556914] mt-4 rounded-2xl`}
          icon={<AddCircle size={16} color="#7A7A8A" />}
          onPress={() =>
            navigate('CancellationPolicyModal', {
              onSubmit: data => {
                setCancellations(prev => [...prev, data]);
              },
            })
          }
        />
      </SectionWrapper>
      <SectionWrapper
        title={'No-Show Policy'}
        titleStyle={tw`bv-sans-base`}
        desc={
          'You`ll be able to charge a no-show fee in case of a no-show for the following services'
        }
        descStyle={tw`mt-2`}
        type={'switch'}
        isAccordion
        isActiveDefaultValue={noShowsData.length > 0 ? true : false}
        containerStyle={tw`mb-10`}>
        {noShowsData.map((item, index) => {
          return (
            <PolicyCard
              key={item.id}
              isNoShow
              number={index + 1}
              title={'No-Show'}
              percentage={item.value}
              serviceList={item.services}
            />
          );
        })}
        <Button
          title={'Add a No-Show Policy'}
          defaultColor={'#7A7A8A'}
          titleStyle={tw`bv-sans-sm`}
          containerStyle={tw`bg-[#54556914] rounded-2xl mt-4`}
          icon={<AddCircle size={16} color="#7A7A8A" />}
          onPress={() =>
            navigate('NoShowPolicyModal', {
              onSubmit: data => {
                setNoShow(prev => [...prev, data]);
              },
            })
          }
        />
      </SectionWrapper>
    </BusinessSetupLayout>
  );
};

export default Policy;
