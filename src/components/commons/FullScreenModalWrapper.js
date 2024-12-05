import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {BackButton, Button, Options} from '.';

const FullScreenModalWrapper = ({
  title,
  titleStyle,
  containerStyle,
  buttonTitle,
  disabled,
  buttonTitleStyle,
  isButtonTitleLoading,
  onSubmit = () => {},
  backButton,
  hasSeparator = true,
  contentContainerStyle,
  onFooterButtonPress,
  StickyButton,
  children,
  hasOwnScroller = false,
  MenuOptions,
  footerButtonDisabled,
}) => {
  const {goBack} = useNavigation();
  const {bottom} = useSafeAreaInsets();
  return (
    <SafeAreaView style={tw.style('flex-1 bg-background', containerStyle)}>
      <View style={tw`flex-row my-6 mx-5 items-center justify-center`}>
        {backButton ? (
          <BackButton
            style={tw`items-start absolute left-0`}
            onPress={() => goBack()}
          />
        ) : null}
        <Text style={tw.style('bv-heading-base text-center', titleStyle)}>
          {title}
        </Text>
        {MenuOptions ? (
          <Options
            style={tw`absolute right-0`}
            trigger={
              buttonTitle && (
                <Text
                  style={tw.style(
                    'bv-heading-sm text-primary',
                    buttonTitleStyle,
                  )}>
                  {buttonTitle}
                </Text>
              )
            }>
            {MenuOptions}
          </Options>
        ) : (
          <Button
            containerStyle={tw`items-end justify-center absolute right-0`}
            onPress={() => onSubmit()}
            loading={isButtonTitleLoading}
            defaultColor={'#FF6E00'}
            disabled={disabled}
            style={tw`h-auto`}
            title={buttonTitle}
            titleStyle={tw.style(
              'bv-heading-sm text-primary',
              buttonTitleStyle,
            )}
          />
        )}
        {/* <Pressable
          style={tw`items-end justify-center w-1/4`}
          onPress={() => onSubmit()}>
          <Text
            style={tw.style('bv-heading-sm text-primary', buttonTitleStyle)}>
            {buttonTitle}
          </Text>
        </Pressable> */}
      </View>
      {hasSeparator ? <View style={tw`w-full h-px bg-black/10`} /> : null}
      {hasOwnScroller ? (
        children
      ) : (
        <KeyboardAwareScrollView
          contentContainerStyle={tw.style('py-4', contentContainerStyle)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {children}
        </KeyboardAwareScrollView>
      )}
      {onFooterButtonPress ? (
        <View
          style={tw.style('absolute bottom-5 w-full px-5', {
            paddingBottom: bottom,
            paddingTop: bottom,
          })}>
          <View style={tw``} />
          <Button
            primary
            title={'Continue'}
            onPress={onFooterButtonPress}
            disabled={footerButtonDisabled}
            size="small"
          />
        </View>
      ) : null}
      {StickyButton && (
        <View style={tw`w-screen absolute bottom-9 items-end px-5`}>
          {StickyButton}
        </View>
      )}
    </SafeAreaView>
  );
};

export {FullScreenModalWrapper};
