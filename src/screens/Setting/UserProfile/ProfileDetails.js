import {ArrowRight2, InfoCircle} from 'iconsax-react-native';
import React from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../../tailwind';
import {Button} from '../../../components/commons';
import {UserProfileCard} from '../../../components/screens/Setting';
import {useAuth} from '../../../hooks/useAuth';

const ProfileDetails = () => {
  const {navigate} = useNavigation();
  const userInfo = useAuth().userInfo;

  const {data, isLoading} = useQuery({
    queryFn: () => axios.get('/pro/setup/identity'),
    queryKey: ['getIdentityVerificationStatus'],
  });

  return (
    <SafeAreaView style={tw`flex rounded-2xl bg-white flex-1 pb-4 px-7 `}>
      {isLoading ? (
        <ActivityIndicator color={'#FF9100'} />
      ) : (
        <>
          <UserProfileCard
            name={userInfo.first_name + ' ' + userInfo.last_name}
            joinedDate={userInfo.joinedDate}
            isShowed
            isVerified={userInfo.isVerified}
            avatar={userInfo.avatar_url}
            buttonTitle={'Edit Profile'}
            onPress={() => navigate('EditUserProfile')}
            style={tw`mb-6`}
          />
          {!userInfo.isVerified ? (
            <View>
              <Text style={tw`bv-heading-base mb-2`}>
                Identity Verification
              </Text>
              <Text style={tw`bv-med-sm mb-6`}>
                Show others you’re really you with the identity verification
                badge.
              </Text>
              {/* <View style={tw`flex-row mb-4 items-center`}>
            <InfoCircle size={16} color={'#717171'} />
            <Text style={tw`bv-med-sm text-grayBorder underline ml-2`}>
              Why do we verify identities?
            </Text>
          </View> */}
              {data ? (
                <Text style={tw`bv-sans-lg self-center`}>
                  Verification is In progress ...
                </Text>
              ) : (
                <Button
                  primary
                  title="Why do we verify identities?"
                  containerStyle={tw`w-[70%]`}
                  icon={<ArrowRight2 size={18} color="#FFFF" />}
                  titleStyle={tw`bv-sans-sm text-white`}
                  reverse
                  onPress={() =>
                    navigate('BusinessSetup', {
                      screen: 'IdentityVerification',
                      params: {stepsHidden: true},
                    })
                  }
                />
              )}
            </View>
          ) : null}
        </>
      )}
    </SafeAreaView>
  );
};

export default ProfileDetails;
