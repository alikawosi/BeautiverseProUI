import React, {useMemo, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ActivityIndicator, Text, View} from 'react-native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {MenuOption} from 'react-native-popup-menu';
import BottomSheet, {useBottomSheetTimingConfigs} from '@gorhom/bottom-sheet';

import tw from '../../../tailwind';
import {PageWrapper, UnderLineTabBar} from '../../components/commons';
import {
  ClientInfoProfile,
  ClientInfoConnections,
  ClientInfoCardDetail,
  ClientInputTab,
  AppointmentsTab,
  InvoicesTab,
  PaymentCardsTab,
} from '../../components/screens/Client';
import {Footer} from '../../components/elements';
import {CLIENT_CONST} from '../../constants';
import {Easing} from 'react-native-reanimated';

const ClientInfo = () => {
  const {params} = useRoute();
  const {navigate, goBack} = useNavigation();
  const {data: clientInfo, isLoading} = useQuery({
    queryKey: ['ClientInfo', params?.id],
    queryFn: () =>
      axios.get('/pro/client/header', {
        params: {
          id: params?.id,
        },
      }),
  });
  const deleteClient = useMutation(
    () =>
      axios.delete('/pro/client', {
        params: {
          id: params?.id,
        },
      }),
    {
      onSuccess: goBack,
    },
  );
  const [tab, setTab] = useState(CLIENT_CONST.clientInfoTabBar[0].id);
  const {Content, footerOptions} = {
    clientsInput: {
      Content: ClientInputTab,
    },
    appointments: {
      Content: AppointmentsTab,
    },
    invoices: {
      Content: InvoicesTab,
    },
    paymentCards: {
      Content: PaymentCardsTab,
      footerOptions: [
        {
          title: 'Add Payment Card',
          onPress: () =>
            navigate('NewCardModal', {
              id: params?.id,
            }),
        },
      ],
    },
  }[tab];

  const options = useMemo(
    () => [
      {
        id: 1,
        title: 'Edit',
        onSelect: () =>
          navigate('EditClientModal', {
            id: params?.id,
          }),
      },
      {
        id: 2,
        title: 'Delete',
        titleStyle: `text-[#FF4444]`,
        onSelect: () => {
          if (!clientInfo) return;

          navigate('DeleteModal', {
            title: 'Delete Client',
            keyword: clientInfo.name,
            onSubmit: deleteClient.mutate,
            question: 'Are you sure to remove',
          });
        },
      },
    ],
    [clientInfo],
  );

  const [layout, setLayout] = useState({
    y: 0,
    height: 0,
  });

  const getLaoutHeight = (
    prop,
    {
      nativeEvent: {
        layout: {height},
      },
    },
  ) => {
    setLayout(prevState => ({...prevState, [prop]: height}));
  };

  const snapPoints = useMemo(
    () => [
      layout.height && layout.y ? Math.round(layout.height - layout.y) : '44%',
      '100%',
    ],
    [layout],
  );

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 200,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  });

  return (
    <PageWrapper
      hasOwnScroller
      backButton
      headerShown
      MenuOptions={
        <>
          {options.map(({id, title, titleStyle, onSelect}) => (
            <MenuOption key={id} style={tw.style(`h-9`)} onSelect={onSelect}>
              <Text style={tw.style(`bv-med-sm`, titleStyle)}>{title}</Text>
            </MenuOption>
          ))}
        </>
      }
      headerTitle="Client Info"
      contentContainerStyle={tw.style('flex-grow', {
        'pb-28': Boolean(footerOptions?.length) && tab === 'paymentCards',
        'pb-22': Boolean(footerOptions?.length),
      })}
      StickyFooterComponent={
        footerOptions && <Footer.Primary options={footerOptions} />
      }>
      <View
        style={tw`flex-grow relative`}
        onLayout={getLaoutHeight.bind(null, 'height')}>
        {clientInfo && (
          <>
            <View onLayout={getLaoutHeight.bind(null, 'y')}>
              <ClientInfoProfile {...clientInfo} />
              <ClientInfoConnections client={{...clientInfo, id: params?.id}} />
              <ClientInfoCardDetail {...clientInfo} />
            </View>
            <BottomSheet
              animationConfigs={animationConfigs}
              animateOnMount={false}
              handleComponent={null}
              snapPoints={snapPoints}
              containerHeight={layout.height}
              backgroundStyle={tw`rounded-t-3xl`}>
              <View style={[tw.style(`p-5 pb-0 flex-grow`)]}>
                <UnderLineTabBar
                  underLineHasItemWidth
                  containerStyle={tw`mb-4`}
                  onPressTab={({id}) => setTab(id)}
                  data={CLIENT_CONST.clientInfoTabBar}
                />
                <Content id={params?.id} />
              </View>
            </BottomSheet>
          </>
        )}
        {(isLoading || deleteClient.isLoading) && (
          <View
            style={tw`items-center justify-start absolute left-0 right-0 top-0 bottom-0 bg-white bg-opacity-50`}>
            <ActivityIndicator style={tw`mt-[70%]`} />
          </View>
        )}
      </View>
    </PageWrapper>
  );
};

export default ClientInfo;
