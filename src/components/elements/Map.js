import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

import tw from '../../../tailwind';
import {useLocation} from '../../hooks';

const Map = ({
  lat = 0,
  lng = 0,
  style,
  onChange = () => null,
  enable = true,
}) => {
  const [cordinates, setCoordinates] = useState({
    latitude: lat,
    longitude: lng,
  });
  const {getAddress} = useLocation({
    lat: cordinates.latitude,
    lng: cordinates.longitude,
  });

  useEffect(() => {
    onChange(cordinates, getAddress.data);
  }, [cordinates, getAddress.data]);

  useEffect(() => {
    setCoordinates({latitude: lat, longitude: lng});
  }, [lat, lng]);

  const onRegionChange = region => {
    setCoordinates({latitude: region.latitude, longitude: region.longitude});
  };

  return (
    <View
      style={tw.style(
        `rounded-3xl overflow-hidden w-full h-[178px] relative`,
        style,
      )}>
      <MapView
        zoomEnabled={enable}
        pitchEnabled={enable}
        rotateEnabled={enable}
        scrollEnabled={enable}
        zoomTapEnabled={enable}
        zoomControlEnabled={enable}
        onRegionChangeComplete={onRegionChange}
        provider={PROVIDER_GOOGLE}
        style={tw.style('w-full h-full')}
        showsUserLocation={false}
        followsUserLocation={true}
        showsMyLocationButton={true}
        showsPointsOfInterest={true}
        showsCompass={false}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
        <Marker
          draggable
          coordinate={cordinates}
          onDragEnd={e => setCoordinates(e.nativeEvent.coordinate)}
        />
      </MapView>
    </View>
  );
};

export {Map};
