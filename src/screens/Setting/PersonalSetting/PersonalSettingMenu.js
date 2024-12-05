import React from 'react';

import {MenuScreenLayout} from '../../../components/screens/Setting';
import {SETTING_CONST} from '../../../constants';

const PersonalSettingMenu = () => {
  return (
    <MenuScreenLayout menuData={SETTING_CONST.personalSettingMenuMenuData} />
  );
};

export default PersonalSettingMenu;
