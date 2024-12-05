import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {ArrowDown2, ArrowUp2} from 'iconsax-react-native';

import tw from '../../../../tailwind';
import {Button} from '../../commons';
import {SectionWrapper} from '../../elements';
import {CLIENT_CONST} from '../../../constants';
import dayjs from 'dayjs';

const ClientInfoCardDetail = ({
  apps,
  cancels,
  no_shows,
  revenue,
  most_booked,
  monthly_rev,
  discount,
  frequency,
  first_visit,
  last_visit,
}) => {
  const [contentIsVisible, setContentIsVisible] = useState(false);
  const {clientInfoDetail} = CLIENT_CONST;
  const header = [apps, cancels, no_shows, revenue].map((value, index) => ({
    value,
    title: clientInfoDetail.header[index],
  }));
  const content = new Array(3).fill('_').map((_, index) => {
    index += 1;
    index *= 2;
    return [
      most_booked,
      dayjs(first_visit * 1000).format('YY-MM-DD'),
      monthly_rev,
      discount,
      frequency,
      dayjs(last_visit * 1000).format('YY-MM-DD'),
    ]
      .map((value, index) => ({
        value,
        title: clientInfoDetail.content[index],
      }))
      .slice(index - 2, index);
  });
  const changingAccordionBehavior = () => {
    setContentIsVisible(!contentIsVisible);
  };

  return (
    <SectionWrapper style={tw`bg-[#E6E9F0] pb-0`}>
      <View>
        <View
          style={tw`flex-row px-5 justify-between pb-5 relative border-b border-black border-opacity-10`}>
          {header.map(({title, value}) => (
            <View key={title} style={tw`items-center`}>
              <Text style={tw`text-descGray text-xs mb-2`}>{title}</Text>
              <Text style={tw`text-black font-bold text-xs`}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
      <View
        style={tw.style(`overflow-hidden`, {
          maxHeight: contentIsVisible ? '100%' : 0,
        })}>
        <View style={tw`px-5 pt-5 flex-row justify-between items-start`}>
          {content.map((column, key) => {
            return (
              <View key={key} style={tw`justify-center`}>
                {column.map(({title, value}, index) => (
                  <View
                    key={title}
                    style={tw.style('items-center', {
                      'mb-5': index !== column.length - 1,
                    })}>
                    <Text style={tw`text-descGray text-xs mb-1`}>{title}</Text>
                    <Text style={tw`text-black font-bold text-xs`}>
                      {value}
                    </Text>
                  </View>
                ))}
              </View>
            );
          })}
        </View>
      </View>
      <Button
        reverse
        style={tw`h-auto`}
        defaultColor="#7A7A8A"
        titleStyle={tw`text-xs`}
        containerStyle={tw`py-5`}
        onPress={changingAccordionBehavior}
        title={contentIsVisible ? 'See less' : 'See more'}
        icon={
          contentIsVisible ? (
            <ArrowUp2 variant="Outline" size="16" color="#7A7A8A" />
          ) : (
            <ArrowDown2 variant="Outline" size="16" color="#7A7A8A" />
          )
        }
      />
    </SectionWrapper>
  );
};

export {ClientInfoCardDetail};
