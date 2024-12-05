const BOOKING_CONST = {
  editRecurs: [
    {
      name: 'frequency',
      type: 'select',
      label: 'Frequency',
      validation: 'required',
    },
    {
      name: 'endTime',
      type: 'select',
      label: 'End Time',
      validation: 'required',
    },
  ],
  customTime: {
    hour: new Array(13).fill('_').map((_, index) => ({value: index})),
    minute: [0].reduce(arr => {
      for (let i = 0; i < 65; i += 5) {
        arr.push({value: i});
      }
      return arr;
    }, []),
  },
  classicLashesFields: [
    {
      name: 'price',
      type: 'input',
      label: 'Price',
    },
    {
      name: 'duration',
      type: 'select',
      label: 'Duration',
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
        arr.push({value: ('0' + i).slice(-2)});
      }
      return arr;
    }, []),
  },
  frequencyData: {
    number: [0].reduce(arr => {
      for (let i = 1; i < 4; i++) {
        arr.push({value: i});
      }
      return arr;
    }, []),
    moment: [
      {
        value: 'day',
      },
      {
        value: 'week',
      },
      {
        value: 'month',
      },
    ],
  },
  endTimeData: [
    {
      value: 1,
      title: 1,
    },
    {
      value: 2,
      title: 2,
    },
    {
      value: 3,
      title: 3,
    },
  ],
};

export {BOOKING_CONST};
