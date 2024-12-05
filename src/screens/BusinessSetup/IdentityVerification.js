import React from 'react';
import {Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Button} from '../../components/commons';
import {BusinessSetupLayout} from '../../components/screens/BusinessSetup';
import {useQuery} from 'react-query';
import axios from 'axios';

const IdentityVerification = () => {
  const {navigate} = useNavigation();
  const {params} = useRoute();

  const {data, isLoading} = useQuery({
    queryFn: () => axios.get('/pro/setup/identity'),
    queryKey: ['getIdentityVerificationStatus'],
  });

  return (
    <BusinessSetupLayout
      progress={14}
      isLoading={isLoading}
      isProgressVisible={!params?.stepsHidden}
      isFooterVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      headerTitle={'Identity Verification'}
      headerLinkIconStyle={tw`items-start`}
      onPressNextButton={() => navigate('ClientList')}
      onPressSkipButton={() => navigate('ClientList')}
      twoButtonFooter>
      {data ? (
        <Text style={tw`bv-sans-lg self-center`}>In progress ... </Text>
      ) : (
        <Button
          title={'Start Verfication Process'}
          defaultColor={'#7A7A8A'}
          titleStyle={tw`bv-sans-sm`}
          containerStyle={tw` mx-5 bg-[#54556914] rounded-2xl`}
          onPress={() => navigate('IdentityVerificationModal')}
        />
      )}
    </BusinessSetupLayout>
  );
};

export default IdentityVerification;
