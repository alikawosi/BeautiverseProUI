import React, {useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {EmptyScreen, FullScreenModalWrapper, SearchBox} from '../commons';
import {AddressSearchCard, SectionWrapper} from '../elements';

const ClientAddressModal = () => {
  const {goBack} = useNavigation();
  const {params} = useRoute();
  const {id, name} = params?.user;
  const [searchValue, setSearchValue] = useState('');
  const [selectedAddress, setSelectedAddress] = useState({
    id: null,
    address: null,
  });
  const clientAddress = useQuery({
    queryKey: ['clientAddress', id],
    queryFn: () =>
      axios.get('pro/client/addresses', {
        params: {
          id,
        },
      }),
  });
  const searchedAddresses = useQuery({
    enabled: Boolean(searchValue),
    queryFn: () =>
      axios.get('location/predict_address', {
        params: {
          add_place_id: true,
          address: searchValue,
        },
      }),
    queryKey: ['searchedAddresses', searchValue],
  });

  const data = searchedAddresses.data || clientAddress.data;
  const isLoading = searchedAddresses.isLoading || clientAddress.isLoading;

  const onPressAddress = (address, id) => {
    setSelectedAddress({address, id});
  };

  const onSubmit = () => {
    params?.addClientAddress(selectedAddress);
    goBack();
  };

  return (
    <FullScreenModalWrapper
      title="Client Address"
      backButton
      buttonTitle="Add"
      disabled={!selectedAddress.address}
      onSubmit={onSubmit}
      containerStyle={tw`relative`}
      contentContainerStyle={tw`flex-grow`}
      hasSeparator={false}>
      <SearchBox
        placeholder="Search for an address"
        hasShadow={false}
        onChange={setSearchValue}
      />
      {isLoading ? (
        <View
          style={tw`items-center justify-center absolute left-0 right-0 top-0 bottom-0 z-50`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {Boolean(data?.length) ? (
            <View style={tw`mx-5`}>
              <Text style={tw`text-sm text-descGray mt-5 pl-4`}>
                {name}'s Address
              </Text>
              <SectionWrapper style={tw`mt-4 px-2 py-2`}>
                {data.map(({id, place_id, address}) => {
                  const addressId = place_id || id;
                  return (
                    <AddressSearchCard
                      key={addressId}
                      address={address}
                      isActive={addressId === selectedAddress?.id}
                      onPress={onPressAddress.bind(null, address, addressId)}
                    />
                  );
                })}
              </SectionWrapper>
            </View>
          ) : (
            <EmptyScreen style={tw`my-auto`} />
          )}
        </>
      )}
    </FullScreenModalWrapper>
  );
};

export {ClientAddressModal};
