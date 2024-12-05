import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useMutation} from 'react-query';

import tw from '../../../tailwind';
import {useCountdown} from '../../hooks';
import {Button} from './Button';


const CountdownTimer = ({
  duration,
  textStyle,
  phoneNumber,
  countryCode,
  onTimeEnd = () => {},
  style,
}) => {
  const [minutes, seconds] = useCountdown(duration);
  const remainedTime = minutes + seconds;
  useEffect(() => {
    if (remainedTime <= 0) {
      return onTimeEnd(true);
    } else {
      onTimeEnd(false);
    }
  }, [onTimeEnd, remainedTime]);

  const {reset} = useNavigation();
  const mutation = useMutation(['sendOTP'], () =>
    axios.post('/otp/send', {
      country_code: countryCode,
      phone: phoneNumber,
    }),
  );

  return (
    <View style={tw.style('items-center', style)}>
      {seconds + minutes >= 0 ? (
        <View style={tw`flex-row`}>
          <Text style={tw.style('bv-med-sm text-grayBorder', textStyle)}>
            {`0${minutes}`.slice(-2)}
          </Text>
          <Text style={tw`bv-med-sm text-grayBorder mx-1`}>:</Text>
          <Text style={tw.style('bv-med-sm text-grayBorder', textStyle)}>
            {seconds}
          </Text>
        </View>
      ) : (
        <Button
          title="Resend Code"
          defaultColor="#FF6E00"
          titleStyle={tw`bv-med-sm text-primary underline `}
          style={tw`h-auto`}
          onPress={() => {
            mutation.mutate(phoneNumber, countryCode);
            reset({
              index: 0,
              routes: [
                {
                  name: 'Verify',
                  params: {
                    phoneNumber: phoneNumber,
                    countryCode: countryCode,
                  },
                },
              ],
            });
          }}
        />
      )}
    </View>
  );
};

export {CountdownTimer};
