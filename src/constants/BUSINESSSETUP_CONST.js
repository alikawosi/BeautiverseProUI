import React from 'react';
import {View, Text} from 'react-native';
import {
  Car,
  Man,
  Shop,
  Woman,
  MoneyChange,
  ProfileCircle,
} from 'iconsax-react-native';
import tw from '../../tailwind';
import {GENERAL_CONST} from './GENERAL_CONST';

const BUSINESSSETUP_CONST = {
  businessSetupMenuData: [
    {
      id: 1,
      title: 'Independent Professional',
      desc: 'One Service Provider',
      rootdesc: 'BusinessSetting',
    },
    {
      id: 2,
      title: 'Small Business',
      desc: 'Multiple Service Providers',
      rootdesc: 'BusinessSetting',
    },
    {
      id: 3,
      title: 'Small Business Plus',
      desc: 'Multiple Service Providers and Locations',
      rootdesc: 'BusinessSetting',
    },
    {
      id: 4,
      title: 'Enterprises',
      desc: 'Many Service Providers and Many Locations',
      rootdesc: 'BusinessSetting',
    },
  ],
  profileFormData: [
    {
      name: 'yourName',
      type: 'input',
      label: 'Your Name',
      readOnly: true,
      labelFix: true,
      validation: 'required',
    },
    {
      name: 'businessName',
      type: 'input',
      label: 'Business Name',
      //validation: 'required',
    },
    {
      name: 'jobTitle',
      type: 'input',
      label: 'Title',

      validation: 'required',
    },
  ],
  locationType: [
    {
      id: 1,
      title: 'Home',
      value: 'Home',
    },
    {
      id: 2,
      title: 'Salon',
      value: 'Salon',
    },
    {
      id: 3,
      title: 'Studio',
      value: 'Studio',
    },
  ],
  locationTypeFormData: [
    {
      name: 'location',
      type: 'radio',
      options: [
        {
          id: 'home',
          title: 'Home',
          value: 'Home',
        },
        {
          id: 'salon',
          title: 'Salon',
          value: 'Salon',
        },
        {
          id: 'studio',
          title: 'Studio',
          value: 'Studio',
        },
      ],
      itemStyle: 'mb-0',
      label: 'Choose Your Location Type',
      size: 14,
      row: true,
      //validation: 'required',
    },
  ],
  amenitiesFormData: [
    {
      name: 'amenities',
      type: 'check',
      options: [
        {
          id: 'disabilities',
          title: 'Disability Accessible',
          value: 'disabilities',
        },
        {
          id: 'kids',
          title: 'Kids welcome',
          value: 'kids',
        },
        {
          id: 'wifi',
          title: 'Wi-Fi',
          value: 'wifi',
        },
        {
          id: 'washroom',
          title: 'Washroom',
          value: 'washroom',
        },
        {
          id: 'parking',
          title: 'Parking',
          value: 'parking',
        },
        {
          id: 'pets',
          title: 'Pets allowed',
          value: 'pets',
        },
      ],
      itemStyle: 'mb-0',
      //label: 'Choose Your Location Type',
      //size: 14,
      row: true,
      containerStyle: 'h-20 content-around',
      //validation: 'required',
    },
  ],
  addressFormData: [
    {
      name: 'streetAddress',
      type: 'input',
      label: 'Street Address',
      validation: 'required',
    },
    {
      name: 'postalCode',
      type: 'input',
      label: 'Postal Code',
      itemStyle: 'w-[48%]  mr-[1.75%]',
      validation: 'required',
    },
    {
      name: 'unitNumber',
      type: 'input',
      label: 'Unit Number',
      itemStyle: 'w-[48%]  ml-[1.75%]',
      //validation: 'required',
    },
    {
      name: 'city',
      type: 'input',
      label: 'City',
      itemStyle: 'w-[48%]  mr-[1.75%]',
      validation: 'required',
    },
    {
      name: 'province',
      type: 'input',
      //options: GENERAL_CONST.provinceData,
      //iconShow: true,
      itemStyle: 'w-[48%]  ml-[1.75%]',
      label: 'Province',
      //suffix: <ArrowDown2 size="24" color="#C9C2DD" />,
      validation: 'required',
    },
  ],
  categoryData: [
    {
      id: 1,
      title: 'Haircut',
    },
    {
      id: 2,
      title: 'HairStyling',
    },
    {
      id: 3,
      title: 'Hair Coloring',
    },
    {
      id: 4,
      title: 'HairStyling',
    },
    {
      id: 5,
      title: 'Manicure',
    },
    {
      id: 6,
      title: 'Pedicure',
    },
  ],
  identityVerificationFormData: [
    {
      name: 'countryRegion',
      type: 'select',
      options: GENERAL_CONST.provinceData,
      iconShow: true,
      label: 'Country / Region',
      //suffix: <ArrowDown2 size="24" color="#C9C2DD" />,
      itemStyle: 'mt-4',
      validation: 'required',
      required: true,
    },
    {
      name: 'type',
      type: 'radio',
      options: [
        {
          id: 'driver',
          title: 'Driver`s License',
          value: 'driver',
        },
        {
          id: 'passport',
          title: 'Passport',
          value: 'passport',
        },
        {
          id: 'Id_card',
          title: 'Identity Card',
          value: 'Id_card',
        },
      ],
      row: false,
      required: true,
      size: 14,
      label: 'Document Type',
      containerStyle: 'h-25 justify-between',
      validation: 'required',
    },
  ],
  paymentMeyhodFormData: [
    {
      name: 'in_app',
      type: 'switch',
      label: 'Online/ in-app payments ',
      desc: '(Highly recommended)',
      size: 6,
    },
    {
      name: 'cash',
      type: 'switch',
      label: 'Cash',
      size: 6,
    },
    {
      name: 'e_transfer',
      type: 'switch',
      label: 'E-Transfer',
      size: 6,
    },
    {
      name: 'cryptocurrency',
      type: 'switch',
      label: 'Cryptocurrency',
      desc: '(Coming Soon)',
      disabled: true,
      size: 6,
    },
    {
      name: 'physicalCredit/DebitCard',
      type: 'switch',
      label: 'Physical Credit/Debit card',
      desc: '(Coming Soon)',
      disabled: true,
      itemStyle: 'mb-0',
      size: 6,
    },
  ],
  portfolioServiceList: [
    {
      id: 1,
      title: 'Lashes',
      icon: <Shop color={'#313244'} />,
    },
    {
      id: 2,
      title: 'Manicure',
      icon: <Shop color={'#313244'} />,
    },
    {
      id: 3,
      title: 'Pedicure',
      icon: <Shop color={'#313244'} />,
    },
    {
      id: 4,
      title: 'Eyelash',
      icon: <Shop color={'#313244'} />,
    },
  ],
  FAQData: [
    {
      title: 'Question Title 1',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    {
      title: 'Question Title 2',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
    {
      title: 'Question Title 3',
      desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    },
  ],
  FAQFormData: [
    {
      name: 'question',
      type: 'input',
      label: 'Question',
      validation: 'required',
    },
    {
      name: 'answer',
      label: 'Answer',
      type: 'input',
      inputType: 'textArea',
      validation: 'required',
      isMultiline: true,
    },
  ],
  availibilityModalFormData: [
    {
      name: 'availibility',
      type: 'check',
      options: [
        {
          id: 1,
          title: 'Monday',
          value: 'Monday',
        },
        {
          id: 2,
          title: 'Tuesday',
          value: 'Tuesday',
        },
        {
          id: 3,
          title: 'Wednesday',
          value: 'Wednesday',
        },
        {
          id: 4,
          title: 'Thursday',
          value: 'Thursday',
        },
        {
          id: 5,
          title: 'Friday',
          value: 'Friday',
        },
        {
          id: 6,
          title: 'Saturday',
          value: 'Saturday',
        },
        {
          id: 7,
          title: 'Sunday',
          value: 'Sunday',
        },
      ],
      style: 'mb-4',
      //label: 'Choose Your Location Type',
      //size: 14,
      row: true,
      containerStyle: 'h-auto content-around ',
    },
  ],
  serviceData: [
    {
      id: 1,
      title: 'Eyelash',
      variations: [
        {id: 1, title: 'Full-Set'},
        {id: 2, title: 'Full-Set'},
        {id: 3, title: 'Full-Set'},
      ],
    },
    {
      id: 2,
      title: 'Manicure',
    },
    {
      id: 3,
      title: 'Pedicure',
      variations: [
        {id: 1, title: 'Full-Set'},
        {id: 2, title: 'Full-Set'},
        {id: 3, title: 'Full-Set'},
      ],
    },
    {
      id: 4,
      title: 'HairStyling',
      variations: [
        {id: 1, title: 'Full-Set'},
        {id: 2, title: 'Full-Set'},
        {id: 3, title: 'Full-Set'},
      ],
    },
  ],
  serviceOptions: [
    {
      id: 1,
      title: 'Unisex',
      icon: (
        <View style={tw`flex-row`}>
          <Man color="#313244" size={12} />
          <Woman color="#313244" size={12} />
        </View>
      ),
    },
    {
      id: 2,
      title: 'Mobile',
      icon: <Car color="#313244" size={16} />,
    },
  ],
  durationData: {
    hours: [0].reduce(arr => {
      for (let i = 0; i < 13; i++) {
        arr.push({value: i});
      }
      return arr;
    }, []),
    min: [0].reduce(arr => {
      for (let i = 0; i < 60; i += 5) {
        arr.push({value: Number(('0' + i).slice(-2))});
      }
      return arr;
    }, []),
  },
  automatedTransportationFeeFromData: [
    {
      name: 'uberPriceMarkup',
      label: 'Uber Price Markup',
      type: 'input',
      validation: 'required',
      required: true,
      keyboardType: 'number-pad',
      suffix: <Text style={tw`bv-sans-base`}>%</Text>,
    },
  ],
  transportationFeeMarkup: {
    amount: new Array(100).fill('_').map((_, index) => ({value: ++index})),
    unit: [{value: '%'}, {value: '$'}],
  },
  categoryFormData: [
    {
      name: 'title',
      type: 'input',
      iconShow: true,
      contentStyle: 'px-2',
      label: 'Category Name',
      //suffix: <ArrowDown2 size="24" color="#C9C2DD" />,
      validation: 'required',
      required: true,
    },
    {
      name: 'gender',
      type: 'radio',
      options: [
        {
          id: 'unisex',
          title: 'Unisex',
          value: 'Unisex',
        },
        {
          id: 'female',
          title: 'Women',
          value: 'Women',
        },
        {
          id: 'male',
          title: 'Men',
          value: 'Men',
        },
      ],
      //itemStyle: 'mb-0',
      label: 'Who do you provide this categroy for?',
      size: 14,
      row: true,
      //validation: 'required',
    },

    {
      name: 'description',
      label: 'Description',
      type: 'input',
      inputType: 'textArea',
      validation: 'required',
      required: true,
      isMultiline: true,
    },
  ],
  serviceFormData: [
    {
      name: 'title',
      label: 'Service Name',
      type: 'input',
      validation: 'required',
      required: true,
      style: tw`mt-2`,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'input',
      inputType: 'textArea',
      validation: 'required',
      required: true,
      isMultiline: true,
    },
  ],
  uniqueFeaturesFromData: [
    {
      name: 'amenities',
      type: 'check',
      options: [
        {
          id: 1,
          title: 'Free Consultation',
          value: 'Free Consultation',
        },
        {
          id: 2,
          title: 'Patch test',
          value: 'Patch test',
        },
      ],
      //itemStyle: 'mb-0',
      //label: 'Choose Your Location Type',
      //size: 18,
      //validation: 'required',
    },
  ],
  verificationSteps: {
    1: {
      type: 'takePhoto',
      title: 'Front of ID',
      description:
        'Fill the front of your ID within the\nframe --- check for goodlighting.',
    },
    2: {
      type: 'check',
      title: 'is the front of your ID clear?',
      description: 'make sure it’s, clear,\nand nothing is cut off.',
    },
    3: {
      type: 'continue',
      icon: <MoneyChange size="80" color="#fff" />,
      title: 'Next, flip to the back of your ID',
      description: 'make sure it’s, clear,\nand nothing is cut off.',
    },
    4: {
      type: 'takePhoto',
      title: 'is the back of your ID clear?',
      description: 'make sure it’s, clear,\nand nothing is cut off.',
    },
    5: {
      type: 'check',
      title: 'is the back of your ID clear?',
      description: 'make sure it’s, clear,\nand nothing is cut off.',
    },
    6: {
      type: 'continue',
      icon: <ProfileCircle size="80" color="#fff" />,
      title: 'Next, take a photo of yourself',
      description: 'we’ll match this photo with the one \non your ID.',
    },
    7: {
      type: 'takePhoto',
      title: 'Take a photo of yourself',
      description: 'Hold your device',
    },
    8: {
      type: 'check',
      title: 'Review your photo',
      description:
        'make sure it’s will-lit, clear, and\nmatching the person in the ID.',
    },
  },
  bookingRulesData: {
    clientAllowToBook: new Array(30)
      .fill('_')
      .map((_, index) => ({value: ++index})),
    calendarIncerment: [
      {
        id: 1,
        value: 15,
        title: '15',
      },
      {
        id: 2,
        value: 30,
        title: '30',
      },
      {
        id: 3,
        value: 60,
        title: '60',
      },
    ],
  },
  noShowPolicyFormData: {
    amount: new Array(100).fill('_').map((_, index) => ({value: ++index})),
    unit: [{value: '%'}, {value: '$'}],
  },
  cancelationPolicyFormData: {
    periorPercentage: new Array(101)
      .fill('_')
      .map((_, index) => ({value: index})),
    periorTimeRange: [
      {value: '0-3'},
      {value: '3-6'},
      {value: '6-12'},
      {value: '12-24'},
      {value: '24-48'},
      {value: '48-72'},
    ],
  },
  preparationTimeData: [
    {title: '5 min', value: 5},
    {title: '10 min', value: 10},
    {title: '15 min', value: 15},
    {title: '20 min', value: 20},
    {title: '25 min', value: 25},
    {title: '30 min', value: 30},
    {title: '35 min', value: 35},
    {title: '40 min', value: 40},
    {title: '45 min', value: 45},
    {title: '50 min', value: 50},
    {title: '55 min', value: 55},
    {title: '60 min', value: 60},
  ],
  bufferTimeData: [
    {title: '5 min', value: 5},
    {title: '10 min', value: 10},
    {title: '15 min', value: 15},
    {title: '20 min', value: 20},
    {title: '25 min', value: 25},
    {title: '30 min', value: 30},
    {title: '35 min', value: 35},
    {title: '40 min', value: 40},
    {title: '45 min', value: 45},
    {title: '50 min', value: 50},
    {title: '55 min', value: 55},
    {title: '60 min', value: 60},
  ],
};

export {BUSINESSSETUP_CONST};
