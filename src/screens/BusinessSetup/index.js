import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import BusinessSetupIntro from './BusinessSetupIntro';
import Location from './Location';
import Category from './Category';
import Service from './Service';
import TransporationFee from './TransporationFee';
import Availability from './Availability';
import BookingRules from './BookingRules';
import ServiceLocationProfile from './ServiceLocationProfile';
import Profile from './Profile';
import Portfolio from './Portfolio';
import Policy from './Policy';
import FAQ from './FAQ';
import HealthAndSafety from './HealthAndSafety';
import PaymentMethods from './PaymentMethods';
import IdentityVerification from './IdentityVerification';
import ClientList from './ClientList';
import {BusinessSetupHeader} from '../../components/screens/BusinessSetup';
import Test from '../Test/Test';
import {
  AddressModal,
  AutomatedFeeModal,
  CancellationPolicyModal,
  AddServiceModal,
  AvailabilityModal,
  AddCategoryModal,
  EditCategoryModal,
  FAQModal,
  IdentityVerificationModal,
  NewServiceModal,
  ManualFeeModal,
  NoShowPolicyModal,
  ServiceAreaModal,
  TransportationFeeModal,
  ImportClientModal,
} from '../../components/modals';

const Stack = createNativeStackNavigator();

const BusinessSetup = () => {
  return (
    <Stack.Navigator
      //initialRouteName="Category"
      screenOptions={screen => ({
        //headerStyle: {backgroundColor: ''},
        header: props => <BusinessSetupHeader {...props} />,
        headerShown: true,
      })}>
      <Stack.Screen
        name="BusinessSetupIntro"
        component={BusinessSetupIntro}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Location"
        initialParams={{title: 'Location'}}
        component={Location}
      />
      <Stack.Screen
        name="Category"
        initialParams={{title: 'Categories and Services'}}
        component={Category}
      />
      <Stack.Screen name="Service" component={Service} />
      <Stack.Screen
        name="TransporationFee"
        initialParams={{title: 'Transportation Fee'}}
        component={TransporationFee}
      />
      <Stack.Screen
        name="Availability"
        initialParams={{title: 'Availability'}}
        component={Availability}
      />
      <Stack.Screen
        name="BookingRules"
        initialParams={{title: 'Booking Rules'}}
        component={BookingRules}
      />
      <Stack.Screen
        name="ServiceLocationProfile"
        initialParams={{title: 'Studio Profile '}}
        component={ServiceLocationProfile}
      />
      <Stack.Screen
        name="Profile"
        initialParams={{title: 'Profile'}}
        component={Profile}
      />
      <Stack.Screen
        name="Portfolio"
        initialParams={{title: 'Portfolio'}}
        component={Portfolio}
      />
      <Stack.Screen
        name="Policy"
        initialParams={{title: 'Policies'}}
        component={Policy}
      />
      <Stack.Screen name="FAQ" initialParams={{title: 'FAQ'}} component={FAQ} />
      <Stack.Screen
        name="HealthAndSafety"
        initialParams={{title: 'Health & Safety'}}
        component={HealthAndSafety}
      />
      <Stack.Screen
        name="PaymentMethods"
        initialParams={{title: 'Payment Methods'}}
        component={PaymentMethods}
      />
      <Stack.Screen
        name="IdentityVerification"
        initialParams={{title: 'Verification'}}
        component={IdentityVerification}
      />
      <Stack.Screen
        name="ClientList"
        initialParams={{title: 'Client List'}}
        component={ClientList}
      />
      <Stack.Group screenOptions={{presentation: 'modal', headerShown: false}}>
        <Stack.Screen name="Test" component={Test} />
        <Stack.Screen name="AddressModal" component={AddressModal} />
        <Stack.Screen name="ServiceAreaModal" component={ServiceAreaModal} />
        <Stack.Screen name="AddCategoryModal" component={AddCategoryModal} />
        <Stack.Screen
          name="IdentityVerificationModal"
          component={IdentityVerificationModal}
        />
        <Stack.Screen name="FAQModal" component={FAQModal} />
        <Stack.Screen
          name="CancellationPolicyModal"
          component={CancellationPolicyModal}
        />
        <Stack.Screen name="NoShowPolicyModal" component={NoShowPolicyModal} />
        <Stack.Screen name="AutomatedFeeModal" component={AutomatedFeeModal} />
        <Stack.Screen name="ManualFeeModal" component={ManualFeeModal} />
        <Stack.Screen name="AvailabilityModal" component={AvailabilityModal} />
        <Stack.Screen name="ImportClientModal" component={ImportClientModal} />
        <Stack.Screen name="AddServiceModal" component={AddServiceModal} />
        <Stack.Screen name="NewServiceModal" component={NewServiceModal} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{presentation: 'transparentModal', headerShown: false}}>
        <Stack.Screen name="EditCategoryModal" component={EditCategoryModal} />
        <Stack.Screen
          name="TransportationFeeModal"
          component={TransportationFeeModal}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default BusinessSetup;
