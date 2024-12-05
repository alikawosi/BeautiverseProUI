/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {View} from 'react-native';
import {AddCircle} from 'iconsax-react-native';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';

import tw from '../../../tailwind';
import {Button, Tag} from '../../components/commons';
import {
  BookServiceCard,
  BusinessSetupLayout,
  SectionWrapper,
} from '../../components/screens/BusinessSetup';

const Category = () => {
  const {params} = useRoute();
  const {navigate} = useNavigation();
  const [selected, setSelected] = useState(null);
  const isFocused = useIsFocused();

  const getCategories = useQuery({
    queryFn: () => axios.get('/pro/setup/services'),
    queryKey: ['GetCategory'],
    keepPreviousData: false,
  });

  const deleteCategory = useMutation({
    mutationFn: id =>
      axios.delete('/pro/setup/categories/custom', {
        params: {
          id,
        },
      }),
    onSuccess: getCategories.refetch,
  });

  const deleteService = useMutation({
    mutationFn: id =>
      axios.delete('/pro/setup/services/custom', {
        params: {
          id,
        },
      }),
    onSuccess: getCategories.refetch,
  });

  useEffect(() => {
    if (isFocused) {
      getCategories.refetch();
    }
  }, [isFocused]);

  const CategoryItem = ({item, index, children}) => {
    const customOptions = [
      {
        title: 'Add Service',
        titleStyle: tw`bv-sans-sm textBlack`,
        onPress: () =>
          navigate('NewServiceModal', {
            categoryId: item.id,
            onSuccess: getCategories.refetch,
          }),
      },
    ];

    return (
      <SectionWrapper
        key={index}
        title={item.title}
        containerStyle={tw.style('mb-5', {
          'opacity-50': Boolean(item.id === selected),
        })}
        number={index + 1}
        option
        customOptions={customOptions}
        onEdit={() =>
          navigate('AddCategoryModal', {
            ...item,
            onSubmit: () => getCategories.refetch(),
            categoryList: getCategories.data,
          })
        }
        onDelete={() =>
          navigate('DeleteModal', {
            keyword: item.title,
            title: 'Delete Category',
            question: 'Are you sure to remove category',
            onSubmit: () => {
              setSelected(item.id);
              deleteCategory.mutate(item.id);
            },
          })
        }>
        <View style={tw`flex-row w-full ml-4`}>
          {item.gender ? (
            <Tag
              title={item.gender}
              titleStyle={tw`capitalize bv-sans-sm text-black`}
              containerStyle={tw`bg-grayBg mr-2 px-2 py-1.5`}
            />
          ) : null}
        </View>
        {item.services?.map((t, serviceIndex) => (
          <BookServiceCard
            key={t.id}
            style={tw.style({
              'opacity-50': `${item.id}_${t.id}` === selected,
              'mb-0': serviceIndex === item?.services?.length - 1,
            })}
            title={t.title}
            priceRange={t.price_range}
            duration={t.duration}
            variations={t.variations}
            onEdit={() =>
              navigate('NewServiceModal', {
                id: t.id,
                title: t.title,
                description: t.description,
                variations: t.variations,
                categoryId: item.id,
                onSuccess: getCategories.refetch,
              })
            }
            onDelete={() =>
              navigate('DeleteModal', {
                keyword: t.title,
                title: 'Delete Service',
                question: 'Are you sure to remove service',
                onSubmit: () => {
                  setSelected(`${item.id}_${t.id}`);
                  deleteService.mutate(t.id);
                },
              })
            }
          />
        ))}
        {children}
      </SectionWrapper>
    );
  };
  return (
    <BusinessSetupLayout
      isNextButtonDisabled={getCategories.isFetching}
      isProgressVisible={!params?.stepsHidden}
      isFooterVisible={!params?.stepsHidden}
      isAddButtonVisible={!params?.stepsHidden}
      progress={3}
      headerTitle={'Which Category of service do you provide?'}
      headerDesc={
        'We highly recommend using the default provided options as much as possible to get better results'
      }
      isLoading={getCategories.isLoading}
      onPressNextButton={() => navigate('TransporationFee')}
      onPressSkipButton={() => navigate('TransporationFee')}>
      {getCategories.data?.map((item, index) => (
        <CategoryItem key={index} item={item} index={index} />
      ))}
      <Button
        title={'Add Category'}
        titleStyle={tw`bv-sans-sm text-black`}
        containerStyle={tw`mx-5 mb-10 bg-gray-200 rounded-2xl`}
        icon={<AddCircle size={18} color="#000000" />}
        onPress={() =>
          navigate('AddCategoryModal', {
            categoryList: getCategories.data,
          })
        }
      />
    </BusinessSetupLayout>
  );
};

export default Category;
