import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthLogin from './AuthLogin';
import AuthRegister from './AuthRegister';
import AuthVerify from './AuthVerify';
import AuthFirstIntro from './AuthFirstIntro';
import AuthSecondIntro from './AuthSecondIntro';
import AuthThirdIntro from './AuthThirdIntro';

const Stack = createNativeStackNavigator();

const Auth = () => {
  return (
    <Stack.Navigator
     
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="FirstIntro" component={AuthFirstIntro} />
      <Stack.Screen name="SecondIntro" component={AuthSecondIntro} />
      <Stack.Screen name="ThirdIntro" component={AuthThirdIntro} />
      <Stack.Screen name="Login" component={AuthLogin} />
      <Stack.Screen name="Verify" component={AuthVerify} />
      <Stack.Screen name="Register" component={AuthRegister} />
    </Stack.Navigator>
  );
};

export default Auth;
