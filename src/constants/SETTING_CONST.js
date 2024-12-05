import React from 'react';
import {
  BoxTick,
  Call,
  ClipboardTick,
  Coin1,
  EmptyWallet,
  Messages3,
  Setting2,
  SmsEdit,
  UserEdit,
} from 'iconsax-react-native';

const SETTING_CONST = {
  settingMenuData: [
    {
      key: 1,
      title: 'Business Setting',
      description: 'Personal information, Notification, Login',
      icon: <Setting2 color="#7A7A8A" size="24" />,
      route: 'BusinessSetting',
      rootRoute: 'SettingScreens',
    },
    {
      key: 2,
      title: 'Accounting',
      description: 'Upcoming Payments, Transaction History...',
      icon: <Coin1 color="#7A7A8A" size="24" />,
      route: 'AccountingSetting',
      rootRoute: 'SettingScreens',
    },
    // {
    //   key: 3,
    //   title: 'Inventory',
    //   description: 'Upcoming Payments, Transaction History...',
    //   icon: <BoxTick color="#7A7A8A" size="24" />,
    //   route: 'InventorySetting',
    //   rootRoute: 'SettingScreens',
    // },
    // {
    //   key: 4,
    //   title: 'Reviews',
    //   description: 'Personal information, notification, login and...',
    //   icon: <Messages3 color="#7A7A8A" size="24" />,
    //   route: 'ReviewsSetting',
    //   rootRoute: 'SettingScreens',
    // },
    // {
    //   key: 5,
    //   title: 'Wallet',
    //   description: 'Wallet Balance, Coupons, Gift Cards...',
    //   icon: <EmptyWallet color="#7A7A8A" size="24" />,
    //   route: 'WalletSetting',
    //   rootRoute: 'SettingScreens',
    // },
    {
      key: 6,
      title: 'Personal Settings',
      description: 'Personal information, notification, login and...',
      icon: <UserEdit color="#7A7A8A" size="24" />,
      route: 'PersonalSetting',
      rootRoute: 'SettingScreens',
    },
    {
      key: 7,
      title: 'Support',
      description: 'Contact Support team ',
      icon: <Call color="#7A7A8A" size="24" />,
      route: 'SupportSetting',
      rootRoute: 'SettingScreens',
      link: 'https://beautiverse.ca/api/beautiverse/contact-us/',
    },
    {
      key: 8,
      title: 'Legal',
      description: 'Legals and rules of Beautiverse',
      icon: <ClipboardTick color="#7A7A8A" size="24" />,
      route: 'Legal',
      rootRoute: 'SettingScreens',
      link: 'https://beautiverse.ca/api/beautiverse/privacy-policy/',
    },
    {
      key: 9,
      title: 'Give Us Feedback',
      description: 'Give us feedback to make Beautiverse better!',
      icon: <SmsEdit color="#414141" size="24" />,
      route: 'Feedback',
      rootRoute: 'SettingScreens',
      link: 'https://beautiverse.ca/api/beautiverse/contact-us/',
    },
  ],
  businessMenuData: [
    {
      key: 1,
      title: 'Service Location',
      route: 'Location',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 2,
      title: 'Categories and Services',
      route: 'Category',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 3,
      title: 'Transportation Fee',
      route: 'TransporationFee',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 4,
      title: 'Availability',
      route: 'Availability',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 5,
      title: 'Booking Rules',
      route: 'BookingRules',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 6,
      title: 'Studio Profile',
      route: 'ServiceLocationProfile',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 7,
      title: 'Profile',
      route: 'Profile',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 8,
      title: 'Portfolio',
      route: 'Portfolio',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 9,
      title: 'Policies',
      route: 'Policy',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 10,
      title: 'FAQ',
      route: 'FAQ',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 11,
      title: 'Health & Safety',
      route: 'HealthAndSafety',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 12,
      title: 'Payment Methods',
      route: 'PaymentMethods',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 13,
      title: 'Identity Verification',
      route: 'IdentityVerification',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
    {
      key: 14,
      title: 'Clients List',
      route: 'ClientList',
      rootRoute: 'BusinessSetup',
      params: {stepsHidden: true},
    },
  ],
  accountingMenuData: [
    // {
    //   key: 1,
    //   title: 'Upcoming',
    //   route: 'Upcoming',
    //   rootRoute: 'AccountingSetting',
    // },
    {
      key: 2,
      title: 'Transactions',
      route: 'Transactions',
      rootRoute: 'AccountingSetting',
    },
  ],
  inventoryMenuData: [
    {
      key: 1,
      title: '❌Design❌',
      route: 'TransactionHistory',
      rootRoute: 'InventorySetting',
    },
    {
      key: 2,
      title: '❌Design❌',
      route: 'PaymentMethods',
      rootRoute: 'InventorySetting',
    },
  ],
  personalSettingMenuMenuData: [
    {
      key: 1,
      title: 'Personal Information',
      route: 'PersonalInformation',
      rootRoute: 'PersonalSetting',
    },
    // {
    //   key: 2,
    //   title: 'Logins and Security',
    //   route: 'Logins&Security',
    //   rootRoute: 'PersonalSetting',
    // },
    // {
    //   key: 3,
    //   title: 'Notifications',
    //   route: 'Notifications',
    //   rootRoute: 'PersonalSetting',
    // },
  ],
  reviewsMenuData: [
    {
      key: 1,
      title: '❌Design❌',
      route: 'TransactionHistory',
      rootRoute: 'ReviewsSetting',
    },
    {
      key: 2,
      title: '❌Design❌',
      route: 'PaymentMethods',
      rootRoute: 'ReviewsSetting',
    },
  ],
  walletMenuData: [
    {
      key: 1,
      title: 'Beauty Card',
      route: 'BeautyCard',
      rootRoute: 'WalletSetting',
    },
    {
      key: 2,
      title: 'Beauty Coins',
      route: 'BeautyCoins',
      rootRoute: 'WalletSetting',
    },
    {
      key: 3,
      title: 'Gift Cards',
      route: 'GiftCards',
      rootRoute: 'WalletSetting',
    },
    {
      key: 4,
      title: 'Coupons',
      route: 'Coupons',
      rootRoute: 'WalletSetting',
    },
  ],
  supportMenuData: [
    {
      key: 1,
      title: 'Chat',
      route: 'Chat',
      rootRoute: 'SupportSetting',
    },
    {
      key: 2,
      title: 'Email',
      route: 'Email',
      rootRoute: 'SupportSetting',
    },
    {
      key: 3,
      title: 'Call',
      route: 'Call',
      rootRoute: 'SupportSetting',
    },
  ],
  beautyCardCarouselData: [
    {
      id: 1,
      image: require('../assets/media/BeautyCard.png'),
    },
    {
      id: 2,
      image: require('../assets/media/GiftCardBlue.png'),
    },
    {
      id: 3,
      image: require('../assets/media/GiftCard.png'),
    },
  ],
  giftCardCarouselData: [
    {
      id: 1,
      image: require('../assets/media/GiftCard.png'),
    },
    {
      id: 2,
      image: require('../assets/media/GiftCard2.png'),
    },
    {
      id: 3,
      image: require('../assets/media/GiftCard3.png'),
    },
  ],
  giftCardAmountData: [
    {
      id: 1,
      title: '$50',
      value: '$50',
    },
    {
      id: 2,
      title: '$100',
      value: '$100',
    },
    {
      id: 3,
      title: '$150',
      value: '$150',
    },
    {
      id: 4,
      title: '$200',
      value: '$200',
    },
    {
      id: 5,
      title: 'Custom',
      value: '',
    },
  ],
  giftCardSendMethod: [
    {
      id: 1,
      title: 'Email',
      value: 'Email',
    },
    {
      id: 2,
      title: 'SMS',
      value: 'SMS',
    },
    {
      id: 3,
      title: 'Both',
      value: 'Both',
    },
  ],
  buyGiftCardFormData: [
    {
      name: 'recipientInformation',
      type: 'header',
      title: 'recipient information',
    },
    {
      name: 'recipientName',
      type: 'input',
      label: 'recipient name',

      validation: 'required',
    },
    {
      name: 'recipientEmail',
      type: 'input',
      label: 'recipient email',

      validation: 'required',
    },
    {
      name: 'customMessage',
      type: 'header',
      title: 'custom message',
    },
    {
      name: 'giftMessage',
      type: 'input',
      label: 'Gift Message',
      inputType: 'textArea',
    },
    {
      name: 'senderInformation',
      type: 'header',
      title: 'Sender Information',
    },
    {
      name: 'senderName',
      type: 'input',
      label: 'sender name',
    },
    {
      name: 'submitTime',
      type: 'header',
      title: 'Submit Time',
    },
    {
      name: 'date',
      type: 'datePicker',
      label: 'Submit Time',
    },
  ],
  // transactionHistorySortData: [
  //   {
  //     key: 1,
  //     title: 'Latest',
  //     value: 'Latest',
  //   },
  //   {
  //     key: 2,
  //     title: 'Last 7 Days',
  //     value: 'Last7Days',
  //   },
  //   {
  //     key: 3,
  //     title: 'Last 30 Days',
  //     value: 'Last30Days',
  //   },
  //   {
  //     key: 4,
  //     title: 'All',
  //     value: 'All',
  //   },
  // ],
  // referralsFilterData: [
  //   {
  //     key: 1,
  //     title: 'Pending',
  //     value: 'Pending',
  //     isActive: true,
  //   },
  //   {
  //     key: 2,
  //     title: 'Completed',
  //     value: 'Completed',
  //     isActive: false,
  //   },
  //   {
  //     key: 3,
  //     title: 'Expired',
  //     value: 'Expired',
  //     isActive: false,
  //   },
  //   {
  //     key: 4,
  //     title: 'All',
  //     value: 'All',
  //     isActive: false,
  //   },
  // ],
};

export {SETTING_CONST};
