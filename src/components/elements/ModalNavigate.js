import React from 'react';
import {ArrowRight2} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';

import {SectionWrapper} from './SectionWrapper';
import {Button} from '../commons';
import tw from '../../../tailwind';

const ModalNavigate = ({routes}) => {
  const {navigate} = useNavigation();

  return (
    <SectionWrapper>
      {routes.map(({id, title, route}, index) => (
        <Button
          key={id}
          title={title}
          onPress={() => navigate(route)}
          icon={<ArrowRight2 size={16} color="#7A7A8A" />}
          style={tw`flex-row-reverse justify-between h-[24px]`}
          containerStyle={tw.style({
            'mt-5': index >= 1,
          })}
        />
      ))}
    </SectionWrapper>
  );
};

export {ModalNavigate};
