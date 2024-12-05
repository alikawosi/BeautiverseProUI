import axios from 'axios';
import {PermissionsAndroid, Platform} from 'react-native';
import {useQuery} from 'react-query';
import Geolocation from 'react-native-geolocation-service';
import {useEffect, useState} from 'react';

const useLocation = (data = {}, onSuccess, onError) => {
  const {address, place_id, add_place_id, lat, lng, enabled} = data;
  const [location, setLocation] = useState({});

  const getCurrentLocation = async () => {
    try {
      Geolocation.getCurrentPosition(
        position => {
          setLocation(position);
        },
        error => {
          if (error.code === 1) {
            if (Platform.OS === 'ios') {
              Geolocation.requestAuthorization('whenInUse');
            } else if (Platform.OS === 'android') {
              PermissionsAndroid.request(
                'android.permission.ACCESS_FINE_LOCATION',
              );
            }
          }
        },
        {enableHighAccuracy: true},
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentLocation();

    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  const getCoords = useQuery({
    enabled: Boolean(enabled || address),
    queryKey: ['getCoordinates', address],
    queryFn: () =>
      axios.get('/location/coords', {
        params: {
          address,
        },
      }),
    onSuccess,
    onError,
  });
  const getAddress = useQuery({
    enabled: Boolean(enabled || (lat && lng)),
    queryKey: ['getAddress', lat, lng],
    queryFn: () =>
      axios.get('/location/get_address', {
        params: {
          lat,
          lng,
          add_place_id,
        },
      }),
    onSuccess,
    onError,
  });
  const getPlaceInfo = useQuery({
    enabled: Boolean(enabled || place_id),
    queryKey: ['getPlaceInfo', place_id],
    queryFn: () =>
      axios.get('/location/place_info', {
        params: {
          place_id,
        },
      }),
    onSuccess,
    onError,
  });
  const getPredictAddress = useQuery({
    enabled: Boolean(
      enabled || (address && data.hasOwnProperty('add_place_id')),
    ),
    queryKey: ['getPredictAddress', address],
    queryFn: () =>
      axios.get('/location/predict_address', {
        params: {
          address,
          add_place_id,
        },
      }),
    onSuccess,
    onError,
  });

  return {
    getCoords,
    getAddress,
    getPlaceInfo,
    getPredictAddress,
    location,
  };
};

export {useLocation};
