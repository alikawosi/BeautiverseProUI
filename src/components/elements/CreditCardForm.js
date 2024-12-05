import React from 'react';
import {Text} from 'react-native';
import creditCardType from '@yetuny/credit-card-type-tr';
import {PaymentIcon} from 'react-native-payment-icons';

import tw from '../../../tailwind';
import {SectionWrapper} from './';
import {Form} from '../commons';
import {GENERAL_CONST} from '../../constants';

const CreditCardForm = ({form, isEdit}) => {
  const {newCard, editCard} = GENERAL_CONST;
  const cardType = form.watch('number')
    ? creditCardType(form.watch('number'))[0]?.type?.replace(
        'master-card',
        'mastercard',
      )
    : null;

  return (
    <SectionWrapper>
      <Form
        fields={
          isEdit
            ? editCard
            : newCard.map(item => {
                if (item.name === 'number') {
                  item.suffix = cardType && <PaymentIcon type={cardType} />;
                }
                return item;
              })
        }
        form={form}
      />
      <Text style={tw`text-xs text-descGray`}>
        Protected & Encrypted by Stripe, Inc.
      </Text>
    </SectionWrapper>
  );
};

export {CreditCardForm};
