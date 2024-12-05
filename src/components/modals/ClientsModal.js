import React, {useState} from 'react';
import {Add} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import tw from '../../../tailwind';
import {
  Button,
  SearchBox,
  FullScreenModalWrapper,
} from '../../components/commons';
import {ClientsList} from '../../components/elements';

const ClientsModal = () => {
  const {navigate, goBack} = useNavigation();
  const params = useRoute().params;
  const [searchValue, setSearchValue] = useState('');
  const onSelect = client => {
    params.selectContact(client);
    if (params?.isBack) {
      goBack();
    }
  };

  return (
    <FullScreenModalWrapper
      backButton
      hasOwnScroller
      title={'Clients'}
      hasSeparator={false}
      StickyButton={
        <Button
          primary
          containerStyle={tw`h-12 w-12`}
          icon={<Add size={32} color="white" />}
          onPress={() => navigate('Client', {screen: 'AddClientModal'})}
        />
      }>
      <SearchBox
        onChange={setSearchValue}
        style={tw`mb-5`}
        hasShadow={false}
        placeholder="Search by name, email, or phone"
      />
      <ClientsList selectContact={onSelect} searchValue={searchValue} />
    </FullScreenModalWrapper>
  );
};

export {ClientsModal};
