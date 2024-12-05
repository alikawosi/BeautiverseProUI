import React from 'react';
import tw from '../../../tailwind';
import {PageWrapper} from '../../components/commons';
import {useQuery} from 'react-query';
import axios from 'axios';

import {
  AvailibilityTimeCard,
  SectionWrapper,
} from '../../components/screens/BusinessSetup';

const BookingAvailability = () => {
  const {data, isLoading} = useQuery({
    queryFn: () => axios.get('/pro/setup/times'),
    queryKey: ['getTimes'],
  });

  return (
    <PageWrapper
      headerShown={true}
      headerTitle={'Booking Availability'}
      backButton
      isLoading={isLoading}
      contentContainerStyle={tw`pb-24`}>
      <SectionWrapper>
        <AvailibilityTimeCard style={tw`p-0`} data={data} />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default BookingAvailability;
