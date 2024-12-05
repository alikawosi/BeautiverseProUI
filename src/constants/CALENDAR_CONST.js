var today = new Date();
import dayjs from 'dayjs';

const CALENDAR_CONST = {
  weekDays: [
    {id: 1, title: 'Monday'},
    {id: 2, title: 'Tuesday'},
    {id: 3, title: 'Wednesday'},
    {id: 4, title: 'Thursday'},
    {id: 5, title: 'Friday'},
    {id: 6, title: 'Saturday'},
    {id: 7, title: 'Sunday'},
  ],
  filtersFormData: [
    {
      name: 'my_location',
      label: 'My Location',
    },
    {
      name: 'client_location ',
      label: 'Client`s Location',
    },
  ],
  attributesFormData: [
    {
      name: 'unconfirmed',
      label: 'Unconfirmed',
    },
    {
      name: 'confirm',
      label: 'Confirm',
    },
    {
      name: 'in_progress',
      label: 'In Progress',
    },
    {
      name: 'completed',
      label: 'Completed',
    },
  ],
  calendarMode: [
    {
      id: 'day',
      value: 'Daily',
    },
    {
      id: 'threeDays',
      value: '3-Day',
    },
  ],
  personalEventFromData: [
    {
      name: 'dateAndTime',
      type: 'input',
      label: 'Date & Time',
      validation: 'required',
    },
    {
      name: 'duration',
      type: 'input',
      label: 'Duration',
      validation: 'required',
    },
  ],
  servicesDotData: [
    {
      key: 'vacation',
      color: '#5948AA',
      selectedDotColor: 'white',
    },
    {key: 'massage', color: '#5948AA', selectedDotColor: 'white'},
    {key: 'workout', color: '#5948AA', selectedDotColor: 'white'},
  ],
  requestsData: [
    {
      id: 1,
      name: 'Alice Barton',
      image: null,
      requestTime: '2h Ago',
      date: 'Saturday, Aug 4',
      time: '04:00 PM',
      category: 'Hybrid Lashes',
      distance: '2.3',
      address: '25 Capreol Ct, Toronto',
    },
    {
      id: 2,
      name: 'Alice Barton',
      image: null,
      requestTime: '2h Ago',
      date: 'Saturday, Aug 4',
      time: '04:00 PM',
      category: 'Hybrid Lashes',
      distance: '2.3',
      address: '25 Capreol Ct, Toronto',
    },
  ],
  appointmentsData: [
    {
      id: 1,
      name: 'Alice Barton',
      isChecked: true,
      hasAttachment: true,
      category: 'Hybrid Lashes',
      start: '03:00 AM',
      end: '05:00 AM',
      distance: '2.3',
      address: '25 Capreol Ct, Toronto',
      bgColor: '#FFB24B',
      borderColor: '#FF6E00',
    },
    {
      id: 2,
      name: 'Alice Barton',
      isChecked: true,
      hasAttachment: true,
      category: 'Hybrid Lashes',
      start: '03:00 AM',
      end: '05:00 AM',
      distance: '2.3',
      //address: '25 Capreol Ct, Toronto',
      bgColor: '#7E6ADE',
      borderColor: '#5948AA',
    },
    {
      id: 3,
      name: 'Alice Barton',
      isChecked: false,
      //hasAttachment: true,
      //category: 'Hybrid Lashes',
      start: '03:00 AM',
      end: '05:00 AM',
      //distance: '2.3',
      //address: '25 Capreol Ct, Toronto',
    },
  ],
  fakeDays: [
    {
      id: 1,
      weekDay: `${dayjs().day(today.getDay()).format('dddd')}`,
      date: `${dayjs().day(today.getDay()).format('MMM DD')}`,
      appointmentList: [
        {
          id: 1,
          name: 'Alice Barton',
          isChecked: true,
          hasAttachment: true,
          category: 'Hybrid Lashes',
          start: '03:00 AM',
          end: '05:00 AM',
          distance: '2.3',
          address: '25 Capreol Ct, Toronto',
        },
        {
          id: 2,
          name: 'Alice Barton',
          isChecked: true,
          hasAttachment: true,
          category: 'Hybrid Lashes',
          start: '03:00 AM',
          end: '05:00 AM',
          distance: '2.3',
          //address: '25 Capreol Ct, Toronto',
        },
        {
          id: 3,
          name: 'personal event',
          isChecked: false,
          //hasAttachment: true,
          //category: 'Hybrid Lashes',
          start: '03:00 AM',
          end: '05:00 AM',
          //distance: '2.3',
          //address: '25 Capreol Ct, Toronto',
        },
      ],
    },
    {
      id: 2,
      weekDay: `${dayjs()
        .day(today.getDay() + 1)
        .format('dddd')}`,
      date: `${dayjs()
        .day(today.getDay() + 1)
        .format('MMM DD')}`,
      appointmentList: [],
    },
    {
      id: 3,
      weekDay: `${dayjs()
        .day(today.getDay() + 2)
        .format('dddd')}`,
      date: `${dayjs()
        .day(today.getDay() + 2)
        .format('MMM DD')}`,
      appointmentList: [
        {
          id: 1,
          name: 'Alice Barton',
          isChecked: true,
          hasAttachment: true,
          category: 'Hybrid Lashes',
          start: '03:00 AM',
          end: '05:00 AM',
          distance: '2.3',
          address: '25 Capreol Ct, Toronto',
          bgColor: '#FFB24B',
          borderColor: '#FF6E00',
        },
        {
          id: 2,
          name: 'Alice Barton',
          isChecked: true,
          hasAttachment: true,
          category: 'Hybrid Lashes',
          start: '03:00 AM',
          end: '05:00 AM',
          distance: '2.3',
          //address: '25 Capreol Ct, Toronto',
          bgColor: '#7E6ADE',
          borderColor: '#5948AA',
        },
        {
          id: 3,
          name: 'Alice Barton',
          isChecked: false,
          //hasAttachment: true,
          //category: 'Hybrid Lashes',
          start: '03:00 AM',
          end: '05:00 AM',
          //distance: '2.3',
          //address: '25 Capreol Ct, Toronto',
        },
      ],
    },
  ],
};

export {CALENDAR_CONST};
