import {Pressable, View} from 'react-native';
import React, {useState} from 'react';
import {Trash} from 'iconsax-react-native';
import Animated, {Easing, FadeIn, FadeOut} from 'react-native-reanimated';

import tw from '../../../../tailwind';
import {InputWrapper, Picker} from '../../commons';
import {Text} from 'react-native-svg';

const CancelationPolicyInput = ({
  label,
  perioirTimeRange,
  perioirPercentage,
  id,
  data,
  onChange = () => false,
  onDelete = () => false,
}) => {
  const [isPickerShown, setIsPickerShown] = useState(false);

  return (
    <>
      <InputWrapper
        isActive
        label={label}
        contentStyle={tw`items-center justify-between `}
        style={tw`flex-row mb-5`}
        required
        onPress={() => setIsPickerShown(!isPickerShown)}>
        <View style={tw.style('w-4/7')}>
          <Animated.Text
            entering={FadeIn.duration(300).easing(Easing.cubic(Easing.out))}
            exiting={FadeOut.duration(50).easing(Easing.cubic(Easing.in))}
            style={tw`bv-sans-sm text-black `}>{`${
            perioirTimeRange.length > 0 ? perioirTimeRange : ' ----- '
          }  hour perior`}</Animated.Text>
        </View>
        <View
          style={tw.style(
            'w-3/7 px-1 border-l border-grayBorder h-5 justify-between items-center flex-row',
          )}>
          <Animated.Text
            entering={FadeIn.duration(300).easing(Easing.cubic(Easing.out))}
            exiting={FadeOut.duration(50).easing(Easing.cubic(Easing.in))}
            style={tw`bv-sans-sm text-black ml-2  `}>{`${perioirPercentage} %`}</Animated.Text>
          {id > 1 ? (
            <Pressable onPress={() => onDelete(id)} style={tw`p-2`}>
              <Trash size={20} color="#FF4444" />
            </Pressable>
          ) : null}
        </View>
      </InputWrapper>
      {isPickerShown ? (
        <Picker onChange={val => onChange(val)}>
          <Picker.Wrapper>
            <Picker.Column
              name="perioirTimeRange"
              value={data.periorTimeRange[0].value}
              data={data.periorTimeRange}
              suffix={' hour'}
              suffixStyle={tw`right-[15%]`}
            />
          </Picker.Wrapper>
          <Picker.Seprator
            value=" - "
            style={tw`mx-5 text-descGray bv-sans-base self-center`}
          />
          <Picker.Wrapper>
            <Picker.Column
              name="perioirPercentage"
              data={data.periorPercentage}
              value={data.periorPercentage[0].value}
              suffix="%"
              suffixStyle={tw`right-[15%]`}
            />
          </Picker.Wrapper>
        </Picker>
      ) : null}
    </>
  );
};

export {CancelationPolicyInput};
