import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Inbox from './Inbox';

const Stack = createNativeStackNavigator();

const Chat = () => {
  return (
    <Stack.Navigator
      initialRouteName="ClientIntro"
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen name="Inbox" component={Inbox} />
      {/* <Stack.Group screenOptions={{presentation: 'modal', headerShown: false}}>
        
      </Stack.Group>
      <Stack.Group
        screenOptions={{presentation: 'transparentModal', headerShown: false}}>
        
      </Stack.Group> */}
    </Stack.Navigator>
  );
};

export default Chat;
