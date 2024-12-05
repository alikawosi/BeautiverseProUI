import React, {useState} from 'react';
import {Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Button, Form} from '../commons';
import {CLIENT_CONST} from '../../constants';
import {SectionWrapper} from './';

const ClientForm = ({style, form, isEdit, avatar = null}) => {
  const {navigate} = useNavigation();
  const [img, setImg] = useState(avatar);
  const {addClientFormData, editClientFormData} = CLIENT_CONST;
  const openPhotoModal = () =>
    navigate('SetPhotoModal', {
      onSubmit: (file, photo) => {
        form.setValue('avatar', file);
        setImg(photo);
      },
    });

  return (
    <SectionWrapper style={tw.style(style)}>
      <Pressable style={tw`mx-auto`} onPress={openPhotoModal}>
        <Image
          style={tw`h-18 w-18 rounded-full `}
          source={
            img ? {uri: img} : require('../../assets/media/UserDefault.png')
          }
        />
      </Pressable>
      <Form
        style={tw`mt-5`}
        fields={isEdit ? editClientFormData : addClientFormData}
        form={form}
      />
    </SectionWrapper>
  );
};

export {ClientForm};
