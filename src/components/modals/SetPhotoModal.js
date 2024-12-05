import React, {useState} from 'react';
import {View, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Button, ModalWrapper} from '../commons';

const SetPhotoModal = ({route}) => {
  const {goBack} = useNavigation();
  const {onSubmit = () => false} = route.params;
  const [image, setImage] = useState(
    route.params.image
      ? {photo: route.params.image, file: null}
      : {photo: null, file: null},
  );
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(
    route.params.isConfirmLoading
      ? {photo: route.params.image, file: null}
      : {photo: null, file: null},
  );
  const openImagePickerFromGallery = () => {
    ImagePicker.openPicker({
      writeTempFile: true,
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
    }).then(photo => {
      setImage({
        photo: `data:${photo.mime};base64,${photo.data}`,
        file: photo.data,
      });
    });
  };

  const openImagePickerFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      useFrontCamera: true,
    }).then(photo => {
      setImage({
        photo: `data:${photo.mime};base64,${photo.data}`,
        file: photo.data,
      });
    });
  };

  return (
    <ModalWrapper
      titleSeparator
      type="fromBottom"
      title={'Set Profile Photo'}
      style={tw`bg-background pb-5`}>
      <View style={tw`justify-center items-center`}>
        <View
          style={tw.style(
            'border-4 border-[#C9D2DD] rounded-full overflow-hidden my-6',
            {
              'border-0': image.photo !== null,
            },
          )}>
          <Image
            style={tw`w-32 h-32`}
            source={
              image.photo
                ? {uri: image.photo}
                : require('../../assets/media/UserDefault.png')
            }
          />
        </View>
        <Button
          title={'Camera'}
          style={tw`h-14`}
          containerStyle={tw`border border-gray-200 bg-white rounded-2xl w-full mb-3`}
          titleStyle={tw`bv-sans-base`}
          onPress={openImagePickerFromCamera}
        />
        <Button
          title={'Choose from Gallery'}
          style={tw`h-14`}
          containerStyle={tw`border border-gray-200 bg-white rounded-2xl w-full mb-4`}
          titleStyle={tw`bv-sans-base`}
          onPress={openImagePickerFromGallery}
        />
        <View style={tw`flex-row`}>
          {image.photo ? (
            <Button
              secondary
              containerStyle={'flex-1'}
              style={tw`mr-2`}
              title={'Skip '}
              titleStyle={tw`bv-heading-lg text-primary`}
              onPress={() => {
                onSubmit(null);
                goBack();
              }}
            />
          ) : null}
          <Button
            primary
            containerStyle={tw`flex-1`}
            style={image.photo ? tw`ml-2` : null}
            title={'Confirm'}
            titleStyle={tw`bv-heading-lg text-white`}
            onPress={() => {
              onSubmit(image.file, image.photo);
              goBack();
            }}
          />
        </View>
      </View>
    </ModalWrapper>
  );
};

export {SetPhotoModal};
