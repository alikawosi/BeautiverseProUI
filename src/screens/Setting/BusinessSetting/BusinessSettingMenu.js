import React from 'react';
import {View} from 'react-native';

import tw from '../../../../tailwind';
import {MenuScreenLayout} from '../../../components/screens/Setting';
import {SETTING_CONST} from '../../../constants';

const BusinessSettingMenu = () => {
  return (
    <View style={tw`flex-1`}>
      <MenuScreenLayout menuData={SETTING_CONST.businessMenuData} />
    </View>
  );
};

export default BusinessSettingMenu;
