import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  Keyboard,
  Pressable,
  Platform,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
//import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useMutation} from 'react-query';
import axios from 'axios';
//import {LoginManager} from 'react-native-fbsdk';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';

import tw from '../../../tailwind';
import {Button, Input} from '../../components/commons';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {AUTH_CONST, GENERAL_CONST} from '../../constants';

const AuthLogin = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState('');
  const {navigate} = useNavigation();

  const mutation = useMutation({
    mutationFn: () =>
      axios.post('/otp/send', {
        country_code: '+1',
        phone: phoneNumber,
      }),
    onSuccess: () => {
      setIsLoading(false);
      navigate('Auth', {
        screen: 'Verify',
        params: {
          countryCode: '+1',
          phoneNumber: phoneNumber,
          maskedPhoneNumber: maskedPhoneNumber,
        },
      });
    },
    onError: () => {
      setIsLoading(false);
      Toast.show({
        topOffset: Platform.OS === 'ios' ? 80 : 40,
        type: 'error',
        text1: 'Something went worng!',
        text2: 'Please try again later.',
      });
    },
  });

  const OAuthSignIn = id => {
    if (id === 'google') {
      onGoogleButtonPress();
    }
  };

  const onGoogleButtonPress = () => {
    // GoogleSignin.configure({
    //   androidClientId:
    //     '851578252494-c2s9bd7qi0ff31qne47evi0p5l2cp68i.apps.googleusercontent.com',
    //   iosClientId:
    //     '851578252494-c2s9bd7qi0ff31qne47evi0p5l2cp68i.apps.googleusercontent.com',
    // });
    // GoogleSignin.signOut();
    // GoogleSignin.hasPlayServices()
    //   .then(hasPlayService => {
    //     if (hasPlayService) {
    //       GoogleSignin.signIn()
    //         .then(userInfo => {
    //           navigate('ConfirmPhoneNumberModal', {
    //             ...userInfo.user,
    //           });
    //         })
    //         .catch(e => {
    //           console.log('ERROR IS: ' + JSON.stringify(e));
    //         });
    //     }
    //   })
    //   .catch(e => {
    //     console.log('ERROR IS: ' + JSON.stringify(e));
    //   });
  };

  return (
    <SafeAreaView style={tw`flex-grow px-8 bg-white`}>
      <KeyboardAwareScrollView
        enableOnAndroid
        extraHeight={180}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`flex-grow`}>
        <View style={tw`flex-grow justify-center`}>
          <View style={tw`items-center mb-10`}>
            <Image
              style={tw`h-32 w-32 mb-2`}
              resizeMode="contain"
              source={require('../../assets/media/logoWithoutText.png')}
            />
            <Text style={tw`bv-med-lg`}>Welcome To</Text>
            <Text style={tw`tp-titleBranch text-4.5xl text-primary my-2`}>
              Beautiverse Pro
            </Text>
            <Text style={tw`bv-heading-lg text-primary text-center text-2xl`}>
              Log In or Sign Up
            </Text>
          </View>
          <Input
            label="Phone number"
            keyboardType="phone-pad"
            formValue={phoneNumber}
            mask={[
              '(',
              /\d/,
              /\d/,
              /\d/,
              ')',
              ' ',
              /\d/,
              /\d/,
              /\d/,
              '-',
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            maxLength={14}
            textInputStyle={tw.style('text-primary bv-heading-sm leading-none')}
            onChange={(val, maskedVal) => {
              setMaskedPhoneNumber(maskedVal);
              setPhoneNumber(val.replace(/\b0+/g, ''));
              if (val?.length === 10) {
                Keyboard.dismiss();
              }
            }}
            preffix={
              <Text style={tw`bv-heading-sm text-primary leading-none`}>
                +1
              </Text>
            }
          />
          <View style={tw`items-center justify-center flex-row my-6`}>
            <LinearGradient {...GENERAL_CONST.orLineProps} />
            <Text
              adjustsFontSizeToFit
              style={tw` px-2 bv-med-base z-20 text-grayBorder`}>
              OR
            </Text>
            <LinearGradient {...GENERAL_CONST.orLineProps} />
          </View>
          <View style={tw`flex-row justify-center mb-5`}>
            {AUTH_CONST.socialsIcon.map(item =>
              Platform.OS !== 'ios' && item.id === 'apple' ? null : (
                <Pressable
                  onPress={() => OAuthSignIn(item.id)}
                  key={item.id}
                  style={tw`bg-white mx-2.5 p-2.5 shadow-lg rounded-full`}>
                  <Image style={tw`h-8 w-8`} source={item.image} />
                </Pressable>
              ),
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Button
        primary
        title="Continue"
        onPress={() => {
          setIsLoading(true);
          Keyboard.dismiss();
          mutation.mutate(phoneNumber);
        }}
        disabled={phoneNumber?.length !== 10}
        loading={isLoading}
        containerStyle={tw`mb-4`}
      />
    </SafeAreaView>
  );
};

export default AuthLogin;
