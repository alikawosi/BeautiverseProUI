import React from 'react';

import tw from '../../../../tailwind';
import {GiftCards} from '../../elements';

const Cards = {
  1: GiftCards.Primary,
  2: GiftCards.Secondray,
};

const GiftCardsTab = ({data}) => {
  return (
    <>
      {data.map(({id, ...item}, index) => {
        index = (index % 2) + 1;
        const Component = Cards[index];

        return (
          <Component
            key={id}
            {...item}
            style={tw.style({
              'mt-4': index >= 1,
            })}
          />
        );
      })}
    </>
  );
};

export {GiftCardsTab};
