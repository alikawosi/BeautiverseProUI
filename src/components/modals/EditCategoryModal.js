import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View} from 'react-native';
import {useMutation} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {Button, Input, ModalWrapper} from '../commons';

const EditCategoryModal = ({route}) => {
  const {category, onSubmit = () => false} = route.params;
  const {goBack} = useNavigation();
  const [value, setValue] = useState(category.title);
  const updateCategory = useMutation({
    mutationFn: () => {
      axios.post('/pro/setup/categories/custom', {
        id: category.id,
        title: value,
      });
    },
    onSuccess: res => {
      onSubmit();
      goBack();
    },
  });

  return (
    <ModalWrapper type="fromBottom" title={'Edit Category'} titleSeparator>
      <Input
        inputValue={value}
        onChange={val => setValue(val)}
        style={tw`mb-6`}
        label={'Hint'}
        formValue={value}
        labelFix
      />
      <View style={tw`flex-row justify-between`}>
        <Button
          secondary
          containerStyle={tw`flex-1 mr-1`}
          title={'Cancel'}
          onPress={() => goBack()}
        />
        <Button
          primary
          containerStyle={tw`flex-1 ml-1`}
          title={'Update'}
          onPress={() => {
            updateCategory.mutate();
            //goBack();
          }}
        />
      </View>
    </ModalWrapper>
  );
};

export {EditCategoryModal};
