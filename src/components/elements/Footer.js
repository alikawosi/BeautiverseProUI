import React from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import tw from '../../../tailwind';
import {Button} from '../commons';

const Wrapper = ({style, children, gutter}) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <View
      style={tw.style(
        'absolute z-50 bottom-0',
        {
          paddingBottom: bottom + gutter,
        },
        style,
      )}>
      {children}
    </View>
  );
};

const Footer = {
  Primary: ({options}) => {
    const props = {
      1: {
        primary: true,
      },
      2: {
        style: tw`rounded-xl bg-[#fba30114]`,
        titleStyle: tw`text-primary`,
      },
    };

    return (
      <Wrapper
        gutter={20}
        style={tw`flex-row-reverse w-full px-3 bg-white rounded-t-3xl shadow-2xl pt-4`}>
        {options.map((item, index) => {
          const otherProps = props[index + 1];

          return (
            <Button
              {...item}
              key={index}
              primary={otherProps?.primary}
              gradientStyle={tw`rounded-xl`}
              containerStyle={tw`flex-1 mx-2`}
              style={tw.style(otherProps?.style)}
              titleStyle={tw.style(
                'bv-sans-base text-white',
                otherProps?.titleStyle,
              )}
            />
          );
        })}
      </Wrapper>
    );
  },
};

export {Footer};
