import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SupportMenu from './SupportMenu';
import {ScreenHeader} from '../../../components/commons';

const Stack = createNativeStackNavigator();

const SupportSetting = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="SupportMenu"
        component={SupportMenu}
        options={{title: 'Support'}}
      />

    </Stack.Navigator>
  );
};

export default SupportSetting;
