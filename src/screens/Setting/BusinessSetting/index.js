import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ScreenHeader} from '../../../components/commons';
import BusinessSettingMenu from './BusinessSettingMenu';
import tw from '../../../../tailwind';

const Stack = createNativeStackNavigator();

const BusinessSetting = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="BusinessMenu"
        component={BusinessSettingMenu}
        options={{title: 'Business Settings'}}
      />
    </Stack.Navigator>
  );
};

export default BusinessSetting;
