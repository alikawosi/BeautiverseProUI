import React from 'react';

import {MenuScreenLayout} from '../../../components/screens/Setting';
import {SETTING_CONST} from '../../../constants';

const WalletMenu = () => {
  return <MenuScreenLayout menuData={SETTING_CONST.walletMenuData} />;
};

export default WalletMenu;
