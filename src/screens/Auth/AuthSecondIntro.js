import React from 'react';

import {IntroLayout} from '../../components/screens/Auth';

const AuthSecondIntro = () => {
  return (
    <IntroLayout
      image={require('../../assets/media/IntroSecondImage.png')}
      desc="Easily Rebook All Your Appointments In One Place"
      descStyle="text-[#FF78F6]"
      gradient={['#FFC2FA', '#FD87FF']}
      to="ThirdIntro"
    />
  );
};

export default AuthSecondIntro;
