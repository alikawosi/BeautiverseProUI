import React, {useState} from 'react';
import {Text, ScrollView} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AddCircle, CloseCircle, Notepad2, Trash} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {BUSINESSSETUP_CONST} from '../../constants';
import {Button, FullScreenModalWrapper, ServiceManager} from '../commons';
import {CancelationPolicyInput, SectionWrapper} from '../screens/BusinessSetup';

const CancellationPolicyModal = () => {
  const {onSubmit} = useRoute().params;
  const {goBack} = useNavigation();
  const [serviceList, setServiceList] = useState([]);
  const {cancelationPolicyFormData} = BUSINESSSETUP_CONST;
  const [cancelationPolicyList, setCancelationPolicyList] = useState([
    {id: 1, perioirTimeRange: '0-3', perioirPercentage: '0'},
  ]);

  const onAddTimeSlot = lastIndex => {
    setCancelationPolicyList(prev => [
      ...prev,
      {
        id: prev[lastIndex].id + 1,
        perioirTimeRange: prev[lastIndex].perioirTimeRange,
        perioirPercentage: prev[lastIndex].perioirPercentage,
      },
    ]);
  };

  const deleteHandler = id => {
    setCancelationPolicyList(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = () => {
    onSubmit(
      ...cancelationPolicyList.map(({perioirTimeRange, perioirPercentage}) => {
        const [from, to] = perioirTimeRange.split('-');
        return {
          to,
          from,
          services: serviceList,
          value: perioirPercentage,
        };
      }),
    );
    goBack();
  };

  return (
    <FullScreenModalWrapper
      title={'Cancellation Policy'}
      backButton
      onSubmit={handleSubmit}
      contentContainerStyle={tw`flex-1`}
      buttonTitle={'Add'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionWrapper
          desc={
            'We will calculate your transportation fees The Most Efficient way based on Uber pricing.'
          }
          descStyle={tw`ml-0`}>
          <Text style={tw`bv-sans-sm mb-6`}>
            How much is your no-show policy?
          </Text>
          {cancelationPolicyList.map((item, index) => (
            <CancelationPolicyInput
              key={item.id}
              id={item.id}
              label={`Fee - ${index + 1}`}
              perioirPercentage={item.perioirPercentage}
              perioirTimeRange={item.perioirTimeRange}
              data={cancelationPolicyFormData}
              onDelete={id => deleteHandler(id)}
              onChange={({perioirPercentage, perioirTimeRange}) => {
                setCancelationPolicyList(prev =>
                  prev.map(policy => {
                    if (policy.id === item.id) {
                      policy.perioirPercentage = perioirPercentage;
                      policy.perioirTimeRange = perioirTimeRange;
                    }

                    return policy;
                  }),
                );
              }}
            />
          ))}
          <Button
            title={'Add another fee'}
            defaultColor={'#7A7A8A'}
            titleStyle={tw`bv-sans-sm`}
            containerStyle={tw`bg-grayBg  rounded-2xl mt-4`}
            icon={<AddCircle size={16} color="#7A7A8A" />}
            onPress={() => onAddTimeSlot(cancelationPolicyList.length - 1)}
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
      </ScrollView>
    </FullScreenModalWrapper>
  );
};

export {CancellationPolicyModal};
