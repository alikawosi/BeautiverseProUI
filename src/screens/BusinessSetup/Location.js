import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import MapView, {Circle, Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import tw from '../../../tailwind';
import {
  BusinessSetupLayout,
  SectionWrapper,
} from '../../components/screens/BusinessSetup';
import {Button, Form} from '../../components/commons';
import {BUSINESSSETUP_CONST} from '../../constants';
import {Edit2, Shop} from 'iconsax-react-native';
import {useForm, useLocation} from '../../hooks';

const Location = () => {
  const userLocation = useLocation().location;
  const {navigate, goBack} = useNavigation();
  const {params} = useRoute();
  const [isStudio, setIsStudio] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [placeId, setPlaceId] = useState(null);

  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [studioPlaceId, setStudioPlaceId] = useState(null);
  const [studioLocationInfo, setStudioLocationInfo] = useState(null);
  const [mobileRaduis, setMobileRaduis] = useState(0);
  const [mobileLocationInfo, setMobileLocationInfo] = useState(null);

  const [locationType, setLocationType] = useState();

  const {form} = useForm({
    fields: BUSINESSSETUP_CONST.locationTypeFormData,
    defaultValue: locationType
      ? {
          location: locationType,
        }
      : null,
  });
  // useEffect(() => {
  //   const unsubscribe = addListener('focus', () => {
  //     setLocationType(null);
  //     getLocationDetails.refetch();
  //     getMobileLocationDetails.refetch();
  //   });
  //   return unsubscribe;
  // }, [getLocationDetails, addListener]);

  useEffect(() => {
    setLocationType(form.getValues('location'));
  }, [form]);

  useEffect(() => {
    if (studioLocationInfo) {
      setLatitude(studioLocationInfo.lat);
      setLongitude(studioLocationInfo.lng);
      setAddress(studioLocationInfo.address);
      setStudioPlaceId(studioLocationInfo.place_id);
    }
  }, [studioLocationInfo]);

  useEffect(() => {
    if (mobileLocationInfo) {
      setLatitude(mobileLocationInfo.lat);
      setLongitude(mobileLocationInfo.lng);
      setAddress(mobileLocationInfo.address);
      setMobileRaduis(parseInt(mobileLocationInfo.radius, 10));
    }
  }, [mobileLocationInfo]);

  const getLocationDetails = useQuery({
    queryFn: async () => await axios.get('/pro/setup/location'),
    queryKey: ['getLocationDetails'],
    onSuccess: res => {
      setIsStudio(res.service_locations.includes('studio'));
      setIsMobile(res.service_locations.includes('mobile'));
      setLocationType(res.location_type);
      setAddress(res.address);
      setLatitude(res.lat);
      setLongitude(res.lng);
      setMobileRaduis(parseInt(res.mobile_radius, 10));
    },
  });
  const getUserLocationAddress = useQuery({
    queryFn: async () =>
      await axios.get('/location/get_address', {
        params: {
          lat: latitude ? latitude : userLocation.coords.latitude,
          lng: longitude ? longitude : userLocation.coords.longitude,
          add_place_id: true,
        },
      }),
    queryKey: ['getUserLocationAddress'],
    enabled: isStudio,
    onSuccess: res => {
      setAddress(res.address);
      setPlaceId(res.place_id);
    },
  });

  const getPlaceInfo = useQuery({
    enabled: placeId !== null,
    queryFn: async () =>
      await axios.get('/location/place_info', {
        params: {place_id: placeId},
      }),
    queryKey: ['getPlaceInfo', placeId],
    //refetchOnMount: false,
    onSuccess: res => {
      setStudioLocationInfo({...res, place_id: placeId});
    },
  });

  const updateLocationDetail = useMutation({
    mutationFn: params => {
      return axios.post('/pro/setup/location', params);
    },
  });
  const updateStudioLocation = useMutation({
    mutationFn: params => {
      return axios.post('/pro/setup/location/address', params);
    },
  });
  const updateMobileLocation = useMutation({
    mutationFn: params => {
      return axios.post('/pro/setup/location/mobile', params);
    },
    onSuccess: () => (params?.stepsHidden ? goBack() : navigate('Category')),
  });

  const handleSubmit = () => {
    let locationDetailInfo = {
      studio: isStudio,
      mobile: isMobile,
      location_type: locationType,
    };
    let mobileLocationinfo = {
      lat: latitude,
      lng: longitude,
      address: address,
      radius: mobileRaduis,
    };
    updateLocationDetail.mutate(locationDetailInfo);
    updateStudioLocation.mutate(studioLocationInfo);
    updateMobileLocation.mutate(mobileLocationinfo);
  };

  return (
    <BusinessSetupLayout
      isLoading={getLocationDetails.isLoading}
      progress={2}
      isAddButtonVisible={!params?.stepsHidden}
      isProgressVisible={!params?.stepsHidden}
      footerButtonTitle={params?.stepsHidden ? 'Save' : 'Next'}
      headerTitle={'Where do you provide the service?'}
      twoButtonFooter={!params?.stepsHidden}
      onPressNextButton={() => handleSubmit()}
      onPressSkipButton={() => navigate('Category')}
      isNextButtonDisabled={
        (isMobile && mobileRaduis === 0) ||
        (!isMobile && !isStudio) ||
        !studioLocationInfo
      }
      isNextButtonLoading={
        updateStudioLocation.isLoading ||
        updateMobileLocation.isLoading ||
        updateLocationDetail.isLoading
      }>
      <SectionWrapper
        title={'My Location'}
        subTitle={'(Home, Studio, Salon)'}
        isAccordion
        isActiveDefaultValue={isStudio}
        headerSeparator
        onPress={() => setIsStudio(!isStudio)}
        type="check">
        <Form fields={BUSINESSSETUP_CONST.locationTypeFormData} form={form} />
        <View style={tw`my-4 w-full h-px bg-gray-200`} />
        <View style={tw`flex-1`}>
          <MapView
            scrollEnabled={false}
            provider={PROVIDER_GOOGLE}
            style={tw.style('w-full h-45 rounded-2xl')}
            region={{
              latitude: latitude ? latitude : userLocation.coords?.latitude,
              longitude: longitude ? longitude : userLocation.coords?.longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}>
            <Marker
              coordinate={{
                latitude: latitude ? latitude : userLocation.coords?.latitude,
                longitude: longitude
                  ? longitude
                  : userLocation.coords?.longitude,
              }}
            />
          </MapView>
          <Pressable
            onPress={() =>
              navigate('AddressModal', {
                region: {
                  latitude: latitude ? latitude : userLocation.coords?.latitude,
                  longitude: longitude
                    ? longitude
                    : userLocation.coords?.longitude,
                },
                address: address,
                placeId: studioPlaceId
                  ? studioPlaceId
                  : getUserLocationAddress.data.place_id,
                onSubmit: val => setStudioLocationInfo(val),
              })
            }
            style={tw`absolute right-2 top-2 bg-white rounded-full p-2`}>
            <Edit2 color={'#FF6E00'} size={20} variant={'Bold'} />
          </Pressable>
          <View
            style={tw`w-11/12 self-center h-10 bg-white absolute bottom-2  px-2 rounded-xl items-center justify-center flex-row`}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              contentContainerStyle={tw`items-center flex-grow justify-center `}>
              {getUserLocationAddress.isFetching ||
              getUserLocationAddress.isLoading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Shop color={'#313244'} size={20} />
                  <Text style={tw`bv-sans-base ml-1`}>{address}</Text>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </SectionWrapper>
      <SectionWrapper
        containerStyle={tw`mt-4 mb-8`}
        title={'Client`s Location'}
        desc={isMobile ? 'Please set a raduis for mobile service' : ''}
        descStyle={tw`mt-2`}
        subTitle={'(Mobile)'}
        isAccordion
        isActiveDefaultValue={isMobile}
        headerSeparator
        onPress={() => {
          setIsMobile(!isMobile);
          !isMobile ? setMobileRaduis(0) : null;
        }}
        type="check">
        {isMobile && mobileRaduis !== 0 ? (
          <View style={tw`flex-1`}>
            <MapView
              scrollEnabled={false}
              provider={PROVIDER_GOOGLE}
              style={tw.style('w-full h-45 rounded-2xl')}
              //showsMyLocationButton={true}
              //showsPointsOfInterest={true}
              //showsCompass={false}
              //minZoomLevel={10}
              region={{
                latitude: latitude ? latitude : userLocation.coords?.latitude,
                longitude: longitude
                  ? longitude
                  : userLocation.coords?.longitude,
                latitudeDelta: Math.max(0.009, mobileRaduis / 50000),
                longitudeDelta: Math.max(0.009, mobileRaduis / 50000),
              }}>
              <Marker
                coordinate={{
                  latitude: latitude ? latitude : userLocation.coords?.latitude,
                  longitude: longitude
                    ? longitude
                    : userLocation.coords?.longitude,
                }}
              />
              <Circle
                center={{
                  latitude: latitude ? latitude : userLocation.coords?.latitude,
                  longitude: longitude
                    ? longitude
                    : userLocation.coords?.longitude,
                }}
                radius={mobileRaduis}
                strokeColor="#FF6E00"
                fillColor="#FF910030"
              />
            </MapView>
            {address && mobileRaduis ? (
              <View
                style={tw`w-11/12 self-center h-10 bg-white absolute bottom-2 rounded-xl px-2 items-center justify-center flex-row`}>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  contentContainerStyle={tw`items-center flex-grow justify-center `}>
                  <>
                    <Shop color={'#313244'} size={20} />
                    <Text style={tw`bv-sans-base ml-1`}>{address}</Text>
                  </>
                </ScrollView>
              </View>
            ) : null}
          </View>
        ) : null}
        <Button
          title={'Configure Service Area'}
          defaultColor={'#7A7A8A'}
          titleStyle={tw`bv-sans-sm`}
          style={tw`border border-gray-400 rounded-2xl mt-4`}
          onPress={() =>
            navigate('ServiceAreaModal', {
              isSearchable: !isStudio,
              region: {
                latitude: latitude ? latitude : userLocation.coords?.latitude,
                longitude: longitude
                  ? longitude
                  : userLocation.coords?.longitude,
              },
              radius: mobileRaduis,
              address: address ? address : null,
              onSubmit: val => setMobileLocationInfo(val),
            })
          }
        />
      </SectionWrapper>
    </BusinessSetupLayout>
  );
};

export default Location;
