import React, {useEffect, useState} from 'react';
import {Image, Platform, Pressable, Text, View} from 'react-native';
import {ArrowRight2, CloseCircle, Verify} from 'iconsax-react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import dayjs from 'dayjs';

import tw from '../../../../../tailwind';
import {
  Accordion,
  Button,
  FormItem,
  FullScreenModalWrapper,
  Input,
  Picker,
  SwitchBox,
  Tag,
} from '../../../commons';
import {
  ClientLocation,
  PhotoPicker,
  Profile,
  SectionWrapper,
} from '../../../elements';
import {BOOKING_CONST, GENERAL_CONST} from '../../../../constants';
import {SelectedServiceCard} from '../SelectedServiceCard';

const NewAppointmentModal = () => {
  const {weekDays} = GENERAL_CONST;
  const {durationData} = BOOKING_CONST;
  const showWarning = message => {
    Toast.show({
      topOffset: Platform.OS === 'ios' ? 80 : 40,
      type: 'error',
      text1: message,
    });
  };
  const {params} = useRoute();
  const [inClientLocation, setInClientLocation] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const eventDate = params?.eventDate?.start
    ? dayjs(params?.eventDate?.start)
    : null;
  const {
    handleSubmit,
    setValue,
    reset,
    watch,
    register,
    resetField,
    getValues,
    control,
    formState,
    getFieldState,
  } = useForm({
    defaultValues: {
      date: {
        title: eventDate
          ? `${
              weekDays.find(({id}) => id === eventDate.day()).title
            }, ${eventDate.format('MMM DD [at] HH:mm A')}`
          : null,
        timestamp: eventDate ? eventDate.unix() : null,
      },
      user: null,
      location: {
        lat: 0,
        lng: 0,
        id: null,
        address: null,
      },
      duration: null,
      variations: null,
      beautician_note: '',
      transportation_fee: null,
      beautician_attachments: null,
    },
  });
  const form = {
    watch,
    control,
    errors: formState.errors,
  };
  const user = watch('user') || params?.client;
  const location = watch('location');
  const date = watch('date');
  const variations = watch('variations');
  const duration = watch('duration');
  const hour = duration?.hour && `${duration.hour} hour`;
  const min = Number(duration?.min) && `${duration.min} mins`;
  const {navigate, goBack} = useNavigation();
  const removeUser = () => setValue('user', null);
  const navigateToClientsModal = () => {
    navigate('ClientsModal', {
      selectContact: contact => {
        setValue('user', contact);
        goBack();
      },
    });
  };
  const navigateToServicesModal = () => {
    navigate('ServicesModal', {
      variations: getValues('variations'),
      setVariations: variations => {
        let selectedVariations = Object.values(variations).map(item => item.id);
        setValue('variations', selectedVariations);
        setSelectedServices(variations);
        if (getValues('date.title')) {
          register('date.title');
          register('date.timestamp');
          resetField('date.title');
          resetField('date.timestamp');
        }
      },
    });
  };
  const navigateToDateAndTimeModal = () => {
    const variations = getValues('variations');

    if (variations?.length) {
      navigate('DateAndTimeModal', {
        variations,
        selectedDateTimestamp: getValues('date.timestamp'),
        setDate: date => {
          setValue('date', date);
        },
      });
    } else {
      showWarning('Please Add a service or item');
    }
  };
  const navigateToClientAddressModal = () => {
    if (user) {
      navigate('ClientAddressModal', {
        user,
        addClientAddress: ({address}) => {
          setValue('location.address', address);
        },
      });
    } else {
      showWarning('Please Add a client');
    }
  };
  const addAttachmentsImages = photos => {
    setValue(
      'beautician_attachments',
      photos.map(({image}) => image),
    );
  };
  useQuery({
    enabled: Boolean(location.address && date.timestamp && variations?.length),
    queryKey: ['transportationFee', date.timestamp],
    queryFn: () =>
      axios.get('/pro/booking/transportation', {
        params: {
          variations,
          date: date.timestamp,
          address: location.address,
        },
      }),
    onSuccess: data =>
      setValue('transportation_fee', data ? String(data) : '0'),
  });
  const addNewAppointment = useMutation(
    ({
      user,
      date,
      variations,
      location,
      duration,
      transportation_fee,
      ...data
    }) => {
      const durationMin = Number(duration.min);

      return axios.post('/pro/booking', {
        ...data,
        ...(inClientLocation
          ? {
              address: location.title,
              transportation_fee: Number(transportation_fee),
            }
          : {}),
        user_id: user.id,
        date: date.timestamp,
        variations: variations,
        duration:
          duration.hour && durationMin
            ? duration.hour * 60 + durationMin
            : duration.hour * 60 || durationMin,
      });
    },
    {
      onSuccess: () => {
        params.onCreatedEvent?.(dayjs(getValues('date.timestamp') * 1000));
        reset();
        goBack();
      },
    },
  );

  useEffect(() => {
    setValue('user', params?.client);
  }, []);

  return (
    <FullScreenModalWrapper
      backButton
      isButtonTitleLoading={addNewAppointment.isLoading}
      buttonTitle="Add"
      hasSeparator={false}
      titleStyle={tw.style({
        'text-sm': inClientLocation,
      })}
      onSubmit={handleSubmit(addNewAppointment.mutate)}
      title={`New Appointment${inClientLocation ? ' (Mobile)' : ''}`}>
      <SectionWrapper>
        {user ? (
          <Profile
            hasBg
            style={tw`mb-4`}
            {...user}
            img={user?.image || user?.avatar}
            onPress={params?.client ? () => null : removeUser}
            icon={!params?.client && <CloseCircle color="#313244" />}
          />
        ) : (
          <Pressable
            onPress={navigateToClientsModal}
            style={tw`items-center flex-row border mb-4 border-dashed border-[#E4E7EC] px-4 py-5 rounded-3xl`}>
            <Image
              style={tw`w-[40px] h-[40px] rounded-full`}
              source={require('../../../../assets/media/UserDefault.png')}
            />
            <View style={tw`ml-2 mr-auto`}>
              <View style={tw`flex-row items-center mb-1`}>
                <Text style={tw`text-sm text-descGray font-sans mr-1`}>
                  Add Client
                </Text>
                <Verify size={16} color="#7A7A8A" variant="Bold" />
              </View>
              <Text style={tw`text-xs text-descGray`}>Phone Number</Text>
              <Text style={tw`text-xs text-descGray`}>email</Text>
            </View>
            <ArrowRight2 size={20} color="#313244" />
          </Pressable>
        )}
        {Object.values(selectedServices).length > 0 ? (
          <>
            {Object.entries(selectedServices).map((item, index) => (
              <SelectedServiceCard
                key={index}
                title={item[0]}
                variationTitle={item[1].title}
                price={item.price}
                discountedPrice={item.discountedPrice}
                duration={item.duration}
                style={tw`mb-4`}
                seprator={Object.entries(selectedServices).length - 1 > index}
              />
            ))}
          </>
        ) : null}
        <Button
          title="Add/Edit Services"
          onPress={navigateToServicesModal}
          titleStyle={tw`text-descGray font-sans`}
          style={tw`bg-[#54556914] rounded-lg mt-5`}
        />
      </SectionWrapper>
      <SectionWrapper>
        <>
          <SwitchBox
            size={8}
            label="Client Location"
            onChange={setInClientLocation}
          />
          {inClientLocation && (
            <ClientLocation
              setValue={setValue}
              style={tw`mt-4`}
              {...watch('location')}
              onMapPress={navigateToClientAddressModal}
              form={{...form, getFieldState, formState}}
            />
          )}
        </>
      </SectionWrapper>
      <SectionWrapper>
        <FormItem
          name="date.title"
          validation="required"
          form={{...form, error: getFieldState('date.title').error}}>
          <Input
            readOnly
            label="Date & Time"
            onPress={navigateToDateAndTimeModal}
          />
        </FormItem>
        <FormItem
          name="duration"
          validation="required"
          form={{...form, error: getFieldState('duration').error}}>
          <Picker.InputAccordion
            style={tw`mt-6`}
            lable="Duration"
            value={hour && min ? `${hour}, ${min}` : hour || min}>
            <Picker.Wrapper>
              <Picker.Column
                name="hour"
                suffix="hour"
                data={durationData.hours}
                suffixStyle={tw`right-[30%] text-descGray`}
              />
              <Picker.Column
                name="min"
                suffix="min"
                data={durationData.min}
                suffixStyle={tw`right-[30%] text-descGray`}
              />
            </Picker.Wrapper>
          </Picker.InputAccordion>
        </FormItem>
      </SectionWrapper>
      <SectionWrapper style={tw`flex-row justify-between items-center`}>
        <SwitchBox label="Recurs" size={8} />
      </SectionWrapper>
      {inClientLocation && (
        <SectionWrapper>
          <SwitchBox label="Request to book" size={10} />
          <Text style={tw`text-sm text-descGray font-med mt-4`}>
            Client will receive a link to complete and confirm the booking.
          </Text>
        </SectionWrapper>
      )}
      <SectionWrapper>
        <Accordion title="Note / Attachment">
          <FormItem style={tw`mt-4`} form={form} name="beautician_note">
            <Input inputType="textArea" />
          </FormItem>
          <PhotoPicker
            buttonTheme={2}
            style={tw`mt-4`}
            onAddPhoto={addAttachmentsImages}
          />
        </Accordion>
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {NewAppointmentModal};
