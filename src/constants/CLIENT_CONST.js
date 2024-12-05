import {
  CallCalling,
  Message,
  Notepad2,
  ProfileAdd,
  Setting4,
} from 'iconsax-react-native';
import {GENERAL_CONST} from './GENERAL_CONST';

const CLIENT_CONST = {
  addClientFormData: [
    {
      name: 'first_name',
      type: 'input',
      label: 'First Name',
      validation: 'required',
    },
    {
      name: 'last_name',
      type: 'input',
      label: 'Last Name',
    },
    {
      name: 'phone',
      type: 'input',
      label: 'Phone Number',
      validation: 'required',
      keyboardType: 'phone-pad',
      mask: [
        '(',
        /\d/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ],
      maxLength: 14,
    },
    {
      name: 'email',
      type: 'input',
      label: 'Email',
      validation: 'required|email',
    },
    {
      name: 'gender',
      type: 'select',
      options: GENERAL_CONST.GenderData,
      iconShow: true,
      itemStyle: 'w-[48%]  mr-[2%]',
      label: 'Gender',
    },
    {
      name: 'birthday',
      type: 'datePicker',
      itemStyle: 'w-[48%]  ml-[2%]',
      label: 'Date Of Birth',
    },
    {
      name: 'info',
      type: 'input',
      label: 'Info',
      isMultiline: true,
      itemStyle: 'mb-0',
    },
  ],
  clientInfoConnections: [
    // {
    //   id: 1,
    //   title: 'Invite',
    //   icon: <ProfileAdd size="24" color="#fba301" variant="Bold" />,
    // },
    // {
    //   id: 2,
    //   title: 'Message',
    //   icon: <Message size="24" color="#fba301" variant="Bold" />,
    // },
    {
      title: 'Call',
      icon: <CallCalling size="24" color="#fba301" variant="Bold" />,
    },
    {
      title: 'Book',
      icon: <Notepad2 size="24" color="#fba301" variant="Bold" />,
    },
  ],
  clientFilters: [
    {
      id: 1,
      title: 'Filter',
      icon: <Setting4 size="16" color="#7A7A8A" />,
    },
    {
      id: 2,
      iconShow: true,
      label: 'Gender',
      options: GENERAL_CONST.GenderData,
      isSelectable: true,
    },
    {
      id: 3,
      title: 'First-Time',
    },
    {
      id: 4,
      title: 'Sort By',
    },
    {
      id: 5,
      title: 'New',
    },
    {
      id: 6,
      title: 'Loyals',
    },
    {
      id: 7,
      title: 'Frequency',
    },
    {
      id: 8,
      title: 'Revenue',
    },
  ],
  servicesMyLocation: [
    {id: 'Eyelashes', title: 'Eyelashes'},
    {id: 'Monicur', title: 'Monicur'},
    {id: 'Pedicure', title: 'Pedicure'},
    {id: 'Waxing', title: 'Waxing'},
  ],
  clientInfoTabBar: [
    {
      id: 'clientsInput',
      title: "Client's input",
    },
    {
      id: 'appointments',
      title: 'Appointments',
    },
    {
      id: 'invoices',
      title: 'Invoices',
    },
    {
      id: 'paymentCards',
      title: 'Payment Cards',
    },
  ],
  clientInputTabItems: [
    {
      title: 'Source',
    },
    {
      title: 'Name',
    },
    {
      title: 'Gender',
    },
    {
      id: 'birthday',
      title: 'Date of Birth',
    },
    {
      title: 'Email',
    },
    {
      id: 'phone',
      title: 'Phone number',
    },
    {
      title: 'Addresses',
    },
  ],
  newAddressFields: [
    {
      id: 1,
      type: 'input',
      label: 'Name',
      name: 'name',
    },
    {
      id: 1,
      type: 'input',
      label: 'Address',
      name: 'address',
      validation: 'required',
    },
  ],
  clientInfoDetail: {
    header: ['Apps', 'Cancels', 'No-shows', 'Revenue'],
    content: [
      'Most Booked',
      'First Visit',
      'Monthly Rev',
      'Discount',
      'Frequency',
      'Last Visit',
    ],
  },
  editClientFormData: [
    {
      name: 'first_name',
      type: 'input',
      label: 'First Name',
      validation: 'required',
    },
    {
      name: 'last_name',
      type: 'input',
      label: 'Last Name',
    },
    {
      name: 'info',
      type: 'input',
      label: 'Info',
      itemStyle: 'mb-0',
      isMultiline: true,
    },
  ],
};

export {CLIENT_CONST};
