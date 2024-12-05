import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import tw from '../../../tailwind';
import {Button} from './Button';
import {CountdownTimer} from './CountdownTimer';

const CodeInput = ({
  style,
  cellCount,
  timerDuration,
  invalidOTP,
  onResend = () => {},
  onChange = () => {},
}) => {
  const [value, setValue] = useState('');
  const [isTimeFinished, setIsTimeFinished] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: cellCount});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useEffect(() => {
    onChange(value);
  }, [value]);

  return (
    <View style={tw`w-full`}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={style}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            style={tw.style(
              'w-12 h-12 pb-1 rounded-10 bg-mainGray  justify-center',
              {
                'bg-red-200': isTimeFinished || invalidOTP,
              },
            )}
            key={index}
            onLayout={getCellOnLayoutHandler(index)}>
            <Text
              style={tw.style('text-center bv-med-xl', {
                'text-red-400': isTimeFinished || invalidOTP,
              })}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      {invalidOTP ? (
        <Text style={tw.style('text-center bv-med-xs text-red-400 my-1')}>
          Incorrect code. Please try again
        </Text>
      ) : null}

      {isTimeFinished ? (
        <Button
          title="Resend Code"
          defaultColor={'red'}
          titleStyle={tw`bv-med-sm underline `}
          style={tw`h-auto mt-4`}
          onPress={() => {
            setValue('');
            onResend();
            setIsTimeFinished(false);
          }}
        />
      ) : (
        <CountdownTimer
          style={tw`justify-center mt-2.5`}
          duration={isTimeFinished ? 0 : timerDuration}
          onTimeEnd={val => {
            setIsTimeFinished(val);
          }}
        />
      )}
    </View>
  );
};

export {CodeInput};
