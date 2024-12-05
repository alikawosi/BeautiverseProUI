import React, {useEffect} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

import tw from '../../../../../tailwind';
import {Button, Form, ModalWrapper, SwitchBox} from '../../../commons';
import {SectionWrapper} from '../../../elements';
import {APPOINTMENTDETAILS_CONST} from '../../../../constants';
import {useMutation} from 'react-query';
import axios from 'axios';
import {useForm} from '../../../../hooks';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const config = {
  no_show: {
    title: 'Mark as No-Show',
    chargeTitle: 'No-Show',
  },
  cancel: {
    title: 'Cancellation',
    chargeTitle: 'Cancellation',
    buttonTitle: 'Cancel Appointment',
  },
};

const notificationKeys = ['on_push', 'sms', 'email'];

const ConfirmModal = () => {
  const {goBack} = useNavigation();
  const {confirmForm} = APPOINTMENTDETAILS_CONST;
  const {route, fee, bookId, onCharge = () => false} = useRoute().params;
  const {title, buttonTitle, chargeTitle} = config[route];
  const mark = useMutation(
    data =>
      axios.post(`/pro/appointment/${route}`, {
        notification: {
          on_push: data.on_push,
          sms: data.sms,
          email: data.email,
        },
        charge_fee: data.charge_fee,
        message: data.message,
        book_id: bookId,
      }),
    {
      onSuccess: () => {
        form.getValues('charge_fee') ? onCharge() : null;
        goBack();
      },
    },
  );
  const {form} = useForm({
    defaultValue: {
      notification: true,
      on_push: true,
      sms: true,
      email: true,
      charge_fee: true,
      message: '',
    },
    fields: [
      ...confirmForm,
      {
        name: 'charge_fee',
      },
    ],
  });
  const watchNotification = form.watch('notification');
  const watchAllNotifications = form.watch(notificationKeys);

  const handleSubmit = () => {
    let filledForm = form.getValues();
    mark.mutate(filledForm);
  };

  useEffect(() => {
    const notification = form.getValues('notification');
    const allNotifications = form.getValues(notificationKeys);

    if (notification && allNotifications.every(value => !value)) {
      notificationKeys.forEach(key => form.setValue(key, true));
    } else if (!notification && allNotifications.some(value => value)) {
      notificationKeys.forEach(key => form.setValue(key, false));
    }
  }, [watchNotification]);

  useEffect(() => {
    const notification = form.getValues('notification');
    const allNotifications = form.getValues(notificationKeys);

    if (notification && allNotifications.every(value => !value)) {
      form.setValue('notification', false);
    } else if (!notification && allNotifications.some(value => value)) {
      form.setValue('notification', true);
    }
  }, [watchAllNotifications]);

  return (
    <ModalWrapper
      title={`Confirm ${title}`}
      type="fromBottom"
      style={tw` bg-background`}>
      <KeyboardAwareScrollView
        enableOnAndroid
        showsVerticalScrollIndicator={false}>
        <View
          showsVerticalScrollIndicator={false}
          style={tw`mt-5 pb-5 relative`}>
          {mark.isLoading && (
            <View
              style={tw`flex-1 justify-center items-center absolute top-0 left-0 right-0 bottom-0 z-20`}>
              <ActivityIndicator />
            </View>
          )}
          <SectionWrapper>
            <SwitchBox
              formValue={form.getValues('charge_fee')}
              onChange={value => form.setValue('charge_fee', value)}
              containerStyle={tw`border-b border-opacity-75 border-[#E4E7EC] pb-5 mb-5`}
              size={7}
              label={`Charge ${chargeTitle} Fee`}
              labelStyle={tw`bv-sans-sm`}
            />
            <Text
              style={tw`text-descGray text-sm text-center border-b border-opacity-75 border-[#E4E7EC] pb-5 mb-5`}>
              A ${fee} fee will be charged and the customer will be notified.
            </Text>
            <Form
              form={form}
              fields={confirmForm}
              style={tw`border-b border-opacity-75 border-[#E4E7EC] pb-5 mb-5`}
            />
            <Text style={tw`text-center text-sm text-descGray`}>
              This message will appear at the top of the email notification and
              on the customer’s appointment management but will not be sent by
              SMS.
            </Text>
          </SectionWrapper>
          <Button
            onPress={handleSubmit}
            title={buttonTitle || title}
            gradientStyle={tw`rounded-lg`}
            titleStyle={tw`text-sm text-white`}
            style={tw`bg-[#FF4444] rounded-xl`}
          />
        </View>
      </KeyboardAwareScrollView>
    </ModalWrapper>
  );
};

export {ConfirmModal};
