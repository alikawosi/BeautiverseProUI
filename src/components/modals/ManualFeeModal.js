import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {AddCircle, Notepad2} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import tw from '../../../tailwind';
import {
  Button,
  FormItem,
  FullScreenModalWrapper,
  Input,
  Picker,
  Select,
  ServiceManager,
} from '../commons';
import {SectionWrapper} from '../screens/BusinessSetup';
import {useForm} from '../../hooks';

const ManualFeeModal = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation();
  const [serviceList, setServiceList] = useState([]);

  const [manualTransportationFee, setManualTransportationFee] = useState([
    {
      min_distance: null,
      max_distance: null,
      value: null,
      type: null,
      id: Math.random().toString(36).slice(2, 10),
    },
  ]);

  const {form, handleSubmit} = useForm({
    defaultValue: manualTransportationFee.reduce((acc, {id, ...fields}) => {
      acc[id] = fields;
      return acc;
    }, {}),
    onSubmit: data => {
      params.setTransportation(prev => ({
        ...prev,
        manuals: Object.values(data).map(item => {
          item.type = item.type.value;
          item.services = serviceList;
          return item;
        }),
      }));
      navigate('TransporationFee');
    },
  });

  const addFee = () => {
    setManualTransportationFee(prev => [
      ...prev,
      {
        min_distance: null,
        max_distance: null,
        value: null,
        type: null,
        id: Math.random().toString(36).slice(2, 10),
      },
    ]);
  };

  return (
    <FullScreenModalWrapper
      title={'Transportation Fee'}
      backButton
      onSubmit={handleSubmit}
      contentContainerStyle={tw` flex-1`}
      buttonTitle={'Add'}>
      <SectionWrapper
        title={'Manual'}
        titleStyle={tw`bv-sans-base mb-3`}
        desc={
          'You can your transportation fee policies based with manual calculations'
        }
        containerStyle={tw`mb-4`}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionWrapper>
          {manualTransportationFee.map(({id}, index) => {
            return (
              <View key={id} style={tw`mb-2`}>
                <Text style={tw`text-descGray mb-4`}>Fee - {index + 1}</Text>
                <FormItem
                  name={`${id}.min_distance`}
                  validation="required"
                  form={{
                    ...form,
                    errors: form.formState.errors,
                    error: form.getFieldState(`${id}.min_distance`).error,
                  }}
                  style={tw`mb-4`}>
                  <Input
                    suffix={<Text style={tw`text-descGray`}>Km</Text>}
                    keyboardType="number-pad"
                    label="Minimum Distance"
                    required
                  />
                </FormItem>
                <FormItem
                  name={`${id}.max_distance`}
                  validation="required"
                  form={{
                    ...form,
                    errors: form.formState.errors,
                    error: form.getFieldState(`${id}.max_distance`).error,
                  }}
                  style={tw`mb-4`}>
                  <Input
                    suffix={<Text style={tw`text-descGray`}>Km</Text>}
                    label="Maximum Distance"
                    required
                    keyboardType="number-pad"
                  />
                </FormItem>
                <FormItem
                  name={`${id}.value`}
                  validation="required"
                  form={{
                    ...form,
                    errors: form.formState.errors,
                    error: form.getFieldState(`${id}.value`).error,
                  }}
                  style={tw`mb-4`}>
                  <Input label="Amount" required keyboardType="number-pad" />
                </FormItem>
                <FormItem
                  name={`${id}.type`}
                  validation="required"
                  form={{
                    ...form,
                    errors: form.formState.errors,
                    error: form.getFieldState(`${id}.type`).error,
                  }}
                  style={tw`mb-4`}>
                  <Select
                    required
                    label="Type"
                    options={[
                      {id: 1, value: 'fixed', title: '$'},
                      {id: 2, value: 'percent', title: '%'},
                    ]}
                  />
                </FormItem>
              </View>
            );
          })}
          <Button
            onPress={addFee}
            title={'Add Another Fee'}
            defaultColor={'#7A7A8A'}
            titleStyle={tw`bv-sans-sm`}
            style={tw`bg-[#54556914] rounded-2xl`}
            icon={<AddCircle size={16} color="#7A7A8A" />}
          />
        </SectionWrapper>
        <SectionWrapper
          title={'Which service do you want to apply to?'}
          titleStyle={tw`bv-sans-base text-black`}
          icon={<Notepad2 size={20} color={'#313244'} />}
          headerSeparator
          containerStyle={tw`mt-4`}>
          <ServiceManager {...{serviceList, setServiceList}} />
        </SectionWrapper>
      </ScrollView>
    </FullScreenModalWrapper>
  );
};

export {ManualFeeModal};
