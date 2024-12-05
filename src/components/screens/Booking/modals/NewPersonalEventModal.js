import React, {useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {useForm} from 'react-hook-form';
import {useMutation} from 'react-query';
import {Clock, Refresh} from 'iconsax-react-native';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import dayjs from 'dayjs';

import tw from '../../../../../tailwind';
import {
  Input,
  Picker,
  Select,
  FormItem,
  SwitchBox,
  DatePicker,
  FullScreenModalWrapper,
} from '../../../commons';
import {SectionWrapper} from '../../../elements';
import {BOOKING_CONST, GENERAL_CONST} from '../../../../constants';

const NewPersonalEventModal = () => {
  const {params} = useRoute();
  const {goBack} = useNavigation();
  const {weekDays} = GENERAL_CONST;
  const {durationData, frequencyData, endTimeData} = BOOKING_CONST;
  const [recurs, setRecurs] = useState(true);
  const {
    handleSubmit,
    getValues,
    watch,
    control,
    formState,
    reset,
    getFieldState,
  } = useForm({
    defaultValues: {
      name: '',
      note: '',
      duration: {
        hour: params?.eventDate?.end
          ? dayjs(params.eventDate.end).diff(params.eventDate.start, 'hour')
          : 1,
        min: 0,
      },
      bookable: true,
      date: params?.eventDate?.start
        ? dayjs(params.eventDate.start).unix()
        : null,
      ...(params?.id
        ? {id: params.id}
        : {
            end_time: {value: 1},
            frequency: {number: 1, moment: 'day'},
          }),
    },
  });
  const form = {
    watch,
    control,
    errors: formState.errors,
  };
  const duration = watch('duration');
  const frequency = watch('frequency');
  const date = watch('date') && dayjs(watch('date') * 1000);
  const dateAndTimeCaption = useMemo(() => {
    if (!date) return null;

    const day = weekDays.find(({id}) => id === date?.day())?.title;

    return {
      day: `${day}, ${date.format('MMM DD')}`,
      hour: `${date.format('HH:mm A')} - ${date
        .set('hour', date.hour() + duration.hour || 0)
        .set('minute', date.minute() + duration.min || 0)
        .format('HH:mm A')}`,
    };
  }, [date, duration]);
  const hour = Number(duration?.hour) && `${duration.hour} hour`;
  const min = Number(duration?.min) && `${duration.min} mins`;
  const addPersonalEvent = useMutation(
    ({frequency, duration, end_time, ...data}) => {
      const durationMin = Number(duration.min);

      return axios.post('/pro/booking/personal', {
        ...data,
        duration:
          duration.hour && durationMin
            ? duration.hour * 60 + durationMin
            : duration.hour * 60 || durationMin,
        ...(recurs && !params?.id
          ? {
              end_time: end_time.value,
              frequency: `${frequency.number}_${frequency.moment}`,
            }
          : {}),
      });
    },
    {
      onSuccess: () => {
        params.onCreatedEvent?.(dayjs(getValues('date') * 1000));
        reset();
        goBack();
      },
    },
  );

  return (
    <FullScreenModalWrapper
      backButton
      isButtonTitleLoading={addPersonalEvent.isLoading}
      buttonTitle={params?.id ? 'Update' : 'Add'}
      hasSeparator={false}
      title="New Personal Event"
      onSubmit={handleSubmit(addPersonalEvent.mutate)}>
      <SectionWrapper>
        <FormItem
          name="name"
          form={{...form, error: getFieldState('name').error}}>
          <Input label="Event Name" style={tw`rounded-lg`} />
        </FormItem>
        <FormItem
          name="date"
          validation="required"
          style={tw`border-t border-[#E4E7EC] pt-6 mt-6`}
          form={{...form, error: getFieldState('date').error}}>
          <DatePicker
            mode="datetime"
            label="Date & Time"
            style={tw`rounded-lg`}
            minimumDate={params?.minimumDate}
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
                value={duration.hour}
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
        {dateAndTimeCaption?.day && dateAndTimeCaption?.hour && (
          <View style={tw`flex-row mx-auto mt-4`}>
            <Clock size={16} color="#7A7A8A" />
            <Text style={tw`text-descGray text-xs ml-1`}>
              {dateAndTimeCaption.day} | {dateAndTimeCaption.hour}
            </Text>
          </View>
        )}
      </SectionWrapper>
      {!params?.id && (
        <SectionWrapper>
          <SwitchBox
            size={10}
            label="Recurs"
            defaultValue={recurs}
            onChange={setRecurs}
          />
          <FormItem
            name="frequency"
            form={{...form, error: getFieldState('frequency').error}}>
            <Picker.InputAccordion
              style={tw`mt-4`}
              lable="Frequency"
              value={
                frequency?.number &&
                `every ${frequency.number} ${frequency.moment}`
              }>
              <Picker.Wrapper>
                <Picker.Column
                  name="number"
                  itemVisibilty={3}
                  value={frequency?.number}
                  data={frequencyData.number}
                />
                <Picker.Column
                  name="moment"
                  itemVisibilty={3}
                  value={frequency?.moment}
                  data={frequencyData.moment}
                />
              </Picker.Wrapper>
            </Picker.InputAccordion>
          </FormItem>
          <FormItem
            name="end_time"
            style={tw`mt-6`}
            form={{...form, error: getFieldState('end_time').error}}>
            <Select
              label="End Time"
              options={endTimeData}
              style={tw`rounded-lg`}
            />
          </FormItem>
          <View style={tw`flex-row mx-auto mt-4`}>
            <Refresh size={16} color="#7A7A8A" />
            <Text style={tw`text-descGray text-xs ml-1`}>
              Recurs every {frequency.number} {frequency.moment} | never ends
            </Text>
          </View>
        </SectionWrapper>
      )}
      <SectionWrapper>
        <FormItem
          name="bookable"
          form={{...form, error: getFieldState('bookable').error}}>
          <SwitchBox
            size={10}
            label="Allow online booking during event"
            defaultValue={getValues('bookable')}
          />
        </FormItem>
      </SectionWrapper>
      <SectionWrapper>
        <FormItem
          name="note"
          form={{...form, error: getFieldState('note').error}}>
          <Input label="Add Note for Staff" style={tw`rounded-lg`} />
        </FormItem>
      </SectionWrapper>
    </FullScreenModalWrapper>
  );
};

export {NewPersonalEventModal};
