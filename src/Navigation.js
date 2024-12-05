import React, {useEffect} from 'react';
import * as Keychain from 'react-native-keychain';
import {useNetInfo} from '@react-native-community/netinfo';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabBar from './TabBarNavigator';
import Auth from './screens/Auth';
import Test from './screens/Test/Test';
import SettingScreens from './screens/Setting';
import BusinessSetup from './screens/BusinessSetup';
import Calendar from './screens/Calendar';
import Client from './screens/Client';
import SplashScreen from './screens/SplashScreen';
import Checkout from './screens/Checkout';
import Dashboard from './screens/Dashboard';
import Booking from './screens/Booking';
import AppointmentDetails from './screens/AppointmentDetails';

import {
  SelectModal,
  DatePickerModal,
  TimePickerModal,
  SetPhotoModal,
  ConfirmPhoneNumberModal,
  AddressModal,
  ClientAddressModal,
  FormModal,
  DeleteModal,
  CalendarSettingModal,
  PhotoPickerModal,
} from './components/modals';

import {useAuth} from './hooks';
//import {ScreenHeader} from './components/commons';
import NetworkDisconectedScreen from './screens/NetworkDisconectedScreen';
import Appointments from './screens/Calendar/Appointments';
import tw from '../tailwind';
import {GoalModal} from './components/screens/Dashboard/modals';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {state} = useAuth();
  const checkUser = useAuth();
  const netStatus = useNetInfo();

  useEffect(() => {
    (async () => {
      try {
        checkUser.checkUser();
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          console.log('loggedIn');
        } else {
          console.log('No credentials stored');
        }
      } catch (error) {
        console.log("Keychain couldn't be accessed!", error);
      }
    })();
  }, []);

  if (netStatus.isConnected) {
    if (netStatus.isInternetReachable) {
      if (state.isLoading) {
        return <SplashScreen />;
      } else {
        return (
          <Stack.Navigator
            initialRouteName="BusinessSetup"
            screenOptions={() => ({
              //header: props => <ScreenHeader {...props} />,
              headerShown: false,
            })}>
            {!state.isLogin ? (
              <Stack.Screen name="Auth" component={Auth} />
            ) : (
              <>
                <Stack.Screen name="TabBar" component={TabBar} />
                <Stack.Screen name="BusinessSetup" component={BusinessSetup} />
                {/* <Stack.Screen name="Auth" component={Auth} /> */}
                <Stack.Screen name="Appointments" component={Appointments} />
                <Stack.Screen
                  name="SettingScreens"
                  component={SettingScreens}
                />
                <Stack.Screen name="Client" component={Client} />
                <Stack.Screen name="Checkout" component={Checkout} />
                <Stack.Screen name="Booking" component={Booking} />
                <Stack.Screen
                  name="AppointmentDetails"
                  component={AppointmentDetails}
                />
                {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
              </>
            )}
            <Stack.Group
              screenOptions={{
                presentation: 'transparentModal',
              }}>
              <Stack.Screen
                name="DatePickerModal"
                component={DatePickerModal}
              />
              <Stack.Screen name="SelectModal" component={SelectModal} />
              <Stack.Screen name="SetPhotoModal" component={SetPhotoModal} />
              <Stack.Screen
                name="PhotoPickerModal"
                component={PhotoPickerModal}
              />
              <Stack.Screen
                name="ClientAddressModal"
                component={ClientAddressModal}
              />
              <Stack.Screen
                name="ConfirmPhoneNumberModal"
                component={ConfirmPhoneNumberModal}
              />
              <Stack.Screen
                name="TimePickerModal"
                component={TimePickerModal}
              />
              <Stack.Screen name="FormModal" component={FormModal} />
              <Stack.Screen name="DeleteModal" component={DeleteModal} />
              <Stack.Screen
                name="CalendarSettingModal"
                component={CalendarSettingModal}
              />
              <Stack.Screen name="GoalModal" component={GoalModal} />
            </Stack.Group>
          </Stack.Navigator>
        );
      }
    } else {
      return <NetworkDisconectedScreen />;
    }
  } else {
    return <NetworkDisconectedScreen />;
  }
};

export default Navigation;
