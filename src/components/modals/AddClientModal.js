import React from 'react';
import axios from 'axios';
import {useMutation} from 'react-query';
import {ActivityIndicator, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {FullScreenModalWrapper} from '../commons';
import {ClientForm} from '../elements';
import {useForm} from '../../hooks';
import {CLIENT_CONST} from '../../constants';

const AddClientModal = () => {
  const {goBack} = useNavigation();
  const addClient = useMutation(
    ({gender, phone, ...clientFormData}) => {
      return axios.post('/pro/clients', {
        ...clientFormData,
        imported: false,
        phone: `1${phone}`,
        gender: gender?.value,
      });
    },
    {
      onSuccess: goBack,
    },
  );
  const {form, handleSubmit} = useForm({
    fields: CLIENT_CONST.addClientFormData,
    defaultValue: {
      avatar: null,
      first_name: null,
      last_name: null,
      phone: null,
      email: null,
      gender: null,
      birthday: null,
      info: null,
    },
    onSubmit: addClient.mutate,
  });

  return (
    <FullScreenModalWrapper
      title={'Add Client'}
      backButton
      isButtonTitleLoading={addClient.isLoading}
      onSubmit={handleSubmit}
      buttonTitle="Add"
      hasSeparator={false}>
      <View style={tw`relative`}>
        <ClientForm form={form} style={tw`mb-0`} />
      </View>
    </FullScreenModalWrapper>
  );
};

export {AddClientModal};
