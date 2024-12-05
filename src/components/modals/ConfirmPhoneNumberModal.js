import {useNavigation} from '@react-navigation/native';
import {View, Text, Platform, Keyboard} from 'react-native';
import React, {useState} from 'react';
import {useMutation} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {Button, CodeInput, Input, ModalWrapper} from '../commons';
import {useAuth} from '../../hooks/useAuth';
import {api} from '../../utils';

const ConfirmPhoneNumberModal = ({style, route}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [maskedPhoneNumber, setMaskedPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [invalidOTP, setInvalidOTP] = useState(false);
  const [isOTPSent, setIsOTPSent] = useState(false);
  const {navigate} = useNavigation();
  const login = useAuth();
  const sendOTP = useMutation(['sendOTP'], () =>
    axios.post('https://beautiverse.ca/api/beautiverse/otp/send', {
      country_code: '+1',
      phone: phoneNumber,
    }),
  );
  const checkOTP = useMutation({
    mutationFn: () =>
      axios.post('https://beautiverse.ca/api/beautiverse/otp/check', {
        country_code: '+1',
        phone: phoneNumber,
        otp: otpCode,
      }),

    onSuccess: context => {
      setIsLoading(false);

      if (context.otp_correct === true) {
        if (!context.token) {
          navigate('Auth', {
            screen: 'Register',
            params: {
              ...route.params,
              country_code: '+1',
              phone: phoneNumber,
              otp: otpCode,
            },
          });
        } else {
          login.login(context.token);
        }
      } else {
        setInvalidOTP(true);
        let err = {response: {data: {message: 'Invalid Code'}}};
        api.handleError(err);
      }
    },
    onError: () => setIsLoading(false),
  });
  return (
    <ModalWrapper
      titleSeparator
      closeable={false}
      title="Create Account"
      type="fromBottom"
      style={tw.style(' h-auto bg-white rounded-30 ', style)}>
      <View style={tw.style('w-full ')}>
        <Text style={tw`text-primary self-center bv-heading-1.5xl my-6`}>
          Confirm Your Number
        </Text>
        {!isOTPSent ? (
          <Input
            label="Phone Number"
            keyboardType="phone-pad"
            inputValue={phoneNumber}
            style={tw`mb-6`}
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
            textInputStyle={tw.style('text-primary bv-heading-sm')}
            onChange={(val, maskedVal) => {
              setMaskedPhoneNumber(maskedVal);
              setPhoneNumber(val);
              if (val.length === 10) {
                Keyboard.dismiss();
              }
            }}
            preffix={
              <Text style={tw`bv-heading-sm text-primary mr-2 -mb-1`}>+1</Text>
            }
          />
        ) : (
          <View>
            <View style={tw`items-center justify-between  p-0 m-0`}>
              <Text style={tw`capitalize bv-med-sm text-grayBorder mb-2`}>
                Please enter the code we sent to
              </Text>
              <Text style={tw`bv-med-sm text-primary mb-8`}>
                {'+1 ' + maskedPhoneNumber}
              </Text>
              <CodeInput
                cellCount={4}
                timerDuration={60}
                onChange={value => {
                  setOtpCode(value);
                  setInvalidOTP(false);
                }}
                onResend={() => {
                  sendOTP.mutate();
                  setInvalidOTP(false);
                }}
                style={tw`bv-med-lg text-primary mb-2 mx-18`}
                invalidOTP={invalidOTP}
              />
            </View>
            <View style={tw` flex-row items-center justify-center mb-8 `}>
              <Text style={tw` bv-med-sm mr-1`}>Not Your Number?</Text>
              <Button
                title="Change Number"
                defaultColor={'#5948AA'}
                titleStyle={tw`bv-med-sm underline`}
                onPress={() => {
                  setIsOTPSent(false);
                  setInvalidOTP(false);
                  setPhoneNumber('');
                }}
              />
            </View>
          </View>
        )}

        <Button
          primary
          title={'Continue'}
          containerStyle={tw`w-full`}
          onPress={() => {
            setIsLoading(true);

            !isOTPSent
              ? sendOTP.mutate(phoneNumber, {
                  onSuccess: () => {
                    setIsOTPSent(true);
                    setIsLoading(false);
                  },
                })
              : checkOTP.mutate();
          }}
          disabled={
            !isOTPSent && (phoneNumber.length < 10 || phoneNumber === '')
              ? true
              : false
          }
          loading={isLoading}
        />
      </View>
    </ModalWrapper>
  );
};

export {ConfirmPhoneNumberModal};
