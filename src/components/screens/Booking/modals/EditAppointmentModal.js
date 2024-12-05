import React from 'react';
import {Text, View} from 'react-native';
import {
  Clock,
  CloseCircle,
  Refresh,
  Routing2,
  TickCircle,
} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../../tailwind';
import {
  Accordion,
  Button,
  Form,
  FullScreenModalWrapper,
  Input,
  Picker,
  Switch,
} from '../../../commons';
import {
  PhotoPicker,
  Profile,
  SectionWrapper,
  ServicesAndItems,
  ClientLocation,
} from '../../../elements';
import {BOOKING_CONST, FAKE_CONST} from '../../../../constants';

const EditAppointmentModal = () => {
  const {navigate} = useNavigation();
  const {factor, appointmentDuration, location} = FAKE_CONST;
  const {services, otherServices} = FAKE_CONST.checkoutAppointmentItems;
  const {dateField, editRecurs} = BOOKING_CONST;

  return (
    <FullScreenModalWrapper
      title="Edit AppointmentModal"
      backButton
      hasSeparator={false}>
      <SectionWrapper>
        <Profile
          hasBg
          cards_count={1}
          name="Mohammad Naderi"
          email="example@mail.com"
          icon={<CloseCircle color="#313244" />}
        />
        <ServicesAndItems
          style={tw`mt-5`}
          servicesTitleColor="text-[#2084FF]"
          {...{services, otherServices, factor}}
        />
        <Button
          title="Add a service"
          onPress={() => navigate('ServicesModal')}
          titleStyle={tw`text-descGray font-sans`}
          style={tw`mt-5 bg-[#54556914] rounded-lg`}
        />
        <Button
          title="Add discount or item"
          titleStyle={tw`text-descGray font-sans`}
          style={tw`mt-5 bg-[#54556914] rounded-lg`}
          onPress={() => navigate('DiscountOrItemModal')}
        />
      </SectionWrapper>
      <View style={tw`mx-auto items-center mb-4`}>
        <Text style={tw`text-xs text-descGray`}>
          Booking through Instagram on
          <Text style={tw`font-bold`}>13 Oct 2022</Text>
        </Text>
        <View style={tw`flex-row`}>
          <TickCircle size={16} color="#7A7A8A" />
          <Text style={tw`text-xs text-descGray ml-1`}>
            No-show protected with card ending in 4159
          </Text>
        </View>
      </View>
      <SectionWrapper>
        <ClientLocation {...location} style={tw`mb-4`} />
      </SectionWrapper>
      <SectionWrapper>
        <Form fields={dateField} />
        <Picker>
          <Picker.Wrapper>
            <Picker.Column
              suffix="hour"
              data={appointmentDuration.hours}
              suffixStyle={tw`right-[35%] text-descGray`}
            />
            <Picker.Column
              value="5"
              suffix="min"
              data={appointmentDuration.min}
              suffixStyle={tw`right-[35%] text-descGray`}
            />
          </Picker.Wrapper>
        </Picker>
        <View style={tw`flex-row mx-auto mt-4`}>
          <Clock size={16} color="#7A7A8A" />
          <Text style={tw`text-descGray text-xs ml-1`}>
            Wed, Oct 12 | 6:00 PM - 7:05 PM
          </Text>
        </View>
      </SectionWrapper>
      <SectionWrapper>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={tw`bv-sans-sm`}>Recurs</Text>
          <Switch />
        </View>
        <Form fields={editRecurs} />
        <View style={tw`flex-row mx-auto mt-4`}>
          <Refresh size={16} color="#7A7A8A" />
          <Text style={tw`text-descGray text-xs ml-1`}>
            Recurs every 2 day | never ends
          </Text>
        </View>
      </SectionWrapper>
      <SectionWrapper>
        <Accordion title="Client Note / Attachment">
          <Input style={tw`mt-4`} inputType="textArea" />
          <PhotoPicker style={tw`mt-4`} buttonTheme={2} />
        </Accordion>
      </SectionWrapper>
      <SectionWrapper>
        <Accordion title="Beautician Note / Attachments">
          <Input style={tw`mt-4`} inputType="textArea" />
          <PhotoPicker style={tw`mt-4`} buttonTheme={2} />
        </Accordion>
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {EditAppointmentModal};
