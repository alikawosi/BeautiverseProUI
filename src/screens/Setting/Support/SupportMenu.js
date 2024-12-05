import React from 'react';

import {MenuScreenLayout} from '../../../components/screens/Setting';
import {SETTING_CONST} from '../../../constants';

const SupportMenu = () => {
  return <MenuScreenLayout menuData={SETTING_CONST.supportMenuData} />;
};

export default SupportMenu;
