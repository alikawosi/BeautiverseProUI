import {Man, Woman} from 'iconsax-react-native';
import React from 'react';
import {Text, View} from 'react-native';
import tw from '../../tailwind';

const GENERAL_CONST = {
  GenderData: [
    {
      // key: 1,
      id: 1,
      title: 'Female',
      icon: <Woman size="18" color="#FF74A4" />,
      value: 'female',
    },
    {
      // key: 2,
      id: 2,
      title: 'Male',
      icon: <Man size="18" color="#1481BA" />,
      value: 'male',
    },
    {
      // key: 3,
      id: 3,
      title: 'Other',
      icon: (
        <View style={tw`flex-row `}>
          <Woman size="16" color="#FF74A4" />
          <Man size="16" color="#1481BA" />
        </View>
      ),
      value: 'other',
    },
  ],
  orLineProps: {
    useAngle: true,
    angle: 90,
    colors: [
      'rgba(241, 241, 241, 0)',
      'rgba(241, 241, 241, 1)',
      'rgba(241, 241, 241, 0)',
    ],
    style: tw`w-20 h-0.5`,
  },
  addCreditCardFormData: [
    {
      name: 'addYourPaymentCard',
      type: 'header',
      title: 'Add Your Payment Card',
    },
    {
      name: 'cardHolderFullName',
      type: 'input',
      label: 'Full Name',
      labelFix: true,
      placeholder: 'Full Name',
      validation: 'required',
    },
    {
      name: 'cardNumber',
      type: 'input',
      label: 'Card number',
      keyboardType: 'numeric',
      labelFix: true,
      placeholder: 'Credit Card Number',
      validation: 'required',
    },
    {
      name: 'expiryDate',
      type: 'datePicker',
      itemStyle: 'w-[49%] ',
      label: 'Expiry Date',
      labelFix: true,
      placeholder: 'MM/YY',
      validation: 'required',
    },
    {
      name: 'cvv',
      type: 'input',
      label: 'CVV',
      itemStyle: 'w-[49%]  mx-[1%] ',
      labelFix: true,
      keyboardType: 'numeric',
      placeholder: '1234',
      validation: 'required',
    },
    {
      name: 'postalCode',
      type: 'input',
      label: 'Postal Code',

      labelFix: true,
      placeholder: '123456',
      validation: 'required',
    },
  ],
  provinceData: [
    {
      id: 1,
      title: 'Alberta',
      value: 'Alberta',
      abbreviation: 'AB',
    },
    {
      id: 2,
      title: 'British Columbia',
      value: 'British Columbia',
      abbreviation: 'BC',
    },
    {
      id: 3,
      title: 'Manitoba',
      value: 'Manitoba',
      abbreviation: 'MB',
    },
    {
      id: 4,
      title: 'New Brunswick',
      value: 'New Brunswick',
      abbreviation: 'NB',
    },
    {
      id: 5,
      title: 'Newfoundland and Labrador',
      value: 'Newfoundland and Labrador',
      abbreviation: 'NL',
    },
    {
      id: 6,
      title: 'Northwest Territories',
      value: 'Northwest Territories',
      abbreviation: 'NT',
    },
    {
      id: 7,
      title: 'Nova Scotia',
      value: 'Nova Scotia',
      abbreviation: 'NS',
    },
    {
      id: 8,
      title: 'Nunavut',
      value: 'Nunavut',
      abbreviation: 'NU',
    },
    {
      id: 9,
      title: 'Ontario',
      value: 'Ontario',
      abbreviation: 'ON',
    },
    {
      id: 10,
      title: 'Prince Edward Island',
      value: 'Prince Edward Island',
      abbreviation: 'PE',
    },
    {
      id: 11,
      title: 'Quebec',
      value: 'Quebec',
      abbreviation: 'QC',
    },
    {
      id: 12,
      title: 'Saskatchewan',
      value: 'Saskatchewan',
      abbreviation: 'SK',
    },
    {
      id: 13,
      title: 'Yukon Territory',
      value: 'Yukon Territory',
      abbreviation: 'YT',
    },
  ],
  weekDays: [
    {id: 0, title: 'Sunday'},
    {id: 1, title: 'Monday'},
    {id: 2, title: 'Tuesday'},
    {id: 3, title: 'Wednesday'},
    {id: 4, title: 'Thursday'},
    {id: 5, title: 'Friday'},
    {id: 6, title: 'Saturday'},
  ],
  paymentCards: {
    Visa: require('../assets/media/visaCard.png'),
    MasterCard: require('../assets/media/masterCard.png'),
    'American Express': require('../assets/media/americanCard.png'),
  },
  addServiceOrItem: {
    // Services: [
    //   {
    //     id: 1,
    //     title: 'Provider’s Location',
    //     route: 'ProvidersLocation',
    //   },
    //   {
    //     id: 2,
    //     title: 'Client’s Location',
    //     route: 'ClientsLocation',
    //   },
    // ],
    Items: [
      {
        id: 1,
        title: 'Discount',
        route: 'DiscountModal',
      },
      {
        id: 2,
        title: 'Custom Item',
        route: 'CustomItemModal',
      },
    ],
  },
  discount: {
    amount: new Array(101).fill('_').map((_, index) => ({value: index})),
    unit: [{value: '%'}, {value: '$'}],
  },

  customItemFields: [
    {
      id: 1,
      type: 'input',
      label: 'Item Name',
      name: 'name',
      validation: 'required',
    },
    {
      id: 1,
      type: 'input',
      label: 'Amount',
      name: 'price',
      validation: 'required',
      preffix: <Text style={tw`text-descGray`}>$</Text>,
      keyboardType: 'numeric',
    },
  ],
  newCard: [
    {
      id: 1,
      type: 'input',
      name: 'name',
      label: 'Card Holder Full Name',
      validation: 'required',
    },
    {
      id: 2,
      type: 'input',
      name: 'number',
      maxLength: 16,
      keyboardType: 'numeric',
      label: 'Card Number',
      validation: 'required',
    },
    {
      id: 3,
      name: 'expiryDate',
      label: 'Expiry Date',
      type: 'datePicker',
      format: 'MMM/YYYY',
      itemStyle: 'w-[49%]',
      validation: 'required',
    },
    {
      id: 4,
      type: 'input',
      label: 'CVC',
      name: 'cvc',
      itemStyle: 'w-[49%] ml-auto',
      validation: 'required',
    },
    {
      id: 5,
      type: 'input',
      name: 'postal_code',
      label: 'Postal Code',
      validation: 'required',
    },
  ],
  editCard: [
    {
      id: 1,
      type: 'input',
      name: 'name',
      label: 'Card Holder Full Name',
      validation: 'required',
    },
    {
      id: 2,
      name: 'expiryDate',
      label: 'Expiry Date',
      type: 'datePicker',
      format: 'MMM/YYYY',
      validation: 'required',
    },
    {
      id: 3,
      type: 'input',
      name: 'postal_code',
      label: 'Postal Code',
      validation: 'required',
    },
  ],
  factor: ['Subtotal', 'TIP', 'Discount', 'HST', 'Total'],
};

export {GENERAL_CONST};
