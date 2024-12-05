import React from 'react';
import {Text, View} from 'react-native';

import tw from '../../../../tailwind';
import {Button} from '../../commons';

const Footnote = () => {
  return (
    <View style={tw`items-center`}>
      <Text style={tw`text-xs text-descGray font-med`}>
        To learn more about online payments, visit
      </Text>
      <Button
        style={tw`h-auto`}
        title="Beautiverse Support"
        titleStyle={tw`text-[#2084FF] text-xs font-med`}
      />
    </View>
  );
};

export {Footnote};
