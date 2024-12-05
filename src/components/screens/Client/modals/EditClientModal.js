import React, {useEffect} from 'react';
import axios from 'axios';
import {useMutation, useQuery} from 'react-query';
import {AddCircle} from 'iconsax-react-native';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

import tw from '../../../../../tailwind';
import {Button, FullScreenModalWrapper} from '../../../commons';
import {Addresses, ClientForm, SectionWrapper} from '../../../elements';
import {CLIENT_CONST} from '../../../../constants';
import {useForm} from '../../../../hooks';
import {ActivityIndicator, View} from 'react-native';

const EditClientModal = () => {
  const isFocused = useIsFocused();
  const {goBack, navigate} = useNavigation();
  const {id} = useRoute().params;
  const {
    data: client,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['getClient', id],
    queryFn: () =>
      axios.get('/pro/client', {
        params: {
          id,
        },
      }),
  });

  const editClient = useMutation(
    editClientFormData => {
      return axios.post('/pro/clients/update', {...editClientFormData});
    },
    {
      onSuccess: () => goBack(),
    },
  );
  const {form, handleSubmit} = useForm({
    fields: [
      {
        name: 'client_id',
      },
      {
        name: 'avatar',
      },
      {
        name: 'tags',
      },
      ...CLIENT_CONST.editClientFormData,
    ],
    defaultValue: {
      client_id: client?.id,
      first_name: client?.first_name,
      last_name: client?.last_name,
      info: client?.info,
    },
    onSubmit: editClient.mutate,
  });

  useEffect(() => {
    if (isFocused) {
      refetch();
    }
  }, [isFocused]);

  return (
    <FullScreenModalWrapper
      backButton
      isButtonTitleLoading={editClient.isLoading}
      onSubmit={handleSubmit}
      title="Edit Client"
      hasSeparator={false}
      buttonTitle="Update">
      {isLoading && (
        <View
          style={tw`justify-center items-center absolute top-0 left-0 bottom-0 right-0 z-50`}>
          <ActivityIndicator />
        </View>
      )}
      <ClientForm form={form} isEdit avatar={client?.avatar} />
      <SectionWrapper>
        {Boolean(Object.values(client?.addresses || {}).length) && (
          <Addresses
            refetch={refetch}
            clientId={id}
            style={tw`mb-5`}
            data={Object.values(client?.addresses)}
          />
        )}
        <Button
          title="Add New Address"
          titleStyle={tw`text-descGray font-sans`}
          onPress={() =>
            navigate('NewAddressModal', {
              id,
              name: client?.last_name
                ? `${client?.first_name} ${client.last_name}`
                : client?.first_name,
            })
          }
          icon={<AddCircle size={16} color="#7A7A8A" />}
          style={tw`bg-[#54556914] rounded-lg`}
        />
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {EditClientModal};
