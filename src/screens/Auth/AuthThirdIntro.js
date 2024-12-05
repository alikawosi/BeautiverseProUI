import React from 'react';

import {IntroLayout} from '../../components/screens/Auth';

const AuthThirdIntro = () => {
  return (
    <IntroLayout
      image={require('../../assets/media/IntroThirdImage.png')}
      desc="Earn Money-Back & Rewards On Every Transaction"
      descStyle="text-[#3090C2]"
      gradient={['#3090C2', '#1A328A']}
      to="Login"
      isLast
    />
  );
};

export default AuthThirdIntro;
