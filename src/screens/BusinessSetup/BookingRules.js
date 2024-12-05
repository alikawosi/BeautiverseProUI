import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {Text, View} from 'react-native';

import tw from '../../../tailwind';
import {
  InputWrapper,
  Picker,
  Select,
  ServiceManager,
} from '../../components/commons';
import {
  BusinessSetupLayout,
  SectionWrapper,
} from '../../components/screens/BusinessSetup';
import {BUSINESSSETUP_CONST} from '../../constants';

const BookingRules = () => {
  const {navigate, goBack} = useNavigation();
  const {params} = useRoute();
  const [isPickerShown, setIsPickerShown] = useState(false);
  const {clientAllowToBook, calendarIncerment} =
    BUSINESSSETUP_CONST.bookingRulesData;
  const [days, setDays] = useState(null);
  const [hours, setHours] = useState(null);
  const [increaments, setIncreaments] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getBookingRules.refetch();
  //   });

  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [getBookingRules, navigation]);

  const getBookingRules = useQuery({
    queryFn: async () => await axios.get('/pro/setup/booking_rules'),
    queryKey: ['getBookingRules'],
    onSuccess: res => {
      setDays(res.allowed_book_times.from.value),
        setHours(res.allowed_book_times.to.value),
        setIncreaments(30);
    },
  });

  const updateBookingRules = useMutation({
    mutationFn: () =>
      axios.post('/pro/setup/booking_rules', {
        allowed_book_times: JSON.stringify({
          from: {
            value: days,
            type: 'days',
          },
          to: {
            value: hours,
            type: 'hours',
          },
        }),
      }),
    onSuccess: () => {
      //goBack();
      //onSubmit();
      !params?.stepsHidden ? navigate('ServiceLocationProfile') : goBack();
    },
  });

  const handleChange = selectedValue => {
    if (selectedValue.days) {
      setDays(selectedValue.days);
    }
    if (selectedValue.hours) {
      setHours(selectedValue.hours);
    }
    if (selectedValue.increaments) {
      setIncreaments(selectedValue.increaments);
    }
  };

  return (
    <BusinessSetupLayout
      isLoading={getBookingRules.isLoading}
      progress={6}
      isNextButtonDisabled={getBookingRules.isFetching}
      isProgressVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      headerTitle={'Booking Rules'}
      headerDesc={'These are the rules on how clients can book with you'}
      onPressNextButton={() => updateBookingRules.mutate()}
      onPressSkipButton={() => navigate('ServiceLocationProfile')}
      isNextButtonLoading={updateBookingRules.isLoading}
      footerButtonTitle={params?.stepsHidden ? 'Save' : 'Next'}
      twoButtonFooter={!params?.stepsHidden}>
      <SectionWrapper containerStyle={tw`mb-4`}>
        <InputWrapper
          onPress={() => setIsPickerShown(!isPickerShown)}
          label={'When are clients allowed to book?'}
          isActive>
          <View style={tw`flex-row flex-1 pr-[10%] items-center `}>
            <View style={tw`flex-row`}>
              <Text style={tw`bv-sans-sm mr-1 w-[17%] text-right`}>{days}</Text>
              <Text style={tw`bv-sans-sm`}>days in advance</Text>
            </View>
            <Text style={tw`bv-sans-sm text-[#9F9FAB] mx-auto`}>to</Text>
            <View style={tw`flex-row justify-end`}>
              <Text style={tw`bv-sans-sm mr-1 w-[17%] text-right`}>
                {hours}
              </Text>
              <Text style={tw`bv-sans-sm`}>hours prior</Text>
            </View>
          </View>
        </InputWrapper>
        {isPickerShown ? (
          <Picker
            onChange={value => {
              handleChange(value);
            }}>
            <Picker.Wrapper>
              <Picker.Column
                name={'days'}
                value={days}
                style={tw`pr-[10%]`}
                suffix="Days"
                suffixStyle={tw`right-[15%]`}
                data={clientAllowToBook}
              />
            </Picker.Wrapper>
            <Picker.Seprator style={tw`mx-10 self-center `} />
            <Picker.Wrapper>
              <Picker.Column
                name={'hours'}
                value={hours}
                style={tw`pr-[10%]`}
                suffix="Hours"
                suffixStyle={tw`right-[15%]`}
                data={clientAllowToBook}
              />
            </Picker.Wrapper>
          </Picker>
        ) : null}
        <View style={tw`mt-3`}>
          <Picker
            onChange={value => {
              handleChange(value);
            }}>
            <Picker.InputAccordion
              onChange={handleChange}
              value={increaments && `${increaments} min`}
              lable="What are your calendar increments?">
              <Picker.Wrapper>
                <Picker.Column
                  name={'increaments'}
                  itemVisibilty={3}
                  data={calendarIncerment}
                  value={increaments}
                  suffix={'Minutes'}
                  suffixStyle={tw`right-full`}
                />
              </Picker.Wrapper>
            </Picker.InputAccordion>
          </Picker>
        </View>
      </SectionWrapper>
    </BusinessSetupLayout>
  );
};

export default BookingRules;
