import React from 'react';

import {MenuScreenLayout} from '../../../components/screens/Setting';
import {SETTING_CONST} from '../../../constants';

const InventoryMenu = () => {
  return <MenuScreenLayout menuData={SETTING_CONST.inventoryMenuData} />;
};

export default InventoryMenu;
