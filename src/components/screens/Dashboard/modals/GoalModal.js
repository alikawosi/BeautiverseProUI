import React, {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import axios from 'axios';
import {ActivityIndicator, View} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';

import tw from '../../../../../tailwind';
import {Button, ModalWrapper, Picker} from '../../../commons';
import {SectionWrapper} from '../../../elements';
import {textUtil} from '../../../../utils';

const GoalModal = () => {
  const isFocused = useIsFocused;
  const {goBack} = useNavigation();
  const {
    data: goal,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['dashBoardGoal'],
    queryFn: () => axios.get('/pro/dashboard/goal'),
  });
  const [data, setData] = useState({
    value: goal?.selects?.value,
    period: goal?.selects?.period,
  });
  const updateData = useMutation(
    () => axios.post('/pro/dashboard/goal', data),
    {
      onSuccess: goBack,
    },
  );

  useEffect(() => {
    if (isFocused) refetch();
  }, []);

  return (
    <>
      {isLoading ? (
        <View style={tw`justify-center items-center flex-grow`}>
          <ActivityIndicator />
        </View>
      ) : (
        <ModalWrapper title="Goal" style={tw`bg-background pb-6`}>
          <SectionWrapper style={tw`mt-5 mb-6`}>
            <Picker
              onChange={data =>
                setData(prevState => ({...prevState, ...data}))
              }>
              <Picker.Wrapper>
                <Picker.Column
                  name="value"
                  value={goal.selects.value}
                  data={goal.values.map(value => ({
                    value,
                    title: textUtil.putCommas(String(value)),
                  }))}
                />
                <Picker.Column
                  name="period"
                  data={Object.values(goal.periods).map(period => ({
                    title: period,
                    value: period.toLowerCase(),
                  }))}
                  value={goal.selects.period.toLowerCase()}
                />
              </Picker.Wrapper>
            </Picker>
          </SectionWrapper>
          <Button
            primary
            title="Confirm"
            loading={updateData.isLoading}
            onPress={updateData.mutate}
            gradientStyle={tw`rounded-xl`}
            titleStyle={tw`text-base`}
          />
        </ModalWrapper>
      )}
    </>
  );
};

export {GoalModal};
