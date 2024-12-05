import React, {useCallback, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import axios from 'axios';
import {useQuery} from 'react-query';
import {useRoute, useNavigation} from '@react-navigation/native';

import tw from '../../../tailwind';
import {EmptyScreen, FullScreenModalWrapper, SearchBox} from '../commons';
import {SectionWrapper, SelectServices} from '../elements';

const ServicesModal = () => {
  const {params} = useRoute();
  const {goBack} = useNavigation();
  const {data, isLoading} = useQuery({
    queryKey: ['services'],
    queryFn: () => axios.get('/pro/booking/csv'),
  });
  const [searchValue, setSearchValue] = useState('');
  const [selectedVariations, setSelectedVariations] = useState({});
  const onSubmit = useCallback(() => {
    params?.setVariations(selectedVariations);
    goBack();
  }, [selectedVariations]);

  return (
    <FullScreenModalWrapper
      backButton
      title="Services"
      buttonTitle="Add"
      onSubmit={onSubmit}
      hasSeparator={false}
      disabled={!Object.values(selectedVariations).length}
      contentContainerStyle={tw`flex-grow`}>
      <SearchBox
        hasShadow={false}
        placeholder="Search for a Service"
        onChange={setSearchValue}
      />
      <>
        {isLoading ? (
          <View style={tw`items-center justify-center flex-1`}>
            <ActivityIndicator />
          </View>
        ) : data.length ? (
          <SectionWrapper style={tw`mt-4`}>
            {data
              .reduce((acc, category) => {
                acc.push(...category.services);
                return acc;
              }, [])
              .filter(({title}) =>
                title.toLowerCase().includes(searchValue.toLowerCase()),
              )
              .map(({title, id, variations}, index) =>
                variations.length > 0 ? (
                  <SelectServices
                    key={id}
                    {...{
                      id,
                      index,
                      title,
                      variations,
                      selectedVariations,
                      setSelectedVariations,
                    }}
                  />
                ) : null,
              )}
          </SectionWrapper>
        ) : (
          <EmptyScreen description="You have no services ..." />
        )}
      </>
    </FullScreenModalWrapper>
  );
};

export {ServicesModal};
