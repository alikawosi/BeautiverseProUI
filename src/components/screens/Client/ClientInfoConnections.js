import React from 'react';
import {Linking, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../../tailwind';
import {CLIENT_CONST} from '../../../constants/CLIENT_CONST';
import {Button} from '../../commons';
import {SectionWrapper} from '../../elements';

const ClientInfoConnections = ({client}) => {
  const {navigate} = useNavigation();
  const methods = {
    Call: () => Linking.openURL(`tel:${client.phone}`),
    Book: () =>
      navigate('Booking', {
        screen: 'NewAppointmentModal',
        params: {
          client,
        },
      }),
  };

  return (
    <SectionWrapper>
      <View style={tw`flex-row justify-around px-5`}>
        {CLIENT_CONST.clientInfoConnections.map(({title, icon}) => (
          <Button
            key={title}
            title={title}
            icon={icon}
            onPress={methods[title]}
            style={tw`flex-col h-auto`}
            titleStyle={tw`mt-3 text-xs font-bold text-descGray`}
          />
        ))}
      </View>
    </SectionWrapper>
  );
};

export {ClientInfoConnections};
