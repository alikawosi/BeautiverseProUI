import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {AddCircle, ArrowRight2} from 'iconsax-react-native';
import {ScrollView, Image, Pressable, Text, View} from 'react-native';

import tw from '../../../../tailwind';
import {Button, Input} from '../../commons';
import {Slider} from './';
import {AppointmentCard, SectionWrapper} from '../../elements';
import {FAKE_CONST} from '../../../constants';

const Cashier = () => {
  const {navigate} = useNavigation();

  return (
    <ScrollView
      style={tw`pt-16`}
      contentContainerStyle={tw`pb-40`}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <SectionWrapper style={tw`mb-16 rounded-t-none`}>
        <View>
          <Pressable
            onPress={() =>
              navigate('Client', {
                screen: 'ClientsModal',
                params: {
                  selectContact: ({id}) =>
                    navigate('EditClientModal', {
                      id,
                    }),
                },
              })
            }
            style={tw`px-5 py-6 flex-row mb-5 items-center rounded-[24px] border-[1px] border-dashed border-[#E4E7EC]`}>
            <Image
              style={tw`w-10 h-10 rounded-full mr-3`}
              source={require('../../../assets/media/UserDefault.png')}
            />
            <Text style={tw`text-sm font-medium mr-auto`}>
              Select a client or leave empty for walk ins
            </Text>
            <ArrowRight2 color="#7A7A8A" size="16" />
          </Pressable>
          <Input label="Amount Due: $" style={tw`mb-5`} />
          <Button
            title="Add service or item"
            onPress={() => navigate('Client',{screen:'ServiceOrItemModal'})}
            titleStyle={tw`text-descGray font-bold`}
            style={tw`bg-[#54556914] rounded-lg`}
            icon={<AddCircle size="16" color="#7A7A8A" />}
          />
        </View>
      </SectionWrapper>
      {/* <Slider
        title="To Checkout"
        data={FAKE_CONST.cashier.checkout}
        renderItem={(item, index) => (
          <AppointmentCard style={tw`flex-1`} styleTheme={index}>
            <AppointmentCard.Checkout {...item} />
          </AppointmentCard>
        )}
      /> */}
    </ScrollView>
  );
};

export {Cashier};
