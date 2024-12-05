import React from 'react';
import {View} from 'react-native';

import tw from '../../../../tailwind';
import {CLIENT_CONST, FAKE_CONST} from '../../../constants';
import {UnderLineTabBar} from '../../commons';
import {SelectServices} from '../../elements';

const ServicesMyLocation = () => {
  const {services} = FAKE_CONST;

  return (
    <View>
      <UnderLineTabBar
        underLineHasItemWidth
        containerStyle={tw`mb-5`}
        data={CLIENT_CONST.servicesMyLocation}
      />
      {services.map(({id, content}, index) => (
        <SelectServices key={id} {...{index, content}} />
      ))}
    </View>
  );
};

export {ServicesMyLocation};
