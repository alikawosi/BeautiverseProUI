import React from 'react';
import {Text, View} from 'react-native';

import tw from '../../../tailwind';
import {FullScreenModalWrapper} from '../commons';
import {GENERAL_CONST} from '../../constants';
import {ModalNavigate} from '../elements';

const ServiceOrItemModal = () => {
  const {addServiceOrItem} = GENERAL_CONST;

  return (
    <FullScreenModalWrapper
      backButton
      title="Service or Item"
      hasSeparator={false}>
      {Object.keys(addServiceOrItem).map(key => (
        <View key={key}>
          <Text style={tw`text-sm font-medium px-5 mb-2`}>{key}</Text>
          <ModalNavigate routes={addServiceOrItem[key]} />
        </View>
      ))}
    </FullScreenModalWrapper>
  );
};

export {ServiceOrItemModal};
