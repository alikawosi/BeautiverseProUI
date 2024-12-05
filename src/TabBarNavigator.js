import React from 'react';
import {Text} from 'react-native';
import {
  Calendar as CalendarIcon,
  Briefcase,
  DirectInbox,
  Category,
  HomeHashtag,
} from 'iconsax-react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import tw from '../tailwind';
import Calendar from './screens/Calendar';
//import Inbox from './screens/Chat/Inbox';
import ToolBox from './screens/Client/ToolBox';
import Dashboard from './screens/Dashboard';
import SettingScreens from './screens/Setting';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  // const userPosition = useAuth();
  // userPosition.userLocation();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        title: route.name,
        tabBarLabel: ({focused, title}) => {
          focused ? (title = route.name) : (title = '');
          return <Text style={tw`text-primary text-xs`}>{title}</Text>;
        },
        tabBarStyle: tw`min-h-20 py-3 shadow-md rounded-t-20`,
        tabBarIcon: ({focused}) => {
          let icon = null;
          switch (route.name) {
            case 'Calendar':
              icon = CalendarIcon;
              break;
            case 'ToolBox':
              icon = Briefcase;
              break;
            case 'Dashboard':
              icon = HomeHashtag;
              break;
            case 'Inbox':
              icon = DirectInbox;
              break;
            case 'Setting':
              icon = Category;
              break;
          }
          return React.createElement(icon, {
            color: focused ? '#FF6E00' : '#717171',
            size: 28,
            variant: null,
          });
        },
      })}>
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen
        name="ToolBox"
        options={{unmountOnBlur: true}}
        component={ToolBox}
      />
      <Tab.Screen name="Dashboard" component={Dashboard} />
      {/* <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{tabBarBadge: 3, unmountOnBlur: true}}
      /> */}
      <Tab.Screen name="Setting" component={SettingScreens} />
    </Tab.Navigator>
  );
};

export default TabBar;
