import React from 'react';
import {useForm} from 'react-hook-form';
import {useRoute} from '@react-navigation/native';

import {Form, FullScreenModalWrapper} from '../commons';
import {SectionWrapper} from '../elements';
import {GENERAL_CONST} from '../../constants';

const CustomItemModal = () => {
  const {params} = useRoute();
  const {handleSubmit, ...form} = useForm({
    defaultValues: {
      name: null,
      price: null,
    },
  });

  return (
    <FullScreenModalWrapper
      backButton
      onSubmit={handleSubmit(params?.onSubmit)}
      hasSeparator={false}
      title="Custom Item"
      buttonTitle="Add">
      <SectionWrapper>
        <Form fields={GENERAL_CONST.customItemFields} form={form} />
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {CustomItemModal};
