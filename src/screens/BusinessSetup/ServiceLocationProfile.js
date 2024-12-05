import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text} from 'react-native';
import {useForm} from '../../hooks';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {
  BusinessSetupLayout,
  SectionWrapper,
} from '../../components/screens/BusinessSetup';
import {Form, Input} from '../../components/commons';
import {PhotoPicker} from '../../components/elements';
import {BUSINESSSETUP_CONST} from '../../constants';

const ServiceLocationProfile = () => {
  const {navigate, goBack} = useNavigation();
  const {params} = useRoute();
  const [amenities, setAmenities] = useState([]);
  const [banners, setBanners] = useState([]);
  const {form} = useForm({
    fields: BUSINESSSETUP_CONST.amenitiesFormData,
    defaultValue:
      amenities.length > 0
        ? {
            amenities: amenities,
          }
        : null,
  });

  const getLocationProfile = useQuery({
    queryFn: () => axios.get('pro/setup/location_profile'),
    queryKey: ['getLocationProfile'],
    onSuccess: res => {
      if (res.amenities.length) {
        setAmenities(res.amenities);
      }
      if (res.banners.length) {
        setBanners(res.banners);
      }
    },
  });

  const postLocationProfile = useMutation({
    mutationFn: data => axios.post('pro/setup/location_profile', data),
    onSuccess: () => {
      !params?.stepsHidden ? navigate('Profile') : goBack();
    },
  });

  return (
    <BusinessSetupLayout
      isLoading={getLocationProfile.isLoading || getLocationProfile.isFetching}
      progress={7}
      isNextButtonDisabled={getLocationProfile.isFetching}
      isProgressVisible={!params?.stepsHidden}
      footerButtonTitle={params?.stepsHidden ? 'Save' : 'Next'}
      isAddButtonVisible={!params?.stepsHidden}
      headerTitle={'Service Location Profile'}
      headerDesc={
        'This information is shown on your profile in the service location section'
      }
      onPressNextButton={() => {
        postLocationProfile.mutate({
          amenities: JSON.stringify(form.getValues('amenities')),
          banners: JSON.stringify(banners),
        });
      }}
      onPressSkipButton={() => navigate('Profile')}
      isNextButtonLoading={postLocationProfile.isLoading}
      twoButtonFooter={!params?.stepsHidden}>
      <SectionWrapper containerStyle={tw`mb-4`}>
        <Input label={'Direction Instructions'} />
        <Text style={tw`bv-med-xs text-descGray mt-1`}>
          It's best to always leave some directions for the clients so they can
          find your place easier.
        </Text>
      </SectionWrapper>
      <SectionWrapper
        headerStyle={tw`p-0`}
        title={'Add Your Location Amenities'}
        titleStyle={tw`bv-sans-sm text-black`}
        containerStyle={tw`mb-4`}>
        <Form fields={BUSINESSSETUP_CONST.amenitiesFormData} form={form} />
      </SectionWrapper>
      <SectionWrapper
        title={'Please add at least 2 pictures from your location:'}
        titleStyle={tw`bv-sans-sm text-black`}
        headerStyle={tw`p-0`}
        descLinkIcon
        contentContainerStyle={tw`pt-4`}
        containerStyle={tw`mb-4`}>
        <PhotoPicker
          // onAddPhoto={images => setBanners(images)}
          defaultValue={banners}
        />
      </SectionWrapper>
    </BusinessSetupLayout>
  );
};

export default ServiceLocationProfile;
