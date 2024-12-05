import React from 'react';
import {Card, Location, Shop} from 'iconsax-react-native';

const FAKE_CONST = {
  BankCardData: [
    {
      title: '**** **** **** 8742',
      icon: <Card size={22} color={'#5948AA'} />,
    },
    {
      title: '**** **** **** 8742',
      icon: <Card size={22} color={'#5948AA'} />,
    },
    {
      title: '**** **** **** 8742',
      icon: <Card size={22} color={'#5948AA'} />,
    },
  ],
  GiftcardData: [{key: 1, name: 'MOHAMADAMIN NOURANI', amount: '$50'}],
  CouponData: [
    {
      key: 1,
      title: '15% OFF',
      description: 'First Time Service with a new professional manicure',
      code: 'Sghwryh',
      value: '15%',
    },
    {
      key: 2,
      title: '15% OFF',
      description: 'First Time Service with a new professional manicure',
      code: 'Sghwryh',
      value: '15%',
    },
    {
      key: 3,
      title: '15% OFF',
      description: 'First Time Service with a new professional manicure',
      code: 'Sghwryh',
      value: '15%',
    },
    {
      key: 4,
      title: '15% OFF',
      description: 'First Time Service with a new professional manicure',
      code: 'Sghwryh',
      value: '15%',
    },
    {
      key: 5,
      title: '15% OFF',
      description: 'First Time Service with a new professional manicure',
      code: 'Sghwryh',
      value: '15%',
    },
  ],

  FAQs: [
    {
      key: 1,
      title: 'buyGiftCardFAQs',
      description:
        'Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate exercitation incididunt aliquip deserunt repre tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.at nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit ese',
    },
  ],
  addressSearchResultData: [
    {
      id: 1,
      title: '2715 AshDr. San Jose,',
      value: 'address1',
    },
    {
      id: 2,
      title: '4517 Washington Ave.',
      value: 'address2',
    },
    {
      id: 3,
      title: '8502 Preston Rd.',
      value: 'address3',
    },
    {
      id: 4,
      title: '6391 Elgin St. Celina,',
      value: 'address4',
    },
  ],
  serviceTagData: [
    {title: 'Haircut', icon: <Shop color="#7A7A8A" size={16} />},
    {
      title: 'Classic Eyelash Extension',
      icon: <Shop color="#7A7A8A" size={16} />,
    },
    {title: 'Massage', icon: <Shop color="#7A7A8A" size={16} />},
    {title: 'Pedicure', icon: <Shop color="#7A7A8A" size={16} />},
  ],
  profileServiceData: [
    {
      id: 1,
      serviceTitle: 'volume lashes',
      priceRange: [90, 110],
      durationRange: ['45', '1h 45'],
      //desc: '1 week touch up',
      options: [
        {
          id: 1,
          title: 'full-set',
          price: 90,
          duration: 45,
          off: 20,
        },
        {
          id: 2,
          title: 'full-set',
          price: 95,
          duration: 60,
          //off: 20,
        },
        {
          id: 3,
          title: 'full-set',
          price: 110,
          duration: 45,
          //off: 20,
        },
      ],
    },
    {
      id: 2,
      serviceTitle: 'volume lashes',
      priceRange: [90, 110],
      durationRange: ['45', '1h 45'],
    },
    {
      id: 3,
      serviceTitle: '2022 trend lashes',
      priceRange: [110],
      durationRange: ['45'],
      //desc: '1 week touch up',
      isAddOn: true,
    },
  ],
  cashier: {
    checkout: [
      {
        id: 1,
        amount: 169.99,
        distance: '2.3',
        end: '05:00 AM',
        start: '03:00 AM',
        status: 'confirmed',
        name: 'Alice Barton',
        category: 'hybrid lashes',
        date: 'Saturday, augest 4',
        address: '25 Capreol Ct, Toronto',
      },
      {
        id: 2,
        amount: 169.99,
        distance: '2.3',
        end: '05:00 AM',
        start: '03:00 AM',
        status: 'confirmed',
        name: 'Alice Barton',
        category: 'hybrid lashes',
        date: 'Saturday, augest 4',
        address: '25 Capreol Ct, Toronto',
      },
      {
        id: 3,
        amount: 169.99,
        distance: '2.3',
        end: '05:00 AM',
        start: '03:00 AM',
        status: 'confirmed',
        name: 'Alice Barton',
        category: 'hybrid lashes',
        date: 'Saturday, augest 4',
        address: '25 Capreol Ct, Toronto',
      },
      {
        id: 4,
        amount: 169.99,
        distance: '2.3',
        end: '05:00 AM',
        start: '03:00 AM',
        status: 'confirmed',
        name: 'Alice Barton',
        category: 'hybrid lashes',
        date: 'Saturday, augest 4',
        address: '25 Capreol Ct, Toronto',
      },
      {
        id: 5,
        amount: 169.99,
        isChecked: true,
        distance: '2.3',
        end: '05:00 AM',
        start: '03:00 AM',
        status: 'confirmed',
        name: 'Alice Barton',
        category: 'hybrid lashes',
        date: 'Saturday, augest 4',
        address: '25 Capreol Ct, Toronto',
      },
      {
        id: 6,
        amount: 169.99,
        isChecked: true,
        distance: '2.3',
        end: '05:00 AM',
        start: '03:00 AM',
        status: 'confirmed',
        name: 'Alice Barton',
        category: 'hybrid lashes',
        date: 'Saturday, augest 4',
        address: '25 Capreol Ct, Toronto',
      },
    ],
    statusOfPayments: [
      {
        id: 1,
        paid: false,
        amount: '$420',
        time: '20:30 PM',
        date: '20 Aug, 2023',
      },
      {
        id: 2,
        paid: false,
        amount: '$420',
        time: '20:30 PM',
        date: '20 Aug, 2023',
      },
      {
        id: 3,
        paid: false,
        amount: '$420',
        time: '20:30 PM',
        date: '20 Aug, 2023',
      },
      {
        id: 4,
        paid: false,
        amount: '$420',
        time: '20:30 PM',
        date: '20 Aug, 2023',
      },
    ],
  },
  services: [
    {
      id: 1,
      content: [
        {
          id: 1,
          title: 'Variation',
        },
        {
          id: 2,
          title: 'Variation',
        },
        {
          id: 3,
          title: 'Variation',
        },
      ],
    },
    {
      id: 2,
      content: [
        {
          id: 1,
          title: 'Variation',
        },
        {
          id: 2,
          title: 'Variation',
        },
        {
          id: 3,
          title: 'Variation',
        },
      ],
    },
    {
      id: 3,
      content: [
        {
          id: 1,
          title: 'Variation',
        },
        {
          id: 2,
          title: 'Variation',
        },
        {
          id: 3,
          title: 'Variation',
        },
      ],
    },
  ],
  clientAddress: [
    {
      id: 1,
      address: '2464 Royal Ln. Mesa, New Jersey 45463',
    },
    {
      id: 2,
      address: '2464 Royal Ln. Mesa, New Jersey 45463',
    },
  ],
  clientInfoTabBar: {
    clientsInput: {
      source: 'Application',
      name: 'Wade Warren',
      gender: 'Male',
      dateOfBirth: '22 August 2000',
      email: 'jackson.graham@example.com',
      phoneNumber: '(270) 555 - 8585',
      address: [
        {
          id: 1,
          title: 'Home',
          context: '2464 Royal Ln. Mesa, New Jersey 45463',
        },
        {
          id: 2,
          context: '2464 Royal Ln. Mesa, New Jersey 45463',
        },
        {
          id: 3,
          title: 'Home',
          context: '2464 Royal Ln. Mesa, New Jersey 45463',
        },
        {
          id: 4,
          context: '2464 Royal Ln. Mesa, New Jersey 45463',
        },
      ],
    },
    appointments: {
      upcoming: [
        {
          id: 1,
          amount: 169.99,
          distance: '2.3',
          end: '05:00 AM',
          start: '03:00 AM',
          status: 'confirmed',
          category: 'hybrid lashes',
          date: 'Saturday, augest 4',
          address: '25 Capreol Ct, Toronto',
        },
        {
          id: 2,
          amount: 169.99,
          distance: '2.3',
          end: '05:00 AM',
          start: '03:00 AM',
          status: 'unconfirmed',
          category: [
            {
              id: 1,
              service: 'hybrid lashes',
            },
            {
              id: 2,
              service: 'hybrid lashes',
            },
            {
              id: 3,
              service: 'hybrid lashes',
            },
            {
              id: 4,
              service: 'hybrid lashes',
            },
          ],
          date: 'Saturday, augest 4',
          address: '25 Capreol Ct, Toronto',
        },
        {
          id: 3,
          amount: 169.99,
          distance: '2.3',
          end: '05:00 AM',
          start: '03:00 AM',
          status: 'pending',
          category: 'hybrid lashes',
          date: 'Saturday, augest 4',
          address: '25 Capreol Ct, Toronto',
        },
        {
          id: 4,
          amount: 169.99,
          distance: '2.3',
          end: '05:00 AM',
          start: '03:00 AM',
          status: 'progress',
          category: 'hybrid lashes',
          date: 'Saturday, augest 4',
          address: '25 Capreol Ct, Toronto',
        },
      ],
      past: [
        {
          id: 1,
          amount: 169.99,
          distance: '2.3',
          end: '05:00 AM',
          start: '03:00 AM',
          status: 'finish',
          category: [
            {
              id: 1,
              service: 'hybrid lashes',
            },
            {
              id: 2,
              service: 'hybrid lashes',
            },
            {
              id: 3,
              service: 'hybrid lashes',
            },
            {
              id: 4,
              service: 'hybrid lashes',
            },
          ],
          date: 'Saturday, augest 4',
          address: '25 Capreol Ct, Toronto',
        },
        {
          id: 2,
          amount: 169.99,
          distance: '2.3',
          end: '05:00 AM',
          start: '03:00 AM',
          status: 'pending',
          category: 'hybrid lashes',
          date: 'Saturday, augest 4',
          address: '25 Capreol Ct, Toronto',
        },
      ],
    },
    invoices: [
      {
        id: 1,
        paid: true,
        amount: '$420',
        time: '20:30 PM',
        endOfCard: 6969,
        date: '20 Aug, 2023',
      },
      {
        id: 2,
        amount: '$420',
        time: '20:30 PM',
        date: '20 Aug, 2023',
      },
      {
        id: 3,
        paid: true,
        amount: '$420',
        time: '20:30 PM',
        endOfCard: 6969,
        date: '20 Aug, 2023',
      },
    ],
    paymentCards: [
      {
        id: 1,
        title: '8742',
        card: 'visaCard',
      },
      {
        id: 2,
        title: '8742',
        card: 'masterCard',
      },
      {
        id: 3,
        title: '8742',
        card: 'americanCard',
      },
    ],
    subscription: [
      {
        id: 1,
        isBooked: true,
        name: 'Alice Berton',
        distance: '2 km',
        context: {
          Category: 'Lashes',
          'Available Credit': '230',
          'Next Payment': '10 April',
        },
      },
      {
        id: 2,
        isBooked: false,
        name: 'Alice Berton',
        distance: '2 km',
        context: {
          Category: 'Lashes',
          'Available Credit': '230',
          'Next Payment': '10 April',
        },
      },
      {
        id: 3,
        isBooked: false,
        name: 'Alice Berton',
        distance: '2 km',
        context: {
          Category: 'Lashes',
          'Available Credit': '230',
          'Next Payment': '10 April',
        },
      },
    ],
    giftCards: [
      {
        id: 1,
        name: 'Ali',
        amount: '50',
        lastName: 'Matin',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque',
      },
      {
        id: 2,
        name: 'Ali',
        amount: '50',
        lastName: 'Matin',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Egestas purus viverra accumsan in nisl nisi Arcu cursus vitae congue mauris rhoncus aenean vel elit scelerisque',
      },
    ],
  },
  transactionData: {
    name: 'Mohammad Naderi',
    phoneNumber: '(319) 555-0115',
    email: 'example@mail.com',
    status: true,
    paymentMethod: 'card ending in 6969',
    id: '#232213',
    date: '18 August 2023',
    services: [
      {
        id: 1,
        item: 'Classic Lashes Refill 1-Week',
        amount: '$200',
        numberOfSessions: 1,
      },
      {
        id: 2,
        item: 'Classic Lashes Refill 1-Week',
        amount: '$150',
        numberOfSessions: 1,
      },
    ],
    factor: {
      subtotal: '$350',
      tip: '$350',
      discount: '$30',
      hst: '$20',
      total: '$420',
    },
  },
  checkoutAppointmentItems: {
    services: [
      {
        id: 1,
        title: 'Classic Lashes',
        caption: 'Refill 1-Week',
        time: '1h 30m',
        total: '$200',
      },
      {
        id: 2,
        title: 'Classic Lashes',
        caption: 'Refill 1-Week',
        time: '15m',
        total: '$150',
      },
    ],
    otherServices: [
      {
        id: 1,
        title: 'Custom item',
        total: '$15',
      },
      {
        id: 2,
        title: 'Custom item',
        total: '$15',
      },
      {
        id: 3,
        title: 'Custom item',
        total: '$15',
      },
    ],
  },
  factor: {
    Subtotal: '$350',
    TIP: '$80',
    Discount: '$30',
    HST: '$20',
    Total: '$420',
  },
  dashboard: {
    overview: [
      {
        id: 1,
        title: 'Revenue',
        value: '5000 - 6700',
        status: {
          value: '+12%',
          positive: true,
        },
      },
      {
        id: 2,
        title: 'Clients',
        value: '90 - 132',
        status: {
          value: '-15',
          negative: true,
        },
      },
      {
        id: 3,
        title: 'Appointment Occupancy:',
        value: '70%',
        status: {
          value: '+15',
          positive: true,
        },
      },
    ],
    chart: [
      {title: 'Earned', value: '$1500'},
      {title: 'Booked', value: '$2500'},
      {title: 'Empty', value: '$2000'},
    ],
    avgs: [
      {
        id: 1,
        title: 'Avg Booking Value',
        value: '$100',
      },
      {
        id: 2,
        title: 'Avg Booking Frequency',
        value: 'Every 3 weeks',
      },
      {
        id: 3,
        title: 'Avg Client Retention Rate',
        value: '75%',
      },
    ],
    workReport: [
      {
        id: 1,
        title: 'Returning Clients',
        amount: 70,
        total: 100,
        status: {
          value: '+12 this month',
          positive: true,
        },
      },
      {
        id: 2,
        title: 'Client Base',
        amount: 150,
        total: 200,
        status: {
          value: '+35 this month',
          positive: true,
        },
      },
      {
        id: 3,
        title: 'Monthly Appointments',
        amount: 105,
        total: 135,
        status: {
          value: '+25 this month',
          positive: true,
        },
      },
      {
        id: 4,
        title: 'Weekly Working Hours',
        amount: 20,
        total: 50,
      },
    ],
    data: [
      {
        id: 1,
        title: 'Reviews',
        value: '4.9 l 24',
      },
      {
        id: 2,
        title: 'Satisfaction Rate',
        value: '80%',
      },
      {
        id: 3,
        title: 'Number of appointments',
        value: '450',
      },
    ],
  },
  goalData: {
    amounts: [
      {
        value: '9,000',
      },
      {
        value: '9,500',
      },
      {
        value: '10,000',
      },
      {
        value: '10,500',
      },
      {
        value: '11,000',
      },
    ],
    moments: [
      {
        value: 'Day',
      },
      {
        value: 'Week',
      },
      {
        value: 'Month',
      },
      {
        value: 'Year',
      },
    ],
  },
  availabilityTime: [
    {
      id: 1,
      value: '07:00 AM',
    },
    {
      id: 2,
      value: '07:15 AM',
    },
    {
      id: 3,
      value: '07:30 AM',
    },
    {
      id: 4,
      value: '07:45 AM',
    },
    {
      id: 5,
      value: '08:00 AM',
    },
    {
      id: 6,
      value: '08:15 AM',
    },
    {
      id: 7,
      value: '08:30 AM',
    },
    {
      id: 8,
      value: '08:45 AM',
    },
    {
      id: 9,
      value: '09:00 AM',
    },
    {
      id: 10,
      value: '09:15 AM',
    },
    {
      id: 11,
      value: '09:30 AM',
    },
    {
      id: 12,
      value: '09:45 AM',
    },
    {
      id: 13,
      value: '10:00 AM',
    },
    {
      id: 14,
      value: '10:15 AM',
    },
    {
      id: 15,
      value: '10:30 AM',
    },
    {
      id: 16,
      value: '10:45 AM',
    },
  ],
  variations: [
    {
      id: 1,
      price: '$130',
      discount: '20%',
      title: 'Full-Set',
      duration: '45min',
      discountedPrice: '$110',
    },
    {
      id: 2,
      done: true,
      price: '$130',
      discount: '20%',
      title: 'Full-Set',
      duration: '45min',
      discountedPrice: '$110',
    },
    {
      id: 3,
      price: '$130',
      discount: '20%',
      title: 'Full-Set',
      duration: '45min',
      discountedPrice: '$110',
    },
  ],
  location: {
    address: '2118 Thornridge Cir. Syrac (15KM)',
    lat: 37.78825,
    lng: -122.4324,
  },
  appointmentDetailsData: {
    profile: {
      card: 1,
      name: 'Mohammad Naderi',
      email: 'example@gmail.com',
    },
    confirmed: true,
    status: 'checkout',
    hasTransaction: true,
  },
};

export {FAKE_CONST};
