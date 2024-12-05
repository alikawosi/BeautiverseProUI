import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  SectionList,
  ActivityIndicator,
  AppState,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {useQuery} from 'react-query';
import {useIsFocused} from '@react-navigation/native';

import tw from '../../../tailwind';
import {ContactCard} from '.';
import {EmptyScreen} from '../commons';

const ContactsList = ({
  type,
  style,
  isSelected = false,
  selectContact = () => false,
  searchValue = '',
}) => {
  const isFocused = useIsFocused();
  const [appState, setAppState] = useState(true);
  const sortContacts = useCallback(data => {
    let contactsArr = [];
    let aCode = 'A'.charCodeAt(0);

    for (let i = 0; i < 26; i++) {
      let currChar = String.fromCharCode(aCode + i);
      let obj = {
        title: currChar,
      };
      let currContacts = data.filter(item => {
        return (
          (item?.givenName || item?.displayName)[0].toUpperCase() === currChar
        );
      });
      if (currContacts.length > 0) {
        currContacts.sort((a, b) => {
          return (a?.givenName || a?.displayName).localeCompare(
            b?.givenName || b?.displayName,
          );
        });
        obj.data = currContacts;
        contactsArr.push(obj);
      }
    }

    const anonymousContacts = data.filter(
      item => item.phoneNumbers[0].number === item.displayName,
    );
    if (anonymousContacts.length) {
      contactsArr.push({
        title: '#',
        data: anonymousContacts,
      });
    }
    return contactsArr;
  }, []);

  const {data, refetch, isLoading} = useQuery({
    queryKey: 'contacts',
    queryFn: async () => {
      let result = null;

      if (Platform.OS === 'android') {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: 'Contacts',
            message: 'This app would like to view your contacts.',
            buttonPositive: 'Please accept bare mortal',
          },
        );
        if (status === PermissionsAndroid.RESULTS.GRANTED) {
          result = await Contacts.getAll();
        }
      } else if (Platform.OS === 'ios') {
        result = await Contacts.getAll();
      }

      return result;
    },
  });

  useEffect(() => {
    if (isFocused || appState) {
      refetch();
    }
  }, [isFocused, appState]);

  useEffect(() => {
    AppState.addEventListener('change', state => {
      setAppState(state === 'active' ? true : false);
    });
  }, []);

  const sectionListData = data?.filter(
    ({phoneNumbers, displayName, emailAddresses, givenName, familyName}) => {
      const filter = searchValue.toLowerCase();
      const name =
        givenName && familyName
          ? `${givenName} ${familyName}`
          : givenName || familyName || displayName || '';

      return (
        phoneNumbers[0]?.number.toLowerCase().includes(filter) ||
        emailAddresses[0]?.email.toLowerCase().includes(filter) ||
        name.toLowerCase().includes(filter)
      );
    },
  );

  return (
    <>
      {isLoading ? (
        <View style={tw`items-center justify-center flex-1`}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          {Boolean(sectionListData.length) ? (
            <SectionList
              style={tw.style(style)}
              sections={sortContacts(sectionListData)}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.rawContactId}
              renderSectionHeader={({section: {title}}) => (
                <Text style={tw`bv-sans-sm text-descGray ml-5 mb-3`}>
                  {title}
                </Text>
              )}
              renderItem={({item, index, section}) => (
                <View
                  style={tw.style('px-5 bg-white', {
                    'rounded-t-3xl pt-[12px]': index === 0,
                    'rounded-b-3xl pb-[12px] mb-5':
                      index === section.data.length - 1,
                  })}>
                  <ContactCard
                    type={type}
                    isSelected={isSelected}
                    {...{
                      image: item?.thumbnailPath,
                      email: item.emailAddresses[0]?.email,
                      phoneNumber: item.phoneNumbers[0]?.number,
                      name:
                        item?.displayName ||
                        (item?.givenName && item?.familyName)
                          ? `${item.givenName} ${item.familyName}`
                          : 'No Name',
                    }}
                    isVerify={item?.verified}
                    onPress={() => selectContact(item)}
                  />
                </View>
              )}
            />
          ) : (
            <EmptyScreen description="You have no contacts..." />
          )}
        </>
      )}
    </>
  );
};

export {ContactsList};
