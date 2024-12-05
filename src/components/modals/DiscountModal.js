import React, {useMemo} from 'react';
import {useRoute} from '@react-navigation/native';

import tw from '../../../tailwind';
import {FormItem, FullScreenModalWrapper, Picker} from '../commons';
import {SectionWrapper} from '../elements';
import {GENERAL_CONST} from '../../constants';
import {useForm} from 'react-hook-form';

const DiscountModal = () => {
  const {amount} = GENERAL_CONST.discount;
  const {params} = useRoute();
  const {handleSubmit, watch, control, getFieldState, formState} = useForm({
    defaultValues: {
      discount: null,
    },
  });
  const form = useMemo(
    () => ({
      watch,
      control,
      errors: formState.errors,
      error: getFieldState('discount').error,
    }),
    [formState],
  );
  const discount = watch('discount');

  return (
    <FullScreenModalWrapper
      backButton
      onSubmit={handleSubmit(params?.onSubmit)}
      title="Discount"
      hasSeparator={false}
      buttonTitle="Add">
      <SectionWrapper>
        <FormItem name="discount" form={form} validation="required">
          <Picker.InputAccordion
            lable="Discount"
            value={discount?.value && `${discount.value} %`}>
            <Picker.Wrapper>
              <Picker.Column
                name="value"
                data={amount}
                suffix="%"
                suffixStyle={tw`right-[75%]`}
              />
            </Picker.Wrapper>
          </Picker.InputAccordion>
        </FormItem>
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {DiscountModal};
