import React from 'react';

import tw from '../../../tailwind';
import {PageWrapper} from '../../components/commons';
import {AppointmentCard, SectionWrapper} from '../../components/elements';
import {FAKE_CONST} from '../../constants';

const ToCheckout = () => {
  return (
    <PageWrapper headerTitle="To Checkout" backButton headerShown>
      <SectionWrapper>
        {FAKE_CONST.cashier.checkout.map((item, index) => (
          <AppointmentCard
            styleTheme={index}
            key={index}
            style={tw.style({
              'mt-5': index >= 1,
            })}>
            <AppointmentCard.Checkout {...item} />
          </AppointmentCard>
        ))}
      </SectionWrapper>
    </PageWrapper>
  );
};

export default ToCheckout;
