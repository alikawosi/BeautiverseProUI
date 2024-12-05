import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import {Stop, TickSquare} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {Accordion, RadioGroup} from '../commons';

const SelectServices = ({
  id,
  index,
  title,
  selectedVariations,
  variations,
  setSelectedVariations,
}) => {
  const onChange = useCallback(value => {
    setSelectedVariations(prevState => {
      const newState = {...prevState};
      if (newState[id]?.id === value.id) {
        delete newState[id];
      } else {
        newState[id] = value;
      }

      return newState;
    });
  }, []);

  return (
    <Accordion
      icon={
        selectedVariations[id] ? (
          <TickSquare size={16} color="#FF6E00" variant="Bold" />
        ) : (
          <Stop size={16} color="#FF6E00" />
        )
      }
      suffix={
        <Text style={tw`text-xs text-descGray ml-1`}>
          ({variations.length})
        </Text>
      }
      titleStyle={tw`text-sm`}
      title={`${title}`}
      style={tw.style({
        'mt-6': index >= 1,
      })}>
      <View style={tw`px-5 ml-2 border-l mt-3 border-[#E4E7EC]`}>
        <RadioGroup
          onSelect={onChange}
          style={tw`py-3 mb-0`}
          containerStyle={tw`mt-0`}
          formValue={!selectedVariations[id]?.id && ''}
          itemLableStyle={tw`text-descGray text-sm`}
          options={variations.map((item, contentIndex) => {
            const title = `${item.title} - ${('0' + (contentIndex + 1)).slice(
              -2,
            )}`;
            return {...item, title};
          })}
        />
      </View>
    </Accordion>
  );
};

export {SelectServices};
