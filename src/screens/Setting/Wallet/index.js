import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import WalletMenu from './WalletMenu';
import BeautyCard from './BeautyCard';
import BeautyCoins from './BeautyCoins';
import GiftCards from './GiftCards';
import RedeemGiftCard from './RedeemGiftCard';
import BuyGiftCard from './BuyGiftCard';
import Coupons from './Coupons';
import {ScreenHeader} from '../../../components/commons';

const Stack = createNativeStackNavigator();

const WalletSetting = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="WalletMenu"
        component={WalletMenu}
        options={{title: 'Beautiverse Wallet'}}
      />
      <Stack.Screen
        name="BeautyCard"
        component={BeautyCard}
        options={{title: 'Beauty Card'}}
      />
      <Stack.Screen
        name="BeautyCoins"
        component={BeautyCoins}
        options={{title: 'Beauty Coins'}}
      />
      <Stack.Screen
        name="GiftCards"
        component={GiftCards}
        options={{title: 'Gift Cards'}}
      />
      <Stack.Screen
        name="RedeemGiftCard"
        component={RedeemGiftCard}
        options={{title: 'Gift Card'}}
      />
      <Stack.Screen
        name="Coupons"
        component={Coupons}
        options={{title: 'Coupons'}}
      />
      <Stack.Screen
        name="BuyGiftCard"
        component={BuyGiftCard}
        options={{title: 'Gift Cards'}}
      />
    </Stack.Navigator>
  );
};

export default WalletSetting;
