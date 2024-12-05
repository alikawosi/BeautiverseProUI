import React, {useState} from 'react';
import {Text} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useMutation} from 'react-query';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {BUSINESSSETUP_CONST} from '../../constants';
import {Form, FullScreenModalWrapper} from '../commons';
import {SectionWrapper} from '../screens/BusinessSetup';
import {CustomCamera} from '../elements';
import {useForm} from '../../hooks';

const IdentityVerificationModal = () => {
  const {navigate} = useNavigation();
  const device = useCameraDevices();
  const [openCamera, setOpenCamera] = useState(false);
  const {form} = useForm({
    fields: BUSINESSSETUP_CONST.identityVerificationFormData,
    defaultValue: {countryRegion: '', type: null},
  });

  const requestIdentityVerification = useMutation({
    mutationFn: data => {
      let verificationData = {
        type: form.getValues('type'),
        country: form.getValues('countryRegion').value,
        front_card: data.front_card,
        back_card: data.back_card,
        user_image: data.user_image,
      };
      return axios.post(
        '/pro/setup/identity',
        JSON.stringify(verificationData),
      );
    },
    onSuccess: () =>
      navigate('BusinessSetup', {
        screen: 'IdentityVerification',
        params: {isInprogress: true},
      }),
  });

  const handleOpenCamera = async () => {
    const permissionStatus = await Camera.getCameraPermissionStatus();

    if (permissionStatus === 'authorized') {
      setOpenCamera(true);
    } else {
      const newPermision = await Camera.requestCameraPermission();
      if (newPermision === 'authorized') {
        setOpenCamera(true);
      }
    }
  };

  return (
    <>
      {openCamera ? (
        <CustomCamera
          device={device}
          onSubmit={images => requestIdentityVerification.mutate(images)}
          isLoading={requestIdentityVerification.isLoading}
        />
      ) : (
        <FullScreenModalWrapper
          title={'Identity Verification'}
          backButton
          //buttonTitle={'Add'}
          // footerButtonDisabled={!form.formState.isValid}
          onFooterButtonPress={handleOpenCamera}
          contentContainerStyle={tw` flex-1`}>
          <SectionWrapper title={'Please Provide a Goverenment ID'}>
            <Form
              form={form}
              fields={BUSINESSSETUP_CONST.identityVerificationFormData}
            />
            <Text style={tw`bv-med-sm text-descGray`}>
              These notes will be automatically sent to your clients
            </Text>
          </SectionWrapper>
        </FullScreenModalWrapper>
      )}
    </>
  );
};

export {IdentityVerificationModal};
