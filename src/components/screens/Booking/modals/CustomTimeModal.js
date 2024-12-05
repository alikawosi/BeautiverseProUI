import React from 'react';

import tw from '../../../../../tailwind';
import {Button, ModalWrapper, Picker} from '../../../commons';
import {BOOKING_CONST} from '../../../../constants';
import {SectionWrapper} from '../../../elements';

const CustomTimeModal = () => {
  const {hour, minute} = BOOKING_CONST.customTime;

  return (
    <ModalWrapper
      title="Custom Time"
      type="fromBottom"
      style={tw`pb-5 bg-transparent shadow-none`}>
      <SectionWrapper style={tw`mt-5`}>
        <Picker>
          <Picker.Wrapper>
            <Picker.Column
              data={hour}
              suffix="hour"
              suffixStyle={tw`right-[30%]`}
            />
            <Picker.Column
              data={minute}
              suffix="min"
              suffixStyle={tw`right-[30%]`}
            />
          </Picker.Wrapper>
        </Picker>
      </SectionWrapper>
      <Button
        primary
        title="Confirm"
        titleStyle={tw`text-sm`}
        gradientStyle={tw`rounded-xl`}
      />
    </ModalWrapper>
  );
};

export {CustomTimeModal};
