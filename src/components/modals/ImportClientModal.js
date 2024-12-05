import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {
  CheckBox,
  FullScreenModalWrapper,
  SearchBox,
  SwitchBox,
} from '../commons';
import {ContactsList} from '../../components/elements';

const ImportClientModal = ({route}) => {
  const {goBack} = useNavigation();
  //const {onImport = () => false} = route.params;
  const [searchText, setSearchText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const contacts = useQueryClient().getQueryData('contacts');
  const [toggleSelectAll, setToggleSelectAll] = useState(false);

  const addClientBulk = useMutation({
    mutationFn: clients =>
      axios.post('/pro/clients/bulk', {
        clients,
      }),
    onSuccess: goBack,
  });

  const onPressItem = item => {
    const obj = {
      first_name: item?.givenName,
      last_name: item?.familyName,
      email: item.emailAddresses[0]?.email,
      phone: item.phoneNumbers[0]?.number,
      imported: true,
    };
    let tempList = [...selectedItems];
    if (tempList.find(i => i.phone === obj.phone)) {
      var filteredList = tempList.filter(p => p.phone !== obj.phone);
      setSelectedItems(filteredList);
    } else {
      tempList.push(obj);
      setSelectedItems(tempList);
    }
  };

  const onSelectAll = () => {
    const status = !toggleSelectAll;
    setToggleSelectAll(status);
    setSelectedItems(
      status
        ? contacts?.map(item => ({
            first_name: item?.givenName,
            last_name: item?.familyName,
            email: item.emailAddresses[0]?.email,
            phone: item.phoneNumbers[0]?.number,
            imported: true,
          }))
        : [],
    );
  };

  return (
    <FullScreenModalWrapper
      title={'Import Clients'}
      backButton
      hasOwnScroller
      isButtonTitleLoading={addClientBulk.isLoading}
      buttonTitle={'Add Contacts'}
      hasSeparator={false}
      hasStickyButton
      onSubmit={() => {
        console.log('selected', JSON.stringify(selectedItems));
        addClientBulk.mutate(selectedItems);
        //onImport(selectedItems);
        //goBack();
      }}
      contentContainerStyle={tw`px-5`}>
      <SearchBox
        style={tw`mb-5`}
        hasShadow={false}
        onChange={value => setSearchText(value)}
        placeholder="Search by name, email, or phone"
      />
      <View style={tw`flex-row justify-between px-5 mb-4`}>
        <Text style={tw`bv-sans-sm text-descGray`}>
          Item Selected:{' '}
          <Text style={tw`bv-sans-sm text-primary`}>
            {`(${selectedItems?.length})`}
          </Text>
        </Text>
        <CheckBox
          reverse
          onPress={onSelectAll}
          style={tw`w-auto`}
          label={'Select All'}
          isChecked={toggleSelectAll}
          labelStyle={tw`bv-sans-sm text-descGray mr-1`}
        />
      </View>
      <ContactsList
        type="check"
        isSelected={toggleSelectAll}
        selectContact={onPressItem}
        searchValue={searchText}
      />
    </FullScreenModalWrapper>
  );
};

export {ImportClientModal};
