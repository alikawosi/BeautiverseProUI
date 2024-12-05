import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ScreenHeader} from '../../../components/commons';
import PersonalSettingMenu from './PersonalSettingMenu';
import PersonalInformation from './PersonalInformation';

const Stack = createNativeStackNavigator();

const PersonalSetting = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="PersonalSettingMenu"
        component={PersonalSettingMenu}
        options={{title: 'Personal Settings'}}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{title: 'Personal Info'}}
      />
      {/* 
      <Stack.Screen
        name="LoginsAndSecurity"
        component={LoginsAndSecurity}
        options={{title: 'Logins And Security'}}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{title: 'Notifications'}}
      /> */}
    </Stack.Navigator>
  );
};

export default PersonalSetting;
