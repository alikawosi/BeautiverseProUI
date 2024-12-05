import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View} from 'react-native';

import tw from '../../../tailwind';
import {Button, ModalWrapper} from '../commons';

const DeleteModal = ({route}) => {
  const {
    title,
    question,
    keyword,
    onSubmit = () => false,
    titleStyle,
  } = route.params;
  const {goBack} = useNavigation();

  return (
    <ModalWrapper
      type="fromBottom"
      titleStyle={titleStyle}
      title={title}
      titleSeparator>
      <Text style={tw`bv-sans-sm py-10 text-center text-descGray`}>
        {question} "{<Text style={tw`bv-sans-sm text-primary`}>{keyword}</Text>}
        " ?
      </Text>
      <View style={tw`flex-row justify-between`}>
        <Button
          secondary
          containerStyle={tw`flex-1 mr-1`}
          title={'No'}
          onPress={() => goBack()}
        />
        <Button
          primary
          containerStyle={tw`flex-1 ml-1 pb-5`}
          title={'Yes'}
          onPress={() => {
            onSubmit();
            goBack();
          }}
        />
      </View>
    </ModalWrapper>
  );
};

export {DeleteModal};
