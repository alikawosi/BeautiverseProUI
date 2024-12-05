import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {FlatList, Image, Platform, Pressable, Text, View} from 'react-native';
import {Additem, CloseCircle, GalleryAdd, Shop} from 'iconsax-react-native';
import {BlurView} from '@react-native-community/blur';
import ImageCropPicker from 'react-native-image-crop-picker';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {
  BusinessSetupLayout,
  SectionWrapper,
} from '../../components/screens/BusinessSetup';
import {Accordion, Button} from '../../components/commons';
import {PhotoPicker} from '../../components/elements';

const Portfolio = () => {
  const {navigate, goBack, addListener} = useNavigation();
  const {params} = useRoute();
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      getBanners.refetch();
    });

    return unsubscribe;
  }, [addListener, getBanners]);

  const getBanners = useQuery({
    queryFn: () => axios.get('/pro/setup/banners'),
    queryKey: ['getBanners'],
    onSuccess: res => {
      if (res.banners.length) {
        setBanners(res.banners);
      }
      if (res.categories.length) {
        setCategories(res.categories);
      }
    },
  });

  // const updateBanners = useMutation({
  //   mutationFn: async () => {
  //     const bannersResponse = await axios.post('/pro/setup/banners', {
  //       banners: JSON.stringify(banners),
  //     });

  //     const categoriesResponse = await axios.post('/pro/setup/categories', {
  //       categories: JSON.stringify(
  //         categories.map(({id, name, gallery}) => ({id, gallery, title: name})),
  //       ),
  //     });

  //     return bannersResponse && categoriesResponse;
  //   },
  //   onSuccess: () => {
  //     !params?.stepsHidden ? navigate('Policy') : goBack();
  //   },
  // });

  const RenderOptions = ({listItem, itemIndex}) => {
    const openImagePicker = () => {
      ImageCropPicker.openPicker({
        writeTempFile: true,
        width: 240,
        height: 300,
        cropping: true,
        multiple: true,
        maxFiles: 10,
        includeBase64: true,
      }).then(selectedPhotoList => {
        let photoList = selectedPhotoList.map(item => {
          const base64 = `data:${item.mime};base64,${item.data}`;
          return {id: null, url: base64};
        });
        setCategories(prev => {
          return prev.map(item => {
            if (item.id === listItem.id) {
              item.gallery = [...item.gallery, ...photoList];
            }

            return item;
          });
        });
      });
    };

    const removeItem = selectedImage => {
      setCategories(prev =>
        prev.map(item => {
          item.gallery = item.gallery.filter(img => {
            return img !== selectedImage;
          });
          return item;
        }),
      );
    };
    const renderList = item => {
      if (!item.url) return null;
      return (
        <View style={tw`rounded-xl`}>
          <Image style={tw`h-19 w-15 rounded-xl`} source={{uri: item.url}} />
          {Platform.OS === 'ios' ? (
            <BlurView
              blurType="light"
              blurAmount={5}
              style={tw`w-15 h-6 absolute bottom-0 rounded-xl`}
            />
          ) : (
            <View
              style={tw`w-15 h-6 bg-white/30 absolute bottom-0 rounded-b-xl`}
            />
          )}
          <Button
            containerStyle={tw`absolute bottom-0 self-center w-full`}
            style={tw`h-6`}
            icon={<CloseCircle size={20} color={'white'} />}
            onPress={() => removeItem(item)}
          />
        </View>
      );
    };
    return (
      <>
        <Accordion
          headerSeparator
          key={listItem.id}
          title={listItem.name}
          isOpen={Boolean(listItem.gallery.length)}>
          <View style={tw`flex-row justify-between items-center w-full my-2`}>
            <Text
              style={tw`bv-reg-xs text-black `}>{`Classic ( ${listItem?.gallery?.length} / 10 )`}</Text>
            <Pressable onPress={() => openImagePicker()}>
              <Text style={tw`bv-med-xs text-primary`}>Add Photo</Text>
            </Pressable>
          </View>
          {listItem?.gallery?.length > 0 ? (
            <FlatList
              data={listItem?.gallery}
              renderItem={({item}) => renderList(item)}
              ItemSeparatorComponent={() => <View style={tw`w-2`} />}
              keyExtractor={(item, index) => String(item.id || index)}
              showsHorizontalScrollIndicator={false}
              horizontal
            />
          ) : (
            <Pressable
              onPress={() => openImagePicker()}
              style={tw`w-full h-28 rounded-2xl border-grayBorder items-center border-dashed border justify-center`}>
              <GalleryAdd size="20" color="#7A7A8A" />
              <Text style={tw`bv-reg-xs`}>Touch to Add Photo</Text>
            </Pressable>
          )}
        </Accordion>
        {categories.length - 1 !== itemIndex ? (
          <View style={tw`w-full h-px bg-gray-200 my-4`} />
        ) : null}
      </>
    );
  };
  return (
    <BusinessSetupLayout
      isLoading={getBanners.isLoading}
      progress={9}
      isProgressVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      headerTitle={'Set Your Portfolio'}
      headerDesc={'Here you can manage all your profile images'}
      onPressNextButton={() => navigate('Policy')}
      onPressSkipButton={() => navigate('Policy')}
      isNextButtonDisabled={getBanners.isFetching}
      footerButtonTitle={params?.stepsHidden ? 'Save' : 'Next'}
      twoButtonFooter={!params?.stepsHidden}>
      <SectionWrapper
        title={'Upload your banner pictures'}
        desc={
          'Add photos of your work samples, profiles with photos are seen by users up to "3 times" more.'
        }
        headerSeparator>
        <PhotoPicker
          onAddPhoto={images => setBanners(images)}
          defaultValue={banners}
          imageStyle={tw`w-51 h-32`}
          cropHeight={160}
        />
      </SectionWrapper>
      {Boolean(categories.length) && (
        <SectionWrapper containerStyle={tw`mt-4 mb-10`}>
          {categories.map((item, index) => (
            <RenderOptions key={index} listItem={item} itemIndex={index} />
          ))}
        </SectionWrapper>
      )}
    </BusinessSetupLayout>
  );
};

export default Portfolio;
