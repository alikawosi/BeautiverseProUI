import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {
  BusinessSetupLayout,
  MenuCard,
} from '../../components/screens/BusinessSetup';

const BusinessSetupIntro = () => {
  const {navigate} = useNavigation();
  const [active, setActive] = useState('independent');
  const getBusinessSetupMenu = useQuery({
    queryFn: async () => await axios.get('/pro/setup/business/types'),
    queryKey: ['GetBusinessSetupMenu'],
  });

  return (
    <BusinessSetupLayout
      isLoading={getBusinessSetupMenu.isLoading}
      isProgressVisible={false}
      headerTitle={'Which one describes your business best?'}
      listMode
      data={getBusinessSetupMenu.data}
      renderItem={item => (
        <MenuCard
          key={item.id}
          title={item.label}
          desc={item.description}
          disabled={item.id !== 'independent'}
          isActive={active === item.id ? true : false}
          onPress={() => setActive(item.id)}
        />
      )}
      listContainerStyle={tw`shadow-lg`}
      isNextButtonDisabled={active !== 'independent' ? true : false}
      onPressNextButton={() => navigate('Location')}
    />
  );
};

export default BusinessSetupIntro;
