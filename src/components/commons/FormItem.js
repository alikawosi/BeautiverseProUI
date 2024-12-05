import React, {useState} from 'react';
import {Controller} from 'react-hook-form';
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  Easing,
} from 'react-native-reanimated';

import tw from '../../../tailwind';
import {formUtil} from '../../utils';

const FormItem = ({children, form, validation, name, style}) => {
  const [rules, setRules] = useState(
    formUtil.generateRule(validation, form?.watch),
  );
  const fieldError = form?.error;
  const hasError = Boolean(fieldError);

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child) && form) {
      return (
        <Controller
          render={({field}) => {
            const FieldItem = React.cloneElement(child, {
              onChange: value => field.onChange(value),
              onBlur: () => field.onBlur(),
              onFocus() {
                if (validation?.includes('deps:')) {
                  setRules(formUtil.generateRule(validation, form?.watch));
                }
              },
              formValue: field.value,
              hasError,
              name,
              required: rules?.required ? true : false,
            });
            return FieldItem;
          }}
          control={form?.control}
          name={name}
          rules={rules}
        />
      );
    }
    return child;
  });

  return (
    <Animated.View
      layout={Layout.springify().duration(200)}
      style={tw.style('w-full flex-col relative', style)}>
      {childrenWithProps}
      {hasError && (
        <Animated.Text
          entering={FadeIn.duration(300).easing(Easing.cubic(Easing.out))}
          exiting={FadeOut.duration(50).easing(Easing.cubic(Easing.in))}
          style={tw.style('tp-small2 w-full pt-1 px-2 text-red-700', {
            '': hasError,
          })}>
          {fieldError?.message?.toString() || ''}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

export {FormItem};
