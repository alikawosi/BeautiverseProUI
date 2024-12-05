import tw from '../../tailwind';

const APPOINTMENTDETAILS_CONST = {
  confirmForm: [
    {
      size: 7,
      type: 'switch',
      name: 'notification',
      label: 'Notification',
      labelStyle: 'text-base',
    },
    {
      type: 'switch',
      name: 'on_push',
      label: 'Push',
      size: 6,
    },
    {
      type: 'switch',
      name: 'sms',
      label: 'SMS',
      size: 6,
    },
    {
      type: 'switch',
      name: 'email',
      label: 'Email',
      size: 6,
    },
    {
      type: 'input',
      maxLength: 64,
      name: 'message',
      inputType: 'textArea',
      placeholder: 'Message (0/64)',
      isMultiline: true,
      style: tw`p-1`,
    },
  ],
};

export {APPOINTMENTDETAILS_CONST};
