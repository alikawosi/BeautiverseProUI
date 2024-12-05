import React from 'react';
import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {BackButton} from './BackButton';
import {Options} from './Options';

const PageWrapper = ({
  headerTitle,
  headerShown,
  backButton,
  containerStyle,
  headerStyle,
  contentContainerStyle,
  StickyFooterComponent,
  children,
  StickyHeaderComponent,
  hasOwnScroller,
  scrollerStyle,
  MenuOptions,
  edges,
  isLoading,
}) => {
  const insets = useSafeAreaInsets();
  const {navigate, goBack} = useNavigation();
  return (
    <SafeAreaView
      edges={edges ? edges : ['bottom', 'top']}
      style={tw.style(
        'flex-1 bg-background',
        {'items-center justify-center': isLoading},
        containerStyle,
      )}>
      {isLoading ? (
        <ActivityIndicator color={'#FF9100'} />
      ) : (
        <>
          {headerShown ? (
            <View
              style={tw.style(
                'bg-background flex-row relative justify-center items-center mx-5 mb-5',
                {marginTop: insets.top + 30},
                headerStyle,
              )}>
              {backButton ? (
                <BackButton
                  style={tw`absolute -left-[7px]`}
                  onPress={() => goBack()}
                />
              ) : null}
              <Text style={tw`bv-sans-lg`}>{headerTitle}</Text>
              {MenuOptions && (
                <Options style={tw`absolute right-0`}>{MenuOptions}</Options>
              )}
            </View>
          ) : null}
          {StickyHeaderComponent ? StickyHeaderComponent : null}
          {hasOwnScroller ? (
            children
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={contentContainerStyle}
              style={tw.style('flex-1', scrollerStyle)}>
              {children}
            </ScrollView>
          )}
          {StickyFooterComponent ? StickyFooterComponent : null}
        </>
      )}
    </SafeAreaView>
  );
};

export {PageWrapper};
