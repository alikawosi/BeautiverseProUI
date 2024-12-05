import React, {useState} from 'react';
import {View, Text, Pressable, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {
  CheckBox,
  EmptyScreen,
  FullScreenModalWrapper,
  Input,
  TabBar,
  TabBarItem,
} from '../commons';
import {BUSINESSSETUP_CONST} from '../../constants';
import {CloseCircle, SearchNormal, Shop} from 'iconsax-react-native';
import {useQuery} from 'react-query';
import axios from 'axios';

const AddServiceModal = ({route}) => {
  const {goBack} = useNavigation();

  const {onSubmit = () => false, tabBar, initialSelectedList} = route.params;
  const [isAllServicesSelected, setIsAllServicesSelected] = useState(false);
  const [selectedItems, setSelectedItems] = useState(initialSelectedList);
  const [serviceList] = useState(BUSINESSSETUP_CONST.serviceData);
  const [searchText, setSearchText] = useState(null);

  const getServices = useQuery({
    queryFn: () => axios.get('/pro/setup/services'),
    // onSuccess: res => {
    //   let templist = [];
    //   res.map(item =>
    //     item.services.length > 0 ? templist.push(item.services) : null,
    //   );
    //   setServiceList(templist);
    // },
  });

  const checkBoxPressHandler = item => {
    let tempList = [...selectedItems];
    if (tempList.find(t => t.id === item.id)) {
      let index = tempList.findIndex(x => x.id === item.id);

      if (item.variations === tempList[index].variations) {
        var filteredList = tempList.filter(p => p.id !== item.id);
        setSelectedItems(filteredList);
      } else {
        var filteredList = tempList.filter(p => p.id !== item.id);
        filteredList.push(item);
        setSelectedItems(filteredList);
      }
    } else {
      tempList.push(item);
      setSelectedItems(tempList);
    }
  };

  const itemPressHandler = list => {
    let tempList = [...selectedItems];
    console.log(list, 'income');
    if (tempList.find(item => item.id === list.id)) {
      var filteredList = tempList.filter(p => p.id !== list.variations);
      if (list.variations.length >= 1) {
        filteredList.push(list);
      }
      setSelectedItems(filteredList);
    } else {
      tempList.push(list);
      setSelectedItems(tempList);
    }
  };
  const renderOption = item => {
    return (
      <CheckBox
        id={item.id}
        style={tw`flex-row justify-between h-11 py-3 items-center`}
        onPress={() => checkBoxPressHandler(item)}
        onPressItem={selectedItemList => itemPressHandler(selectedItemList)}
        isChecked={selectedItems.find(t => t === item) ? true : false}
        isChildSelected={
          selectedItems.length > 0 &&
          selectedItems.find(t => t !== item && t.id === item.id)
        }
        label={item.title}
        isAccordion={item.variations ? true : false}
        data={item.variations}
      />
    );
  };

  return (
    <FullScreenModalWrapper
      title={'Add Service'}
      backButton
      buttonTitle={'Add'}
      onSubmit={() => {
        onSubmit(selectedItems);
        goBack();
      }}>
      {serviceList.length > 0 ? (
        <Input
          inputValue={searchText}
          onChange={val => setSearchText(val)}
          placeholder="Search for a services"
          style={tw`border-0 mb-5 bg-white w-12/13 shadow self-center`}
          preffix={<SearchNormal size={24} color="#7A7A8A" style={tw`mx-1`} />}
          suffix={
            searchText ? (
              <Pressable style={tw`mr-1`} onPress={() => setSearchText('')}>
                <CloseCircle size={18} color="#7A7A8A" />
              </Pressable>
            ) : null
          }
        />
      ) : null}

      {tabBar ? (
        <TabBar>
          <TabBarItem
            options={{
              title: 'My Location',
              icon: <Shop size={18} color="#FF6E00" />,
            }}
          />
          <TabBarItem
            options={{
              title: 'Evening',
            }}
          />
        </TabBar>
      ) : null}
      <View style={tw`bg-white rounded-2xl px-6 py-6`}>
        <View style={tw`flex-row justify-between `}>
          <Text style={tw`bv-sans-base `}>Selected: </Text>
          <Text style={tw`bv-sans-sm text-primary`}>
            {selectedItems.length}
            <Text style={tw`bv-sans-sm `}>{`/${serviceList.length}`}</Text>
          </Text>
        </View>
        {getServices.isFetching || getServices.isLoading ? (
          <ActivityIndicator style={tw`mt-4`} color={'#FF9100'} />
        ) : serviceList.length > 0 ? (
          <CheckBox
            onPress={() => {
              setIsAllServicesSelected(!isAllServicesSelected);
              isAllServicesSelected
                ? setSelectedItems([])
                : setSelectedItems(serviceList);
            }}
            isChecked={isAllServicesSelected}
            label={`All Services{${serviceList.length}}`}
            style={tw`items-start justify-start py-3`}
          />
        ) : (
          <EmptyScreen description={'No service available!'} />
        )}
        {serviceList.map(item => renderOption(item))}
      </View>
    </FullScreenModalWrapper>
  );
};

export {AddServiceModal};
