import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {BUSINESSSETUP_CONST} from '../../constants';
import {useForm} from '../../hooks';
import {Form, FullScreenModalWrapper} from '../commons';
import {SectionWrapper} from '../screens/BusinessSetup';

const FAQModal = ({route}) => {
  const {goBack} = useNavigation();
  const {form} = useForm({
    fields: BUSINESSSETUP_CONST.FAQFormData,
    defaultValue: route.params?.faqItem
      ? {
          question: route.params.faqItem.question,
          answer: route.params.faqItem.answer,
        }
      : null,
  });
  const addFAQ = useMutation({
    mutationFn: params => axios.post('pro/setup/faq', params),
    onSuccess: goBack,
  });

  return (
    <FullScreenModalWrapper
      title={'FAQ'}
      backButton
      buttonTitle={'Add'}
      isButtonTitleLoading={addFAQ.isLoading}
      onSubmit={() =>
        route.params?.faqItem
          ? addFAQ.mutate({
              id: route.params.faqItem.id,
              question: form.getValues('question'),
              answer: form.getValues('answer'),
            })
          : addFAQ.mutate({
              question: form.getValues('question'),
              answer: form.getValues('answer'),
            })
      }
      contentContainerStyle={tw` flex-1`}>
      <SectionWrapper>
        <Form fields={BUSINESSSETUP_CONST.FAQFormData} form={form} />
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {FAQModal};
