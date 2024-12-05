import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {AddCircle} from 'iconsax-react-native';

import tw from '../../../tailwind';
import {BusinessSetupLayout} from '../../components/screens/BusinessSetup';
import {ContactCard} from '../../components/elements';
import {Button} from '../../components/commons';

const ClientList = () => {
  const {navigate, addListener, reset} = useNavigation();
  const {params} = useRoute();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const unsubscribe = addListener('focus', () => {
      getClient.refetch();
    });
    return unsubscribe;
  }, [getClient, addListener]);

  const getClient = useQuery({
    queryFn: () => axios.get('/pro/clients'),
    queryKey: ['getClient'],
  });

  const deleteClient = useMutation({
    mutationFn: id =>
      axios.delete('/pro/clients', {
        params: {id: id},
      }),
    onSuccess: getClient.refetch,
  });

  const onDelete = ({id, name}) => {
    navigate('DeleteModal', {
      keyword: name,
      title: 'Delete Contact',
      question: 'Are you sure to remove contact',
      onSubmit: () => {
        deleteClient.mutate(id);
        setSelected(id);
      },
    });
  };

  return (
    <BusinessSetupLayout
      isLoading={getClient.isLoading}
      progress={15}
      isProgressVisible={!params?.stepsHidden}
      isFooterVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      listContainerStyle={tw`m-0`}
      headerTitle={'Client List'}
      headerDesc={
        getClient.data?.length > 0
          ? `Imported contacts: ${getClient.data?.length}`
          : 'Import Clien`s from your Contacts First'
      }
      footerButtonTitle={'Finish'}
      onPressNextButton={() => {
        reset({
          index: 0,
          routes: [{name: 'TabBar'}],
        });
      }}
      listMode={getClient.data?.length > 0 ? true : false}
      data={getClient.data || []}
      renderItem={item => (
        <ContactCard
          style={tw.style({
            'opacity-50': item.id === selected,
          })}
          name={item?.name}
          image={item?.avatar}
          isVerify={item.verified}
          email={item.email}
          phoneNumber={item.phone}
          key={item.id}
          type="close"
          onPress={onDelete.bind(null, item)}
        />
      )}>
      <Button
        title={'Add Client'}
        titleStyle={tw`bv-sans-sm text-black`}
        containerStyle={tw`mx-5 mt-4 mb-10 bg-gray-200 rounded-2xl`}
        icon={<AddCircle size={18} color="#000000" />}
        onPress={() => navigate('ImportClientModal')}
      />
    </BusinessSetupLayout>
  );
};

export default ClientList;
