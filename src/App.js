import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useDeviceContext} from 'twrnc';
import {MenuProvider} from 'react-native-popup-menu';
import {QueryClient, QueryClientProvider} from 'react-query';
import Toast, {BaseToast} from 'react-native-toast-message';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import tw from '../tailwind';
import {api} from './utils';
import Navigation from './Navigation';
import {AuthProvider} from './hooks/useAuth';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

api.init();
const client = new QueryClient({defaultOptions: {queries: {retry: 2}}});

const App = () => {
  useDeviceContext(tw);
  return (
    <QueryClientProvider client={client}>
      <MenuProvider>
        <AuthProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={tw`flex-grow`}>
              <NavigationContainer>
                <Navigation />
              </NavigationContainer>
              <Toast
                topOffset={30}
                visibilityTime={3000}
                config={{
                  success: props => (
                    <BaseToast {...props} text1Style={tw`tp-body3`} />
                  ),
                  error: props => (
                    <BaseToast {...props} text1Style={tw`tp-body3`} />
                  ),
                }}
              />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </AuthProvider>
      </MenuProvider>
    </QueryClientProvider>
  );
};

export default App;
