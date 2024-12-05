import React, {useEffect, useMemo, useState} from 'react';
import {BlurView} from '@react-native-community/blur';
import {CloseCircle, GalleryAdd} from 'iconsax-react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import {View, Text, FlatList, Image, Platform} from 'react-native';

import tw from '../../../tailwind';
import {Button} from '../commons';
import Animated, {Easing, FadeIn, FadeOut} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

const PhotoPicker = ({
  style,
  onAddPhoto = () => false,
  imageStyle,
  defaultValue = [],
  cropWidth = 300,
  cropHeight = 300,
  formValue,
  chooseable = true,
}) => {
  const {navigate} = useNavigation();
  const [imageList, setImageList] = useState(
    (defaultValue || formValue).filter(item => item.url),
  );

  useEffect(() => {
    onAddPhoto(imageList);
  }, [imageList]);

  const openImagePickerFromGallery = goBack => {
    ImageCropPicker.openPicker({
      cropping: true,
      multiple: true,
      maxFiles: 10,
      includeBase64: true,
    }).then(selectedPhotoList => {
      let photoList = selectedPhotoList.map(item => {
        const base64 = `data:${item.mime};base64,${item.data}`;
        return {url: base64};
      });
      setImageList(prev => [...prev, ...photoList]);
      goBack();
    });
  };

  const openImagePickerFromCamera = goBack => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      includeBase64: true,
      useFrontCamera: true,
    }).then(photo => {
      const base64 = `data:${photo.mime};base64,${photo.data}`;
      setImageList(prev => [...prev, {url: base64}]);
      goBack();
    });
  };

  const removeImage = item => {
    let tempList = [...imageList];
    var filteredList = tempList.filter(p => p !== item);

    setImageList(filteredList);
  };

  const renderItem = item => {
    return (
      <Animated.View
        entering={FadeIn.duration(350).easing(Easing.cubic(Easing.out))}
        exiting={FadeOut.duration(350).easing(Easing.cubic(Easing.in))}
        style={tw`rounded-xl`}>
        {item.url !== false ? (
          <Image
            style={tw.style('h-31 w-31 rounded-xl', imageStyle)}
            source={{uri: item.url}}
          />
        ) : null}

        {Platform.OS === 'ios' ? (
          <BlurView
            blurType="light"
            blurAmount={5}
            style={tw`w-full h-6 absolute bottom-0 rounded-xl`}
          />
        ) : (
          <View
            style={tw`w-full h-6 bg-white/30 absolute bottom-0 rounded-b-xl`}
          />
        )}
        <Button
          containerStyle={tw`absolute bottom-0 self-center w-full`}
          style={tw`h-6`}
          icon={<CloseCircle size={20} color={'white'} variant="Bold" />}
          onPress={() => {
            removeImage(item);
          }}
        />
      </Animated.View>
    );
  };
  return (
    <View style={tw.style(style)}>
      <View style={tw`flex-row justify-between mb-2`}>
        <Text style={tw`bv-sans-sm text-black`}>Photos</Text>
        <Text style={tw`bv-sans-xs text-primary`}>
          {imageList.length}
          <Text style={tw`text-descGray`}>/10</Text>
        </Text>
      </View>
      <FlatList
        contentContainerStyle={imageList.length > 0 ? tw`mb-3` : null}
        data={imageList}
        renderItem={({item}) => renderItem(item)}
        ItemSeparatorComponent={() => <View style={tw`w-2`} />}
        keyExtractor={(item, index) => String(index)}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
      {chooseable ? (
        <Button
          title="Add Photo"
          secondary
          disabled={imageList.length >= 10}
          onPress={() => {
            navigate('PhotoPickerModal', {
              openImagePickerFromGallery: openImagePickerFromGallery,
              openImagePickerFromCamera: openImagePickerFromCamera,
            });
          }}
          icon={<GalleryAdd size={16} color={'#FF6E00'} />}
        />
      ) : null}
    </View>
  );
};

export {PhotoPicker};
