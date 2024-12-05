import React from 'react';
import {Text, View} from 'react-native';

import tw from '../../../../tailwind';
import {Button, Select} from '../../commons';

const AttachmentsTab = () => {
  return (
    <>
      <Text style={tw`bv-sans-sm`}>18 August 2023</Text>
      <View style={tw`relative mt-4`}>
        <Select
          titleStyle={tw`text-base`}
          defaultValue="Attachments"
          style={tw`border-0 bg-white rounded-xl z-10 px-2`}
          options={[{id: 1, title: 'Attachments', value: 'Attachments'}]}
        />
      </View>
      <Button
        containerStyle={tw`mt-2`}
        title="Show for Beautition"
        titleStyle={tw`text-descGray text-xs opacity-60`}
        style={tw`h-auto justify-start`}
      />
    </>
  );
};

export {AttachmentsTab};
