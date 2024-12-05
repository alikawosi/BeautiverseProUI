import React, {useState} from 'react';
import {AddCircle} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {ActivityIndicator} from 'react-native';

import tw from '../../../tailwind';
import {Button} from '../../components/commons';
import {
  BusinessSetupLayout,
  SectionWrapper,
  TransporationCard,
} from '../../components/screens/BusinessSetup';

const TransporationFee = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();
  const [transportation, setTransportation] = useState({
    manuals: null,
    automates: null,
  });

  const {data, isLoading, isFetching} = useQuery({
    queryFn: () => axios.get('/pro/setup/transportation'),
    queryKey: ['getTransportation'],
  });

  // const updateTransportation = useMutation(
  //   () =>
  //     axios.post('/pro/setup/transportation', {
  //       manuals: JSON.stringify(
  //         transportation.manuals.map(item => {
  //           item.services.map(({id}) => id);
  //           return item;
  //         }),
  //       ),
  //       automates: JSON.stringify({
  //         ...transportation.automates,
  //         services: transportation.automates.services.map(({id}) => id),
  //       }),
  //     }),
  //   {
  //     onSuccess: () => navigate('Availability'),
  //   },
  // );

  return (
    <BusinessSetupLayout
      progress={4}
      isProgressVisible={!params?.stepsHidden}
      isFooterVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      twoButtonFooter
      isNextButtonDisabled={
        !(transportation.automates && transportation.manuals)
      }
      headerTitle={'How much do you charge for transportation fee?'}
      headerDesc={'This fee applies to all mobiles services'}
      onPressNextButton={() => navigate('Availability')}
      onPressSkipButton={() => navigate('Availability')}>
      {isLoading || isFetching ? (
        <ActivityIndicator color={'#FF9100'} style={tw`mb-4`} />
      ) : (
        <>
          {transportation.manuals?.length || data?.manuals?.length ? (
            <SectionWrapper
              containerStyle={tw`mb-4`}
              title={'Manual'}
              onDelete={() => false}
              onEdit={() => false}
              headerSeparator>
              <TransporationCard
                isManual
                feeList={transportation?.manuals || data?.manuals}
                serviceList={
                  transportation?.manuals?.[0]?.services.map(item => {
                    return {
                      ...item,
                      title: item.title.replace(/\s-\s\d{2}/g, ''),
                    };
                  }) || data?.manuals[0].services
                }
              />
            </SectionWrapper>
          ) : null}
          {(transportation?.automates || data?.automates) && (
            <SectionWrapper
              containerStyle={tw`mb-4`}
              title={'Automated'}
              onDelete={() => false}
              onEdit={() => false}
              headerSeparator>
              <TransporationCard
                fee={
                  transportation.automates?.value
                    ? `${transportation.automates.value}%`
                    : null || data?.automates?.value
                }
                serviceList={
                  transportation.automates?.services.map(item => {
                    return {
                      ...item,
                      title: item.title.replace(/\s-\s\d{2}/g, ''),
                    };
                  }) || data?.automates?.services
                }
              />
            </SectionWrapper>
          )}
        </>
      )}
      <Button
        title={'Add Transportation Fee'}
        titleStyle={tw`bv-sans-sm text-black`}
        containerStyle={tw`mx-5 mb-10 bg-gray-200 rounded-2xl`}
        icon={<AddCircle size={18} color="#000000" />}
        onPress={() =>
          navigate('TransportationFeeModal', {
            setTransportation,
          })
        }
      />
    </BusinessSetupLayout>
  );
};

export default TransporationFee;
