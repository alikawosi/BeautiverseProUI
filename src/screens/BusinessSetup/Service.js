import React, {useState} from 'react';
import {AddCircle} from 'iconsax-react-native';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {Button, Tag, UnderLineTabBar} from '../../components/commons';
import {
  BookServiceCard,
  BusinessSetupLayout,
  SectionWrapper,
} from '../../components/screens/BusinessSetup';
import {BUSINESSSETUP_CONST, FAKE_CONST} from '../../constants';
import {ScrollView} from 'react-native';

const Service = () => {
  const {navigate} = useNavigation();
  const [tab, setTab] = useState(0);

  const getServiceMainData = useQuery({
    queryFn: async () => await axios.get('/pro/setup/services'),
    queryKey: ['getServiceMainData'],
    onSuccess: res => {
      console.log(res);
      res.length > 0 ? setTab(res[0]?.id) : null;
    },
  });
  return (
    <BusinessSetupLayout
      isLoading={getServiceMainData.isLoading || getServiceMainData.isFetching}
      progress={3}
      headerTitle={'Which services do you provide?'}
      headerDesc={
        'We highly recommend using the default provided options as much as possible to get better results'
      }
      onPressNextButton={() => navigate('TransporationFee')}
      onPressSkipButton={() => navigate('TransporationFee')}
      twoButtonFooter
      contentContainerStyle={tw`px-5`}>
      <SectionWrapper
        desc={
          'We highly recommend using the default provided options as much as possible to get better results'
        }
        descStyle={tw`mb-6`}>
        {!getServiceMainData.isLoading && !getServiceMainData.isFetching ? (
          <UnderLineTabBar
            underLineHasItemWidth
            onPressTab={({id}) => setTab(id)}
            data={getServiceMainData.data ? getServiceMainData.data : null}
          />
        ) : null}
        {console.log('tab', tab)}
        <ScrollView
          contentContainerStyle={tw`flex-row items-start my-3`}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {getServiceMainData.data?.map(item =>
            item.id === tab ? (
              <>
                <Tag
                  key={item.sex}
                  titleStyle={tw`text-descGray`}
                  containerStyle={tw`bg-gray-200 p-1 mr-2`}
                  title={item.sex}
                  icon={item.icon}
                />
                <Tag
                  key={item.service_location}
                  titleStyle={tw`text-descGray`}
                  containerStyle={tw`bg-gray-200 p-1 mr-2`}
                  title={item.service_location}
                  icon={item.icon}
                />
              </>
            ) : null,
          )}
          {/* {getServiceMainData.data?.map(item => (
            <Tag
              key={item.id}
              titleStyle={tw`text-descGray`}
              containerStyle={tw`bg-gray-200 p-1 mr-2`}
              title={item.title}
              icon={item.icon}
            />
          ))} */}
        </ScrollView>
        {FAKE_CONST.profileServiceData.map(item => (
          <BookServiceCard key={item.id} {...item} />
        ))}
        <Button
          title={'Add Service'}
          defaultColor={'#7A7A8A'}
          titleStyle={tw`bv-sans-sm`}
          style={tw`border border-gray-400 rounded-2xl`}
          icon={<AddCircle size={16} color="#7A7A8A" />}
          onPress={() => navigate('BusinessSetup', {screen: 'NewServiceModal'})}
        />
      </SectionWrapper>
    </BusinessSetupLayout>
  );
};

export default Service;
