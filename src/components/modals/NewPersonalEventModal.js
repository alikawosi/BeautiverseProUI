import React from 'react';
import {View, Text} from 'react-native';
import {Clock} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {Form, FullScreenModalWrapper, Input} from '../commons';
import {SectionWrapper} from '../screens/BusinessSetup';
import {CALENDAR_CONST} from '../../constants';

const NewPersonalEventModal = () => {
  return (
    <FullScreenModalWrapper
      title={'New Personal Event'}
      backButton
      hasSeparator={false}
      buttonTitle={'Add'}
      contentContainerStyle={tw`pt-0`}>
      <SectionWrapper containerStyle={tw`mb-4`}>
        <Input label={'Event Name'} />
      </SectionWrapper>
      <SectionWrapper containerStyle={tw`mb-4`}>
        <Form fields={CALENDAR_CONST.personalEventFromData} />
        <View style={tw`flex-row w-full justify-center`}>
          <Clock size={16} color={'#7A7A8A'} />
          <Text style={tw`ml-1 bv-med-xs text-descGray`}>
            Wed, Oct 12 | 6:00 PM - 7:05 PM
          </Text>
        </View>
      </SectionWrapper>
      <SectionWrapper
        title={'Recurs'}
        type={'switch'}
        isAccordion
        contentContainerStyle={tw`pt-4`}
        containerStyle={tw`mb-4`}>
        <Input label={'Frequency'} />
      </SectionWrapper>
      <SectionWrapper
        title={'Allow online booking during event'}
        type={'switch'}
        isAccordion
        contentContainerStyle={tw`pt-4`}
        containerStyle={tw`mb-4`}>
        <Input label={'End Time'} />
      </SectionWrapper>
      <SectionWrapper containerStyle={tw`mb-4`}>
        <Input
          inputType={'textArea'}
          placeholder={'Add Note for Staff'}
          isMultiline
          style={tw`h-33 pt-2`}
        />
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {NewPersonalEventModal};
