import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {
  AvailibilityTimeCard,
  BusinessSetupLayout,
} from '../../components/screens/BusinessSetup';

const Availability = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();

  const {data, isLoading, isFetching} = useQuery({
    queryFn: () => axios.get('/pro/setup/times'),
    queryKey: ['getTimes'],
  });

  return (
    <BusinessSetupLayout
      progress={5}
      isLoading={isLoading}
      isNextButtonDisabled={isFetching}
      isProgressVisible={!params?.stepsHidden}
      isFooterVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      headerTitle={'Set Your Availability'}
      headerDesc={'Time Zone: Eastern Time (Toronto)'}
      onPressNextButton={() => navigate('BookingRules')}
      onPressSkipButton={() => navigate('BookingRules')}
      twoButtonFooter>
      <AvailibilityTimeCard data={data} style={tw`mb-10`} />
    </BusinessSetupLayout>
  );
};

export default Availability;
