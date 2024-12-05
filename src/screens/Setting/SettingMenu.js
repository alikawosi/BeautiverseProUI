import {View, Text, Pressable, ScrollView} from 'react-native';
import React from 'react';
import {ArrowRight2, LogoutCurve} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {SettingCard, UserProfileCard} from '../../components/screens/Setting';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SETTING_CONST} from '../../constants';
import {useAuth} from '../../hooks';
import {useNavigation} from '@react-navigation/native';

const SettingMenu = () => {
  const auth = useAuth();
  const {navigate} = useNavigation();
  const userInfo = auth.userInfo;
  const navigateToDeleteModal = () => {
    navigate('DeleteModal', {
      title: 'Logout',
      keyword: 'Logout',
      question: 'Are you sure to',
      onSubmit: () => auth.logout(),
    });
  };

  return (
    <SafeAreaView style={tw`flex flex-1 bg-background `}>
      <ScrollView
        contentContainerStyle={tw` pb-4`}
        showsVerticalScrollIndicator={false}>
        <UserProfileCard
          name={userInfo.first_name + ' ' + userInfo.last_name}
          avatar={userInfo.avatar_url}
          isVerified={userInfo.isVerified}
          style={tw`mb-7 `}
          buttonTitle={'Show Profile'}
          onPress={() => navigate('UserProfileSetting')}
        />
        <View style={tw`bg-white flex-1 p-2 rounded-15`}>
          {SETTING_CONST.settingMenuData.map(item => {
            return (
              <SettingCard
                key={item.key}
                title={item.title}
                icon={item.icon}
                description={item.description}
                rootRoute={item.rootRoute}
                route={item.route}
                link={item.link}
              />
            );
          })}
          <Pressable
            onPress={navigateToDeleteModal}
            style={tw.style('flex-row justify-between p-4')}>
            <LogoutCurve color="#F04659" size={22} />
            <View style={tw`ml-2.5 flex-1 `}>
              <Text style={tw`bv-heading-base text-basicRed`}>Logout</Text>
            </View>
            <ArrowRight2 color="#F04659" size={22} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingMenu;
