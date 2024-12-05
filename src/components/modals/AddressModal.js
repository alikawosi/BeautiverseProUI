import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, ActivityIndicator} from 'react-native';
import {CloseCircle} from 'iconsax-react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {CheckBox, Form, FullScreenModalWrapper, Input} from '../commons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {AddressSearchCard} from '../elements';
import {BUSINESSSETUP_CONST} from '../../constants';
import {useForm, useLocation} from '../../hooks';

const AddressModal = ({route}) => {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [coords, setCoords] = useState({
    latitude: route.params.region ? route.params.region.latitude : null,
    longitude: route.params.region ? route.params.region.longitude : null,
  });
  const [searchText, setSearchText] = useState('');
  const [address, setAddress] = useState(
    route.params.address ? route.params.address : null,
  );
  const [isShared, setIsShared] = useState(false);
  const [placeId, setPlaceId] = useState(
    route.params.placeId ? route.params.placeId : null,
  );
  const {form} = useForm({
    fields: BUSINESSSETUP_CONST.addressFormData,
    defaultValue: location
      ? {
          streetAddress: location.street,
          postalCode: location.postal_code,
          unitNumber: location.unit_number,
          city: location.city,
          province: location.province,
        }
      : null,
  });

  const {getPredictAddress} = useLocation({
    address: searchText,
    add_place_id: true,
  });

  const {getAddress} = useLocation({
    lat: coords.latitude,
    lng: coords.longitude,
    add_place_id: true,
  });

  const {getPlaceInfo} = useLocation({place_id: placeId}, res =>
    setLocation(res),
  );

  useEffect(() => {
    if (getAddress?.data?.place_id) {
      setPlaceId(getAddress?.data?.place_id);
    }
  }, [getAddress?.data?.place_id]);

  const handleSubmit = () => {
    navigation.goBack();
    const locationInfo = {
      lat: coords.latitude,
      lng: coords.longitude,
      address: location.street,
      street: form.getValues('streetAddress'),
      postal_code: form.getValues('postalCode'),
      unit_number: form.getValues('unitNumber'),
      city: form.getValues('city'),
      province: form.getValues('province'),
      place_id: placeId,
    };
    route.params.onSubmit(locationInfo);
  };
  const renderOption = item => {
    return (
      <AddressSearchCard
        key={item.place_id}
        address={item.address}
        onPress={() => {
          setPlaceId(item.place_id);
          setAddress(item.address);
        }}
      />
    );
  };
  const onChangeSearchTextBox = value => {
    setSearchText(value);
    setLocation(null);
    setAddress(null);
    setIsShared(false);
    setPlaceId(null);
  };
  const onRegionChange = ({latitude, longitude}) => {
    setCoords({
      latitude: latitude,
      longitude: longitude,
    });
  };

  return (
    <FullScreenModalWrapper
      title={'Your Address'}
      backButton
      disabled={Object.values(form.control._formState?.errors).length !== 0}
      buttonTitle={'Save'}
      onSubmit={() => handleSubmit()}
      contentContainerStyle={tw`px-5`}>
      <Input
        inputValue={searchText}
        formValue={searchText}
        onChange={val => onChangeSearchTextBox(val)}
        placeholder={'Search Address'}
        style={tw`border-0 px-2 mb-5 bg-white shadow-lg`}
        //preffix={<SearchNormal size={22} color="#7A7A8A" style={tw`mr-2`} />}
        suffix={
          searchText ? (
            <Pressable
              style={tw`mr-1`}
              onPress={() => onChangeSearchTextBox('')}>
              <CloseCircle size={18} color="#7A7A8A" />
            </Pressable>
          ) : null
        }
      />
      {getPredictAddress.isLoading || getPredictAddress.isFetching ? (
        <ActivityIndicator />
      ) : getPredictAddress.data?.length > 0 && !address ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`bg-white p-2 rounded-2xl`}>
          {getPredictAddress.data?.map(item => renderOption(item))}
        </ScrollView>
      ) : (
        <View>
          <View style={tw`bg-white rounded-2xl mb-4`}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={tw.style('w-full h-74 rounded-2xl')}
              showsUserLocation={true}
              followsUserLocation={true}
              showsMyLocationButton={true}
              showsPointsOfInterest={true}
              zoomEnabled={
                getPlaceInfo.isFetching ||
                getPlaceInfo.isLoading ||
                getAddress.isLoading ||
                getAddress.isFetching
                  ? false
                  : true
              }
              rotateEnabled={
                getPlaceInfo.isFetching ||
                getPlaceInfo.isLoading ||
                getAddress.isLoading ||
                getAddress.isFetching
                  ? false
                  : true
              }
              scrollEnabled={
                getPlaceInfo.isFetching ||
                getPlaceInfo.isLoading ||
                getAddress.isLoading ||
                getAddress.isFetching
                  ? false
                  : true
              }
              showsCompass={false}
              onRegionChangeComplete={onRegionChange}
              region={{
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
                latitude: coords.latitude,
                longitude: coords.longitude,
              }}
            />
            <Image
              style={tw`absolute self-center top-23`}
              source={require('../../assets/media/Marker.png')}
            />
            <Text style={tw`bv-med-xs text-descGray text-center my-4`}>
              You Can Move the Map to Adjust the Location
            </Text>
          </View>
          {getPlaceInfo.isFetching ||
          getPlaceInfo.isLoading ||
          getAddress.isLoading ||
          getAddress.isFetching ? (
            <ActivityIndicator />
          ) : (
            <View style={tw`bg-white rounded-2xl mb-4 px-4 py-6`}>
              <Form fields={BUSINESSSETUP_CONST.addressFormData} form={form} />
              <CheckBox
                isChecked={isShared}
                label={'This is a shared location'}
                style={tw`mb-1`}
                onPress={() => setIsShared(!isShared)}
              />
              <Text style={tw`bv-med-xs text-descGray`}>
                If you and other service providers share the same space, at the
                same time or different hours/ days.
              </Text>
              {isShared && (
                <Input
                  label={'What`s the name of the place?'}
                  style={tw`mt-4`}
                />
              )}
            </View>
          )}
        </View>
      )}
    </FullScreenModalWrapper>
  );
};

export {AddressModal};
