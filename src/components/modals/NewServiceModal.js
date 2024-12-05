import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AddCircle, Trash} from 'iconsax-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useMutation} from 'react-query';
import axios from 'axios';
import Animated, {Easing, FadeIn, FadeOut} from 'react-native-reanimated';

import tw from '../../../tailwind';
import {Button, Form, FullScreenModalWrapper} from '../commons';
import {SectionWrapper, VariationForm} from '../screens/BusinessSetup';
import {BUSINESSSETUP_CONST, GENERAL_CONST} from '../../constants';
import {useForm} from '../../hooks';

const NewServiceModal = ({route}) => {
  const {goBack} = useNavigation();
  const {id, categoryId, onSuccess, title, description, variations} =
    route.params;
  const isEdit = variations?.length;

  const [variationList, setVariationList] = useState(
    isEdit
      ? variations.map(({price, sale_price, time, ...variationsData}) => {
          const hour = Number(time.match(/\d{1,2}(?=h)/g)?.join(''));
          const min = Number(time.match(/\d{1,2}(?=min)/g)?.join(''));

          return {
            price: price ? String(parseFloat(price.replace('$', ''))) : null,
            sale_price: sale_price
              ? String(parseFloat(sale_price.replace('$', '')))
              : null,
            time: (hour && min) || hour || min ? {hour, min} : null,
            ...variationsData,
          };
        })
      : [
          {
            title: null,
            price: null,
            sale_price: null,
            time: null,
            buffer: null,
            preparation: null,
            id: Math.random().toString(36).slice(2, 10),
          },
        ],
  );
  const postService = useMutation({
    mutationFn: ({title, description, ...variationsFormData}) =>
      axios.post('/pro/setup/services/settings', {
        ...(id ? {id} : {}),
        category: categoryId,
        title: title,
        description: description,
        variations: JSON.stringify(
          Object.values(variationsFormData).map(
            ({buffer, preparation, time, ...variationsData}) => ({
              ...variationsData,
              buffer: buffer.value,
              preparation: preparation.value,
              time:
                time.hour && Number(time.min)
                  ? time.hour * 60 + Number(time.min)
                  : time.hour * 60 || Number(time.min),
            }),
          ),
        ),
      }),
    onSuccess: () => {
      goBack();
      onSuccess?.();
    },
  });
  const {form, handleSubmit} = useForm({
    fields: [
      ...BUSINESSSETUP_CONST.serviceFormData,
      ...(isEdit
        ? variationList.map(({id}) => ({name: `variation_${id}`}))
        : []),
    ],
    defaultValue: {
      title,
      description,
      ...variationList.reduce((acc, {id, ...variationsData}) => {
        acc[`variation_${id}`] = variationsData;

        if (isEdit) {
          acc[`variation_${id}`].id = id;
        }

        return acc;
      }, {}),
    },
    onSubmit: postService.mutate,
  });

  const onAddVariationForm = () => {
    let tempList = [...variationList];
    tempList.push({
      title: null,
      price: null,
      sale_price: null,
      time: null,
      buffer: null,
      preparation: null,
      id: Math.random().toString(36).slice(2, 10),
    });
    setVariationList(tempList);
  };

  const onDeleteVariationForm = selectedId => {
    let tempList = [...variationList];
    let filteredList = tempList.filter(({id}) => id !== selectedId);
    form.unregister(`variation_${selectedId}`);
    setVariationList(filteredList);
  };

  const Seperator = ({number}) => {
    return (
      <View style={tw`items-center justify-center my-3 flex-row`}>
        <LinearGradient {...GENERAL_CONST.orLineProps} />
        <Text
          adjustsFontSizeToFit
          style={tw` px-2 bv-sans-xs z-20 text-grayBorder`}>
          {number}
        </Text>
        <LinearGradient {...GENERAL_CONST.orLineProps} />
      </View>
    );
  };

  return (
    <FullScreenModalWrapper
      title={'New Service'}
      backButton
      isButtonTitleLoading={postService.isLoading}
      buttonTitle={isEdit ? 'Edit' : 'Add'}
      onSubmit={handleSubmit}>
      <Text style={tw`bv-reg-sm text-descGray px-5 mb-2`}>Service Detail</Text>
      <SectionWrapper containerStyle={tw`pt-3 pb-5 px-5  mb-6`}>
        <KeyboardAwareScrollView>
          <Form form={form} fields={BUSINESSSETUP_CONST.serviceFormData} />
        </KeyboardAwareScrollView>
      </SectionWrapper>
      <Text style={tw`bv-reg-sm text-descGray px-5 mb-2`}>Variations</Text>

      {variationList?.map(({id}, index) => {
        return (
          <>
            {index > 0 ? <Seperator number={index + 1} /> : null}
            <Animated.View
              style={tw`bg-white p-5 rounded-2xl`}
              entering={FadeIn.duration(300).easing(Easing.cubic(Easing.out))}
              exiting={FadeOut.duration(50).easing(Easing.cubic(Easing.in))}>
              <VariationForm key={id} form={form} id={id} />
              {index > 0 ? (
                <Button
                  title={'Delete Variation'}
                  defaultColor={'#FF4444'}
                  titleStyle={tw`bv-sans-sm text-basicRed`}
                  containerStyle={tw`mt-4`}
                  style={tw` items-center rounded-2xl`}
                  icon={<Trash size={20} color="#FF4444" />}
                  onPress={() => onDeleteVariationForm(id)}
                />
              ) : null}
            </Animated.View>
          </>
        );
      })}

      <Button
        title={'Add Variation'}
        defaultColor={'#7A7A8A'}
        titleStyle={tw`bv-sans-sm`}
        containerStyle={tw`mx-5`}
        style={tw`bg-[#54556914] my-6  rounded-2xl`}
        icon={<AddCircle size={16} color="#7A7A8A" />}
        onPress={() => onAddVariationForm()}
      />
    </FullScreenModalWrapper>
  );
};

export {NewServiceModal};
