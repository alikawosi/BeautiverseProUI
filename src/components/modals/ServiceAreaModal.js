import React, {useState} from 'react';
import axios from 'axios';
import {useQuery} from 'react-query';
import {View, Text, ScrollView, Image, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import {CloseCircle, Location, SearchNormal} from 'iconsax-react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

import tw from '../../../tailwind';
import {FullScreenModalWrapper, Input} from '../commons';
import {AddressSearchCard} from '../elements';

const ServiceAreaModal = ({route}) => {
  const {goBack} = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [latitude, setLatitude] = useState(
    route.params.region ? route.params.region.latitude : null,
  );
  const [longitude, setLongitude] = useState(
    route.params.region ? route.params.region.longitude : null,
  );
  const [address, setAddress] = useState(
    route.params.address ? route.params.address : null,
  );
  const [placeId, setPlaceId] = useState(null);
  const [radius, setRadius] = useState(route.params.radius / 1000);

  const getPredictAddress = useQuery({
    enabled: searchText !== '',
    queryFn: async () =>
      await axios.get('/location/predict_address', {
        params: {address: searchText.toString(), add_place_id: true},
      }),
    queryKey: ['GetPredictAddress', searchText],
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
      setLatitude(res.lat);
      setLongitude(res.lng);
    },
  });

  const renderOption = item => {
    return (
      <AddressSearchCard
        key={item.place_id}
        title={item.address}
        icon={<Location size={20} color={'#7A7A8A'} />}
        onPress={() => {
          setPlaceId(item.place_id);
          setAddress(item.address);
        }}
      />
    );
  };
  const onChangeSearchTextBox = value => {
    setSearchText(value);
    if (value === '') {
      setAddress(null);
      setPlaceId(null);
    }
  };
  const onRegionChange = region => {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
  };
  const handleSubmit = () => {
    let mobileLocationinfo = {
      lat: latitude,
      lng: longitude,
      address: address,
      radius: radius * 1000,
    };
    route.params.onSubmit(mobileLocationinfo);
    goBack();
  };

  return (
    <FullScreenModalWrapper
      title={'Service Area'}
      backButton
      disabled={radius === 0}
      buttonTitle={'Save'}
      onSubmit={() => handleSubmit()}
      contentContainerStyle={tw`px-5`}>
      {route.params.isSearchable ? (
        <Input
          inputValue={searchText}
          formValue={searchText}
          onChange={val => setSearchText(val)}
          placeholder={'Search Address'}
          style={tw`border-0 mb-5 bg-white shadow-lg`}
          preffix={<SearchNormal size={22} color="#7A7A8A" style={tw`mr-2`} />}
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
      ) : null}
      {getPredictAddress.data?.length > 0 && !address ? (
        getPredictAddress.isLoading || getPredictAddress.isFetching ? (
          <ActivityIndicator />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`bg-white p-2 rounded-2xl`}>
            {getPredictAddress.data?.map(item => renderOption(item))}
          </ScrollView>
        )
      ) : address ? (
        <View style={tw`bg-white rounded-2xl mb-4`}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={tw.style('w-full h-74 rounded-2xl')}
            //customMapStyle={mapstyle}
            showsUserLocation={true}
            followsUserLocation={true}
            showsMyLocationButton={route.params.isSearchable}
            showsPointsOfInterest={true}
            showsCompass={false}
            onRegionChangeComplete={e =>
              route.params.isSearchable ? onRegionChange(e) : null
            }
            zoomEnabled={route.params.isSearchable}
            scrollEnabled={route.params.isSearchable}
            rotateEnabled={route.params.isSearchable}
            region={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: Math.max(0.009, radius / 50),
              longitudeDelta: Math.max(0.009, radius / 50),
            }}>
            <Circle
              center={{
                latitude: latitude,
                longitude: longitude,
              }}
              radius={radius * 1000}
              strokeColor="#FF6E00"
              fillColor="#FF910030"
            />
          </MapView>

          <Image
            style={tw`absolute self-center top-23`}
            source={require('../../assets/media/Marker.png')}
          />

          <Text style={tw`bv-med-xs text-descGray text-center my-4`}>
            You Can Move the Map to Adjust the Location
          </Text>
          <View style={tw`w-full h-px bg-gray-200`} />
          <View style={tw`px-5 my-4`}>
            <Input
              label={'Service Radius'}
              keyboardType="number-pad"
              //placeholder={'Service Radius'}
              inputValue={radius.toString()}
              formValue={radius.toString()}
              suffix={<Text style={tw`text-descGray`}>KM</Text>}
              onChange={val =>
                val !== '' && parseFloat(val) !== 0
                  ? setRadius(parseFloat(val))
                  : setRadius(0)
              }
            />
          </View>
        </View>
      ) : null}
    </FullScreenModalWrapper>
  );
};

export {ServiceAreaModal};
