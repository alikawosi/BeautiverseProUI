import React, {useMemo, useState} from 'react';
import {Text} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Notepad2} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {
  FormItem,
  FullScreenModalWrapper,
  Input,
  Picker,
  ServiceManager,
} from '../commons';
import {SectionWrapper} from '../screens/BusinessSetup';
import {useForm} from 'react-hook-form';
import {BUSINESSSETUP_CONST} from '../../constants';

const NoShowPolicyModal = () => {
  const [serviceList, setServiceList] = useState([]);
  const {amount} = BUSINESSSETUP_CONST.noShowPolicyFormData;
  const {params} = useRoute();
  const {handleSubmit, watch, control, getFieldState, formState} = useForm({
    defaultValues: {
      noShowFee: null,
    },
  });
  const form = useMemo(
    () => ({
      watch,
      control,
      errors: formState.errors,
      error: getFieldState('noShowFee').error,
    }),
    [formState],
  );
  const noShow = watch('noShowFee');

  return (
    <FullScreenModalWrapper
      title={'No-Show Policy'}
      backButton
      contentContainerStyle={tw` flex-1`}
      onSubmit={handleSubmit(({noShowFee}) =>
        params?.onSubmit({value: noShowFee?.value, services: serviceList}),
      )}
      buttonTitle={'Add'}>
      <SectionWrapper
        desc={
          'We will calculate your transportation fees The Most Efficient way based on Uber pricing.'
        }>
        {/* <Form fields={BUSINESSSETUP_CONST.FAQFormData} /> */}
        <Text style={tw`bv-med-xs mb-6 text-primary`}>
          How much is your no-show policy?
        </Text>
        <FormItem name="noShowFee" form={form} validation="required">
          <Picker.InputAccordion
            lable="Fee"
            value={noShow && `${noShow?.value} %`}>
            <Picker.Wrapper>
              <Picker.Column
                name="value"
                data={amount}
                suffix="%"
                suffixStyle={tw`right-[85%]`}
              />
            </Picker.Wrapper>
          </Picker.InputAccordion>
        </FormItem>
      </SectionWrapper>
      <SectionWrapper
        title={'Which services do you want to apply the policy to?'}
        titleStyle={tw`bv-sans-base`}
        icon={<Notepad2 size={20} color={'#313244'} />}
        headerSeparator
        containerStyle={tw`mt-4`}>
        <ServiceManager {...{serviceList, setServiceList}} />
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {NoShowPolicyModal};
