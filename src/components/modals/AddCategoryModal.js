import React from 'react';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Form, FullScreenModalWrapper} from '../commons';
import {BUSINESSSETUP_CONST} from '../../constants';
import {useForm} from '../../hooks';
import {useMutation} from 'react-query';
import axios from 'axios';

const AddCategoryModal = ({route}) => {
  const {id, title, location, sex, description, categoryList} = route.params;
  const {goBack} = useNavigation();
  const {form} = useForm({
    fields: BUSINESSSETUP_CONST.categoryFormData,
    defaultValue: {
      title: title,
      location: location,
      gender: sex,
      description: description,
    },
  });

  const postCategory = useMutation({
    mutationFn: async data => {
      let tempList = [];
      if (id) {
        tempList = categoryList.filter(item => item.id !== id);
      } else {
        tempList = categoryList;
      }
      let list = [
        ...tempList,
        {
          id: id,
          title: data.title,
          sex: data.gender,
          primary: true,
        },
      ];

      return axios.post('/pro/setup/categories', {
        categories: JSON.stringify(list),
      });
    },
    onSuccess: goBack,
  });

  const handleSubmit = () => {
    postCategory.mutate(form.getValues());
  };
  return (
    <FullScreenModalWrapper
      title={'New/Edit Category'}
      backButton
      buttonTitle={'Save'}
      isButtonTitleLoading={postCategory.isLoading}
      onSubmit={() => handleSubmit()}
      contentContainerStyle={tw`px-5 bg-white`}>
      <Form form={form} fields={BUSINESSSETUP_CONST.categoryFormData} />
    </FullScreenModalWrapper>
  );
};

export {AddCategoryModal};
