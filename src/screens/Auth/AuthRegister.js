import React, {useState} from 'react';
import {Text, View, Image, Linking} from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';
import {useMutation} from 'react-query';
import {SafeAreaView} from 'react-native-safe-area-context';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

import tw from '../../../tailwind';
import {Button, Form, CheckBox} from '../../components/commons';
import {AUTH_CONST} from '../../constants';
import {useForm} from '../../hooks/useForm';
import {useAuth} from '../../hooks';
import {api} from '../../utils';

const AuthRegister = ({route}) => {
  const login = useAuth();
  const [screenHeight, setScreenHeight] = useState(0);
  const [messageFlag, setMessageFlag] = useState(false);
  const createUser = useMutation({
    mutationFn: ({gender, date, firstName, lastName, email}) => {
      return axios.post('/user/create', {
        first_name: firstName,
        last_name: lastName,
        email,
        otp: parseInt(route.params.otp, 10),
        country_code: route.params.countryCode,
        phone: route.params.phone,
        gender: gender.value,
        birthday: dayjs(date * 1000).format('YYYY-MM-DD'),
        newsletter: messageFlag,
        avatar: '',
      });
    },
    onSuccess: context => {
      login.login(context.token);
    },
    onError: err => {
      api.handleError(err);
    },
  });
  const {form, handleSubmit} = useForm({
    fields: AUTH_CONST.registerFormData,
    defaultValue: route.params
      ? {
          firstName: route.params.givenName,
          lastName: route.params.familyName,
          email: route.params.email,
          gender: route.params.gender,
          birthDate: route.params.birthDate,
        }
      : null,
    onSubmit: createUser.mutate,
  });
  const onSubmit = () => handleSubmit();

  return (
    <SafeAreaView
      style={tw.style('flex-grow px-5 pb-4 bg-white', {
        height: screenHeight,
      })}
      onLayout={({
        nativeEvent: {
          layout: {height},
        },
      }) => {
        setScreenHeight(height);
      }}>
      <KeyboardAvoidingView
        enableOnAndroid
        extraHeight={180}
        style={tw`flex-1`}
        contentContainerStyle={tw`pt-6 flex-grow  `}
        showsVerticalScrollIndicator={false}>
        <Image
          style={tw`h-32 w-32 mb-6 mx-auto`}
          resizeMode={'contain'}
          source={require('../../assets/media/logoWithoutText.png')}
        />
        <View>
          <Text
            style={tw`bv-heading-xl self-center text-primary text-2xl mb-6`}>
            Create An Account
          </Text>
          <Form fields={AUTH_CONST.registerFormData} form={form} />
          <View style={tw`mb-6 `}>
            <Text style={tw`bv-med-xs text-center text-grayBorder`}>
              By selecting Agree and continue, I agree to Beautiverse
              <Text
                onPress={() =>
                  Linking.openURL('https://beautiverse.ca/terms-conditions/')
                }
                style={tw`bv-med-xs underline text-blue-500`}>
                Terms of Service, Payments Terms of Service and
                Nondiscrimination Policy
              </Text>
              {' ' + 'and acknowledge the' + ' '}
              <Text
                onPress={() =>
                  Linking.openURL('https://beautiverse.ca/privacy-policy/')
                }
                style={tw`bv-med-xs underline text-blue-500`}>
                Privacy Policy.
              </Text>
            </Text>
          </View>
          <CheckBox
            style={tw`mb-10 border-basicGray`}
            labelStyle={tw`text-grayBorder text-xs`}
            label={'I want to receive marketing messages from Beautiverse'}
            isChecked={messageFlag}
            size={22}
            onPress={() => setMessageFlag(!messageFlag)}
          />
        </View>
        <Button
          primary
          disabled={
            Object.values(form.control._formState?.errors).length !== 0 ||
            Object.values(form.control._formValues).filter(
              item => item === undefined,
            ).length > 0
          }
          loading={createUser.isLoading}
          containerStyle={tw`mt-auto`}
          title={'Agree and Continue'}
          onPress={onSubmit}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AuthRegister;
