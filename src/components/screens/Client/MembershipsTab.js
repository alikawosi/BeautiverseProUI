import React from 'react';

import tw from '../../../../tailwind';
import {EmptyScreen} from '../../commons';

const MembershipsTab = () => {
  return (
    <EmptyScreen
      style={tw`py-10`}
      description="You have no Memberships yet ..."
    />
  );
};

export {MembershipsTab};
