import {CalendarTick, People, WalletMoney} from 'iconsax-react-native';

const DASHBOARD_CONST = {
  overview: [
    {
      title: 'Revenue',
      key: 'revenue',
      icon: <WalletMoney size={16} color="#7A7A8A" />,
    },
    {
      title: 'Clients',
      key: 'clients',
      icon: <People size={16} color="#7A7A8A" />,
    },
    {
      title: 'Appointment Occupancy:',
      key: 'apps',
      icon: <CalendarTick size={16} color="#7A7A8A" />,
    },
  ],
  avrages: [
    {
      key: 'avg_booking',
      title: 'Avg Booking Value',
    },
    {
      key: 'avg_booking_freq',
      title: 'Avg Booking Frequency',
    },
    {
      key: 'avg_client_rtn',
      title: 'Avg Client Retention Rate',
    },
  ],
  reports: [
    {
      key: 'rtn_clients',
      title: 'Returning Clients',
    },
    {
      key: 'client_base',
      title: 'Client Base',
    },
    {
      key: 'monthly_apps',
      title: 'Monthly Appointments',
    },
    {
      key: 'weekly_hours',
      title: 'Weekly Working Hours',
    },
  ],
};

export {DASHBOARD_CONST};
