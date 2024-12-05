import React, {useEffect, useState} from 'react';
import {useMutation} from 'react-query';
import {Text, View, Image, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import tw from '../../../tailwind';
import {Button, CodeInput} from '../../components/commons';
import {useAuth} from '../../hooks';

const AuthVerify = ({route}) => {
  const login = useAuth();
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [invalidOTP, setInvalidOTP] = useState(false);
  const {navigate, goBack} = useNavigation();

  const sendOTP = useMutation(['sendOTP'], () =>
    axios.post('/otp/send', {
      country_code: '+1',
      phone: route.params.phoneNumber,
    }),
  );
  const checkOTP = useMutation({
    mutationFn: () =>
      axios.post('/otp/check', {
        country_code: route.params.countryCode,
        phone: route.params.phoneNumber,
        otp: otpCode,
      }),

    onSuccess: context => {
      setIsLoading(false);
      if (context.otp_correct === true) {
        if (context.token !== '') {
          login.login(context.token);
        } else {
          navigate('Auth', {
            screen: 'Register',
            params: {
              countryCode: route.params.countryCode,
              phone: route.params.phoneNumber,
              otp: otpCode,
            },
          });
        }
      } else {
        setInvalidOTP(true);
        setIsLoading(false);
        //let err = {response: {data: {message: 'Invalid Code'}}};
        //api.handleError(err);
      }
    },
    onError: () => setIsLoading(false),
  });

  useEffect(() => {
    if (otpCode?.length === 4) {
      setIsLoading(true);
      checkOTP.mutate();
    }
  }, [otpCode]);

  return (
    <SafeAreaView style={tw`flex flex-grow pb-4 px-8 bg-white`}>
      {isLoading && (
        <View
          style={tw`absolute top-0 bottom-0 right-0 left-0 justify-center items-center bg-white z-10 bg-opacity-50`}>
          <ActivityIndicator color={'#FF9100'} size={30} />
        </View>
      )}
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={180}
        scrollEnabled={false}
        contentContainerStyle={tw`flex-grow`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`flex-grow`}>
          <View style={tw`items-center mb-6 mt-10`}>
            <Image
              style={tw`h-32 w-32`}
              source={require('../../assets/media/logoWithoutText.png')}
            />
            <Text style={tw`tp-titleBranch text-4.5xl text-primary`}>
              Beautiverse Pro
            </Text>
          </View>
          <View style={tw`items-center justify-between`}>
            <Text style={tw`bv-heading-base text-primary mb-6 text-2xl`}>
              Confirm Your Number
            </Text>
            <Text style={tw`capitalize bv-med-sm text-grayBorder mb-2`}>
              Please enter the code we sent to
            </Text>
            <Text style={tw`bv-med-sm text-primary mb-8`}>
              {route.params.countryCode + ' ' + route.params.maskedPhoneNumber}
            </Text>
            <CodeInput
              cellCount={4}
              timerDuration={60}
              invalidOTP={invalidOTP}
              onChange={value => {
                setOtpCode(value);
                setInvalidOTP(false);
              }}
              style={tw`bv-med-lg text-primary mb-2 px-14`}
              onResend={() => {
                sendOTP.mutate();
                setInvalidOTP(false);
              }}
            />
          </View>
          <View style={tw` flex-row items-center justify-center mt-auto`}>
            <Text style={tw` bv-med-sm mr-1`}>Incorrect Phone Number?</Text>
            <Button
              title="Change Number"
              defaultColor={'#FF6E00'}
              titleStyle={tw`bv-med-sm underline`}
              onPress={goBack}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default AuthVerify;
