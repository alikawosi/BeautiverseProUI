import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileDetails from './ProfileDetails';
import EditUserProfile from './EditUserProfile';
import {ScreenHeader} from '../../../components/commons';

const Stack = createNativeStackNavigator();

const UserProfileSetting = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="EditUserProfile"
        component={EditUserProfile}
        options={{title: 'Edit Profile'}}
      />

    </Stack.Navigator>
  );
};

export default UserProfileSetting;
