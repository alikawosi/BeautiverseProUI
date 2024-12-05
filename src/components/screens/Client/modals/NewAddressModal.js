import React, {useState} from 'react';
import {Gps} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation} from 'react-query';
import axios from 'axios';

import tw from '../../../../../tailwind';
import {
  Button,
  FormItem,
  FullScreenModalWrapper,
  Input,
} from '../../../commons';
import {Map, SectionWrapper} from '../../../elements';
import {CLIENT_CONST} from '../../../../constants';
import {useForm, useLocation} from '../../../../hooks';

const NewAddressModal = () => {
  const {goBack, navigate} = useNavigation();
  const [showMap, setShowMap] = useState();
  const {newAddressFields} = CLIENT_CONST;
  const {params} = useRoute();
  const addAddress = useMutation(
    addressFormFields =>
      axios.post('/pro/client/address/create', {
        id: params?.id,
        ...(params?.isEdit
          ? {
              address_id: params.location.address_id,
            }
          : {}),
        ...addressFormFields,
      }),
    {
      onSuccess: goBack,
    },
  );
  const {form, handleSubmit} = useForm({
    fields: newAddressFields,
    defaultValue: {
      name: params?.location?.name,
      address: params?.location?.address,
    },
    onSubmit: addAddress.mutate,
  });
  const getForm = name => ({
    control: form.control,
    error: form.getFieldState(name).error,
    errors: form.formState.errors,
    watch: form.watch,
  });
  const navigateToClientAddressModal = () => {
    navigate('ClientAddressModal', {
      user: params,
      addClientAddress: location => {
        form.setValue('address', location.address);
      },
    });
  };
  const {getCoords} = useLocation({address: form.watch('address')});
  const setCoords = ({latitude, longitude}) => {
    form.setValue('lat', latitude);
    form.setValue('lng', longitude);
  };

  return (
    <FullScreenModalWrapper
      isButtonTitleLoading={addAddress.isLoading}
      title={`${params?.isEdit ? 'Edit' : 'New'} Address`}
      backButton
      onSubmit={handleSubmit}
      hasSeparator={false}
      buttonTitle="Add"
      contentContainerStyle={tw`flex-grow`}>
      <SectionWrapper>
        <FormItem form={getForm.call(null, 'name')} name="name">
          <Input label="Name" />
        </FormItem>
        <FormItem
          validation="required"
          style={tw`my-4`}
          form={getForm.call(null, 'address')}
          name="address">
          <Input
            label="Address"
            readOnly
            isMultiline={true}
            style={tw`h-auto min-h-12`}
            onPress={navigateToClientAddressModal}
          />
        </FormItem>
        <Button
          disabled={!getCoords.data}
          style={tw`h-auto`}
          title="Detect My Location"
          titleStyle={tw`text-descGray`}
          onPress={setShowMap.bind(null, true)}
          icon={<Gps size="16" color="#7A7A8A" />}
        />
        {showMap && (
          <Map
            style={tw`mt-4`}
            {...getCoords.data}
            onChange={setCoords}
            enable={false}
          />
        )}
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {NewAddressModal};
