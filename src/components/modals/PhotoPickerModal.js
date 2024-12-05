import {View} from 'react-native';
import React from 'react';

import tw from '../../../tailwind';
import {Button, ModalWrapper} from '../commons';
import {useNavigation, useRoute} from '@react-navigation/native';

const PhotoPickerModal = () => {
  const {goBack} = useNavigation();
  const {params} = useRoute();

  return (
    <ModalWrapper
      titleSeparator
      type="fromBottom"
      title={'Set Profile Photo'}
      style={tw`bg-background pb-5`}>
      <View style={tw`justify-center items-center`}>
        <Button
          title={'Camera'}
          style={tw`h-14`}
          containerStyle={tw`border border-gray-200 bg-white rounded-2xl w-full mb-3`}
          titleStyle={tw`bv-sans-base`}
          onPress={params.openImagePickerFromCamera.bind(null, goBack)}
        />
        <Button
          title={'Choose from Gallery'}
          style={tw`h-14`}
          containerStyle={tw`border border-gray-200 bg-white rounded-2xl w-full mb-4`}
          titleStyle={tw`bv-sans-base`}
          onPress={params.openImagePickerFromGallery.bind(null, goBack)}
        />
        <View style={tw`flex-row`} />
      </View>
    </ModalWrapper>
  );
};

export {PhotoPickerModal};
