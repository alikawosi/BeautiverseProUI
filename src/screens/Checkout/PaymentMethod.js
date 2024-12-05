import React from 'react';
import {ArrowRight2} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from 'react-query';

import tw from '../../../tailwind';
import {Button, PageWrapper} from '../../components/commons';
import {SectionWrapper} from '../../components/elements';
import {Header} from '../../components/screens/Checkout';
import {CHECKOUT_CONST} from '../../constants';

const PaymentMethod = ({route}) => {
  const {navigate} = useNavigation();
  const {charge} = useQueryClient().getQueryData('checkoutAppointment');
  const {bookId} = route.params;
  return (
    <PageWrapper headerTitle="Payment Method" headerShown backButton>
      <Header amount={charge} />
      <SectionWrapper style={tw`py-0 px-2`}>
        {CHECKOUT_CONST.paymentMethods.map(({id, title, route}) => (
          <Button
            key={id}
            title={title}
            titleStyle={tw`text-base`}
            onPress={navigate.bind(null, route, {bookId: bookId})}
            icon={<ArrowRight2 size={20} color="#7A7A8A" />}
            style={tw.style(
              'justify-between flex-row-reverse h-[56px] rounded-2xl px-3',
            )}
          />
        ))}
      </SectionWrapper>
    </PageWrapper>
  );
};

export default PaymentMethod;
