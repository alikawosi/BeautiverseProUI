import React from 'react';
import {Image, Text, View} from 'react-native';
import {Verify} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {SectionWrapper} from '../../elements';
import dayjs from 'dayjs';

const ClientInfoProfile = ({
  name,
  verified,
  avatar,
  last_visit,
  most_booked,
}) => {
  return (
    <SectionWrapper>
      <View>
        <View style={tw`items-center flex-row mb-[10.5px]`}>
          <Image
            style={tw`w-[72px] h-[72px] rounded-full`}
            source={
              avatar
                ? {uri: avatar}
                : require('../../../assets/media/UserDefault.png')
            }
          />
          <View style={tw`ml-4`}>
            <View style={tw`flex-row items-center`}>
              <Text style={tw`text-lg font-bold text-black mr-1`}>{name}</Text>
              {verified && <Verify size="16" color="#FF8A65" variant="Bold" />}
            </View>
            <Text style={tw`font-normal text-descGray`}>
              Last visit {dayjs(last_visit * 1000).format('MMM DD')} for{' '}
              {most_booked}...
            </Text>
          </View>
        </View>
      </View>
    </SectionWrapper>
  );
};

export {ClientInfoProfile};
