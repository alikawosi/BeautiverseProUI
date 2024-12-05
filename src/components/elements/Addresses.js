import React, {useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Options} from '../commons';
import {MenuOption} from 'react-native-popup-menu';
import {useMutation} from 'react-query';
import axios from 'axios';

const Addresses = ({data, style, clientId, refetch = () => null}) => {
  const {navigate} = useNavigation();
  const [selected, setSelected] = useState(null);
  const deleteAddress = useMutation(
    address_id =>
      axios.delete('/pro/client/address/delete', {
        params: {
          address_id,
          id: clientId,
        },
      }),
    {
      onSuccess: refetch,
    },
  );
  const onEdit = location => {
    const {id, ...address} = location;
    navigate('NewAddressModal', {
      id: clientId,
      location: {
        ...address,
        address_id: id,
      },
      isEdit: true,
    });
  };

  const navigateToDeleteModal = location => {
    navigate('DeleteModal', {
      title: 'Address',
      keyword: location.address,
      question: 'Are you sure to remove address',
      onSubmit: () => {
        setSelected(location.id);
        deleteAddress.mutate(location.id);
      },
    });
  };

  return (
    <View style={tw.style('relative', style)}>
      {deleteAddress.isLoading && (
        <View
          style={tw`justify-center items-center absolute top-0 left-0 bottom-0 right-0 z-50`}>
          <ActivityIndicator />
        </View>
      )}
      {data.map((location, index) => (
        <View
          key={location.id}
          style={tw.style('flex-row justify-between', {
            'border-t border-[#E4E7EC] border-opacity-75 pt-5 mt-5': index >= 1,
            'opacity-50': location.id === selected,
          })}>
          <View>
            {location.name && (
              <Text style={tw`bv-sans-base mb-1`}>{location.name}</Text>
            )}
            <Text style={tw`text-descGray text-sm`}>{location.address}</Text>
          </View>
          <Options>
            <MenuOption style={tw`h-9`} onSelect={onEdit.bind(null, location)}>
              <Text style={tw`bv-med-sm`}>Edit</Text>
            </MenuOption>
            <MenuOption
              style={tw`h-9`}
              onSelect={navigateToDeleteModal.bind(null, location)}>
              <Text style={tw`bv-med-sm text-basicRed`}>Delete</Text>
            </MenuOption>
          </Options>
        </View>
      ))}
    </View>
  );
};

export {Addresses};
