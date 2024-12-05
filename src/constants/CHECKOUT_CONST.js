const CHECKOUT_CONST = {
  paymentMethods: [
    {
      id: 1,
      route: 'CardsOnFile',
      title: 'Cards on File',
    },
    {
      id: 2,
      route: 'ManualCreditCardEntry',
      title: 'Manual Credit Card Entry',
    },
    {
      id: 3,
      route: 'Cash',
      title: 'Cash',
    },
    // {
    //   id: 4,
    //   route: 'OtherPaymentMethod',
    //   title: 'Other Payment Method',
    // },
  ],
};

export {CHECKOUT_CONST};
