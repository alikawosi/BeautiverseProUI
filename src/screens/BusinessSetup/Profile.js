import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Image, Pressable, Text, View} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {AddCircle} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {
  BusinessSetupLayout,
  SectionWrapper,
} from '../../components/screens/BusinessSetup';
import {Button, Form} from '../../components/commons';
import {BUSINESSSETUP_CONST} from '../../constants';
import {useForm} from '../../hooks/useForm';

const Profile = () => {
  const {navigate, goBack, addListener} = useNavigation();
  const {params} = useRoute();
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      setProfileData({});
      getProfile.refetch();
    });
    return unsubscribe;
  }, [getProfile, addListener]);

  const getProfile = useQuery({
    queryFn: () => axios.get('pro/setup/profile'),
    queryKey: ['getProfile'],
    onSuccess: res => {
      setProfileData(res);
    },
  });
  const {form} = useForm({
    fields: BUSINESSSETUP_CONST.profileFormData,
    defaultValue: {
      yourName: profileData?.user_name,
      businessName: profileData?.business_name,
    },
  });

  const updateProfile = useMutation({
    mutationFn: params => axios.post('/pro/setup/profile', params),
    onSuccess: () => {
      !params?.stepsHidden ? navigate('Portfolio') : goBack();
    },
  });

  const openImagePickerFromGallery = () => {
    ImageCropPicker.openPicker({
      writeTempFile: true,
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      useFrontCamera: true,
    }).then(photo => {
      setProfileData(p => ({
        ...p,
        ['img']: {id: null, url: `data:${photo.mime};base64,${photo.data}`},
      }));
    });
  };

  return (
    <BusinessSetupLayout
      isLoading={getProfile.isLoading}
      progress={8}
      isNextButtonDisabled={getProfile.isFetching}
      isProgressVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      headerTitle={'About Your Profile'}
      headerDesc={'This information is shown on your profile'}
      onPressNextButton={() => {
        const obj = {
          description: profileData.description,
          img: JSON.stringify(profileData.img),
          business_name: form.getValues('businessName'),
          consultation: profileData.consultation,
        };
        updateProfile.mutate(obj);
      }}
      onPressSkipButton={() => navigate('Portfolio')}
      isNextButtonLoading={updateProfile.isLoading}
      footerButtonTitle={params?.stepsHidden ? 'Save' : 'Next'}
      twoButtonFoote={!params?.stepsHidden}>
      <View style={tw`flex-grow`}>
        <SectionWrapper
          headerStyle={tw`p-0`}
          title={'Profile Photo & Intro Video'}>
          <Pressable
            onPress={() => openImagePickerFromGallery()}
            style={tw`items-center`}>
            <Image
              source={
                profileData.img?.url
                  ? {uri: profileData.img?.url}
                  : require('../../assets/media/UserDefault.png')
              }
              style={tw`rounded-full h-18 w-18`}
            />
            <Text style={tw`bv-sans-sm mt-4 text-primary`}>
              Upload profile photo
            </Text>
            <Text style={tw`bv-sans-xs text-gray-500`}>{'(Your face)'}</Text>
          </Pressable>
        </SectionWrapper>
        <SectionWrapper containerStyle={tw`mt-4 pb-0`}>
          <Form fields={BUSINESSSETUP_CONST.profileFormData} form={form} />
        </SectionWrapper>
      </View>
    </BusinessSetupLayout>
  );
};

export default Profile;
