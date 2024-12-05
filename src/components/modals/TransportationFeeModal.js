import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {ModalWrapper} from '../commons';
import {MenuCard} from '../screens/BusinessSetup';

const TransportationFeeModal = ({route}) => {
  const {navigate, goBack} = useNavigation();
  const {setTransportation} = route.params;

  const openFullScreenModal = modalRoute => {
    navigate(modalRoute, {setTransportation});
  };

  return (
    <ModalWrapper
      style={tw`bg-background`}
      type="fromBottom"
      title={'Transportation Fee'}
      titleSeparator>
      <MenuCard
        title={'Automated (Recommended):'}
        desc={
          'We will calculate your transportation fees The Most Efficient way based on Uber/Lyft pricing.'
        }
        style={tw`bg-white rounded-xl`}
        onPress={() => openFullScreenModal('AutomatedFeeModal')}
      />
      <MenuCard
        title={'Manual'}
        desc={
          'You can add your transportation fee policies with manual calculations.'
        }
        style={tw`bg-white mt-4 rounded-xl`}
        onPress={() => openFullScreenModal('ManualFeeModal')}
      />
    </ModalWrapper>
  );
};

export {TransportationFeeModal};
