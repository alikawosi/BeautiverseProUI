import React from 'react';

import {MenuScreenLayout} from '../../../components/screens/Setting';
import {SETTING_CONST} from '../../../constants';

const AccountingMenu = () => {
  return <MenuScreenLayout menuData={SETTING_CONST.accountingMenuData} />;
};

export default AccountingMenu;
