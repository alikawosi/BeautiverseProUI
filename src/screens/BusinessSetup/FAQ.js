import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {AddCircle} from 'iconsax-react-native';
import {Text, View} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {BusinessSetupLayout} from '../../components/screens/BusinessSetup';
import {Accordion, Button} from '../../components/commons';

const FAQ = () => {
  const {navigate, addListener} = useNavigation();
  const {params} = useRoute();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      getFAQ.refetch();
    });
    return unsubscribe;
  }, [getFAQ, addListener]);

  const getFAQ = useQuery({
    queryFn: () => axios.get('pro/setup/faq'),
    queryKey: ['getFAQ'],
  });

  const deleteFAQ = useMutation({
    mutationFn: id =>
      axios.delete('pro/setup/faq', {
        params: {id},
      }),
    onSuccess: getFAQ.refetch,
  });

  const renderItem = (item, index) => {
    let menuOption = [
      {
        title: 'Edit',
        onPress: () =>
          navigate('FAQModal', {
            faqItem: item,
          }),
        style: tw``,
      },
      {
        title: 'Delete',
        onPress: () =>
          navigate('DeleteModal', {
            keyword: item.question,
            title: 'Delete FAQ',
            titleStyle: tw`normal-case`,
            question: 'Are you sure to remove question',
            onSubmit: () => {
              deleteFAQ.mutate(item.id);
              setSelected(item.id);
            },
          }),
        style: tw`text-basicRed`,
      },
    ];
    return (
      <>
        <Accordion
          key={index}
          style={tw.style({
            'border-t border-gray-200 pt-3 mt-3': index > 0,
            'opacity-50': item.id === selected,
          })}
          title={item.question}
          titleStyle={tw`bv-sans-sm`}
          option={menuOption}>
          <Text key={index} style={tw`bv-med-sm text-grayBorder`}>
            {item.answer}
          </Text>
        </Accordion>
      </>
    );
  };

  return (
    <BusinessSetupLayout
      isLoading={getFAQ.isLoading}
      progress={11}
      isProgressVisible={!params?.stepsHidden}
      isFooterVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      headerTitle={'FAQ'}
      headerDesc={'Clients will see this before being able to contact you'}
      onPressNextButton={() => navigate('HealthAndSafety')}
      onPressSkipButton={() => navigate('HealthAndSafety')}
      listMode
      listContainerStyle={tw` mx-0 p-4 mb-4`}
      data={getFAQ?.data || []}
      renderItem={(item, index) => renderItem(item, index)}
      twoButtonFooter>
      <Button
        title={'Add FAQ'}
        titleStyle={tw`bv-sans-sm text-black`}
        containerStyle={tw`mx-5 mb-10 bg-gray-200 rounded-2xl`}
        icon={<AddCircle size={18} color="#000000" />}
        onPress={() => navigate('FAQModal')}
      />
    </BusinessSetupLayout>
  );
};

export default FAQ;
