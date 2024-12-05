import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {CloseCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {BlurView} from '@react-native-community/blur';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';

import tw from '../../../tailwind';

function ModalWrapper({
  children,
  style,
  title,
  type,
  titleStyle,
  titleSeparator,
  onClose = () => false,
}) {
  const {goBack} = useNavigation();
  const {bottom} = useSafeAreaInsets();
  const swipeable = type === 'fromBottom';
  const handleBack = () => {
    goBack();
    onClose();
  };

  return (
    <View
      style={tw.style('flex-1 relative items-center justify-center', {
        'justify-end': swipeable,
      })}>
      <View
        style={tw`top-0 left-0 right-0 absolute z-10 bottom-0`}
        //blurType="light"
        //blurAmount={5}
        reducedTransparencyFallbackColor="white"
      />
      <TouchableWithoutFeedback onPress={handleBack}>
        {Platform.OS === 'ios' ? (
          <BlurView
            blurType="light"
            blurAmount={5}
            style={tw`top-0 left-0 right-0 absolute z-20 bottom-0`}
          />
        ) : (
          <View
            style={tw`top-0 left-0 right-0 absolute z-20 bottom-0 bg-[rgba(0,0,0,0.35)]`}
          />
        )}
      </TouchableWithoutFeedback>
      <KeyboardAvoidingView
        extraHeight={180}
        showsVerticalScrollIndicator={false}
        style={tw.style(
          'relative z-30 px-4 pt-4 bg-white rounded-30  max-w-[90%] shadow-lg flex-none',
          style,
          {
            'max-w-full max-h-[90%] w-full rounded-b-none': swipeable,
          },
          {paddingBottom: bottom},
        )}>
        <View
          style={tw.style({
            paddingBottom: bottom,
          })}>
          {title ? (
            <View style={tw`flex-row items-center justify-center`}>
              <Text
                style={tw.style(
                  'bv-heading-lg text-center capitalize',
                  titleStyle,
                )}>
                {title}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={tw`absolute z-20 right-4`}
                onPress={handleBack}>
                <View>
                  <CloseCircle color="#717171" size={22} />
                </View>
              </TouchableOpacity>
            </View>
          ) : null}
          {titleSeparator && title ? (
            <View style={tw`border-t border-black mt-2 mb-4 opacity-10`} />
          ) : null}
          {children}
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

export {ModalWrapper};
