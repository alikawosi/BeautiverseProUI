import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ScreenHeader} from '../../../components/commons';
import ReviewsMenu from './ReviewsMenu';

const Stack = createNativeStackNavigator();

const ReviewsSetting = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="ReviewsMenu"
        component={ReviewsMenu}
        options={{title: 'Reviews '}}
      />
      {/* <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
        options={{title: 'Personal Info'}}
      />
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

export default ReviewsSetting;
