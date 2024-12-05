import React, {useState} from 'react';
import {Notepad2} from 'iconsax-react-native';

import {useNavigation, useRoute} from '@react-navigation/native';

import tw from '../../../tailwind';
import {Form, FullScreenModalWrapper, ServiceManager} from '../commons';
import {SectionWrapper} from '../screens/BusinessSetup';
import {useForm} from '../../hooks';
import {BUSINESSSETUP_CONST} from '../../constants';

const AutomatedFeeModal = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation();
  const {form} = useForm({
    fields: BUSINESSSETUP_CONST.automatedTransportationFeeFromData,
  });
  const [serviceList, setServiceList] = useState([]);
  const uberPriceMarkup = form.watch('uberPriceMarkup');

  const onSubmit = () => {
    params.setTransportation(prev => ({
      ...prev,
      automates: {
        type: 'percent',
        services: serviceList,
        value: Number(form.getValues('uberPriceMarkup')),
      },
    }));
    navigate('TransporationFee');
  };

  return (
    <FullScreenModalWrapper
      title={'Transportation Fee'}
      backButton
      disabled={!Boolean(uberPriceMarkup)}
      contentContainerStyle={tw`flex-1`}
      buttonTitle={'Add'}
      onSubmit={onSubmit}>
      <SectionWrapper
        title={'Automated (Recommended):'}
        titleStyle={tw`mb-3`}
        desc={
          'We will calculate your transportation fees The Most Efficient way based on Uber pricing'
        }
      />
      <SectionWrapper containerStyle={tw`mt-4`}>
        <Form
          fields={BUSINESSSETUP_CONST.automatedTransportationFeeFromData}
          form={form}
        />
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

export {AutomatedFeeModal};
