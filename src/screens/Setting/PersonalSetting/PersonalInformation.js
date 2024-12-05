import React from 'react';
import {Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import dayjs from 'dayjs';

import tw from '../../../../tailwind';
import {GENERAL_CONST} from '../../../constants';
import {useAuth} from '../../../hooks/useAuth';
import {useMutation} from 'react-query';
import axios from 'axios';
import {SectionWrapper} from '../../../components/screens/BusinessSetup';

const PersonalInformation = () => {
  const auth = useAuth();
  const userInfo = auth.userInfo;
  const updateUser = useMutation({
    mutationFn: data =>
      axios.post('https://beautiverse.ca/api/beautiverse/user/update', {
        data: JSON.stringify(data),
      }),
    onSuccess: () => auth.refetchUser(),
  });
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={tw`flex bg-background flex-1 pb-4  `}>
      <SectionWrapper
        title="Full Name"
        contentContainerStyle={tw`px-2`}
        option
        onEdit={() =>
          navigate('FormModal', {
            title: 'Edit Name',
            isEditMode:
              userInfo.first_name || userInfo.last_name ? true : false,
            formData: [
              {
                name: 'firstName',
                type: 'input',
                label: 'First Name',
                validation: 'required',
                inputValue: userInfo.first_name,
                labelFix: userInfo.first_name ? true : false,
              },
              {
                name: 'lastName',
                type: 'input',
                label: 'Last Name',
                validation: 'required',
                inputValue: userInfo.first_name,
                labelFix: userInfo.last_name ? true : false,
              },
            ],
            defaultValues:
              userInfo.first_name || userInfo.last_name
                ? {firstName: userInfo.first_name, lastName: userInfo.last_name}
                : null,
            onUpdate: val => {
              updateUser.mutate({
                first_name: val.firstName,
                last_name: val.lastName,
              });
            },
          })
        }
        containerStyle={tw`rounded-0`}>
        <Text style={tw`bv-med-sm mb-4 text-grayBorder`}>
          {userInfo.first_name + ' ' + userInfo.last_name}
        </Text>
      </SectionWrapper>

      <SectionWrapper
        title="Gender"
        option
        contentContainerStyle={tw`px-2`}
        onEdit={() =>
          navigate('SelectModal', {
            type: 'fromBottom',
            options: GENERAL_CONST.GenderData,
            label: 'Gender',
            validation: 'required',
            onSubmit: (val, flag) => {
              updateUser.mutate({
                gender: val,
              });
            },
          })
        }
        containerStyle={tw`rounded-0`}>
        <Text style={tw`bv-med-sm mb-4 text-grayBorder capitalize`}>
          {userInfo.gender}
        </Text>
      </SectionWrapper>
      <SectionWrapper
        title="Date Of Birth"
        option
        contentContainerStyle={tw`px-2`}
        onEdit={() =>
          navigate('DatePickerModal', {
            mode: 'date',
            type: 'center',
            title: 'Date Of Birth',
            value: dayjs(userInfo.birthday).toDate(),
            validation: 'required',
            onSubmit: val => {
              updateUser.mutate({
                birthday: val,
              });
            },
          })
        }
        containerStyle={tw`rounded-0`}>
        <Text style={tw`bv-med-sm mb-4 text-grayBorder`}>
          {dayjs(userInfo.birthday).format('MMM/DD/YYYY')}
        </Text>
      </SectionWrapper>

      <SectionWrapper
        title="Email"
        contentContainerStyle={tw`px-2`}
        containerStyle={tw`rounded-0`}>
        <Text style={tw`bv-med-sm mb-4 text-grayBorder`}>{userInfo.email}</Text>
      </SectionWrapper>
      <SectionWrapper
        title="Phone Number"
        contentContainerStyle={tw`px-2`}
        descriptionStyle={tw`underline`}
        style={tw`px-5 mb-5`}>
        <Text style={tw`bv-med-sm mb-4 text-grayBorder`}>
          {userInfo.country_code + userInfo.phone}
        </Text>
      </SectionWrapper>
    </SafeAreaView>
  );
};

export default PersonalInformation;
