import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ScreenHeader} from '../../../components/commons';
import AccountingMenu from './AccountingMenu';
import Transactions from './Transactions';

const Stack = createNativeStackNavigator();

const AccountingSetting = () => {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        header: props => <ScreenHeader {...props} />,
      })}>
      <Stack.Screen
        name="AccountingMenu"
        component={AccountingMenu}
        options={{title: 'Accounting'}}
      />
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{title: 'Transactions'}}
      />

    </Stack.Navigator>
  );
};

export default AccountingSetting;
