import React from 'react';

import {MenuScreenLayout} from '../../../components/screens/Setting';
import {SETTING_CONST} from '../../../constants';

const ReviewsMenu = () => {
  return <MenuScreenLayout menuData={SETTING_CONST.reviewsMenuData} />;
};

export default ReviewsMenu;
