import React, {useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Add} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {Button, PageWrapper, SearchBox} from '../../components/commons';
import {ClientsList} from '../../components/elements';

const ToolBox = () => {
  const {navigate} = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const selectContact = ({id}) =>
    navigate('Client', {screen: 'ClientInfo', params: {id}});

  return (
    <PageWrapper
      hasOwnScroller
      StickyFooterComponent={
        <Button
          primary
          gradientStyle={tw`rounded-2xl`}
          icon={<Add size={32} color="white" />}
          onPress={() => navigate('Client', {screen: 'AddClientModal'})}
          containerStyle={tw`h-12 w-12 absolute bottom-5 right-5`}
        />
      }
      StickyHeaderComponent={
        <View style={tw`flex-row p-5 bg-white rounded-b-3xl`}>
          <SearchBox
            onChange={setSearchValue}
            hasShadow={false}
            style={tw`mx-0 flex-grow`}
            inputStyle={tw`bg-selectedGray`}
            placeholder="Search by name, email, or phone"
          />
        </View>
      }>
      <ClientsList
        style={tw`mt-5`}
        selectContact={selectContact}
        searchValue={searchValue}
      />
    </PageWrapper>
  );
};

export default ToolBox;
