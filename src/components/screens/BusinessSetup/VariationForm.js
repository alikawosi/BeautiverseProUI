import {View, Text} from 'react-native';
import React from 'react';
import Animated, {Easing, FadeIn, FadeOut} from 'react-native-reanimated';

import tw from '../../../../tailwind';
import {FormItem, Input, Picker, Select} from '../../commons';
import {BUSINESSSETUP_CONST} from '../../../constants';

const VariationForm = ({style, form, id}) => {
  const key = `variation_${id}`;
  const {durationData} = BUSINESSSETUP_CONST;
  const {watch, control, formState, getFieldState} = form;
  const variationForm = {
    watch: watch,
    control: control,
    errors: formState.errors,
  };
  const time = watch(`${key}.time`);
  const hour = time?.hour && `${time.hour} hour`;
  const min = Number(time?.min) && `${time.min} mins`;

  return (
    <Animated.View
      entering={FadeIn.duration(100).easing(Easing.cubic(Easing.out))}
      exiting={FadeOut.duration(100).easing(Easing.cubic(Easing.out))}
      style={style}>
      <FormItem
        name={`${key}.title`}
        validation="required"
        style={tw`mb-4`}
        form={{
          ...variationForm,
          error: getFieldState(`${key}.title`).error,
        }}>
        <Input label={'Variation Name'} required />
      </FormItem>
      <View style={tw`flex-row mb-1`}>
        <FormItem
          name={`${key}.price`}
          validation="required"
          form={{
            ...variationForm,
            error: getFieldState(`${key}.price`).error,
          }}
          style={tw`w-[48%] mr-4`}>
          <Input
            label={'Price'}
            keyboardType={'number-pad'}
            preffix={<Text style={tw`bv-med-sm text-black`}>$</Text>}
            required
          />
        </FormItem>
        <FormItem
          name={`${key}.sale_price`}
          form={{
            ...variationForm,
            error: getFieldState(`${key}.sale_price`).error,
          }}
          style={tw`w-[48%] `}>
          <Input
            label={'Sales Price'}
            keyboardType={'number-pad'}
            preffix={<Text style={tw`bv-med-sm text-black`}>$</Text>}
          />
        </FormItem>
      </View>
      <FormItem
        name={`${key}.time`}
        validation="required"
        style={tw`mb-2`}
        form={{
          ...variationForm,
          error: getFieldState(`${key}.time`).error,
        }}>
        <Picker.InputAccordion
          lable="Duration"
          value={hour && min ? `${hour} ${min}` : hour || min}>
          <Picker.Wrapper>
            <Picker.Column
              name="hour"
              suffix="hour"
              value={time?.hour || 0}
              data={durationData.hours}
              suffixStyle={tw`right-[30%] text-descGray`}
            />
            <Picker.Column
              name="min"
              suffix="min"
              value={time?.min || 0}
              data={durationData.min}
              suffixStyle={tw`right-[30%] text-descGray`}
            />
          </Picker.Wrapper>
        </Picker.InputAccordion>
      </FormItem>
      <FormItem
        name={`${key}.preparation`}
        validation="required"
        style={tw`mb-4`}
        form={{
          ...variationForm,
          error: getFieldState(`${key}.preparation`).error,
        }}>
        <Select
          label={'preparation Time'}
          options={BUSINESSSETUP_CONST.preparationTimeData}
        />
      </FormItem>
      <FormItem
        name={`${key}.buffer`}
        validation="required"
        style={tw`mb-4`}
        form={{
          ...variationForm,
          error: getFieldState(`${key}.buffer`).error,
        }}>
        <Select
          label={'Buffer Time'}
          options={BUSINESSSETUP_CONST.bufferTimeData}
        />
      </FormItem>
    </Animated.View>
  );
};

export {VariationForm};
