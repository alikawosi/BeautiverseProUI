import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SettingMenu from './SettingMenu';
import BusinessSetting from './BusinessSetting';
import AccountingSetting from './Accounting';
import InventorySetting from './Inventory';
import PersonalSetting from './PersonalSetting';
import ReviewsSetting from './Reviews';
import WalletSetting from './Wallet';
import SupportSetting from './Support';
import Legal from './Legal';
import UserProfileSetting from './UserProfile';


const Stack = createNativeStackNavigator();

const SettingScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="SettingMenu" component={SettingMenu} />
      <Stack.Screen name="UserProfileSetting" component={UserProfileSetting} />
      <Stack.Screen name="BusinessSetting" component={BusinessSetting} />
      <Stack.Screen name="AccountingSetting" component={AccountingSetting} />
      <Stack.Screen name="InventorySetting" component={InventorySetting} />
      <Stack.Screen name="ReviewsSetting" component={ReviewsSetting} />
      <Stack.Screen name="PersonalSetting" component={PersonalSetting} />
      <Stack.Screen name="WalletSetting" component={WalletSetting} />
      <Stack.Screen name="SupportSetting" component={SupportSetting} />
      <Stack.Screen name="Legal" component={Legal} />
    </Stack.Navigator>
  );
};

export default SettingScreens;
