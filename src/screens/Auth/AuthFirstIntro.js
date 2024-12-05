import React from 'react';

import {IntroLayout} from '../../components/screens/Auth';

const AuthFirstIntro = () => {
  return (
    <IntroLayout
      image={require('../../assets/media/IntroFirstImage.png')}
      desc="Find & Book With The Best Service Professionals"
      descStyle="text-basicPurple"
      gradient={['#AB65F1', '#5948AA']}
      to="SecondIntro"
    />
  );
};

export default AuthFirstIntro;
