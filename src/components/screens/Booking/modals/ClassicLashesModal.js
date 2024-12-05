import React from 'react';
import {Text, View} from 'react-native';

import tw from '../../../../../tailwind';
import {SectionWrapper} from '../../../elements';
import {Button, Form, ModalWrapper} from '../../../commons';
import {BOOKING_CONST, FAKE_CONST} from '../../../../constants';
import {TickCircle} from 'iconsax-react-native';

const ClassicLashesModal = () => {
  const {classicLashesFields} = BOOKING_CONST;
  const {variations} = FAKE_CONST;

  return (
    <ModalWrapper
      title="Classic Lashes"
      type="fromBottom"
      style={tw`pb-5 bg-transparent shadow-none`}>
      <SectionWrapper style={tw`mt-5`}>
        <Form fields={classicLashesFields} />
      </SectionWrapper>
      <Text style={tw`text-descGray text-sm mt-4 mb-2`}>Variations:</Text>
      <SectionWrapper>
        {variations.map(
          (
            {id, title, price, discountedPrice, discount, duration, done},
            index,
          ) => (
            <View
              key={id}
              style={tw.style(
                'p-3 flex-row items-center justify-between rounded-2xl',
                {
                  'mt-2': index > 0,
                  'bg-selectedGray': id === 3,
                },
              )}>
              <View>
                <View style={tw`flex-row items-center`}>
                  <View style={tw`w-1 h-1 bg-[#FF6E00] rounded-full`} />
                  <Text style={tw`text-base text-descGray ml-1 mr-2`}>
                    {title}
                  </Text>
                  <Text style={tw`text-xs text-descGray`}>Info</Text>
                </View>
                <View style={tw`flex-row items-end`}>
                  <Text style={tw`text-xs text-descGray`}>{price}</Text>
                  <Text
                    style={tw`text-xs text-[#9F9FAB] line-through ml-1 mb-[2px]`}>
                    {discountedPrice}
                  </Text>
                  <Text style={tw`text-xs text-descGray`}> | {duration}</Text>
                  <Text
                    style={tw`text-10 text-white bg-black py-[2.5px] px-2 rounded-lg ml-2`}>
                    {discount}
                  </Text>
                </View>
              </View>
              {done && <TickCircle size={17} color="#FF6E00" variant="Bold" />}
            </View>
          ),
        )}
      </SectionWrapper>
      <Button
        primary
        title="Confirm"
        titleStyle={tw`text-sm`}
        gradientStyle={tw`rounded-xl`}
      />
    </ModalWrapper>
  );
};

export {ClassicLashesModal};
