import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import tw from '../../../../tailwind';
import {useAuth} from '../../../hooks';

import {useMutation} from 'react-query';
import axios from 'axios';
import {SectionWrapper} from '../../../components/screens/BusinessSetup';

const EditUserProfile = () => {
  const {navigate} = useNavigation();
  const profileData = useAuth();
  const updateUser = useMutation({
    mutationFn: data =>
      axios.post('https://beautiverse.ca/api/beautiverse/user/update', {
        data: JSON.stringify(data),
      }),
    onSuccess: () => profileData.refetchUser(),
  });

  return (
    <SafeAreaView style={tw`flex bg-background rounded-2xl flex-1 pb-4  `}>
      <View style={tw`items-center mb-4`}>
        <Image
          source={{uri: profileData.userInfo.avatar_url}}
          style={tw`rounded-full w-23 h-23 mb-4 `}
        />
        <Text style={tw`mr-1 bv-sans-lg text-black `}>
          {profileData.userInfo.first_name +
            ' ' +
            profileData.userInfo.last_name}
        </Text>
        <Pressable
          onPress={() =>
            navigate('SetPhotoModal', {
              type: 'fromBottom',
              image: profileData.userInfo.avatar_url,
              onSubmit: image => {
                updateUser.mutate({
                  avatar: image,
                });
              },
            })
          }>
          <Text style={tw`bv-sans-sm text-primary`}>Edit Profile Photo</Text>
        </Pressable>
      </View>
      <SectionWrapper
        title="About Me"
        option
        onEdit={() =>
          navigate('FormModal', {
            title: 'About Me',
            description:
              'tell us about your self, so your future pros can get to know you',
            isEditMode: profileData.userInfo.about_me ? true : false,
            defaultValues: profileData.userInfo.about_me
              ? {aboutMe: profileData.userInfo.about_me}
              : null,
            formData: [
              {
                name: 'aboutMe',
                type: 'input',
                //label: 'Enter Description',
                inputValue: profileData.userInfo.about_me,
                inputType: 'textArea',
                validation: 'required',
                isMultiline: true,
                labelFix: profileData.userInfo.about_me ? true : false,
              },
            ],
            onSubmit: val => {
              updateUser.mutate({
                about_me: val.aboutMe,
              });
            },
            onUpdate: val => {
              updateUser.mutate({
                about_me: val.aboutMe,
              });
            },
          })
        }
        containerStyle={tw`mb-4`}>
        <Text
          style={tw.style('bv-med-sm text-grayBorder', {
            'text-center justify-center': !profileData.userInfo.about_me,
          })}>
          {profileData.userInfo.about_me
            ? profileData.userInfo.about_me
            : ' Tell more About yourself!'}
        </Text>
      </SectionWrapper>
    </SafeAreaView>
  );
};

export default EditUserProfile;
