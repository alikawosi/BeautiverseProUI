import React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {useMutation, useQuery} from 'react-query';
import {ActivityIndicator, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import tw from '../../../../../tailwind';
import {FullScreenModalWrapper} from '../../../commons';
import {CreditCardForm} from '../../../elements';
import {useForm} from '../../../../hooks';
import {GENERAL_CONST} from '../../../../constants';

const NewCardModal = () => {
  const {params} = useRoute();
  const {goBack} = useNavigation();
  const {newCard, editCard} = GENERAL_CONST;
  const cardDetails = useQuery({
    enabled: Boolean(params?.cardId && params?.isEdit),
    queryKey: ['clientCard', params?.cardId],
    queryFn: async () => {
      const {
        name,
        address: {postal_code},
        exp_month,
        exp_year,
      } = await axios.get('/pro/client/card', {
        params: {
          client_id: params?.id,
          card_id: params?.cardId,
        },
      });
      return {
        name,
        postal_code,
        expiryDate: dayjs().month(exp_month).year(exp_year).date(0).unix(),
      };
    },
  });
  const createCard = useMutation(
    ({expiryDate, ...cardFormData}) => {
      const date = dayjs(expiryDate * 1000);

      return axios.post(
        `/pro/client/card/${params?.isEdit ? 'update' : 'create'}`,
        {
          ...cardFormData,
          client_id: params.id,
          exp_year: String(date.year()),
          exp_month: String(date.month() + 1),
          ...(params?.isEdit && {card_id: params?.cardId}),
        },
      );
    },
    {
      onSuccess: goBack,
    },
  );

  const {form, handleSubmit} = useForm({
    fields: params?.isEdit ? editCard : newCard,
    defaultValue: params?.isEdit
      ? cardDetails?.data
      : {
          cvc: null,
          name: null,
          number: null,
          postal_code: null,
          expiryDate: null,
        },
    onSubmit: createCard.mutate,
  });

  return (
    <FullScreenModalWrapper
      isButtonTitleLoading={createCard.isLoading}
      title={`${params?.isEdit ? 'Edit' : 'Add New'} Card`}
      hasSeparator={false}
      buttonTitle="Confirm"
      contentContainerStyle={tw`flex-grow`}
      onSubmit={handleSubmit}
      backButton>
      <View style={tw`relative flex-grow`}>
        <CreditCardForm form={form} isEdit={params?.isEdit} />
        {cardDetails.isLoading && (
          <View
            style={tw`items-center justify-center absolute bg-white bg-opacity-50  top-0 bottom-0 left-0 right-0 z-10`}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    </FullScreenModalWrapper>
  );
};

export {NewCardModal};
