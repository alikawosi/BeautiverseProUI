import React from 'react';

import {FullScreenModalWrapper} from '../../../commons';
import {ModalNavigate} from '../../../elements';
import {GENERAL_CONST} from '../../../../constants';

const DiscountOrItemModal = () => {
  const {Items} = GENERAL_CONST.addServiceOrItem;

  return (
    <FullScreenModalWrapper
      title="Discount or Item"
      backButton
      hasSeparator={false}>
      <ModalNavigate routes={Items} />
    </FullScreenModalWrapper>
  );
};

export {DiscountOrItemModal};
