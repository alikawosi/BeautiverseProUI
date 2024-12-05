import React from 'react';
import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Progress from 'react-native-progress';
import {Add, InfoCircle} from 'iconsax-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import tw from '../../../../tailwind';
import {Button} from '../../commons';

const BusinessSetupLayout = ({
  isLoading,
  progress = 0,
  total = 15,
  isProgressVisible = true,
  headerTitle,
  headerTitleStyle,
  headerDesc,
  headerDescStyle,
  headerLink,
  headerLinkStyle,
  headerLinkIcon,
  headerLinkIconStyle,
  headerContainerStyle,
  //nextButtonTitle,
  nextButtonIcon,
  onPressNextButton = () => {},
  isNextButtonDisabled = false,
  isNextButtonLoading,
  isAddButtonVisible = true,
  //skipButtonTitle,
  skipButtonIcon,
  onPressSkipButton = () => {},
  twoButtonFooter,
  listMode,
  data,
  renderItem = () => {},
  listContainerStyle,
  isFooterVisible = true,
  footerButtonTitle,
  onPressAdd = () => {},
  contentContainerStyle,
  children,
}) => {
  return (
    <SafeAreaView style={tw`flex-1 bg-background`}>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-24`}
        bounces={false}>
        {isProgressVisible ? (
          <View style={tw`w-full px-5 mb-4`}>
            <Progress.Bar
              color="#FF6E00"
              unfilledColor="#FFFFFF"
              height={12}
              borderWidth={0}
              progress={progress / total}
              width={null}
              borderRadius={47}
            />
            <Text style={tw`bv-sans-sm mt-1`}>{`${progress} / ${total}`}</Text>
          </View>
        ) : null}
        <View
          style={tw.style(
            'bg-white rounded-2xl p-5 mb-4',
            headerContainerStyle,
          )}>
          <Text style={tw.style('bv-sans-base', headerTitleStyle)}>
            {headerTitle}
          </Text>
          {headerDesc ? (
            <Text
              style={tw.style('bv-med-sm text-descGray mt-2', headerDescStyle)}>
              {headerDesc}
            </Text>
          ) : null}
          {headerLink ? (
            <View
              style={tw.style(
                'flex-row items-center mt-2',
                headerLinkIconStyle,
              )}>
              {headerLinkIcon ? (
                <InfoCircle size={16} color="#7A7A8A" style={tw`mr-2`} />
              ) : null}
              <Pressable>
                <Text
                  style={tw.style(
                    'bv-med-sm text-descGray underline',
                    headerLinkStyle,
                  )}>
                  {headerLink}
                </Text>
              </Pressable>
            </View>
          ) : null}
        </View>
        {isLoading ? (
          <ActivityIndicator color={'#FF9100'} />
        ) : (
          <>
            {listMode && data?.length > 0 ? (
              <View
                style={tw.style(
                  'mx-5 p-2 bg-white rounded-2xl mb-26',
                  listContainerStyle,
                )}>
                {data?.map((item, index) => renderItem(item, index))}
              </View>
            ) : null}
            <View style={tw.style('', contentContainerStyle)}>{children}</View>
          </>
        )}
      </KeyboardAwareScrollView>
      {isFooterVisible && (
        <View
          style={tw`w-screen bg-white shadow-xl rounded-t-3xl absolute bottom-0 h-24 justify-center`}>
          {twoButtonFooter ? (
            <View style={tw`flex-row justify-between mx-5`}>
              <Button
                secondary
                containerStyle={tw`flex-1 mr-1`}
                title={'Skip'}
                icon={skipButtonIcon}
                onPress={onPressSkipButton}
              />
              <Button
                primary
                containerStyle={tw`flex-1 ml-1`}
                title={'Next'}
                icon={nextButtonIcon}
                onPress={onPressNextButton}
                disabled={isNextButtonDisabled}
                loading={isNextButtonLoading}
              />
            </View>
          ) : (
            <View style={tw`w-full`}>
              <Button
                primary
                containerStyle={tw`mx-5`}
                title={footerButtonTitle ? footerButtonTitle : 'Next'}
                icon={nextButtonIcon}
                onPress={onPressNextButton}
                disabled={isNextButtonDisabled}
                loading={isNextButtonLoading}
              />
            </View>
          )}
        </View>
      )}
      {!isFooterVisible && isAddButtonVisible && (
        <View style={tw`w-screen absolute bottom-9 items-end px-5`}>
          <Button
            primary
            icon={<Add size={32} color="white" />}
            containerStyle={tw`h-12 w-12 items-center justify-center`}
            onPress={onPressAdd}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export {BusinessSetupLayout};
